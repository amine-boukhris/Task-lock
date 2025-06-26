import { useState } from "react";
import { motion } from "motion/react";

import ReactLogo from "../assets/React-logo.svg";
import TailwindLogo from "../assets/Tailwind-logo.svg";
import TypescriptLogo from "../assets/Typescript-logo.svg";
import ViteLogo from "../assets/Vite-logo.svg";
import PostgresLogo from "../assets/Postgres-logo.svg";

import motionImg from "../assets/motion.png";

const TECH_STACK = [
  { name: "React", logo: ReactLogo },
  { name: "Tailwind", logo: TailwindLogo },
  { name: "Typescript", logo: TypescriptLogo },
  { name: "Vite", logo: ViteLogo },
  { name: "Postgres", logo: PostgresLogo },
];

export default function TechStack() {
  const [hoveredOverIndex, setHoveredOverIndex] = useState<number | null>(null);

  return (
    <section className=" bg-gray-200">
      <div className="py-32 px-16 bg-gray-200 space-y-20">
        <div>
          <div className="overflow-hidden">
            {"Tech stack".split("").map((c, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                transition={{
                  duration: 0.5,
                  delay: 0.1 + 0.025 * i,
                  ease: "easeInOut",
                }}
                viewport={{ once: true }}
                className="inline-block font-bold w-[1ch] text-7xl uppercase"
                style={{
                  lineHeight: 0.8,
                }}
              >
                {c}
              </motion.span>
            ))}
          </div>
          <div className="overflow-hidden">
            {"used in".split("").map((c, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                transition={{
                  duration: 0.5,
                  delay: 0.2 + 0.025 * i,
                  ease: "easeInOut",
                }}
                viewport={{ once: true }}
                className="inline-block font-bold w-[1ch] text-7xl uppercase"
                style={{
                  lineHeight: 0.8,
                }}
              >
                {c}
              </motion.span>
            ))}
          </div>
          <div className="overflow-hidden">
            {"focuslock".split("").map((c, i) => (
              <motion.span
                key={i}
                initial={{ y: "100%" }}
                whileInView={{ y: "0%" }}
                transition={{
                  duration: 0.5,
                  delay: 0.3 + 0.025 * i,
                  ease: "easeInOut",
                }}
                viewport={{ once: true }}
                className="inline-block font-bold w-[1ch] text-7xl uppercase"
                style={{
                  lineHeight: 0.8,
                }}
              >
                {c}
              </motion.span>
            ))}
          </div>
        </div>
        <div className="relative">
          {TECH_STACK.map((tech, index) => (
            <motion.div
              key={index}
              className={`text-6xl py-4 transition-all cursor-pointer ${
                index == hoveredOverIndex ? "text-gray-800" : "text-gray-500"
              }`}
              onMouseEnter={() => setHoveredOverIndex(index)}
              initial={{ x: "-80%", opacity: 0 }}
              whileInView={{ x: "0%", opacity: 1 }}
              viewport={{ once: true, amount: "some" }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: 0.05 * index,
              }}
            >
              {tech.name}
            </motion.div>
          ))}
          <motion.img
            className="absolute left-[50%] -translate-x-1/2 -translate-y-[35%] w-1/4 aspect-[4/3]  "
            src={
              hoveredOverIndex ? TECH_STACK[hoveredOverIndex].logo : ReactLogo
            }
            animate={{
              top: `${((hoveredOverIndex ?? 0) / TECH_STACK.length) * 100}%`,
            }}
            transition={{ type: "tween", duration: 0.25 }}
          />
        </div>
        <a href="https://motion.dev" target="_blank">
          <motion.img
            src={motionImg}
            alt="motion"
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          />
        </a>
      </div>
    </section>
  );
}
