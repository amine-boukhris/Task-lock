import { motion, MotionValue, useMotionTemplate, useScroll, useTransform } from "framer-motion";
import centerImage from "../assets/centerImage.jpg";
import { useRef } from "react";

export default function PreHero() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });

  return (
    <section>
      <div ref={sectionRef} className="relative w-full h-[200vh]">
        <CenterImage scrollYProgress={scrollYProgress} />
        <SplitText scrollYProgress={scrollYProgress} />
        <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
      </div>
    </section>
  );
}

function SplitText({ scrollYProgress }: { scrollYProgress: MotionValue }) {
  const opacity = useTransform(scrollYProgress, [0.05, 0.2], [1, 0]);

  return (
    <div className="absolute top-[100px] left-1/2 -translate-x-1/2 z-50  overflow-hidden">
      {"StartFocusingToday".split("").map((c, i) => (
        <motion.span
          key={i}
          initial={{ y: "100%" }}
          whileInView={{ y: "0%" }}
          transition={{
            duration: 0.5,
            delay: 0.025 * i,
            type: "spring",
          }}
          viewport={{ once: true }}
          className="inline-block text-gray-100 text-6xl font-bold"
          style={{
            lineHeight: 1.2,
            opacity,
          }}
        >
          {c}
        </motion.span>
      ))}
    </div>
  );
}

function CenterImage({ scrollYProgress }: { scrollYProgress: MotionValue }) {
  const clip1 = useTransform(scrollYProgress, [0, 0.7], [25, 0]);
  const clip2 = useTransform(scrollYProgress, [0, 0.7], [75, 100]);
  const brightness = useTransform(scrollYProgress, [0, 0.7], [1, 0.5]);
  const filter = useMotionTemplate`brightness(${brightness})`;

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(scrollYProgress, [0, 1], ["100%", "170%"]);

  return (
    <motion.div
      className="sticky top-0 h-screen w-full"
      style={{
        clipPath,
        backgroundSize,
        backgroundImage: `url(${centerImage})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        filter,
      }}
    />
  );
}
