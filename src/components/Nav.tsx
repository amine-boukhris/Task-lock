import { Link } from "react-router";
import { LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import FocusLockLogo from "./FocusLockLogo";

export default function Nav() {
  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white bg-gray-900/40 backdrop-blur-sm">
      <FocusLockLogo />
      <div className="flex gap-2 items-center">
        <Button asChild size={"sm"} variant={"ghost"}>
          <Link to={"/login"}>Login</Link>
        </Button>
        <Button asChild size={"sm"} variant={"ghost"}>
          <Link to={"/register"}>Sign up</Link>
        </Button>
        <Button asChild size={"sm"} variant={"ghost"}>
          <Link to={"/dashboard"}>
            <LayoutDashboard />
          </Link>
        </Button>
      </div>
    </nav>
  );
}
