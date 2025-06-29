import NavigationBar from "@/components/NavigationBar";
import PageProgressBar from "@/components/PageProgressBar";
import Tasks from "@/components/Tasks";
import Timer from "@/components/Timer";
import { useScroll } from "motion/react";

export default function Focus() {

  const {scrollYProgress} = useScroll()

  return (
    <div className="bg-neutral-100 relative px-4 py-3 space-y-4">
      <PageProgressBar scrollYProgress={scrollYProgress} className="bg-black" />
      <NavigationBar />
      <Timer />
      <Tasks />
    </div>
  );
}
