import ExpandCard from "./ExpandCard";
import { useState } from "react";

const cards = [
  {
    title: {
      en: "Frontend",
      es: "Frontend"
    },
    color: "#E8D4B1",
    skills: {
      en: [
        "Html",
        "Javascript",
        "Css",
        "React",
        "Astro",
        "React Native",
        "Tailwind",
        "Next js",
      ],
      es: [
        "Html",
        "Javascript",
        "Css",
        "React",
        "Astro",
        "React Native",
        "Tailwind",
        "Next js",
      ],
    },
  },
  {
    title: {
      en: "Backend",
      es: "Backend"
    },
    color: "#E8D4B1",
    skills: 
     {
      en: ["Node js", "Express", "FastApi", "Flask", "Spring Boot"],
      es: [
        "Node js", "Express", "FastApi", "Flask", "Spring Boot"
      ],
    }
  },
  {
    title: {
      en: "SoftSkills",
      es: "Habilidades Blandas"
    },
    color: "#E8D4B1",
    skills: {
      en: ["Creative", "Flexible", "Teamwork", "Empathy", "Critical Thinking"],
      es: [
        "Creativo",
        "Capacidad de Adaptamiento",
        "Trabajor en Equipo",
        "Empatia",
        "Pensamiento Critico",
      ],
    },
  },
];

export default function SkillsSection(tLanguage) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const formatTLanguage = tLanguage["tLanguage"];

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-5  sm:h-[30rem] w-full h-full">
      {cards.map((card, index) => (
        <ExpandCard
          key={index}
          title={card.title[formatTLanguage]}
          color={card.color}
          skills={card.skills[formatTLanguage]}
          isHovered={hoveredIndex === index}
          isInactive={hoveredIndex !== null && hoveredIndex !== index}
          onHover={() => setHoveredIndex(index)}
          onLeave={() => setHoveredIndex(null)}
        />
      ))}
    </div>
  );
}
