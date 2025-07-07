import { Link } from "react-router";
import { TimerIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import FocusLockLogo from "./FocusLockLogo";
import { useLogout, useUser } from "@/hooks/useUser";

export default function Nav() {
  const { data: user } = useUser();
  const logoutMutation = useLogout();

  function handleLogout() {
    logoutMutation.mutate();
  }

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-3 text-white bg-gray-900/40 backdrop-blur-sm">
      <FocusLockLogo />
      <div className="flex gap-2 items-center">
        {user ? (
          <Button asChild size={"sm"} variant={"ghost"} onClick={handleLogout}>
            <Link to={"/login"}>Logout</Link>
          </Button>
        ) : (
          <Button asChild size={"sm"} variant={"ghost"}>
            <Link to={"/login"}>Login</Link>
          </Button>
        )}

        <Button asChild size={"sm"}>
          <Link to={"/focus"}>
            <TimerIcon />
          </Link>
        </Button>
      </div>
    </nav>
  );
}
