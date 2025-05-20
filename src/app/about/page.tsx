"use client";

import { motion } from "framer-motion";
import Timeline from '@/components/Timeline';

const timeline = [
  {
    year: "2017",
    emoji: "🎓",
    title: "Engineering Begins",
    description:
      "Started B.E. in IT. Wrote my first C program and built static websites.",
  },
  {
    year: "2021",
    emoji: "🧑‍💻",
    title: "Joined Jio",
    description:
      "Frontend Dev on Angular + SAP systems. Built portals & internal tools.",
  },
  {
    year: "2023",
    emoji: "🎮",
    title: "The Gamer Dev Arc",
    description:
      "Started building side projects with React, Tailwind, and Framer Motion.",
  },
  {
    year: "2025",
    emoji: "🚀",
    title: "This Portfolio",
    description:
      "Launched my personal dev+gamer themed portfolio. You're looking at it 😉",
  },
];

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
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold text-center mb-10">My Journey 📜</h1>
      <Timeline />
      {/* Skills Grid */}
      <div className="mt-20">
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
      </div>
    </div>
  );
}
