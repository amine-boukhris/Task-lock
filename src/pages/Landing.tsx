import Lenis from "lenis";
import { useEffect } from "react";
import Nav from "@/components/Nav";
import PreHero from "@/sections/PreHero";
import Hero from "@/sections/Hero";
import PageProgressBar from "@/components/PageProgressBar";
import { useScroll } from "motion/react";
import Features from "@/sections/Features";
import HowItWorks from "@/sections/HowItWorks";

export default function Landing() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.05 });
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  const { scrollYProgress } = useScroll();

  return (
    <div className="bg-gray-950 relative">
      <PageProgressBar scrollYProgress={scrollYProgress} />
      <Nav />
      <PreHero />
      <Hero />
      <Features />
      <HowItWorks />
      <section className="h-screen bg-rose-500">content here</section>
    </div>
  );
}
