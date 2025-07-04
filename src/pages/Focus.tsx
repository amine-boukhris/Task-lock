import NavigationBar from "@/components/NavigationBar";
// import PageProgressBar from "@/components/PageProgressBar";
import Tasks from "@/components/Tasks";
import Timer from "@/components/Timer";
// import { useScroll } from "motion/react";
import grain from "@/assets/bright-squares.png";
import { useEffect } from "react";
import Lenis from "lenis";

export default function Focus() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.075 });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);
  // const { scrollYProgress } = useScroll();

  return (
    <div
      className=" relative px-4 py-3 space-y-4"
      style={{
        background:
          "radial-gradient(circle,rgba(225, 29, 72, 1) 0%, rgba(192, 38, 211, 1) 100%)",
      }}
    >
      <div
        className="absolute inset-0 m-0 z-0 opacity-100 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url(${grain})`,
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
        }}
      ></div>
      {/* <PageProgressBar scrollYProgress={scrollYProgress} className="bg-black" /> */}
      <NavigationBar />
      <Timer />
      <Tasks />
    </div>
  );
}
