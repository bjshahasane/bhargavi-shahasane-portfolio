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
            Order-Driven Production System
          </motion.h1>

          <p className="mt-4 max-w-2xl mx-auto text-slate-300">
            A production management system designed to track order-driven production requirements and provide real-time visibility into what needs to be made.
            The system centralizes order updates, aggregates production data, and delivers business insights through profit, expense tracking, and analytics dashboards.
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
             <a 
            href="https://github.com/bjshahasane/my-business-tracker-app"
              target="_blank"              
              rel="noopener noreferrer"
            className="rounded-xl border border-white/10 px-5 py-2 text-sm hover:bg-white/10 transition">
              View Code
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
            <p className="mt-3 text-sm text-slate-300">
              In many small-scale operations, production planning is done manually or spread across multiple tools.
            </p>

            <ul className="mt-4 list-disc pl-5 space-y-2 text-sm text-slate-300">
              <li>No clear view of how much of each product needs to be produced</li>
              <li>Errors when orders are edited or updated</li>
              <li>Duplicate or missed production entries</li>
              <li>Lack of coordination between order handling and production planning</li>
              <li>No structured way to analyze profit, expenses, or trends</li>
            </ul>

            <p className="mt-4 text-sm text-slate-300">
              As order volume increases, these issues create confusion, inefficiency, and poor decision-making.
            </p>
          </Card>
          <Card title="Solution">
            <p className="mt-3 text-sm text-slate-300">
              Built a centralized system that directly connects orders to production requirements, ensuring that all production data is derived from actual orders.
            </p>

            <ul className="mt-4 list-disc pl-5 space-y-2 text-sm text-slate-300">
              <li>Orders automatically define what needs to be produced</li>
              <li>Editing orders instantly updates production requirements</li>
              <li>Aggregated view of total items to be made</li>
              <li>Centralized interface for managing all updates</li>
              <li>Integrated expense and profit tracking</li>
              <li>Visual dashboards for analyzing trends</li>
            </ul>

            <p className="mt-4 text-sm text-slate-300">
              This approach eliminates manual tracking and ensures consistency across operations and analytics.
            </p>
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
                title: "Data Aggregation Logic",
                desc: "Combined multiple orders to calculate total production requirements per product, ensuring an accurate view of pending workload.",
              },
              {
                title: "State Synchronization",
                desc: "Ensured that any updates to orders (add/edit/delete) are immediately reflected in production data without inconsistencies.",
              },
              {
                title: "Centralized Update Flow",
                desc: "Designed the system so all updates are handled from a single interface, avoiding conflicting or duplicate data changes.",
              },
              {
                title: "Financial Data Integration",
                desc: "Integrated expense tracking and profit/loss calculation based on order data to connect operations with business insights.",
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
            <li>Create multiple orders with different products</li>
            <li>Edit an order and observe how production requirements update</li>
            <li>Add expenses and track profit or loss</li>
            <li>Explore charts to analyze trends over time</li>
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
      <div className="mt-3 text-sm text-slate-300">{children}</div>
    </div>
  );
};