"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Send, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      toast.success("Message sent! I’ll get back to you.");
      setLoading(false);
    }, 1500);
  };

  const socials = [
    {
      href: "https://github.com/Vader44",
      title: "GitHub",
      icon: <Github className="w-6 h-6" />,
    },
    {
      href: "https://www.linkedin.com/in/yash-tawde",
      title: "LinkedIn",
      icon: <Linkedin className="w-6 h-6" />,
    },
    {
      href: "mailto:yash@email.com",
      title: "Email",
      icon: <Mail className="w-6 h-6" />,
    },
    {
      href: "https://discord.com/users/your-discord-id",
      title: "Discord",
      icon: <MessageSquare className="w-6 h-6" />,
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-6 text-center">Contact 📬</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="text" placeholder="Your Name" required />
        <Input type="email" placeholder="Your Email" required />
        <Textarea placeholder="Your Message..." rows={4} required />
        <motion.div whileTap={{ scale: 0.95 }}>
          <Button disabled={loading}>
            {loading ? "Sending..." : "Send Message"}
            <Send className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </form>

      {/* Animated Social Icons */}
      <div className="flex justify-center gap-6 mt-10">
        {socials.map((item, index) => (
          <motion.a
            key={index}
            href={item.href}
            target="_blank"
            title={item.title}
            whileHover={{ scale: 1.2, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            className="text-foreground hover:text-primary transition-colors"
          >
            {item.icon}
          </motion.a>
        ))}
      </div>
    </div>
  );
}
