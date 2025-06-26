import Lenis from "lenis";
import { useEffect } from "react";
import Nav from "@/components/Nav";
import PreHero from "@/sections/PreHero";
import Hero from "@/sections/Hero";
import PageProgressBar from "@/components/PageProgressBar";
import { useScroll } from "motion/react";
import Features from "@/sections/Features";
import HowItWorks from "@/sections/HowItWorks";
import TechStack from "@/sections/TechStack";
import Footer from "@/sections/Footer";

export default function Landing() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.05, wheelMultiplier: 0.7 });
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
      <TechStack />
      <Footer />
    </div>
  );
}
