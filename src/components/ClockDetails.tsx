export default function ClockDetails() {
  const date = "Sat Jun 28 2025";
  const email = "boukhrisamine210@gmail.com";

  return (
    <div className="absolute top-6 left-6 text-left">
      <p className="text-neutral-700 text-base">{date}</p>
      <p className="text-neutral-700 text-xs">{email}</p>
    </div>
  );
}
