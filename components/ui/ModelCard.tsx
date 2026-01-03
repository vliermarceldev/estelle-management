import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ModelCardProps {
  slug: string;
  name: string;
  handle: string;
  img: string;
  blurDataUrl?: string; // Neu: Für den Blur Effekt
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
      scroll={false}
      className="group flex flex-col items-center cursor-pointer block"
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 mb-4">
        {/* HINWEIS: Um die Optimierung auch hier anzuwenden, 
           musst du in der Datei, die ModelCard aufruft (app/[lang]/models/page.tsx), 
           das .auto('format') an die URL anhängen.
           Alternativ kannst du hier im src prop prüfen, ob es fehlt.
           Der sauberste Weg ist aber, die URL schon optimiert zu übergeben.
        */}
        <Image
          src={img}
          alt={name}
          fill
          // Performance: Größen für verschiedene Breakpoints
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          // Blur Effect aktivieren, falls Daten da sind
          placeholder={blurDataUrl ? "blur" : "empty"}
          blurDataURL={blurDataUrl}
        />
      </div>

      <div className="text-center">
        <h3 className="text-lg text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
          <span className="font-bold">{firstName}</span>{" "}
          <span className="font-light text-zinc-500 dark:text-zinc-400">
            {lastName}
          </span>
        </h3>
      </div>
    </Link>
  );
};
