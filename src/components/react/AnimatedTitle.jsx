import React from 'react';
import { motion } from 'framer-motion';

// Variantes para el contenedor principal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14, // Retraso entre la aparición de cada bloque/línea
      delayChildren: 0.4,    // Retraso inicial
    },
  },
};

// Variantes para cada elemento de texto (H1, SPAN, H2)
const itemVariants = {
  hidden: { opacity: 0, y: 30 }, // Empieza invisible y ligeramente abajo
  visible: {
    opacity: 1,
    y: 0, 
    transition: {
      type: "spring",
      stiffness: 70,
      damping: 10,
    },
  },
};

export default function AnimatedTitle({ article, span, subtitle, text, textSpan }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="relative z-1 flex flex-col items-start justify-center h-full px-6 sm:px-12 md:px-24 lg:pl-96 space-y-6 cursor-default"
    >
      <motion.h1
        className="font-['Gloock'] text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl tracking-normal text-black leading-tight w-full max-w-[60rem]"
        variants={itemVariants} 
      >
        {article}

        <span

          className="bg-[#9B696A] text-[#F2F2F2] transition-colors hover:bg-[#F2F2F2] hover:text-[#9B696A] ease-in-out duration-700"
        >
          {span}
        </span>

        {subtitle}
      </motion.h1>

      <motion.h2
        className="ml-1 sm:ml-2 font-['Gloock'] font-light text-2xl sm:text-3xl md:text-4xl flex flex-wrap items-center"
        variants={itemVariants} 
      >
        {text}
        <span

          className="text-[#691e21] p-1 sm:p-2 bg-[#F5F6F1] font-bold text-3xl sm:text-4xl ml-2 transition-colors hover:bg-[#691e21] hover:text-[#F5F6F1] ease-in-out duration-700"
        >
          {textSpan}
        </span>
      </motion.h2>
    </motion.div>
  );
}