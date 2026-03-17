"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Timeline from "@/app/components/Timline";
import { posSteps } from "@/app/data/timeline-data";
import Image from "next/image";

const screens = [
  {
    id: "orders",
    title: "Orders Dashboard",
    desc: "View and manage orders with status, sorting, and quick actions.",
    src: "/prod/orders.png",
  },
  {
    id: "modal",
    title: "Order Create / Edit",
    desc: "Add products, edit quantities, and calculate totals in real-time.",
    src: "/prod/edit.png",
  },
  {
    id: "pending",
    title: "Production Queue",
    desc: "Centralized pending quantities per product.",
    src: "/prod/pending.png",
  },
  {
    id: "categories",
    title: "Create / Edit Categories & Products",
    desc: "Ensures pending quantities recalculate correctly when orders are edited or fulfilled.",
    src: "/prod/categories.png",
  },

  {
    id: "expenses",
    title: "Expenses Tracking",
    desc: "Monitor and manage operational costs and expenses.",
    src: "/prod/expenses.png",
  },
  {
    id: "dashboard",
    title: "Analytics Dashboard",
    desc: "Track order trends,product performance, profits and orders visually.",
    src: "/prod/analytics.png",
  },
];

const highlights = [
  "Centralized production queue",
  "Real-time quantity sync",
  "Order-edit consistency logic",
  "Analytics dashboard",
];

const ProductionManagementPage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070A12] px-6 py-14 text-white">

      {/* Background */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-fuchsia-500/25 blur-3xl" />
      <div className="pointer-events-none absolute top-20 -right-24 h-80 w-80 rounded-full bg-cyan-500/25 blur-3xl" />
      <div className="pointer-events-none absolute bottom-10 left-1/3 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl" />

      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <Link href="/" className="text-sm text-slate-300 hover:text-white">
          ← Back to Home
        </Link>

        {/* HERO */}
        <div className="mt-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-indigo-300 via-cyan-300 to-fuchsia-300 text-transparent bg-clip-text"
          >
            Order & Production Management System
          </motion.h1>

          <p className="mt-4 max-w-2xl mx-auto text-slate-300">
            A system designed to eliminate inconsistencies in production tracking by
            centralizing order data and automating pending vs completed quantities.
          </p>

          <div className="mt-6 flex justify-center gap-4">
            <a
              href={process.env.NEXT_PUBLIC_PROD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-white/10 bg-white/5 px-5 py-2 text-sm hover:bg-white/10 transition"
            >
              Live Demo
            </a>
          </div>
        </div>

        {/* HIGHLIGHTS */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          {highlights.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300 text-center"
            >
              {item}
            </motion.div>
          ))}
        </div>

        {/* PROBLEM + SOLUTION */}
        <div className="mt-12 grid md:grid-cols-2 gap-6">
          <Card title="Problem">
            Manual tracking leads to inconsistencies when orders are edited,
            canceled, or fulfilled — resulting in incorrect production quantities.
          </Card>

          <Card title="Solution">
            Built a centralized system that automatically recalculates pending
            quantities and keeps production tracking consistent across all changes.
          </Card>
        </div>

        {/* SYSTEM FLOW */}
        <div className="mt-12">
          <Timeline
            title="System Workflow"
            steps={posSteps}
          />
        </div>

        {/* ENGINEERING */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-indigo-300">
            Engineering Highlights
          </h2>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {[
              {
                title: "Data Consistency Logic",
                desc: "Recalculates pending quantities whenever orders are updated or fulfilled.",
              },
              {
                title: "Centralized Queue Design",
                desc: "Single source of truth for production tracking per product type.",
              },
              {
                title: "Controlled Update Flow",
                desc: "Completed quantities updated from a single page to avoid conflicts.",
              },
              {
                title: "Dashboard Thinking",
                desc: "Separated ‘what to do next’ (pending) and ‘what happened’ (analytics).",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <h3 className="text-white font-medium">{item.title}</h3>
                <p className="text-sm text-slate-400 mt-2">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SCREENS */}
        <div className="mt-14">
          <h2 className="text-lg font-semibold text-indigo-300">
            Application Screens
          </h2>

          <div className="mt-6 grid md:grid-cols-2 gap-6">
            {screens.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
              >
                <div className="relative aspect-[16/9] bg-black">
                  <Image
                    src={s.src}
                    alt={s.title}
                    fill
                    quality={100}
                    className="object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <p className="text-sm font-semibold text-slate-100">
                    {s.title}
                  </p>
                  <p className="mt-1 text-xs text-slate-300">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* TRY THIS */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-slate-100">
            Try This
          </h2>

          <ul className="mt-3 text-sm text-slate-300 list-disc pl-5 space-y-2">
            <li>Create an order and add multiple products</li>
            <li>Edit the order and observe pending updates</li>
            <li>Mark as fulfilled and check completed quantities</li>
          </ul>
        </div>

      </div>
    </main>
  );
};

export default ProductionManagementPage;

/* Reusable Card */
const Card = ({ title, children }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
      <p className="mt-3 text-sm text-slate-300">{children}</p>
    </div>
  );
};