"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Bot, User } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Fuse from "fuse.js";

type Option = {
  label: string;
  nextStage: string;
  link?: string;
};

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: Option[];
};

const STAGES: Record<string, { text: string; options: Option[] }> = {
  stage1: {
    text: "Hello! Welcome to Aroh IT Solutions. How can we help you today?",
    options: [
      { label: "Explore Services", nextStage: "services" },
      { label: "View Portfolio", nextStage: "portfolio" },
      { label: "Pricing & Quotes", nextStage: "pricing" },
      { label: "Contact a Human", nextStage: "contact" },
    ],
  },
  services: {
    text: "We specialize in modern digital solutions. What are you looking to build?",
    options: [
      { label: "Web Development", nextStage: "services_web" },
      { label: "E-Commerce", nextStage: "services_ecom" },
      { label: "SEO & Marketing", nextStage: "services_seo" },
      { label: "Back to Main Menu", nextStage: "stage1" },
    ],
  },
  services_web: {
    text: "We build fast, responsive, and stunning custom websites. Let's discuss your vision!",
    options: [
      { label: "Go to Contact Form", nextStage: "end", link: "/contact" },
      { label: "Back to Main Menu", nextStage: "stage1" },
    ],
  },
  services_ecom: {
    text: "We create secure and scalable online stores tailored for conversions. Ready to start selling?",
    options: [
      { label: "Go to Contact Form", nextStage: "end", link: "/contact" },
      { label: "Back to Main Menu", nextStage: "stage1" },
    ],
  },
  services_seo: {
    text: "We help you rank higher on Google and drive organic traffic to your business.",
    options: [
      { label: "Go to Contact Form", nextStage: "end", link: "/contact" },
      { label: "Back to Main Menu", nextStage: "stage1" },
    ],
  },
  portfolio: {
    text: "We have built beautiful platforms like Fleurvine and Le Petale d'Or. Would you like to see our recent work?",
    options: [
      { label: "Open Portfolio Page", nextStage: "end", link: "/portfolio" },
      { label: "Back to Main Menu", nextStage: "stage1" },
    ],
  },
  pricing: {
    text: "Every project is unique, but we offer highly competitive rates tailored to your business. Which service do you need an estimate for?",
    options: [
      { label: "Web Development Quote", nextStage: "pricing_web" },
      { label: "E-Commerce Quote", nextStage: "pricing_ecom" },
      { label: "SEO Quote", nextStage: "pricing_seo" },
      { label: "Back to Main Menu", nextStage: "stage1" },
    ],
  },
  pricing_web: {
    text: "Great! Tell us a bit about your website needs and we will prepare a custom quote.",
    options: [
      { label: "Go to Contact Form", nextStage: "end", link: "/contact" },
      { label: "Back to Main Menu", nextStage: "stage1" },
    ],
  },
  pricing_ecom: {
    text: "Awesome! Let's discuss your product catalog and store requirements.",
    options: [
      { label: "Go to Contact Form", nextStage: "end", link: "/contact" },
      { label: "Back to Main Menu", nextStage: "stage1" },
    ],
  },
  pricing_seo: {
    text: "Perfect! We can audit your current site and provide a custom SEO strategy.",
    options: [
      { label: "Go to Contact Form", nextStage: "end", link: "/contact" },
      { label: "Back to Main Menu", nextStage: "stage1" },
    ],
  },
  contact: {
    text: "Let's get our team involved! Please fill out our brief contact form so we can discuss your project in detail.",
    options: [
      { label: "Go to Contact Form", nextStage: "end", link: "/contact" },
      { label: "Back to Main Menu", nextStage: "stage1" },
    ],
  },
};

const INTENTS = [
  { category: "services", phrases: ["what service do you offer", "web development", "ecommerce", "seo", "services", "what do you do", "can you build", "website", "design"] },
  { category: "pricing", phrases: ["pricing", "cost", "how much", "quote", "quote", "budget", "expensive", "rates", "price", "estimate"] },
  { category: "portfolio", phrases: ["portfolio", "work", "examples", "past projects", "built", "show me", "projects", "clients"] },
  { category: "contact", phrases: ["contact", "talk", "human", "phone", "email", "support", "help", "reach", "hire", "message"] },
];

const fuse = new Fuse(INTENTS, {
  keys: ["phrases"],
  includeScore: true,
  threshold: 0.4, 
});

const MAX_INTERACTIONS = 7;

