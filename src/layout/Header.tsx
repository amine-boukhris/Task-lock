import { ModeToggle } from "@/components/mode-toggle";

export default function Header() {
  return <div className="border-b">
    <div className="container mx-auto py-3 px-4 flex justify-between">
      <h1 className="font-bold text-2xl">FocusLock</h1>
      <ModeToggle />
    </div>
  </div>;
}
