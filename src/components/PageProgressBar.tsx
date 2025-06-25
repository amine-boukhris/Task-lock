import { motion, MotionValue, useTransform } from "motion/react";


interface PageProgressBarProps {
  scrollYProgress: MotionValue<number>
}

export default function PageProgressBar({ scrollYProgress }: PageProgressBarProps) {
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])
  return <motion.div className="h-1 bg-rose-500 fixed top-0 left-0 right-0 z-[100] origin-left" style={{scaleX}} />
}
