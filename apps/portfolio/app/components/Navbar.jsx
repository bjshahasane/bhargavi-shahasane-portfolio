"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/pages/projects" },
  { label: "AI Chat", href: "/pages/chatbot" },
  { label: "How AI Works", href: "/pages/ai-explained" },
];

const Navbar = () => {
  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="sticky top-4 z-50 mx-auto flex max-w-6xl items-center justify-between rounded-3xl border border-white/10 bg-black/40 px-6 py-4 backdrop-blur"
    >
      {/* Logo / Name */}
      <Link
        href="/"
        className="text-sm font-semibold tracking-wide text-indigo-300 hover:text-indigo-200"
      >
        Bhargavi.dev
      </Link>

      {/* Nav links */}
      <div className="flex gap-6">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="text-sm text-slate-300 hover:text-white transition"
          >
            {item.label}
          </Link>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navbar;
