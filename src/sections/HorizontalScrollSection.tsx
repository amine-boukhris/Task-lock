import { useScroll, useTransform, motion } from "motion/react";
import { useRef } from "react";

import image1 from "../assets/carousel (1).jpg";
import image2 from "../assets/carousel (2).jpg";
import image3 from "../assets/carousel (3).jpg";
import image4 from "../assets/carousel (4).jpg";
import image5 from "../assets/carousel (5).jpg";
import image6 from "../assets/carousel (6).jpg";
import image7 from "../assets/carousel (7).jpg";

const images = [image1, image2, image3, image4, image5, image6, image7];

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
        <motion.div style={{ x }} className="flex gap-12">
          {images.map((image, i) => (
            <div key={i} className="w-90 aspect-[3/4] bg-gray-300">
              <img src={image} className="w-full h-full object-cover" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
