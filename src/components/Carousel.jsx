"use client";

import { motion, AnimatePresence } from "framer-motion";
import { forwardRef, useState } from "react";

// Puedes reemplazar esto con tus proyectos reales
const projects = [
  { id: 1, color: "#85282b", name: "Proyecto Uno" },
  { id: 2, color: "#E8D4B1", name: "Proyecto Dos" },
  { id: 3, color: "#000000", name: "Proyecto Tres" },
];

export default function ProjectCarousel() {
  const [selected, setSelected] = useState(0);
  const [direction, setDirection] = useState(1);

  function slide(dir) {
    setDirection(dir);
    setSelected((prev) => (prev + dir + projects.length) % projects.length);
  }

  const current = projects[selected];
  const bgColor = current.color;

  return (
    <div className="flex items-center justify-center gap-4 py-8">
      <motion.button
        onClick={() => slide(-1)}
        animate={{ backgroundColor: bgColor }}
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 rounded-full flex items-center justify-center text-white"
      >
        <ArrowLeft />
      </motion.button>

      <div className="relative w-300 h-150 flex items-center justify-center overflow-hidden">
        <AnimatePresence custom={direction} initial={false} mode="popLayout">
          <Slide
            key={current.id}
            direction={direction}
            color={bgColor}
            name={current.name}
          />
        </AnimatePresence>
      </div>

      <motion.button
        onClick={() => slide(1)}
        animate={{ backgroundColor: bgColor }}
        whileTap={{ scale: 0.9 }}
        className="w-10 h-10 rounded-full flex items-center justify-center text-white"
      >
        <ArrowRight />
      </motion.button>
    </div>
  );
}

const Slide = forwardRef(function Slide({ color, name, direction }, ref) {
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: direction * 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: direction * -50 }}
      transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
      className="absolute w-300 h-150 rounded-xl flex items-center justify-center text-white text-lg font-semibold shadow-md"
      style={{ backgroundColor: color }}
    >
      {name}
    </motion.div>
  );
});

// Icons
function ArrowLeft() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M15 18l-6-6 6-6" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M9 6l6 6-6 6" />
    </svg>
  );
}
