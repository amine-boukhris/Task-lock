const FEATURES = [
  { icon: "✅", title: "Pomodoro-style or custom timers" },
  { icon: "⏳", title: "Daily focus tracking" },
  { icon: "📈", title: "Simple task management" },
  { icon: "🌙", title: "Light & dark mode" },
];

export default function Features() {
  return (
    <section className="grid grid-cols-3 grid-rows-2 text-gray-100 bg-gray-950">
      <div className="">animation here</div>
      {FEATURES.map((feature, index) => (
        <Feature key={index} icon={feature.icon} title={feature.title} />
      ))}
      <div className="bg-gray-200">chart here</div>
    </section>
  );
}

interface FeatureProps {
  icon: string;
  title: string;
}
function Feature({ icon, title }: FeatureProps) {
  return (
    <div className="p-12 flex flex-col gap-20 outline outline-gray-700/50">
      <span className="text-6xl">{icon}</span>
      <p className="text-3xl">{title}</p>
    </div>
  );
}
