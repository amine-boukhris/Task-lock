import { motion } from "motion/react";

export default function FocusLockLogo() {
  return (
    <motion.h1
      initial={{ opacity: 0, y: "100%" }}
      whileInView={{ opacity: 1, y: "0%" }}
      viewport={{ once: true }}
      transition={{
        duration: 0.4,
        ease: "easeInOut",
      }}
    >
      FocusLock
    </motion.h1>
  );
}
