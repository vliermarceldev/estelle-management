"use server";

import { z } from "zod";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "onboarding@resend.dev";

const MAX_TOTAL_SIZE = 25 * 1024 * 1024;
const MAX_FILES = 4;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

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
  // Honeypot Feld (muss leer sein)
  company_website: z.string().optional(),
});

export async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData
): Promise<ContactFormState> {
  const rawData = {
    name: formData.get("name"),
    email: formData.get("email"),
    instagram: formData.get("instagram"),
    age: formData.get("age"),
    status: formData.get("status"),
    message: formData.get("message"),
    isAdult: formData.get("isAdult") === "on" ? true : false,
    // Honeypot field
    company_website: formData.get("company_website"),
  };

  // SPAM SCHUTZ: Wenn das unsichtbare Feld ausgefüllt ist -> Abbruch (aber Success faken)
  if (rawData.company_website) {
    console.warn("Honeypot triggered by bot.");
    // Wir geben "Erfolg" zurück, damit der Bot denkt, er war erfolgreich und nicht weiter probiert
    return { success: true, message: "Bewerbung erfolgreich gesendet!" };
  }

  const photoFiles = formData.getAll("photo") as File[];
  const validFiles = photoFiles.filter((f) => f.size > 0);

  const validation = ContactSchema.safeParse(rawData);

  if (!validation.success) {
    return {
      success: false,
      message: "Bitte alle Pflichtfelder ausfüllen.",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  // ... (Restlicher Code für Bilder & Upload bleibt identisch wie vorher) ...
  let attachments = [];
  let totalSize = 0;

  if (validFiles.length > 0) {
    if (validFiles.length > MAX_FILES) {
      return {
        success: false,
        message: `Zu viele Dateien (Max. ${MAX_FILES}).`,
        errors: { photo: [`Max. ${MAX_FILES} Bilder.`] },
      };
    }

    for (const file of validFiles) {
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        return {
          success: false,
          message: `Typ nicht unterstützt: ${file.name}`,
          errors: { photo: ["Nur JPG, PNG, WebP."] },
        };
      }
      totalSize += file.size;
    }

    if (totalSize > MAX_TOTAL_SIZE) {
      return {
        success: false,
        message: "Gesamtgröße zu hoch (Max. 25MB).",
        errors: { photo: ["Max 25MB Gesamtgröße."] },
      };
    }

    try {
      for (const file of validFiles) {
        const arrayBuffer = await file.arrayBuffer();
        attachments.push({
          filename: file.name,
          content: Buffer.from(arrayBuffer),
        });
      }
    } catch (error) {
      console.error(error);
      return { success: false, message: "Fehler beim Bild-Upload." };
    }
  }

  try {
    const { error } = await resend.emails.send({
      from: "Estelle Management <onboarding@resend.dev>",
      to: [ADMIN_EMAIL],
      replyTo: rawData.email as string,
      subject: `Bewerbung: ${rawData.name} (18+ confirmed)`,
      html: `
        <h2>Neue Bewerbung</h2>
        <p>✅ <strong>Alter bestätigt (18+)</strong></p>
        <hr/>
        <p><strong>Name:</strong> ${rawData.name}</p>
        <p><strong>Email:</strong> ${rawData.email}</p>
        <p><strong>Instagram:</strong> ${rawData.instagram}</p>
        <p><strong>Status:</strong> ${rawData.status}</p>
        <p><strong>Alter:</strong> ${rawData.age}</p>
        <br/>
        <h3>Nachricht:</h3>
        <p>${rawData.message}</p>
      `,
      attachments: attachments,
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
