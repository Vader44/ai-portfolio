"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <motion.h1
        className="text-5xl font-bold mb-4"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Hey, I'm Yash 👋
      </motion.h1>

      <motion.p
        className="text-lg max-w-xl text-muted-foreground mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        A Front-end Developer crafting modern UIs with React, Angular, and a bit
        of motion magic ✨
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <Link href="/projects">
          <Button size="lg">See My Work</Button>
        </Link>
      </motion.div>
    </div>
  );
}
