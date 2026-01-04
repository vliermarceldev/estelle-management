import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ModelCardProps {
  slug: string;
  name: string;
  handle?: string;
  img: string;
  blurDataUrl?: string;
}

export const ModelCard = ({
  slug,
  name,
  handle,
  img,
  blurDataUrl,
}: ModelCardProps) => {
  const nameParts = name.split(" ");
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ");

  return (
    <Link
      href={`/models/${slug}`}
      // scroll={false} entfernt für besseres UX (Start oben bei neuer Seite)
      className="group flex flex-col items-center cursor-pointer block"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-4 rounded-sm">
        <Image
          src={img}
          alt={`Model ${name} - Estelle Management`}
          fill
          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          placeholder={blurDataUrl ? "blur" : "empty"}
          blurDataURL={blurDataUrl}
          quality={80}
        />
      </div>

      <div className="text-center">
        <h3 className="text-lg text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
          <span className="font-bold">{firstName}</span>{" "}
          <span className="font-light text-zinc-500 dark:text-zinc-400">
            {lastName}
          </span>
        </h3>
        {handle && (
          <p className="text-xs text-zinc-400 mt-1 tracking-wider uppercase">
            {handle}
          </p>
        )}
      </div>
    </Link>
  );
};
