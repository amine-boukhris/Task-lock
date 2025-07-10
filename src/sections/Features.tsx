import { CardSpotlight } from "@/components/ui/card-spotlight";
import { motion, useMotionTemplate, useTime, useTransform } from "motion/react";


const FEATURES = [
  { icon: "✅", title: "Pomodoro-style or custom timers" },
  { icon: "⏳", title: "Daily focus tracking" },
  { icon: "📈", title: "Simple task management" },
  { icon: "🌙", title: "Light & dark mode" },
];

export default function Features() {
  const shapes = Array(6).fill(null);

  const time = useTime();
  const hueRotate = useTransform(time, [0, 10000], [0, 360], { clamp: false });
  const hsl1 = useMotionTemplate`linear-gradient(0deg,hsl(${hueRotate}deg 80% 40% / 0.8) 0%, hsl(224 71.4% 4.1%) 80%)`;
  const hsl2 = useMotionTemplate`linear-gradient(0deg, hsl(265 13% 91% / 1) 20%, hsl(${hueRotate}deg 80% 40% / 0.8) 100%)`;

  return (
    <section className="grid grid-cols-3 grid-rows-2 text-gray-100 bg-gray-950">
      <motion.div
        className="relative overflow-hidden"
        style={{
          background: hsl1,
        }}
      >
        {shapes.map((_, index) => (
          <motion.div
            key={index}
            className="absolute size-96 -translate-x-1/2 -translate-y-1/2 bg-gray-950 opacity-20 mix-blend-multiply"
            style={{
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              top: `${10 + index * 20}%`,
              left: `${10 + index * 15}%`,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 10 + index * 2,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>

      {FEATURES.map((feature, index) => (
        <Feature key={index} icon={feature.icon} title={feature.title} />
      ))}
      
      <motion.div
        className="relative overflow-hidden"
        style={{
          background: hsl2,
        }}
      >
        {shapes.map((_, index) => (
          <motion.div
            key={index}
            className="absolute size-96 -translate-x-1/2 -translate-y-1/2 bg-gray-200 opacity-20"
            style={{
              clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
              top: `${10 + index * 20}%`,
              left: `${10 + index * 15}%`,
            }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 10 + index * 2,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}

interface FeatureProps {
  icon: string;
  title: string;
}
function Feature({ icon, title }: FeatureProps) {
  return (
    <CardSpotlight>
      <div className="relative z-20 p-4 flex flex-col gap-20">
        <span className="text-6xl">{icon}</span>
        <p className="text-3xl">{title}</p>
      </div>
    </CardSpotlight>
  );
}
