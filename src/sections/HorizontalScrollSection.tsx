import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";

export default function HorizontalScrollSection() {
  const horizontalScrollRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: horizontalScrollRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["5", "-95%"]);

  return (
    <section className="h-[300vh] relative" ref={horizontalScrollRef}>
      <div className="h-screen sticky overflow-hidden top-0 flex items-center">
        <motion.div style={{ x }} className="border flex gap-24">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="w-90 aspect-[3/4] bg-gray-300">
              {i}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
