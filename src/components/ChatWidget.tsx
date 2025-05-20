"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import Image from "next/image";

const BOT_AVATAR = "🦾";
const USER_AVATAR = "🧑‍💻";

const responses: Record<string, string> = {
  who: "I'm VadarBuddy — your friendly dev assistant built for this portfolio!",
  tech: "🛠 I love working with React, Angular, Tailwind, and a little Framer spice ✨",
  game: "__steam_profile__",
  joke: "Why do programmers hate nature? Too many bugs! 🐛",
  story: "This portfolio was built to showcase my love for UI, motion, and code that feels good.",
  sudo: "🟢 Booting root shell... Matrix stream online... 💻",
  hack: "🟢 Breaching mainframe... Displaying source code... 💾",
  song: "🎵 Twinkle twinkle little div, how I wonder what you did...",
  css: "😭 Please... not the CSS... anything but the CSS...",
  project: "🧪 This portfolio? It's my playground for motion, interaction, and vibes.",
  hobbies: "🧩 Besides coding? I sketch interfaces, tweak animations, and sometimes rage at Valorant.",
  skills: "🛠 React, Angular, TypeScript, Tailwind, Framer Motion, and a little backend mischief.",
  good: "📈 I'm learning fast — faster than npm can deprecate a package!",
  why: "🚀 To showcase not just my code, but how I think about UI and motion.",
  color: "🎨 Probably a deep cyberpunk purple. Or classic #0f0.",
  fav: "🎮 Valorant lately. But I respect old-school Counter Strike and Portal.",
  "npm install": "📦 Installing... 17,394 packages with 12 vulnerabilities. Please wait... 😂",
  resume: "📄 Here's my resume. You can download it below."
};

const fallbackReplies = [
  "🤔 Hmm... that's a good one. Try asking about tech, games, or who I am!",
  "🧠 Not sure how to respond... but I love dev chat and memes!",
  "😅 You got me! Ask 'what tech do you use?' or 'tell me a joke'.",
  "👾 That stumped me! I'm smarter with questions about dev stuff.",
];

// Animated SVG Avatar for VadarBuddy
const VADARBUDDY_AVATAR = (
  <motion.svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ rotate: -10 }}
    animate={{ rotate: [ -10, 10, -10 ] }}
    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
    className="inline-block align-middle mr-2"
  >
    <circle cx="16" cy="16" r="16" fill="#6366F1" />
    <ellipse cx="16" cy="20" rx="7" ry="3" fill="#fff" fillOpacity=".2" />
    <ellipse cx="12" cy="14" rx="2" ry="3" fill="#fff" />
    <ellipse cx="20" cy="14" rx="2" ry="3" fill="#fff" />
    <circle cx="12" cy="15" r="1" fill="#6366F1" />
    <circle cx="20" cy="15" r="1" fill="#6366F1" />
    <rect x="13" y="21" width="6" height="2" rx="1" fill="#fff" />
  </motion.svg>
);

// DVD Logo SVGs
const DVD_SVGS = [
  '/dvd/dvdlogo-01.svg',
  '/dvd/dvdlogo-02.svg',
  '/dvd/dvdlogo-03.svg',
  '/dvd/dvdlogo-04.svg',
  '/dvd/dvdlogo-05.svg',
  '/dvd/dvdlogo-06.svg',
  '/dvd/dvdlogo-07.svg',
];

