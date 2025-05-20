"use client";

import { motion } from "framer-motion";
import Timeline from '@/components/Timeline';

const skills = [
  { name: "HTML", emoji: "🌐" },
  { name: "CSS", emoji: "🎨" },
  { name: "JavaScript", emoji: "📜" },
  { name: "TypeScript", emoji: "🧠" },
  { name: "React", emoji: "⚛️" },
  { name: "Angular", emoji: "🅰️" },
  { name: "Tailwind CSS", emoji: "💨" },
  { name: "Framer Motion", emoji: "🎞️" },
  { name: "Node.js", emoji: "🟢" },
  { name: "Git", emoji: "🔧" },
  { name: "Linux", emoji: "🐧" },
  { name: "Figma", emoji: "🎨" },
];

export default function AboutPage() {
  return (
    <motion.div
      className="max-w-3xl mx-auto px-4 py-12"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <h1 className="text-4xl font-bold text-center mb-10">My Journey 📜</h1>
      <Timeline />
      {/* Skills Grid */}
      <motion.div
        className="mt-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <h2 className="text-3xl font-semibold mb-6 text-center">
          Tech Stack ⚙️
        </h2>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-6 place-items-center text-sm text-muted-foreground">
          {skills.map((tech, index) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              className="flex flex-col items-center gap-1"
            >
              <div className="text-2xl">{tech.emoji}</div>
              <div>{tech.name}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
