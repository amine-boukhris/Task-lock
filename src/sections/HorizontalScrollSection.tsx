import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";

export default function HorizontalScrollSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0", "-95%"]);

  return (
    <section className="h-[300vh] relative" ref={ref}>
      <div className="h-screen sticky overflow-hidden top-0 left-0 flex items-center justify-center">
        <motion.div style={{ x }} className="border flex gap-24 w-fit">
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
