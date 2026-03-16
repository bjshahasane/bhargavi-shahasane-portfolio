"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

// rafce style
const ProjectModal = ({ open, onClose, project }) => {
  if (!open || !project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 30 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 30 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="w-full max-w-2xl rounded-2xl bg-slate-900 p-6 text-white shadow-2xl"
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold text-indigo-400">
                {project.title}
              </h3>
              {project.oneLiner && (
                <p className="mt-2 text-sm text-slate-300">{project.oneLiner}</p>
              )}
            </div>

            <button
              onClick={onClose}
              className="rounded-xl p-2 text-slate-400 hover:bg-slate-800 hover:text-white"
              aria-label="Close"
            >
              <X size={18} />
            </button>
          </div>

          <div className="mt-6 space-y-4 text-sm text-slate-300">
            <p>
              <strong>Problem:</strong> {project.problem}
            </p>
            <p>
              <strong>Solution:</strong> {project.solution}
            </p>
            <p>
              <strong>Architecture:</strong> {project.architecture}
            </p>
            <p>
              <strong>Key Learnings:</strong> {project.learnings}
            </p>
          </div>

          {!!project.tech?.length && (
            <div className="mt-6 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-slate-800 px-3 py-1 text-xs"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
