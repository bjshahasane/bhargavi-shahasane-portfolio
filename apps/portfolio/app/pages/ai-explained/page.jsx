"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const steps = [
  {
    title: "1. Knowledge Base",
    color: "from-amber-400 to-orange-500",
    description:
      "All information about my experience and projects is written in a curated document (resume + project summaries). This prevents hallucinations and keeps answers factual.",
  },
  {
    title: "2. Document Chunking",
    color: "from-pink-400 to-fuchsia-500",
    description:
      "The document is split into small, overlapping chunks so the AI can search relevant sections instead of scanning everything at once.",
  },
  {
    title: "3. Semantic Search",
    color: "from-indigo-400 to-blue-500",
    description:
      "When a recruiter asks a question, the system converts it into embeddings and finds the most relevant chunks using similarity matching.",
  },
  {
    title: "4. Context Injection",
    color: "from-cyan-400 to-teal-500",
    description:
      "Only the most relevant chunks are sent to the language model as context — not the entire document.",
  },
  {
    title: "5. Controlled Answer Generation",
    color: "from-emerald-400 to-green-500",
    description:
      "The AI is instructed to answer only from provided context. If the answer is missing, it clearly says it does not know.",
  },
];

const AiExplainedPage = () => {
  return (
    <main className="relative min-h-screen bg-[#070A12] px-6 py-14 text-white">
      <div className="mx-auto max-w-6xl">
        <header className="mb-16">
          <p className="text-xs uppercase tracking-widest text-slate-400">
            Architecture Overview
          </p>
          <h1 className="mt-3 text-4xl font-bold text-indigo-300">
            How This AI Works
          </h1>
          <p className="mt-4 max-w-3xl text-slate-300">
            This chatbot is not a generic AI. It is a Retrieval-Augmented
            Generation (RAG) system designed to explain my skills and projects
            accurately to recruiters.
          </p>

          <Link
            href="/pages/chatbot"
            className="mt-6 inline-block rounded-2xl border border-white/10 bg-white/5 px-5 py-2 text-sm hover:bg-white/10"
          >
            ← Back to Chatbot
          </Link>
        </header>

        <section className="grid gap-8 md:grid-cols-2">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="relative rounded-3xl border border-white/10 bg-white/5 p-6"
            >
              <div
                className={`mb-4 h-1 w-full rounded-full bg-gradient-to-r ${step.color}`}
              />
              <h3 className="text-lg font-semibold text-slate-100">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                {step.description}
              </p>
            </motion.div>
          ))}
        </section>

        <section className="mt-16 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h2 className="text-xl font-semibold text-indigo-300">
            Why This Matters
          </h2>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-300">
            <li>No hallucinated skills or fake experience</li>
            <li>Answers are grounded in real projects</li>
            <li>Recruiters can explore skills conversationally</li>
            <li>Demonstrates real-world AI system design</li>
          </ul>
        </section>
      </div>
    </main>
  );
};

export default AiExplainedPage;
