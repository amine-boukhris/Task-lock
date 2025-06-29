import { cn } from "@/lib/utils";
import { motion, MotionValue, useTransform } from "motion/react";

interface PageProgressBarProps {
  scrollYProgress: MotionValue<number>;
  className?: string;
}

export default function PageProgressBar({
  scrollYProgress,
  className,
}: PageProgressBarProps) {
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <motion.div
      className={cn(
        "h-1 bg-rose-500 fixed top-0 left-0 right-0 z-[100] origin-left",
        className
      )}
      style={{ scaleX }}
    />
  );
}
