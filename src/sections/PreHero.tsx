import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import centerImage from "../assets/centerImage.jpg";

const SECTION_HEIGHT = 1500;

export default function PreHero() {
  return (
    <section
      style={{ height: `calc(${SECTION_HEIGHT}px + 100vh)` }}
      className="relative w-full"
    >
      <CenterImage />
      <SplitText />
      <div className="absolute bottom-0 left-0 right-0 h-96 bg-gradient-to-b from-zinc-950/0 to-zinc-950" />
    </section>
  );
}

function SplitText() {
  const { scrollY } = useScroll();

  const opacity = useTransform(scrollY, [50, 200], [1, 0])

  return (
    <div className="absolute top-[100px] left-1/2 -translate-x-1/2 z-50  overflow-hidden">
      {"Start focusing today".split("").map((c, i) => (
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
          className="inline-block text-gray-100 text-6xl font-bold w-[1ch]"
          style={{
            lineHeight: 1.2,
            opacity
          }}
        >
          {c}
        </motion.span>
      ))}
    </div>
  );
}

function CenterImage() {
  const { scrollY } = useScroll();

  const clip1 = useTransform(scrollY, [0, 1500], [25, 0]);
  const clip2 = useTransform(scrollY, [0, 1500], [75, 100]);
  const brightness = useTransform(scrollY, [0, 1500], [1, 0.5]);
  const filter = useMotionTemplate`brightness(${brightness})`;

  const clipPath = useMotionTemplate`polygon(${clip1}% ${clip1}%, ${clip2}% ${clip1}%, ${clip2}% ${clip2}%, ${clip1}% ${clip2}%)`;

  const backgroundSize = useTransform(
    scrollY,
    [0, SECTION_HEIGHT + 500],
    ["100%", "170%"]
  );

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
