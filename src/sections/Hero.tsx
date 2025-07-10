import { Button } from "@/components/ui/button";
import { useScroll, motion, useTransform } from "motion/react";
import { useRef } from "react";
import heroImage from "../assets/hero.png";
import grid from "../assets/grid.png";
import { cn } from "@/lib/utils";
import { Link } from "react-router";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.8], [0.7, 1]);
  const rotateX = useTransform(scrollYProgress, [0.4, 0.8], ["-15deg", "0deg"]);

  return (
    <div ref={heroRef} className="bg-gray-950 h-[200vh] relative" id="hero">
      <div className="absolute z-50 top-0 left-0 right-0 h-64 bg-gradient-to-b from-zinc-950 to-zinc-950/0" />

      <div className="sticky top-0 flex flex-col justify-center items-center gap-6 text-gray-100 h-screen">
        <div
          className="absolute inset-0 opacity-[0.15] mix-blend-screen pointer-events-none"
          style={{
            backgroundImage: `url(${grid})`,
            backgroundSize: "contain",
            backgroundRepeat: "repeat",
          }}
        />
        <div className="text-center">
          <div className="overflow-hidden">
            {"Lock in".split("").map((c, i) => (
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
                className={cn("inline-block font-bold text-7xl uppercase", {
                  "ml-[0.8ch]": c == " ",
                })}
                style={{
                  lineHeight: 0.9,
                }}
              >
                {c}
              </motion.span>
            ))}
          </div>
          <div className="overflow-hidden">
            {"Focus hard".split("").map((c, i) => (
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
                className={cn("inline-block font-bold text-7xl uppercase", {
                  "ml-[0.8ch]": c == " ",
                })}
                style={{
                  lineHeight: 0.9,
                }}
              >
                {c}
              </motion.span>
            ))}
          </div>
          <div className="overflow-hidden">
            {"Win the day".split("").map((c, i) => (
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
                className={cn("inline-block font-bold text-7xl uppercase", {
                  "ml-[0.8ch]": c == " ",
                })}
                style={{
                  lineHeight: 0.9,
                }}
              >
                {c}
              </motion.span>
            ))}
          </div>
        </div>
        <p className="max-w-[30ch] text-center text-xl text-gray-100/80">
          One must be a sea, to receive a polluted stream without becoming impure.
        </p>
        <Button
          asChild
          variant={"default"}
          size={"lg"}
          className="rounded bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
        >
          <Link to={"/focus"}>Start now</Link>
        </Button>
      </div>
      <motion.div className="relative w-4/5 mx-auto perspective-distant" style={{ scale }}>
        <motion.img src={heroImage} alt="screenshot" className="rounded-3xl" style={{ rotateX }} />
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </div>
  );
}
