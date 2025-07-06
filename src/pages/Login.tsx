import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLogin } from "@/hooks/useUser";
import { supabase } from "@/lib/supabase";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginMutation = useLogin();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      toast("All fields are required");
      return;
    }

    loginMutation.mutate(
      { email, password },
      { onSuccess: () => navigate("/focus"), onError: () => toast("Something went wrong") }
    );
  };

  return (
    <div className="min-h-dvh flex justify-center items-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
          <CardAction>
            <Button variant="link" onClick={() => navigate("/register")}>
              Sign Up
            </Button>
          </CardAction>
        </CardHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col">
            <Button type="submit" className="w-full" variant={"default"}>
              Login
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}

export default Login;
