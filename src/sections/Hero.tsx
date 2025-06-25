import { Button } from "@/components/ui/button";
import {
  useScroll,
  motion,
  useTransform
} from "motion/react";
import { useRef } from "react";
import heroImage from '../assets/heroImage.jpg';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.8], [0.7, 1])


  return (
    <section ref={heroRef} className="bg-gray-950 h-[200vh] relative ">
      <div className="sticky top-0 flex flex-col justify-center items-center gap-6 text-gray-100 h-screen">
        <h1 className="text-6xl uppercase font-bold text-center">
          Lock In
          <br />
          Focus Hard
          <br />
          Win the Day
        </h1>
        <p className="max-w-[30ch] text-center text-xl text-gray-100/80">
          One must be a sea, to receive a polluted stream without becoming
          impure.
        </p>
        <Button
          variant={"default"}
          size={"lg"}
          className="rounded bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
        >
          CTA
        </Button>
      </div>
      <motion.div className="relative w-2/3 mx-auto" style={{scale}}>
        <img src={heroImage} alt="screenshot" />
      </motion.div>
    </section>
  );
}
