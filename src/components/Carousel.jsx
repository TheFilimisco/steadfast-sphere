"use client";

import { motion, AnimatePresence } from "framer-motion";
import { forwardRef, useState } from "react";

export default function ProjectCarousel({ projects, tLanguage }) {
  const [selected, setSelected] = useState(0);
  const [direction, setDirection] = useState(1);

  function slide(dir) {
    setDirection(dir);
    setSelected((prev) => (prev + dir + projects.length) % projects.length);
  }

  const current = projects[selected];
  const bgColor = current.data.color;

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
            name={current.data.title}
            routeImg={current.data.img}
            description={current.data.description[tLanguage]}
            backend={current.data.backend}
            web={current.data.web}
            frontend={current.data.frontend}
            database={current.data.database}
            repositoryBackend={current.data.repository_backend}
            repositoryFrontend={current.data.repository_frontend}
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

const Slide = forwardRef(function Slide(
  {
    color,
    name,
    direction,
    routeImg,
    description,
    backend,
    web,
    frontend,
    database,
    repositoryFrontend,
    repositoryBackend,
  },
  ref
) {
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
      <div
        className="w-full h-screen bg-gray-100 flex flex-col items-center justify-center gap-8 p-4 relative"
        style={{
          backgroundImage: `url(./${routeImg})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-0"></div>

        <div className="z-10 flex flex-col items-center gap-6">
          <h1 className="text-3xl md:text-4xl font-bold text-[#691e21] p-3 md:p-5 bg-[#E8D4B1] text-center">
            {name}
          </h1>

          <p
            className={`
            text-white 
            text-sm md:text-base
            text-center 
            leading-relaxed 
            max-w-xs sm:max-w-sm md:max-w-[600px] 
            break-words 
            px-4 py-2 
            bg-[${color}] 
            rounded
          `}
          >
            {description}
          </p>

          {/* Botones Backend / Frontend / Database */}
          <div className="flex flex-col md:flex-row gap-4 w-full items-center justify-center">
            {[backend, frontend, database].map((text, index) => {
              // Only render a button if the text exists (non-null, non-empty)
              if (!text) return null;

              const icons = [
                // Backend icon
                <svg
                  key="backend"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 18l6-6-6-6M8 6l-6 6 6 6"
                  />
                </svg>,
                // Frontend icon
                <svg
                  key="frontend"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 5h16v10H4z M12 15v4m-4 0h8"
                  />
                </svg>,
                // Database icon
                <svg
                  key="database"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 md:w-6 md:h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5" />
                  <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3" />
                </svg>,
              ];

              return (
                <button
                  key={index}
                  className={`flex items-center gap-2 text-white px-4 py-2 text-sm md:text-base rounded shadow transition`}
                  style={{ backgroundColor: color }}
                >
                  {icons[index]}
                  {text}
                </button>
              );
            })}
          </div>

          {/* Repositorios */}
          <div className="flex flex-col md:flex-row gap-4 mt-6 w-full items-center justify-center">
            {repositoryBackend ? (
              <a
                href={repositoryBackend}
                className="flex items-center justify-center gap-2 w-40 h-10 bg-black text-white font-semibold rounded hover:bg-[#E8D4B1] hover:text-black transition text-sm md:text-base"
              >
                <GitHubIcon />
                Backend
              </a>
            ) : null}

            {repositoryFrontend ? (
              <a
                href={repositoryFrontend}
                className="flex items-center justify-center gap-2 w-40 h-10 bg-black text-white font-semibold rounded hover:bg-[#E8D4B1] hover:text-black transition text-sm md:text-base"
              >
                <GitHubIcon />
                Frontend
              </a>
            ) : null}
            {/* Web link (styled like GitHub links) */}
            {web ? (
              <a
                href={web}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-40 h-10 bg-black text-white font-semibold rounded hover:bg-[#E8D4B1] hover:text-black transition text-sm md:text-base"
              >
                <WebIcon />
                Web
              </a>
            ) : null}
          </div>
        </div>
      </div>
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

function GitHubIcon() {
  return (
    <svg
      className="w-5 h-5 md:w-6 md:h-6"
      fill="currentColor"
      viewBox="0 0 24 24"
    >
      <path d="M12 0a12 12 0 00-3.8 23.4c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6a3.1 3.1 0 00-1.3-1.7c-1-.6 0-.6 0-.6a2.5 2.5 0 011.9 1.3 2.6 2.6 0 003.5 1 2.7 2.7 0 01.8-1.6c-2.7-.3-5.5-1.3-5.5-6a4.7 4.7 0 011.2-3.3 4.3 4.3 0 01.1-3.2s1-.3 3.3 1.2a11.3 11.3 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2a4.3 4.3 0 01.1 3.2 4.7 4.7 0 011.2 3.3c0 4.7-2.8 5.7-5.5 6a3 3 0 01.9 2.4v3.5c0 .3.2.7.8.6A12 12 0 0012 0z" />
    </svg>
  );
}

function WebIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 -960 960 960"
      width="24px"
      fill="currentColor"
    >
      <path d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q83 0 155.5 31.5t127 86q54.5 54.5 86 127T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Zm0-82q26-36 45-75t31-83H404q12 44 31 83t45 75Zm-104-16q-18-33-31.5-68.5T322-320H204q29 50 72.5 87t99.5 55Zm208 0q56-18 99.5-55t72.5-87H638q-9 38-22.5 73.5T584-178ZM170-400h136q-3-20-4.5-39.5T300-480q0-21 1.5-40.5T306-560H170q-5 20-7.5 39.5T160-480q0 21 2.5 40.5T170-400Zm216 0h188q3-20 4.5-39.5T580-480q0-21-1.5-40.5T574-560H386q-3 20-4.5 39.5T380-480q0 21 1.5 40.5T386-400Zm268 0h136q5-20 7.5-39.5T800-480q0-21-2.5-40.5T790-560H654q3 20 4.5 39.5T660-480q0 21-1.5 40.5T654-400Zm-16-240h118q-29-50-72.5-87T584-782q18 33 31.5 68.5T638-640Zm-234 0h152q-12-44-31-83t-45-75q-26 36-45 75t-31 83Zm-200 0h118q9-38 22.5-73.5T376-782q-56 18-99.5 55T204-640Z" />
    </svg>
  );
}
