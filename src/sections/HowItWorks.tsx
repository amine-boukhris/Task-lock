import { motion, MotionValue, useScroll, useTransform } from "motion/react";
import HowItWorksImage from "../assets/HowItWorksImage.jpg";
import yuiImage from "../assets/yui.jpg";
import { BadgeCheck } from "lucide-react";
import { useRef } from "react";

const STEPS = [
  { title: "Create tasks", img: "https://placehold.co/300x200" },
  { title: "Lock in & focus", img: "https://placehold.co/300x200" },
  { title: "Track your time", img: "https://placehold.co/300x200" },
] as const;

export default function HowItWorks() {
  const howItWorksRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: howItWorksRef,
    offset: ["start start", "end end"],
  });

  return (
    <section className="relative h-[200vh] bg-gray-950" ref={howItWorksRef}>
      <StepsSection scrollYProgress={scrollYProgress} />
      <Inspiration scrollYProgress={scrollYProgress} />
    </section>
  );
}

function Inspiration({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const scale = useTransform(scrollYProgress, [0, 0.9], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 0.9], [5, 0]);
  const y = useTransform(scrollYProgress, [0, 0.9], [100, 0]);

  const y1 = useTransform(scrollYProgress, [0, 0.9], ["50%", "0%"]);
  const y2 = useTransform(scrollYProgress, [0, 0.9], ["100%", "0%"]);

  return (
    <motion.div className="relative h-screen flex bg-gray-950" style={{ scale, rotate, y }}>
      <motion.div className="flex-1" style={{ y: y1 }}>
        <img src={HowItWorksImage} alt="Flow" className="w-full h-full object-cover" />
      </motion.div>
      <motion.div
        className="flex flex-col justify-between p-12 flex-1 bg-gray-900"
        style={{ y: y2 }}
      >
        <img src={yuiImage} className="w-32 aspect-[9/16] object-cover" />
        <div className="space-y-8">
          <h1 className="text-gray-100 text-5xl">
            Lorem ipsum dolor sit amet consectetur adipisicing.
          </h1>
          <p className="text-gray-300 text-xl max-w-[60ch]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores quos placeat eveniet
            rerum rem, eius necessitatibus. Esse explicabo totam accusantium.
          </p>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-lg">Lorem, ipsum.</span>
          <BadgeCheck className="text-gray-200 size-8" />
        </div>
      </motion.div>
    </motion.div>
  );
}

function StepsSection({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -5]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <motion.div
      className="h-screen sticky top-0 flex items-center justify-center bg-gray-200"
      style={{ scale, rotate, y }}
    >
      <div className="grid grid-cols-3 gap-12">
        {STEPS.map((step, index) => (
          <StepCard key={index} step={step} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

function StepCard({ step, index }: { step: (typeof STEPS)[number]; index: number }) {
  return (
    <motion.div
      className="bg-card text-card-foreground p-8 flex flex-col gap-8 rounded-xl"
      initial={{ y: "100%", opacity: 0 }}
      whileInView={{ y: "0%", opacity: 1 }}
      viewport={{ amount: "some", margin: "25%", once: true }}
      transition={{
        duration: 0.8,
        delay: 0.2 * index,
        type: "spring",
        scale: {
          duration: 0.2,
          delay: 0,
        },
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-6xl font-bold">{index + 1}.</span>
      <p className="text-2xl">{step.title}</p>
      <img src={step.img} alt="step" />
    </motion.div>
  );
}
