"use client";

import React, { useState, useTransition } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { CheckCircle, Loader2, UploadCloud, X, FileImage } from "lucide-react";
import { submitContactForm, type ContactFormState } from "@/app/actions";
import { UPLOAD_CONFIG } from "@/lib/config";

const INPUT_STYLES =
  "w-full px-6 py-4 rounded-none transition-all outline-none bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 focus:border-zinc-400 dark:focus:border-zinc-600 focus:bg-white dark:focus:bg-zinc-800/50 text-zinc-900 dark:text-zinc-100";

const LABEL_STYLES =
  "text-xs uppercase tracking-widest text-zinc-500 pl-2 block mb-2";

const OPTION_STYLES =
  "bg-zinc-50 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100";

export const ContactForm = () => {
  const { t } = useLanguage();
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState("");
  const [isPending, startTransition] = useTransition();

  const [state, setState] = useState<ContactFormState>({
    success: false,
    message: "",
    errors: {},
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFiles = Array.from(e.target.files || []);
    if (newFiles.length === 0) return;

    if (files.length + newFiles.length > UPLOAD_CONFIG.MAX_FILES) {
      alert(`Maximal ${UPLOAD_CONFIG.MAX_FILES} Bilder erlaubt.`);
      e.target.value = "";
      return;
    }

    const currentSize = files.reduce((acc, f) => acc + f.size, 0);
    const newSize = newFiles.reduce((acc, f) => acc + f.size, 0);

    if (currentSize + newSize > UPLOAD_CONFIG.MAX_TOTAL_SIZE) {
      alert("Gesamtgröße überschreitet 25MB.");
      e.target.value = "";
      return;
    }

    setFiles((prev) => [...prev, ...newFiles]);
    e.target.value = "";
  };

  const removeFile = (indexToRemove: number) => {
    setFiles((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Alte "photo" Einträge entfernen (falls leer) und unsere State-Files anhängen
    formData.delete("photo");
    files.forEach((file) => {
      formData.append("photo", file);
    });

    startTransition(async () => {
      const result = await submitContactForm(
        { success: false, message: "" },
        formData
      );
      setState(result);
    });
  };

  if (state.success) {
    return (
      <div
        className="text-center py-12 animate-in fade-in duration-700"
        role="alert"
      >
        <div className="mx-auto w-16 h-16 bg-zinc-100 dark:bg-zinc-900 rounded-none flex items-center justify-center mb-6">
          <CheckCircle className="w-8 h-8 text-zinc-900 dark:text-zinc-100" />
        </div>
        <h3 className="text-2xl font-light text-zinc-900 dark:text-zinc-100 mb-2">
          {t.contact.successTitle}
        </h3>
        <p className="text-zinc-600 dark:text-zinc-400 mb-6">
          {t.contact.successText}
        </p>
        <button
          onClick={() => window.location.reload()}
          className="text-xs uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-300 underline cursor-pointer"
        >
          {t.contact.back}
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 relative z-10"
      noValidate
    >
      {state.message && !state.success && (
        <div
          className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm text-center border border-red-200 dark:border-red-800"
          role="alert"
        >
          {state.message}
        </div>
      )}

      {/* Grid: Name & Email */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className={LABEL_STYLES}>
            {t.contact.name}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            aria-invalid={!!state.errors?.name}
            aria-describedby={state.errors?.name ? "name-error" : undefined}
            className={`${INPUT_STYLES} ${state.errors?.name ? "border-red-500 focus:border-red-500" : ""}`}
            placeholder={t.contact.name}
          />
          {state.errors?.name && (
            <p
              id="name-error"
              className="text-red-500 text-xs pl-2 pt-1"
              role="alert"
            >
              {state.errors.name[0]}
            </p>
          )}
        </div>
        <div>
          <label htmlFor="email" className={LABEL_STYLES}>
            {t.contact.email}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            aria-invalid={!!state.errors?.email}
            aria-describedby={state.errors?.email ? "email-error" : undefined}
            className={`${INPUT_STYLES} ${state.errors?.email ? "border-red-500 focus:border-red-500" : ""}`}
            placeholder="name@example.com"
          />
          {state.errors?.email && (
            <p
              id="email-error"
              className="text-red-500 text-xs pl-2 pt-1"
              role="alert"
            >
              {state.errors.email[0]}
            </p>
          )}
        </div>
      </div>

      {/* Grid: Instagram & Age */}
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="instagram" className={LABEL_STYLES}>
            {t.contact.instagram}
          </label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            required
            className={INPUT_STYLES}
            placeholder="@username"
          />
        </div>
        <div>
          <label htmlFor="age" className={LABEL_STYLES}>
            {t.contact.age || "Age"}
          </label>
          <input
            type="number"
            id="age"
            name="age"
            required
            min="18"
            className={INPUT_STYLES}
            placeholder="18+"
          />
        </div>
      </div>

      {/* Status Select */}
      <div>
        <label htmlFor="status" className={LABEL_STYLES}>
          {t.contact.status || "Current Status"}
        </label>
        <div className="relative">
          <select
            id="status"
            name="status"
            required
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`${INPUT_STYLES.replace(
              "text-zinc-900 dark:text-zinc-100",
              ""
            )} appearance-none cursor-pointer ${
              status === ""
                ? "text-zinc-400 dark:text-zinc-600"
                : "text-zinc-900 dark:text-zinc-100"
            }`}
          >
            <option value="" disabled className={OPTION_STYLES}>
              {t.contact.selectStatus || "Please select..."}
            </option>
            <option value="beginner" className={OPTION_STYLES}>
              {t.contact.statusOptions?.beginner || "Newcomer"}
            </option>
            <option value="experienced" className={OPTION_STYLES}>
              {t.contact.statusOptions?.experienced || "Experienced"}
            </option>
            <option value="pro" className={OPTION_STYLES}>
              {t.contact.statusOptions?.pro || "Top Creator"}
            </option>
          </select>
          <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
        {state.errors?.status && (
          <p className="text-red-500 text-xs pl-2 pt-1" role="alert">
            {state.errors.status[0]}
          </p>
        )}
      </div>

      {/* File Upload */}
      <div>
        <label className={`${LABEL_STYLES} flex justify-between`}>
          <span>{t.contact.photo || "Photos"}</span>
          <span className="text-[10px] text-zinc-400 normal-case tracking-normal">
            {files.length}/{UPLOAD_CONFIG.MAX_FILES}
          </span>
        </label>
        <div className="relative group focus-within:ring-1 focus-within:ring-zinc-400 dark:focus-within:ring-zinc-600">
          <input
            type="file"
            id="photo-upload"
            accept={UPLOAD_CONFIG.ACCEPTED_IMAGE_TYPES.join(", ")}
            multiple
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            disabled={files.length >= UPLOAD_CONFIG.MAX_FILES}
            aria-label="Upload photos"
          />

          <div
            className={`w-full px-6 py-6 border border-dashed transition-all flex flex-col items-center justify-center gap-2 ${
              files.length >= UPLOAD_CONFIG.MAX_FILES
                ? "bg-zinc-100 dark:bg-zinc-800 border-zinc-200 cursor-not-allowed opacity-50"
                : "border-zinc-300 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-900 group-hover:border-zinc-400 dark:group-hover:border-zinc-500 cursor-pointer"
            }`}
            aria-hidden="true"
          >
            <UploadCloud className="w-6 h-6 text-zinc-400 dark:text-zinc-500 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors" />

            <span className="text-sm text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
              {files.length >= UPLOAD_CONFIG.MAX_FILES
                ? "Limit reached"
                : t.contact.photoPlaceholder || "Click to add photos"}
            </span>

            <span className="text-[10px] text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
              {t.contact.photoHelp || `Max ${UPLOAD_CONFIG.MAX_FILES} images`}
            </span>
          </div>
        </div>

        {files.length > 0 && (
          <div className="grid grid-cols-1 gap-2 mt-3 animate-in slide-in-from-top-2">
            {files.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800"
              >
                <div className="flex items-center gap-3 overflow-hidden">
                  <div className="w-8 h-8 flex-shrink-0 bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center">
                    <FileImage className="w-4 h-4 text-zinc-500" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-zinc-900 dark:text-zinc-100 truncate">
                      {file.name}
                    </p>
                    <p className="text-[10px] text-zinc-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-full transition-colors cursor-pointer"
                  aria-label={`Remove file ${file.name}`}
                >
                  <X className="w-4 h-4 text-zinc-500 hover:text-red-500" />
                </button>
              </div>
            ))}
          </div>
        )}
        {state.errors?.photo && (
          <p className="text-red-500 text-xs pl-2 pt-1" role="alert">
            {state.errors.photo[0]}
          </p>
        )}
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className={LABEL_STYLES}>
          {t.contact.message}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`${INPUT_STYLES} resize-none`}
          placeholder={t.contact.messagePlaceholder}
        />
        {state.errors?.message && (
          <p className="text-red-500 text-xs pl-2 pt-1" role="alert">
            {state.errors.message[0]}
          </p>
        )}
      </div>

      {/* 18+ Checkbox */}
      <div className="flex items-start gap-3 px-2">
        <div className="flex items-center h-5">
          <input
            id="isAdult"
            name="isAdult"
            type="checkbox"
            required
            className="w-4 h-4 border border-zinc-300 rounded bg-zinc-50 focus:ring-1 focus:ring-zinc-900 dark:bg-zinc-900 dark:border-zinc-700 dark:focus:ring-zinc-600 text-zinc-900 cursor-pointer"
          />
        </div>
        <label
          htmlFor="isAdult"
          className="text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer select-none"
        >
          {t.contact.confirmAdult ||
            "I confirm that I am at least 18 years old and agree to the storage of my data."}
        </label>
      </div>
      {state.errors?.isAdult && (
        <p className="text-red-500 text-xs pl-2 pt-1" role="alert">
          {state.errors.isAdult[0]}
        </p>
      )}

      {/* HONEYPOT FIELD */}
      <input
        type="text"
        name="company_website"
        tabIndex={-1}
        autoComplete="off"
        className="opacity-0 absolute -z-10 w-0 h-0"
        aria-hidden="true"
      />

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-zinc-900 text-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 font-medium py-4 hover:bg-zinc-800 dark:hover:bg-white transition-colors uppercase tracking-widest text-sm rounded-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
      >
        {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
        {isPending ? "Sending..." : t.contact.submit}
      </button>

      <p className="text-center text-xs text-zinc-500 dark:text-zinc-600 pt-4">
        {t.contact.privacy}
      </p>
    </form>
  );
};
