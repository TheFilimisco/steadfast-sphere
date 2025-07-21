import ExpandCard from "./ExpandCard";
import { useState } from "react";

const cards = [
  {
    title: "Frontend",
    color: "#E8D4B1",
    skills: [
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
  {
    title: "Backend",
    color: "#E8D4B1",
    skills: ["Node js", "Express", "FastApi", "Flask", "Spring Boot"],
  },
  {
    title: "SoftSkills",
    color: "#E8D4B1",
    skills: [
      "Creative",
      "Adaptability",
      "Teamwork",
      "Empathy",
      "Critical Thinking",
    ],
  },
];

export default function SkillsSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="flex flex-col sm:flex-row flex-wrap gap-5  sm:h-[30rem] w-full h-full">
      {cards.map((card, index) => (
        <ExpandCard
          key={index}
          title={card.title}
          color={card.color}
          skills={card.skills}
          isHovered={hoveredIndex === index}
          isInactive={hoveredIndex !== null && hoveredIndex !== index}
          onHover={() => setHoveredIndex(index)}
          onLeave={() => setHoveredIndex(null)}
        />
      ))}
    </div>
  );
}
