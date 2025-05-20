'use client';

import { motion } from 'framer-motion';
import { useTypewriter } from 'react-simple-typewriter';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import SkillsVisualization from '@/components/SkillsVisualization';
import { usePathname } from 'next/navigation';

export default function Home() {
  const [text] = useTypewriter({
    words: [
      'Frontend Dev by Day ☀️',
      'Gamer by Night 🎮',
      'Dark Mode Specialist 🌑',
      'Pixel-Perfect UIs 💻',
    ],
    loop: 0,
    delaySpeed: 1500,
  });
  const pathname = usePathname();

  return (
    <main className="min-h-screen">
      <motion.section
        key={pathname}
        className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.8 }}
      >
        {/* Background Glow */}
        <div className="absolute -z-10 h-[600px] w-[600px] rounded-full bg-purple-500 blur-[120px] opacity-10" />

        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm text-muted-foreground uppercase tracking-wider mb-4"
        >
          👾 DevMode Activated
        </motion.div>

        {/* Animated Name */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="font-extrabold tracking-tight mb-4 bg-gradient-to-r from-fuchsia-500 to-indigo-500 bg-clip-text text-transparent text-5xl md:text-6xl lg:text-7xl xl:text-8xl"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)' }}
        >
          Yash Tawde
        </motion.h1>

        {/* Typewriter Effect */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="text-lg md:text-xl max-w-xl text-muted-foreground mb-8 h-[40px]"
        >
          {text}
          <span className="text-primary">|</span>
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <Link href="#skills">
            <Button size="lg">View Skills</Button>
          </Link>
        </motion.div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        id="skills"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <SkillsVisualization />
      </motion.section>

      {/* Optionally, add a button to About page */}
      <motion.div
        className="flex justify-center mt-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Link href="/about">
          <Button variant="secondary">See My Journey</Button>
        </Link>
      </motion.div>
    </main>
  );
}
