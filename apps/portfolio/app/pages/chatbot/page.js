"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

const presetQuestions = [
  "Summarize Bhargavi’s strongest skills in 5 bullets.",
  "Explain the Restaurant POS project like I’m a recruiter.",
  "Which projects use MongoDB and what exactly was built?",
  "Is Bhargavi frontend-only or full-stack? Give proof from projects.",
  "What did she learn from building production tracking features?",
];

const ChatbotPage = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hi! I’m Bhargavi’s Recruiter AI. Ask anything about skills, projects, or experience — I’ll answer from her portfolio knowledge base.",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const listRef = useRef(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      if (!listRef.current) return;
      listRef.current.scrollTop = listRef.current.scrollHeight;
    });
  };

  const sendMessage = async (text) => {
    const trimmed = (text ?? "").trim();
    if (!trimmed || loading) return;

    setMessages((prev) => [...prev, { role: "user", content: trimmed }]);
    setInput("");
    setLoading(true);
    scrollToBottom();

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: trimmed }),
    });

    const data = await res.json();

    console.log("API response:", data);

    setMessages((prev) => [
      ...prev,
      {
        role: "assistant",
        content: data.answer || "Sorry, I couldn’t generate a response.",
      },
    ]);

    setLoading(false);
    scrollToBottom();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const headerDate = useMemo(() => {
    const now = new Date();
    const month = now.toLocaleString("en-US", { month: "long" });
    const day = String(now.getDate()).padStart(2, "0");
    const year = now.getFullYear();
    const weekday = now.toLocaleString("en-US", { weekday: "long" });
    return `${month} ${day}, ${year} • ${weekday}`;
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070A12] px-6 py-10 text-white">

      {/* background glow */}
      <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="absolute top-20 -right-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl" />

      <div className="mx-auto max-w-6xl relative z-10">

        {/* Header */}
        <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">
              {headerDate}
            </p>

            <h1 className="mt-2 text-4xl font-bold text-indigo-300">
              Recruiter AI Desk
            </h1>

            <p className="mt-2 max-w-xl text-sm text-slate-300">
              Ask questions about Bhargavi’s skills, projects, and experience.
            </p>

            {/* gradient divider */}
            <div className="mt-4 h-[2px] w-48 bg-gradient-to-r from-indigo-400 via-fuchsia-500 to-cyan-400" />
          </div>

          <Link
            href="/"
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2 text-sm hover:bg-white/10"
          >
            ← Back to Home
          </Link>
        </header>

        {/* stats */}
        <div className="mt-8 grid gap-4 md:grid-cols-4">
          <MiniStat label="Experience" value="3+ years" />
          <MiniStat label="Core Stack" value="React + Next.js" />
          <MiniStat label="Full-stack" value="Node + MongoDB" />
          <MiniStat label="Strength" value="UI + CRUD" />
        </div>

        {/* main section */}
        <section className="mt-10 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">

          {/* presets */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">

            <h2 className="text-sm font-semibold text-slate-200">
              Wanna Chat?
            </h2>

            <p className="mt-2 text-sm text-slate-300">
              Click a question to instantly ask.
            </p>

            <div className="mt-5 grid gap-3">
              {presetQuestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-left text-sm text-slate-200 hover:bg-black/30 transition"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          {/* chat */}
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">

            <div className="flex justify-between items-center">
              <h2 className="text-sm font-semibold text-slate-200">
                Conversation
              </h2>

              <span className="text-xs text-slate-400">
                {loading ? "Thinking…" : "Ready"}
              </span>
            </div>

            {/* messages */}
            <div
              ref={listRef}
              className="mt-4 h-[420px] overflow-y-auto rounded-2xl border border-white/10 bg-black/20 p-4 space-y-3"
            >
              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"
                    }`}
                >
                  <div className={`prose max-w-[80%] rounded-2xl px-4 py-3 text-sm ${m.role === "user" ? "bg-indigo-500 text-white" : "bg-white/5 border border-white/10 text-slate-200"
                    }`}>
                    <ReactMarkdown>{m.content}</ReactMarkdown>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* input */}
            <form onSubmit={onSubmit} className="mt-4 flex gap-3">

              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about skills, projects..."
                className="w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:border-indigo-400"
              />

              <button
                type="submit"
                disabled={loading}
                className="rounded-2xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 px-6 py-3 text-sm font-medium hover:opacity-90 disabled:opacity-50"
              >
                Send
              </button>

            </form>
          </div>

        </section>
      </div>
    </main>
  );
};

const MiniStat = ({ label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
    <p className="text-xs text-slate-400">{label}</p>
    <p className="mt-1 text-sm font-semibold text-slate-200">{value}</p>
  </div>
);

export default ChatbotPage;