import { Link } from "react-router";
import AddTaskButton from "./AddTaskButton";
import FocusTimesButton from "./FocusTimesButton";
import { ModeToggle } from "./mode-toggle";

export default function NavigationBar() {
  return (
    <div className="sticky z-50 top-4 max-w-6xl mx-auto border-2 border-neutral-800 dark:border-neutral-700 dark:border px-6 py-3.5 flex items-center justify-between rounded-xl bg-neutral-50 dark:bg-neutral-900">
      <Link to={"/"}>
        <h1 className="text-lg text-neutral-900 dark:text-neutral-100 font-bold hover:text-primary cursor-pointer">
          FocusLock
        </h1>
      </Link>
      <div className="flex items-center gap-3 text-neutral-900 dark:text-neutral-100 ">
        <AddTaskButton />
        <FocusTimesButton />
        <ModeToggle />
      </div>
    </div>
  );
}
