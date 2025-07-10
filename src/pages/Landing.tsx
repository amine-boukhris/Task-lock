import Nav from "@/components/Nav";
import PageProgressBar from "@/components/PageProgressBar";
import Features from "@/sections/Features";
import Footer from "@/sections/Footer";
import Hero from "@/sections/Hero";
import HorizontalScrollSection from "@/sections/HorizontalScrollSection";
import HowItWorks from "@/sections/HowItWorks";
import PreHero from "@/sections/PreHero";
import TechStack from "@/sections/TechStack";
import Lenis from "lenis";
import { useScroll } from "motion/react";
import { useEffect } from "react";

export default function Landing() {
  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.05, wheelMultiplier: 0.9 });
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
      <HorizontalScrollSection />
      <Features />
      <HowItWorks />
      <TechStack />
      <Footer />
    </div>
  );
}
