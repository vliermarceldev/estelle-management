"use client";

import { motion } from "framer-motion";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1], // Custom "Ease Out Quart" Kurve für ein "schweres", edles Gefühl
      }}
    >
      {children}
    </motion.div>
  );
}