// Refactor DVDLogoImg to use Next.js Image
const DVDLogoImg = ({ index }: { index: number }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);
  
  if (error) {
    return (
      <div className="w-[200px] h-[100px] bg-red-500/20 flex items-center justify-center text-red-500">
        Error loading SVG
      </div>
    );
  }

  return (
    <div className="relative w-[200px] h-[100px]">
      <Image
        src={DVD_SVGS[index]}
        alt={`DVD Logo ${index + 1}`}
        width={200}
        height={100}
        style={{ 
          display: 'block',
          opacity: loaded ? 1 : 0.5,
          transition: 'opacity 0.3s'
        }}
        draggable={false}
        onError={() => {
          console.error(`Failed to load SVG: ${DVD_SVGS[index]}`);
          setError(true);
        }}
        onLoad={() => {
          console.log(`Successfully loaded SVG: ${DVD_SVGS[index]}`);
          setLoaded(true);
        }}
        priority
      />
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-yellow-500/20 text-yellow-500">
          Loading SVG...
        </div>
      )}
    </div>
  );
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<
    { sender: "bot" | "user"; text: string; isResume?: boolean; isCountdown?: boolean }[]
  >([{ sender: "bot", text: "Hi! I&apos;m VadarBuddy. Ask me anything 👇" }]);

  const endRef = useRef<HTMLDivElement>(null);
  const [showDVD, setShowDVD] = useState(false);
  const [dvdPos, setDvdPos] = useState({ x: 100, y: 100 });
  const [dvdSvgIndex, setDvdSvgIndex] = useState(0);
  const [dvdCountdown, setDvdCountdown] = useState<number | null>(null);
  const dvdRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Bouncing DVD effect (indefinite, color change on edge/corner, close on click)
  useEffect(() => {
    if (!showDVD) return;
    
    console.log('🎬 Starting DVD animation');
    let raf: number;
    const logoW = 200;
    const logoH = 100;
    let x = Math.random() * (window.innerWidth - logoW);
    let y = Math.random() * (window.innerHeight - logoH);
    let dx = 2 + Math.random() * 2;
    let dy = 2 + Math.random() * 2;
    let svgIndex = Math.floor(Math.random() * DVD_SVGS.length);
    
    setDvdPos({ x, y });
    setDvdSvgIndex(svgIndex);

    const move = () => {
      let hitEdge = false;
      x += dx;
      y += dy;
      
      if (x <= 0) {
        x = 0;
        dx = Math.abs(dx);
        hitEdge = true;
      } else if (x >= window.innerWidth - logoW) {
        x = window.innerWidth - logoW;
        dx = -Math.abs(dx);
        hitEdge = true;
      }
      
      if (y <= 0) {
        y = 0;
        dy = Math.abs(dy);
        hitEdge = true;
      } else if (y >= window.innerHeight - logoH) {
        y = window.innerHeight - logoH;
        dy = -Math.abs(dy);
        hitEdge = true;
      }
      
      if (hitEdge) {
        svgIndex = (svgIndex + 1) % DVD_SVGS.length;
        setDvdSvgIndex(svgIndex);
        console.log(`🎬 DVD Logo changed to SVG ${svgIndex + 1}`);
      }
      
      setDvdPos({ x, y });
      raf = requestAnimationFrame(move);
    };
    
    raf = requestAnimationFrame(move);
    
    // Increase duration to 30 seconds
    const timeout = setTimeout(() => {
      console.log('🎬 DVD Logo effect timed out after 30 seconds');
      setShowDVD(false);
      cancelAnimationFrame(raf);
    }, 30000);
    
    return () => {
      console.log('🎬 Cleaning up DVD animation');
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [showDVD]);

  // DVD Countdown effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showDVD) {
      setDvdCountdown(30);
      // Add countdown message to chat
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: `🟢 DVD logo will disappear in 30 seconds...`, isCountdown: true }
      ]);
      interval = setInterval(() => {
        setDvdCountdown((prev) => {
          if (prev === null) return null;
          if (prev <= 1) return 0;
          return prev - 1;
        });
      }, 1000);
    } else {
      setDvdCountdown(null);
      // Remove countdown message from chat
      setMessages((prev) => prev.filter((msg) => !msg.isCountdown));
    }
    return () => {
      clearInterval(interval);
    };
  }, [showDVD]);

  // Update countdown message in chat
  useEffect(() => {
    if (dvdCountdown !== null && dvdCountdown > 0) {
      setMessages((prev) => {
        const idx = prev.findIndex((msg) => msg.isCountdown);
        if (idx === -1) return prev;
        const updated = [...prev];
        updated[idx] = { ...updated[idx], text: `🟢 DVD logo will disappear in ${dvdCountdown} second${dvdCountdown === 1 ? '' : 's'}...` };
        return updated;
      });
    } else if (dvdCountdown === 0) {
      setShowDVD(false);
    }
  }, [dvdCountdown]);

  function triggerMatrixMode() {
    console.log('🎬 DVD Logo effect triggered');
    setShowDVD(true);
  }

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user" as const, text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const lower = input.toLowerCase();
      let botText = "";
      let isResume = false;

      // Make sudo trigger more reliable
      if (lower === "sudo" || lower.includes("sudo ")) {
        console.log('🎬 Sudo command detected');
        triggerMatrixMode();
        botText = "🟢 Matrix system booted... DVD logo activated!";
      } else if (lower.includes("resume")) {
        botText = responses["resume"];
        isResume = true;
      } else {
        const match = Object.entries(responses).find(([key]) =>
          lower.includes(key)
        );

        botText = match
          ? match[1]
          : fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
      }

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: botText, isResume },
      ]);
      setIsTyping(false);
    }, 1500);

    setInput("");
  };
  return (
    <>
      {/* DVD Bouncing Logo Overlay - no background, just the logo */}
      {showDVD && typeof window !== 'undefined' && createPortal(
        <motion.div
          ref={dvdRef}
          initial={false}
          animate={{ x: dvdPos.x, y: dvdPos.y }}
          transition={{ type: "linear", duration: 0.03 }}
          style={{ 
            position: "fixed", 
            top: 0, 
            left: 0, 
            width: "200px",
            height: "100px",
            zIndex: 9999, 
            pointerEvents: "auto",
            cursor: "pointer"
          }}
          onClick={() => {
            console.log('🎬 DVD Logo clicked - stopping effect');
            setShowDVD(false);
          }}
        >
          <div style={{ 
            width: "100%", 
            height: "100%", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center"
          }}>
            <DVDLogoImg index={dvdSvgIndex} />
          </div>
        </motion.div>,
        document.body
      )}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 z-50 bg-background border p-3 rounded-full shadow-lg hover:scale-105 transition text-foreground"
      >
        <MessageCircle className="w-5 h-5" strokeWidth={2.2} />
      </button>
  
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-5 z-50 w-[340px] md:w-[400px] lg:w-[440px] max-h-[600px] bg-background border rounded-2xl shadow-2xl flex flex-col overflow-hidden text-base md:text-[1.05rem]"
          >
            <div className="py-4 px-5 border-b flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10">
              <span className="w-10 h-10 flex items-center justify-center">{VADARBUDDY_AVATAR}</span>
              <span className="text-lg md:text-xl font-bold text-green-400 tracking-wide">VadarBuddy</span>
            </div>
  
            <div className="flex-1 p-4 space-y-3 overflow-y-auto">
              {/* Animated welcome message */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                  className="text-center text-base md:text-lg font-semibold text-primary mb-3"
                >
                  👋 Welcome! I&apos;m VadarBuddy. Try a quick reply or ask me anything!
                </motion.div>
              )}
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-end gap-2 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && <span className="text-xl md:text-2xl">{BOT_AVATAR}</span>}
                  <motion.div
                    className={`max-w-[80%] px-5 py-3 rounded-2xl text-base md:text-[1.05rem] break-words whitespace-pre-wrap shadow-lg ${
                      msg.sender === "user"
                        ? "bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-pink-500 text-white"
                        : "bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-600 text-white"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {msg.text === "__steam_profile__" ? (
                      <>
                        🎮 I&apos;m deep into AAA games — Red Dead Redemption, Assassin&apos;s Creed, God of War, you name it. On PS5 and PC both.
                        <div className="mt-3">
                          <a
                            href="https://steamcommunity.com/id/gamevader"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-3 py-1 rounded transition"
                          >
                            View Steam Profile
                          </a>
                        </div>
                      </>
                    ) : (
                      <>
                        {msg.text}
                        {msg.isResume && (
                          <div className="mt-3">
                            <a
                              href="/resume.pdf"
                              download
                              className="inline-block bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-3 py-1 rounded transition"
                            >
                              Download Resume
                            </a>
                          </div>
                        )}
                      </>
                    )}
                  </motion.div>
                  {msg.sender === "user" && <span className="text-xl md:text-2xl">{USER_AVATAR}</span>}
                </motion.div>
              ))}
  
              {isTyping && (
                <div className="text-base text-muted-foreground flex items-center gap-2 mt-2">
                  <span className="text-xl md:text-2xl">{BOT_AVATAR}</span>
                  <span className="flex gap-1">
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                  </span>
                  <span className="ml-1">VadarBuddy is typing...</span>
                </div>
              )}
              <div ref={endRef} />
            </div>
  
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex p-3 border-t gap-2 bg-background"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me..."
                className="h-10 text-base md:text-[1.05rem]"
              />
              <Button type="submit" size="sm">
                <Send className="w-4 h-4" />
              </Button>
            </form>
  
            {/* Quick Reply Buttons */}
            <div className="flex flex-wrap gap-3 mt-3 mb-2 justify-center">
              {[
                { label: "Show my projects", value: "Show my projects" },
                { label: "Download resume", value: "resume" },
                { label: "Tell me a joke", value: "joke" },
                { label: "What tech do you use?", value: "tech" },
              ].map((btn) => (
                <Button
                  key={btn.value}
                  size="sm"
                  variant="secondary"
                  className="rounded-full px-4 py-2 text-xs md:text-sm shadow"
                  onClick={() => {
                    setInput(btn.value);
                    setTimeout(handleSend, 100);
                  }}
                >
                  {btn.label}
                </Button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );  
}
