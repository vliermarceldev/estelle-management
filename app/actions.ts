"use server";

import { z } from "zod";
import { Resend } from "resend";
import { createClient } from "next-sanity";
import { UPLOAD_CONFIG } from "@/lib/config";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "onboarding@resend.dev";

// WRITE Client für Sanity (benötigt Token in .env)
const sanityWriteClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN,
  useCdn: false, // Keine CDN für Writes
});

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

const ContactSchema = z.object({
  name: z.string().min(2, "Name zu kurz"),
  email: z.string().email("Ungültige E-Mail"),
  instagram: z.string().min(1, "Instagram erforderlich"),
  age: z.string().min(1, "Alter erforderlich"),
  status: z.enum(["beginner", "experienced", "pro"], {
    message: "Bitte Status wählen",
  }),
  message: z.string().min(10, "Nachricht zu kurz"),
  isAdult: z.literal(true, {
    message: "Bestätigung erforderlich (18+).",
  }),
  company_website: z.string().optional(),
});

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  // Raw Data holen für erste Checks (Honeypot)
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    instagram: formData.get("instagram"),
    age: formData.get("age"),
    status: formData.get("status"),
    message: formData.get("message"),
    isAdult: formData.get("isAdult") === "on" ? true : false,
    company_website: formData.get("company_website"),
  };

  // 1. Honeypot Check (Spam-Schutz)
  if (rawData.company_website) {
    console.warn("Honeypot triggered.");
    return { success: true, message: "Bewerbung erfolgreich gesendet!" };
  }

  // 2. Validation mit Zod
  const validation = ContactSchema.safeParse(rawData);
  if (!validation.success) {
    return {
      success: false,
      message: "Bitte alle Pflichtfelder ausfüllen.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  // WICHTIG: Ab hier nutzen wir die validierten Daten!
  // TypeScript weiß jetzt, dass diese Felder Strings sind.
  const validData = validation.data;

  // 3. File Validation & Upload Logic
  const photoFiles = formData.getAll("photo") as File[];
  const validFiles = photoFiles.filter((f) => f.size > 0);
  const uploadedImageUrls: string[] = [];

  if (validFiles.length > 0) {
    // Check Limits
    if (validFiles.length > UPLOAD_CONFIG.MAX_FILES) {
      return {
        success: false,
        message: `Zu viele Dateien (Max. ${UPLOAD_CONFIG.MAX_FILES}).`,
        errors: { photo: [`Max. ${UPLOAD_CONFIG.MAX_FILES} Bilder.`] },
      };
    }

    let totalSize = 0;
    for (const file of validFiles) {
      if (!UPLOAD_CONFIG.ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        return {
          success: false,
          message: `Typ nicht unterstützt: ${file.name}`,
          errors: { photo: ["Nur JPG, PNG, WebP."] },
        };
      }
      totalSize += file.size;
    }

    if (totalSize > UPLOAD_CONFIG.MAX_TOTAL_SIZE) {
      return {
        success: false,
        message: "Gesamtgröße zu hoch (Max. 25MB).",
        errors: { photo: ["Max 25MB Gesamtgröße."] },
      };
    }

    // UPLOAD TO SANITY
    try {
      if (!process.env.SANITY_API_TOKEN) {
        console.error("SANITY_API_TOKEN fehlt!");
        throw new Error("Internal Configuration Error");
      }

      for (const file of validFiles) {
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload als Asset
        const asset = await sanityWriteClient.assets.upload("image", buffer, {
          filename: file.name,
          contentType: file.type,
        });

        uploadedImageUrls.push(asset.url);
      }
    } catch (error) {
      console.error("Sanity Upload Error:", error);
      return { success: false, message: "Fehler beim Bild-Upload." };
    }
  }

  // 4. Send Email (mit validData statt rawData)
  try {
    const { error } = await resend.emails.send({
      from: "Estelle Management <onboarding@resend.dev>",
      to: [ADMIN_EMAIL],
      replyTo: validData.email, // Hier sicher ein String
      subject: `Bewerbung: ${validData.name} (18+ confirmed)`,
      html: `
        <h2>Neue Bewerbung</h2>
        <p>✅ <strong>Alter bestätigt (18+)</strong></p>
        <hr/>
        <p><strong>Name:</strong> ${validData.name}</p>
        <p><strong>Email:</strong> ${validData.email}</p>
        <p><strong>Instagram:</strong> <a href="https://instagram.com/${validData.instagram.replace("@", "")}" target="_blank">${validData.instagram}</a></p>
        <p><strong>Status:</strong> ${validData.status}</p>
        <p><strong>Alter:</strong> ${validData.age}</p>
        <br/>
        <h3>Nachricht:</h3>
        <p>${validData.message}</p>
        <hr/>
        <h3>Fotos (${uploadedImageUrls.length}):</h3>
        ${
          uploadedImageUrls.length > 0
            ? `<ul>${uploadedImageUrls
                .map(
                  (url) =>
                    `<li><a href="${url}" target="_blank">Bild ansehen</a></li>`
                )
                .join("")}</ul>
               <p style="font-size: 12px; color: #666;">Bilder werden sicher bei Sanity gehostet.</p>`
            : "<p>Keine Fotos hochgeladen.</p>"
        }
      `,
    });

    if (error) {
      console.error(error);
      return { success: false, message: "Fehler beim Senden der E-Mail." };
    }

    return { success: true, message: "Bewerbung erfolgreich gesendet!" };
  } catch (err) {
    console.error(err);
    return { success: false, message: "Server Fehler." };
  }
}
