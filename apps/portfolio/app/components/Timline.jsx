"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

const Timeline = ({ steps }) => {
  const containerRef = useRef(null);
  const [dragWidth, setDragWidth] = useState(0);

  useEffect(() => {
    const scrollWidth = containerRef.current.scrollWidth;
    const offsetWidth = containerRef.current.offsetWidth;

    setDragWidth(scrollWidth - offsetWidth);
  }, []);

  return (
    <div className="relative mt-10 overflow-hidden">

      {/* LEFT GRADIENT */}
      <div className="absolute left-0 top-0 h-full w-16 bg-gradient-to-r from-[#070A12] to-transparent z-10 pointer-events-none" />

      {/* RIGHT GRADIENT */}
      <div className="absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-[#070A12] to-transparent z-10 pointer-events-none" />\

      <motion.div
        ref={containerRef}
        drag="x"
        dragConstraints={{ left: -dragWidth, right: 0 }}
        dragElastic={0.08}
        className="flex gap-6 cursor-grab active:cursor-grabbing"
      >
        {steps.map((step, i) => (
          <div
            key={i}
            className="min-w-[300px] shrink-0 rounded-2xl border border-white/10 bg-white/5 p-5"
          >
            <p className="text-xs text-indigo-300">Step {i + 1}</p>

            <h3 className="text-sm font-semibold text-white mt-2">
              {step.title}
            </h3>

            <p className="text-xs text-slate-400 mt-2">
              {step.desc}
            </p>

            {step.highlight && (
              <p className="text-[11px] text-indigo-300 mt-3">
                {step.highlight}
              </p>
            )}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Timeline;