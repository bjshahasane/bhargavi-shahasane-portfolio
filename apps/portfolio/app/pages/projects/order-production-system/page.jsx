"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const screens = [
  {
    title: "Orders List + Status",
    desc: "View orders with date sorting, fulfillment state, and quick actions.",
  },
  {
    title: "Order Create / Edit Modal",
    desc: "Modal-based form with catalogue selection and editable product quantities.",
  },
  {
    title: "Pending Products Dashboard",
    desc: "Centralized production queue showing pending quantities per product type.",
  },
  {
    title: "Complete Quantity Update Flow",
    desc: "Update completed quantities from one place to keep production tracking consistent.",
  },
  {
    title: "Analytics / Charts",
    desc: "Visualize orders and product trends (monthly/weekly/yearly filters).",
  },
  {
    title: "Production Consistency Checks",
    desc: "Ensures pending quantities recalculate correctly when orders are edited or fulfilled.",
  },
];

const ProductionManagementPage = () => {
  return (
    <main className="min-h-screen bg-[#070A12] px-6 py-14 text-white">
      <div className="mx-auto max-w-6xl">
        <Link href="/" className="text-sm text-slate-300 hover:text-white">
          ← Back to Home
        </Link>

        <header className="mt-6">
          <p className="text-xs uppercase tracking-widest text-slate-400">
            Project Case Study
          </p>
          <h1 className="mt-3 text-4xl font-bold text-indigo-300">
            Order & Production Management System
          </h1>
          <p className="mt-4 max-w-3xl text-slate-300">
            A business-first system that tracks orders and maintains a centralized
            production queue (pending vs completed quantities) with dashboards and
            analytics — designed to avoid mismatches caused by manual tracking.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            {[
              "Next.js",
              "MongoDB",
              "Node.js API Routes",
              "Modal-based UI",
              "Production Queue",
              "Charts",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
              >
                {t}
              </span>
            ))}
          </div>
        </header>

        <Section title="Problem Statement">
          Many small businesses track production manually (WhatsApp notes / paper /
          spreadsheets). When orders are edited, canceled, or fulfilled, the
          production quantities often become inconsistent. This causes delayed
          delivery, wrong stock estimation, and confusion about what needs to be
          produced next.
        </Section>

        <Section title="Solution">
          I built a centralized order + production tracking system. Orders can be
          created/edited via a modal-based UI, and the system maintains a single
          production queue per product type. Pending quantities update
          automatically based on orders, and completed quantities are updated from
          one dedicated page to keep the workflow controlled and consistent.
        </Section>

        <Section title="Core Features">
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
            <li>
              <strong>Orders CRUD</strong> with sorting (recent first) and
              fulfillment status.
            </li>
            <li>
              <strong>Modal-based order editing</strong> (catalogue selection +
              editable quantities).
            </li>
            <li>
              <strong>Centralized production queue</strong> that tracks pending and
              completed quantities for each product type.
            </li>
            <li>
              <strong>Consistency logic</strong> to recalculate pending quantities
              when orders are updated or fulfilled.
            </li>
            <li>
              <strong>Dashboards & charts</strong> to visualize orders and product
              trends (monthly/weekly/yearly filters).
            </li>
          </ul>
        </Section>

        <Section title="Architecture & Data Model">
          <div className="space-y-4 text-sm text-slate-300">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="font-semibold text-slate-200">Frontend</p>
              <p className="mt-1">
                Next.js pages with a modal-based workflow for order create/edit,
                and dashboard components for analytics.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="font-semibold text-slate-200">Backend</p>
              <p className="mt-1">
                Node.js API routes (POST/GET/PUT/DELETE) managing orders and
                production queue updates.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
              <p className="font-semibold text-slate-200">Database</p>
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>
                  <strong>orders</strong>: customer info, date, products[],
                  shipping/discount totals, fulfillment status
                </li>
                <li>
                  <strong>productionQueue</strong>: productType, pendingQuantity,
                  completedQuantity (single entry per product type)
                </li>
              </ul>
            </div>
          </div>
        </Section>

        <Section title="What I Learned (Recruiter Highlights)">
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-300">
            <li>
              Designing data structures that stay consistent during edits and
              status changes.
            </li>
            <li>
              Building a scalable workflow: centralized queue instead of scattered
              tracking.
            </li>
            <li>
              Handling complex UI state in a modal form while keeping it reliable.
            </li>
            <li>
              Creating dashboard UX that shows “what to do next” (pending products)
              and “what happened” (analytics).
            </li>
          </ul>
        </Section>

        {/* Screens */}
        <section className="mt-12">
          <h2 className="text-xl font-semibold text-indigo-300">
            Application Screens
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            These are the key screens recruiters care about. You can replace the
            placeholders with real screenshots later.
          </p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {screens.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="mb-3 flex h-44 items-center justify-center rounded-xl bg-gradient-to-br from-slate-700 to-slate-800 text-sm text-slate-400">
                  Screenshot Placeholder
                </div>
                <p className="text-sm font-semibold text-slate-100">{s.title}</p>
                <p className="mt-1 text-xs text-slate-300">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Links (optional) */}
        <section className="mt-12 rounded-3xl border border-white/10 bg-white/5 p-6">
          <h2 className="text-lg font-semibold text-slate-100">Links</h2>
          <p className="mt-2 text-sm text-slate-300">
            Add GitHub / Live Demo links here when ready.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="rounded-2xl border border-white/10 bg-black/20 px-5 py-2 text-sm text-slate-200 hover:bg-black/30"
            >
              GitHub (add link)
            </a>
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="rounded-2xl bg-indigo-500 px-5 py-2 text-sm font-medium hover:bg-indigo-600"
            >
              Live Demo (add link)
            </a>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProductionManagementPage;

const Section = ({ title, children }) => {
  return (
    <section className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
      <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
      <div className="mt-3 text-sm leading-relaxed text-slate-300">{children}</div>
    </section>
  );
};

