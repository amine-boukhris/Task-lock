import { LayoutDashboard, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";

export default function NavigationBar() {
  return (
    <div className="sticky z-50 top-4 max-w-6xl mx-auto border-2 border-neutral-800 px-6 py-3.5 flex items-center justify-between rounded-xl bg-neutral-50">
      <h1 className="text-lg text-neutral-900 font-bold hover:text-primary cursor-pointer">
        FocusLock
      </h1>
      <div className="flex items-center gap-3 text-neutral-900 ">
        <Button
          className="flex items-center justify-center cursor-pointer"
          size={"lg"}
        >
          <Plus className="size-6 mx-px" />
          Add task
        </Button>

        <Button asChild variant={"outline"} size={"lg"}>
          <Link
            to={"/dashboard"}
            className=" cursor-pointer p-1.5 hover:*:text-primary"
          >
            <LayoutDashboard className=" text-black  box-content" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
