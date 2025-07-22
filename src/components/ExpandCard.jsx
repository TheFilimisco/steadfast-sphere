import { motion, AnimatePresence } from "framer-motion";

export default function ExpandCard({
  title,
  color,
  skills,
  isHovered,
  isInactive,
  onHover,
  onLeave,
}) {
  return (
    <motion.div
      layout
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      className={`flex flex-col justify-center items-center text-[#85282b] border-[#6b3637] cursor-pointer p-5 transition-all duration-500 overflow-hidden shadow-lg ${
        isInactive ? "opacity-0 pointer-events-none" : ""
      }`}
      style={{
        backgroundColor: color,
        flex: isHovered ? 1 : isInactive ? 0 : 1,
      }}
    >
      <AnimatePresence>
        {!isHovered && (
          <motion.h3
            className="font-['Gloock'] text-5xl mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            key="extra"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="text-center text-lg mt-4"
          >
            <div className="flex flex-col gap-3 sm:flex-row ">
              {skills.map((skill) => (
                <p className="px-2 py-1 sm:px-4 sm:py-3 bg-[#85282b] text-white rounded-lg hover:bg-[#5a1618] text-sm sm:text-2xl">
                  {skill}
                </p>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
