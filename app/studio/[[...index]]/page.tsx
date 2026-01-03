// app/studio/[[...index]]/page.tsx
"use client";

import { NextStudio } from "next-sanity/studio";
import config from "@/sanity.config";
import { useEffect, useState } from "react";

export default function StudioPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Setzt mounted auf true, sobald der Code im Browser läuft
    setMounted(true);
  }, []);

  // Verhindert das Rendering auf dem Server oder während der ersten Hydration
  if (!mounted) return null;

  return <NextStudio config={config} />;
}
