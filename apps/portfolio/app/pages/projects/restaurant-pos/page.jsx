"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Timeline from "@/app/components/Timline";
// import {Card} from "@/app/components/UI";
import { posSteps } from "@/app/data/timeline-data";
import Image from "next/image";

const screens = [
  { title: "Login Screen", src: "/pos/login.png" },
  { title: "Tables Dashboard", src: "/pos/dashboard.png" },
  { title: "Orders Dashboard", src: "/pos/orders.png" },
  { title: "Menu Management", src: "/pos/menu.png" },
  { title: "Order Edit Modal", src: "/pos/edit.png" },
];

const highlights = [
  "Real-time order tracking",
  "Centralized production queue",
  "Role-based access",
  "Optimized UI workflows",
];

const RestaurantPOSPage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070A12] px-6 py-14 text-white">

      {/* Background Glow */}
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
            Restaurant POS System
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-slate-300"
          >
            A full-stack Restaurant POS system built to streamline order management, automate billing, and maintain real-time consistency between orders and production.
            The system reduces manual errors, improves operational visibility, and provides a structured workflow for handling restaurant operations end-to-end.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 flex justify-center gap-4"
          >
            <a
              href={process.env.NEXT_PUBLIC_POS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-white/10 border border-white/20 px-5 py-2 text-sm hover:bg-white/20 transition"
            >
              Live Demo
            </a>

            <a className="rounded-xl border border-white/10 px-5 py-2 text-sm hover:bg-white/10 transition">
              View Code
            </a>
          </motion.div>
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
            <div className="space-y-4">
              <p className="mt-3 text-sm text-slate-300">
                Most restaurants rely on manual or semi-digital systems where orders, billing,
                and production are handled separately.
              </p>

              <ul className="mt-4 list-disc pl-5 space-y-2 text-sm text-slate-300">
                <li>Incorrect orders due to manual entry errors</li>
                <li>Billing mismatches and calculation mistakes</li>
                <li>No real-time visibility of active orders</li>
                <li>Difficulty tracking table occupancy and order status</li>
                <li>Lack of synchronization between order-taking and kitchen preparation</li>
              </ul>

              <p className="mt-4 text-sm text-slate-300">
                As the number of orders increases, these inefficiencies directly impact speed,
                accuracy, and overall customer experience.
              </p>
            </div>


          </Card>

          <Card title="Solution">
            <div className="space-y-4">
              <p className="mt-3 text-sm text-slate-300">
                Built a centralized POS system that manages the entire order lifecycle — from order creation
                to fulfillment — within a single interface.
              </p>

              <ul className="mt-4 list-disc pl-5 space-y-2 text-sm text-slate-300">
                <li>Unified order and billing system</li>
                <li>Real-time updates across frontend UI and backend</li>
                <li>Automated total calculation including discounts and additional charges</li>
                <li>Table-based order tracking for better visibility</li>
                <li>Editable orders with consistent state updates</li>
              </ul>

              <p className="mt-4 text-sm text-slate-300">
                This approach ensures accurate data handling, reduces manual intervention,
                and maintains consistency across the entire system.
              </p>
            </div>

          </Card>
        </div>

        {/* SYSTEM FLOW */}
        <div className="mt-12">
          <Timeline
            title="Order Lifecycle"
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
                title: "State Synchronization",
                desc: "Ensured consistent data flow between frontend UI and backend by updating order states centrally, preventing mismatch between displayed and stored data.",
              },
              {
                title: "Derived Data Logic",
                desc: "Implemented dynamic calculations for totals, discounts, and final billing values using derived state instead of storing redundant data.",
              },
              {
                title: "API Architecture",
                desc: "Designed modular API routes using Next.js for handling CRUD operations, enabling scalable and maintainable backend logic.",
              },
              {
                title: "UI State Management",
                desc: "Managed complex UI interactions such as modals, form updates, and live calculations using structured state management patterns.",
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
            {screens.map((screen, i) => (
              <motion.div
                key={screen.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ scale: 1.03 }}
                className="rounded-2xl border border-white/10 bg-white/5 overflow-hidden"
              >
                <div className="relative aspect-[16/9]">
                  <Image
                    src={screen.src}
                    alt={screen.title}
                    fill
                    quality={100}
                    priority={i === 0}
                    className="object-contain bg-black"
                  />
                </div>

                <div className="p-4 text-sm text-slate-300">
                  {screen.title}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* TRY */}
        <div className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-slate-100">
            Try This
          </h2>

          <ul className="mt-3 text-sm text-slate-300 list-disc pl-5 space-y-2">
            <li>Create an order by selecting table</li>
            <li>Add multiple products and apply discounts</li>
            <li>Edit the order and observe real-time updates</li>
            <li>Mark the order as completed and see table status update</li>
          </ul>
        </div>

      </div>
    </main>
  );
};

export default RestaurantPOSPage;

/* Reusable Card */
const Card = ({ title, children }) => {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
      <div className="mt-3 text-sm text-slate-300">{children}</div>
    </div>
  );
};