const generateId = () => Date.now().toString();

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aroh_chat_history");
      if (saved) return JSON.parse(saved);
    }
    return [{
      id: "init",
      sender: "bot",
      text: STAGES.stage1.text,
      options: STAGES.stage1.options,
    }];
  });
  const [interactionCount, setInteractionCount] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("aroh_chat_count");
      if (saved) return parseInt(saved, 10);
    }
    return 0;
  });
  const [inputText, setInputText] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("aroh_chat_history", JSON.stringify(messages));
      localStorage.setItem("aroh_chat_count", interactionCount.toString());
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, interactionCount]);

  const handleOptionClick = (option: Option) => {
    if (interactionCount >= MAX_INTERACTIONS) return;

    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === prev.length - 1 ? { ...msg, options: undefined } : msg
      )
    );

    const userMsg: Message = {
      id: generateId(),
      sender: "user",
      text: option.label,
    };

    setMessages((prev) => [...prev, userMsg]);
    const newCount = interactionCount + 1;
    setInteractionCount(newCount);

    if (option.link) {
      setTimeout(() => {
        setIsOpen(false);
        router.push(option.link as string);
      }, 500);
      return;
    }

    setTimeout(() => {
      if (newCount >= MAX_INTERACTIONS) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "You have reached the free chat limit. To get detailed custom pricing or discuss your project further, please fill out our Contact Form and our team will get back to you shortly!",
            options: [{ label: "Go to Contact Form", nextStage: "end", link: "/contact" }],
          },
        ]);
        return;
      }

      const nextStage = STAGES[option.nextStage];
      if (nextStage) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: nextStage.text,
            options: nextStage.options,
          },
        ]);
      }
    }, 600);
  };

  const handleTextSubmit = () => {
    if (!inputText.trim() || interactionCount >= MAX_INTERACTIONS) return;

    const userText = inputText.trim();
    setInputText("");

    setMessages((prev) =>
      prev.map((msg, idx) =>
        idx === prev.length - 1 ? { ...msg, options: undefined } : msg
      )
    );

    const userMsg: Message = {
      id: generateId(),
      sender: "user",
      text: userText,
    };

    setMessages((prev) => [...prev, userMsg]);
    const newCount = interactionCount + 1;
    setInteractionCount(newCount);

    setTimeout(() => {
      if (newCount >= MAX_INTERACTIONS) {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            sender: "bot",
            text: "You have reached the free chat limit. To get detailed custom pricing or discuss your project further, please fill out our Contact Form and our team will get back to you shortly!",
            options: [{ label: "Go to Contact Form", nextStage: "end", link: "/contact" }],
          },
        ]);
        return;
      }

      const searchResults = fuse.search(userText);
      let nextStageKey = "stage1";
      let responseText = "I'm just a simple assistant and I didn't quite catch that. Here are some topics I can help you with:";

      if (searchResults.length > 0 && searchResults[0].score! < 0.4) {
        nextStageKey = searchResults[0].item.category;
        responseText = STAGES[nextStageKey].text;
      }

      const nextStage = STAGES[nextStageKey];
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: "bot",
          text: responseText,
          options: nextStage.options,
        },
      ]);
    }, 600);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className={cn(
              "fixed z-[100] flex flex-col bg-background shadow-2xl overflow-hidden border border-border/50",
              "inset-0 w-full h-[100dvh] rounded-none",
              "md:inset-auto md:bottom-24 md:left-1/2 md:-translate-x-1/2 md:w-[380px] md:h-[600px] md:max-h-[calc(100vh-120px)] md:rounded-2xl"
            )}
          >
            <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
              <div className="flex items-center gap-3">
                <div className="bg-background/20 p-2 rounded-full">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm">Aroh Assistant</h3>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-border rounded-full transition-colors"
                aria-label="Close Chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div
              ref={scrollRef}
              className="flex-1 overflow-y-auto p-4 space-y-6 bg-muted/20 pb-8"
            >
              {messages.map((msg, index) => (
                <div key={msg.id} className="flex flex-col gap-2">
                  <div
                    className={cn(
                      "flex max-w-[85%] items-end gap-2",
                      msg.sender === "user" ? "self-end flex-row-reverse" : "self-start"
                    )}
                  >
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center shrink-0",
                        msg.sender === "user" ? "bg-primary" : "bg-muted border border-border"
                      )}
                    >
                      {msg.sender === "user" ? (
                        <User className="w-4 h-4 text-primary-foreground" />
                      ) : (
                        <Bot className="w-4 h-4 text-foreground" />
                      )}
                    </div>
                    <div
                      className={cn(
                        "px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm",
                        msg.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-background border border-border rounded-bl-sm"
                      )}
                    >
                      {msg.text}
                    </div>
                  </div>

                  {msg.options && index === messages.length - 1 && (
                    <div className="flex flex-col gap-2 mt-2 ml-10 max-w-[85%]">
                      {msg.options.map((opt, i) => (
                        <Button
                          key={i}
                          variant="plate"
                          size="sm"
                          className="justify-start h-auto py-2 px-3 text-left w-full border-primary/20 hover:border-primary hover:bg-primary/5 whitespace-normal"
                          onClick={() => handleOptionClick(opt)}
                        >
                          {opt.label}
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 bg-background border-t border-border flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-1 bg-muted px-4 py-2.5 rounded-full text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleTextSubmit();
                }}
                disabled={interactionCount >= MAX_INTERACTIONS}
              />
              <button
                onClick={handleTextSubmit}
                disabled={!inputText.trim() || interactionCount >= MAX_INTERACTIONS}
                className="w-10 h-10 rounded-full flex items-center justify-center text-background disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
                style={{ background: "linear-gradient(180deg,var(--foreground),var(--n-800))", boxShadow: "0 1px 0 rgba(255,255,255,.5) inset" }}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-[52px] h-[52px] rounded-full flex items-center justify-center z-50 transition-[transform,box-shadow,background] duration-[180ms,250ms,250ms] hover:-translate-y-px active:translate-y-px"
        style={{ 
          background: "linear-gradient(180deg,var(--foreground),var(--n-800))", 
          boxShadow: "0 1px 0 rgba(255,255,255,.5) inset, var(--lift-2)" 
        }}
        aria-label="Toggle Chatbot"
      >
        {isOpen ? <X className="w-5 h-5 text-background" /> : <Bot className="w-5 h-5 text-background" />}
      </button>
    </>
  );
}
