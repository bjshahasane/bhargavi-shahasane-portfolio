"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const screens = [
  "Login Screen",
  "Orders Dashboard",
  "Menu Management",
  "Order Edit Modal",
];

const RestaurantPOSPage = () => {
  return (
    <main className="min-h-screen bg-[#070A12] px-6 py-14 text-white">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/"
          className="text-sm text-slate-300 hover:text-white"
        >
          ← Back to Home
        </Link>

        <h1 className="mt-6 text-4xl font-bold text-indigo-300">
          Restaurant POS System
        </h1>
        <p className="mt-4 max-w-3xl text-slate-300">
          A full-stack Point of Sale system built to manage orders, tables,
          menu items, and billing with role-based access.
        </p>

        {/* Problem */}
        <Section title="Problem Statement">
          Restaurants often rely on manual order handling, leading to billing
          mistakes, order mismatches, and no real-time visibility.
        </Section>

        {/* Solution */}
        <Section title="Solution">
          I built a POS system that centralizes orders, menu, tables, and billing
          into a single interface with role-based authentication.
        </Section>

        {/* Architecture */}
        <Section title="Architecture & Tech">
          <ul className="list-disc pl-5">
            <li>Next.js frontend (App Router)</li>
            <li>Node.js API routes</li>
            <li>MongoDB for orders, menu, users</li>
            <li>Redux for complex state handling</li>
          </ul>
        </Section>

        {/* Screens */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-indigo-300">
            Application Screens
          </h2>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {screens.map((screen, i) => (
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="mb-3 h-40 rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center text-slate-400 text-sm">
                  Screenshot Placeholder
                </div>
                <p className="text-sm text-slate-300">{screen}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default RestaurantPOSPage;

const Section = ({ title, children }) => {
  return (
    <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
      <div className="mt-3 text-sm text-slate-300">{children}</div>
    </section>
  );
};
