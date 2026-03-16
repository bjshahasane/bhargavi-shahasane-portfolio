"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const projects = [
  {
    title: "Restaurant POS System",
    oneLiner:
      "Full-stack POS to manage orders, tables, menu and billing with role-based access.",
    href: "/projects/restaurant-pos",
    liveUrl: process.env.WEB_POS_POS_URL,
    tags: ["Next.js", "MongoDB", "Node.js", "Redux"],
  },
  {
    title: "Order & Production Management System",
    oneLiner:
      "Centralized production queue (pending/completed) with dashboards and analytics.",
    href: "/projects/production-management",
    liveUrl: process.env.WEB_POS_PROD_URL,
    tags: ["Next.js", "MongoDB", "Dashboards", "Charts"],
  },
];

const ProjectsPage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070A12] px-6 py-14 text-white">
      {/* Color blobs */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-fuchsia-500/25 blur-3xl" />
      <div className="pointer-events-none absolute top-20 -right-24 h-80 w-80 rounded-full bg-cyan-500/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl" />

      <div className="mx-auto max-w-6xl">
        <header className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-widest text-slate-400">
            Case Studies
          </p>
          <h1 className="mt-3 text-4xl font-bold text-indigo-300">
            Projects
          </h1>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Deep-dive pages with problem statement, solution, architecture, and UI snapshots.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block rounded-2xl border border-white/10 bg-black/20 px-5 py-2 text-sm hover:bg-black/30"
          >
            ← Back to Home
          </Link>
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 hover:bg-white/10"
            >
              <div className="mb-4 h-[2px] w-full rounded-full bg-gradient-to-r from-amber-400 via-fuchsia-500 to-cyan-400 opacity-80" />

              <h2 className="text-xl font-semibold text-slate-100">{p.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{p.oneLiner}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <Link
                  href={p.href}
                  className="flex-1 text-center rounded-2xl bg-indigo-500 px-4 py-2 text-sm font-medium hover:bg-indigo-600"
                >
                  Case Study
                </Link>

                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-sm hover:bg-black/30"
                >
                  Live Demo
                </a>

              </div>
            </motion.div>
          ))}
        </section>
      </div>
    </main>
  );
};

export default ProjectsPage;
