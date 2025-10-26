import React from 'react';
import { motion } from 'framer-motion';

// ... (containerVariants e itemVariants siguen siendo los mismos) ...
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, 
      delayChildren: 0.2,   
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 }, 
  visible: {
    opacity: 1,
    y: 0, 
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 12,
    },
  },
};

// Modificamos las props para recibir el texto traducido directamente
export default function AnimatedAbout({ 
    aboutTitle, 
    aboutSubtitle, 
    aboutTexto, 
    aboutButton, 
    profileImgSrc, 
    cvDownloadPath, 
    cvFilename 
}) {
  return (
    <motion.div
      className="mx-4 sm:mx-10 md:mx-20 my-10 w-auto p-6 sm:p-10 md:p-20 text-xl sm:text-2xl"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      <h2
        className="bg-[#85282b] inline-block p-2 text-white text-3xl sm:text-4xl font-medium font-['Crimson-Pro']"
      >
        {aboutTitle} {/* Usamos la prop de texto */}
      </h2>

      <div className="flex flex-col lg:flex-row w-full gap-6 sm:gap-8 mt-6">
        {/* Bloque de la imagen y nombre */}
        <motion.div
          className="w-full lg:w-1/2 h-auto rounded-4xl overflow-hidden mt-4"
          variants={itemVariants}
        >
          <p className="font-['Crimson-Pro'] text-3xl sm:text-4xl md:text-5xl my-2">
            The Filimisco
          </p>
          <img
            src={profileImgSrc}
            className="object-cover w-full h-[20rem] sm:h-[25rem] md:h-[30rem]"
            alt="img-profile"
          />
        </motion.div>

        {/* Bloque de la descripción */}
        <motion.div
          className="w-full lg:w-1/2 h-full bg-[#6b3637]"
          variants={itemVariants}
        >
          <h3
            className="font-['Gloock'] font-light text-2xl sm:text-3xl md:text-4xl bg-[#F2F2F2] inline-block p-3 mt-4"
          >
            {aboutSubtitle} {/* Usamos la prop de texto */}
          </h3>
          <p
            className="font-extralight p-4 sm:p-6 md:p-8 text-base sm:text-lg md:text-3xl text-white"
          >
            {aboutTexto} {/* Usamos la prop de texto */}
          </p>
          <div
            className="text-center justify-center text-2xl m-4 font-['Crimson-Pro']"
          >
            <a
              href={cvDownloadPath}
              download={cvFilename}
              className="p-1 bg-white hover:bg-gray-200 transition-colors duration-100"
            >
              {aboutButton} {/* Usamos la prop de texto */}
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}