"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import ProjectModal from "./components/ProjectModal";
import { projects } from "./data/projects";
import Link from "next/link";
import PageTransition from "./components/PageTransitions";
import Navbar from "./components/Navbar";

const headlineWords = [
  "Scalable",
  "Interactive",
  "Responsive",
  "Dynamic",
  "Elegant",
  "Performant",
  "Accessible",
];

const HomePage = () => {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <PageTransition>
      <main className="relative min-h-screen overflow-hidden bg-[#070A12] text-white">

        {/* Background glow blobs */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-fuchsia-500/20 blur-3xl" />
        <div className="pointer-events-none absolute top-20 -right-24 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl" />

        <TopNav />
        <NewspaperHero />
        <ProjectsSection onOpen={(p) => setSelectedProject(p)} />

        <ProjectModal
          open={!!selectedProject}
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />

        <Footer />
      </main>
    </PageTransition>
  );
};

export default HomePage;

const TopNav = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070A12]/70 backdrop-blur">
      <Navbar />
    </header>
  );
};

const NewspaperHero = () => {
  return (
    <section className="px-6 pb-10 pt-14">
      <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">

        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-slate-200"
          >
            <Sparkles size={14} className="text-indigo-300" />
            Special Edition: Frontend Dev for Hire
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 text-4xl font-bold leading-tight md:text-6xl"
          >
            <span className="block font-serif tracking-tight">
              The Dev Chronicle
            </span>
            <span className="mt-2 block text-base font-medium text-slate-300 md:text-lg">
              Est. 2021 — You design. I develop.
            </span>
          </motion.h1>

          <div className="mt-7">
            <p className="text-lg text-slate-200">Hello, I’m</p>
            <p className="mt-1 text-3xl font-semibold text-indigo-300 md:text-4xl">
              Bhargavi Shahasane
            </p>

            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-slate-300 md:text-base">
              React & Next.js developer focused on building real-world,
              business-first web apps—clean UI, strong state management,
              and reliable CRUD.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#projects"
              className="rounded-2xl bg-indigo-500 px-6 py-3 text-sm font-medium hover:bg-indigo-600"
            >
              Read the Work
            </a>

            <Link
              href="/pages/chatbot"
              className="rounded-2xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-medium hover:bg-white/10"
            >
              Ask Recruiter AI
            </Link>

            <a
              href="#contact"
              className="rounded-2xl border border-white/15 px-6 py-3 text-sm font-medium hover:bg-white/5"
            >
              Contact
            </a>
          </div>

          <Ticker />
        </div>

        <aside className="rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-widest text-slate-300">
            Frontend Snapshot
          </p>

          <div className="mt-4 grid gap-4">
            <Stat label="Focus" value="Next.js + React" />
            <Stat label="Strength" value="UI state + CRUD" />
            <Stat label="Style" value="Pixel-perfect, responsive" />
          </div>
        </aside>

      </div>
    </section>
  );
};

const Ticker = () => {
  return (
    <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
      <div className="flex items-center gap-3 border-b border-white/10 px-4 py-2">
        <span className="text-xs uppercase tracking-widest text-slate-300">
          Breaking
        </span>
        <span className="text-xs text-slate-400">
          UIs with custom web solutions
        </span>
      </div>

      <div className="relative h-10">
        <motion.div
          className="absolute left-0 flex h-10 items-center gap-6 px-4"
          animate={{ x: [0, -900] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        >
          {headlineWords.map((w) => (
            <span
              key={w}
              className="whitespace-nowrap rounded-full bg-black/20 px-3 py-1 text-sm text-slate-200"
            >
              {w}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
    <p className="text-xs text-slate-400">{label}</p>
    <p className="mt-1 text-sm font-semibold text-slate-200">{value}</p>
  </div>
);

const ProjectsSection = ({ onOpen }) => {
  return (
    <section id="projects" className="px-6 py-20">
      <div className="mx-auto max-w-6xl">

        <h2 className="mb-10 text-3xl font-bold">Featured Stories</h2>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              viewport={{ once: true }}
              className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition hover:bg-white/10 hover:shadow-[0_0_40px_rgba(99,102,241,0.25)]"
            >

              {/* gradient line */}
              <div className="mb-4 h-[2px] w-full rounded-full bg-gradient-to-r from-amber-400 via-fuchsia-500 to-cyan-400 opacity-80" />

              <h3 className="text-xl font-semibold text-slate-100">
                {project.title}
              </h3>

              <p className="mt-2 text-sm text-slate-300">
                {project.oneLiner}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-200"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-4">

                <Link
                  href={`pages/projects/${project.slug}`}
                  className="flex-1 rounded-2xl bg-indigo-500 px-4 py-2 text-center text-sm font-medium hover:bg-indigo-600 transition"
                >
                  Case Study
                </Link>

                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    className="flex-1 rounded-2xl border border-white/10 bg-black/20 px-4 py-2 text-center text-sm hover:bg-black/30 transition"
                  >
                    Live Demo
                  </a>
                )}

              </div>
            </motion.div>
          ))}
        </div>

        <div id="contact" className="mt-20 rounded-3xl border border-white/10 bg-white/5 p-8">
          <h3 className="text-xl font-semibold text-slate-200">Contact</h3>
          <p className="mt-3 text-sm text-slate-300">
            Email:{" "}
            <span className="text-indigo-300">
              bhargavi.shahasane@outlook.com
            </span>
          </p>
        </div>

      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="border-t border-white/10 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 text-sm text-slate-400 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Bhargavi Shahasane</p>
        <p className="text-xs">Version 1.0 • The Dev Chronicle</p>
      </div>
    </footer>
  );
};