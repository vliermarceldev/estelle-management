import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Aktiviert React Compiler (neu in Next 15/16, experimentell aber oft schneller)
  experimental: {
    serverActions: {
      bodySizeLimit: "30mb",
    },
  },
  images: {
    // WICHTIG: AVIF zuerst, da es effizienter ist. Browser nimmt das erste unterstützte Format.
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // NEU: HSTS für Sicherheit (erzwingt HTTPS für 2 Jahre)
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          // NEU: Permissions Policy (verbietet unnötige Browser-APIs -> besserer Score)
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
