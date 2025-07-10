import { useUser } from "@/hooks/useUser";

export default function ClockDetails() {
  const date = new Date().toDateString();
  const { data: user } = useUser();

  return (
    <div className="absolute top-6 left-6 text-left">
      <p className="text-neutral-700 dark:text-neutral-300 text-base">{date}</p>
      <p className="text-neutral-700 dark:text-neutral-300 text-xs">{user?.email}</p>
    </div>
  );
}
