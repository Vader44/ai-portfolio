"use client";

import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const BOT_AVATAR = "🤖";
const USER_AVATAR = "🧑‍💻";

const responses: Record<string, string> = {
  who: "I'm YashBot — your friendly dev assistant built for this portfolio!",
  tech: "🛠 I love working with React, Angular, Tailwind, and a little Framer spice ✨",
  game: "🎮 I’m deep into AAA games — Red Dead Redemption, Assassin’s Creed, God of War, you name it. On PS5 and PC both. And yes... my Steam profile speaks for itself: https://steamcommunity.com/id/gamevader",
  joke: "Why do programmers hate nature? Too many bugs! 🐛",
  story:
    "This portfolio was built to showcase my love for UI, motion, and code that feels good.",
  sudo: "🟢 Booting root shell... Matrix stream online... 💻",
  hack: "🟢 Breaching mainframe... Displaying source code... 👾",
  song: "🎵 Twinkle twinkle little div, how I wonder what you did...",
  css: "😭 Please... not the CSS... anything but the CSS...",
  project:
    "🧪 This portfolio? It's my playground for motion, interaction, and vibes.",
  hobbies:
    "🧩 Besides coding? I sketch interfaces, tweak animations, and sometimes rage at Valorant.",
  skills:
    "🧰 React, Angular, TypeScript, Tailwind, Framer Motion, and a little backend mischief.",
  good: "📈 I'm learning fast — faster than npm can deprecate a package!",
  why: "🚀 To showcase not just my code, but how I think about UI and motion.",
  color: "🎨 Probably a deep cyberpunk purple. Or classic #0f0.",
  fav: "🎮 Valorant lately. But I respect old-school Counter Strike and Portal.",
  "npm install":
    "📦 Installing... 17,394 packages with 12 vulnerabilities. Please wait... 😂",
};

const fallbackReplies = [
  "🤔 Hmm... that's a good one. Try asking about tech, games, or who I am!",
  "🧠 Not sure how to respond... but I love dev chat and memes!",
  "😅 You got me! Ask 'what tech do you use?' or 'tell me a joke'.",
  "👾 That stumped me! I'm smarter with questions about dev stuff.",
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<
    { sender: "bot" | "user"; text: string }[]
  >([{ sender: "bot", text: "Hi! I'm YashBot. Ask me anything 👇" }]);

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function triggerMatrixMode() {
    const existing = document.querySelector(".matrix-terminal-overlay");
    if (existing) return;

    const overlay = document.createElement("div");
    overlay.className = "matrix-terminal-overlay";
    overlay.innerText = `$ sudo run matrix\naccess_granted ✅\ninitializing...`;
    document.body.appendChild(overlay);

    setTimeout(() => {
      overlay.remove();
    }, 3000);
  }

  function stopMatrixMode() {
    document.body.classList.remove("matrix-mode");

    const label = document.querySelector(".matrix-floating-label");
    if (label) label.remove();
  }

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user" as const, text: input.trim() };
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const lower = input.toLowerCase();
      let botText = "";

      if (lower.includes("sudo")) {
        triggerMatrixMode();
        setTimeout(stopMatrixMode, 3000);
        botText = "🟢 Matrix system booted... briefly.";
      } else {
        const match = Object.entries(responses).find(([key]) =>
          lower.includes(key)
        );

        botText = match
          ? match[1]
          : fallbackReplies[Math.floor(Math.random() * fallbackReplies.length)];
      }

      setMessages((prev) => [...prev, { sender: "bot", text: botText }]);
      setIsTyping(false);
    }, 1500);

    setInput("");
  };

  return (
    <>
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
            className="fixed bottom-20 right-5 z-50 w-[320px] max-h-[500px] bg-background border rounded-xl shadow-xl flex flex-col overflow-hidden"
          >
            <div className="p-3 border-b text-sm font-bold text-center text-green-500">
              YashBot 🤖
            </div>

            <div className="flex-1 p-3 space-y-2 overflow-y-auto">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex items-start gap-2 ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.sender === "bot" && <span>{BOT_AVATAR}</span>}
                  <div
                    className={`max-w-[80%] px-3 py-2 rounded-xl text-sm break-words ${
                      msg.sender === "user"
                        ? "bg-accent text-accent-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.sender === "user" && <span>{USER_AVATAR}</span>}
                </motion.div>
              ))}

              {isTyping && (
                <div className="text-sm text-muted-foreground flex items-center gap-2">
                  <span>{BOT_AVATAR}</span>
                  <span className="animate-pulse">YashBot is typing...</span>
                </div>
              )}
              <div ref={endRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex p-2 border-t gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me..."
                className="h-9"
              />
              <Button type="submit" size="sm">
                <Send className="w-4 h-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
