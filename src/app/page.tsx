'use client';

import { motion } from 'framer-motion';
import { useTypewriter } from 'react-simple-typewriter';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 text-center overflow-hidden">
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
        className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-fuchsia-500 to-indigo-500 bg-clip-text text-transparent"
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
        <Link href="/projects">
          <Button size="lg">View Projects</Button>
        </Link>
      </motion.div>
    </section>
  );
}
