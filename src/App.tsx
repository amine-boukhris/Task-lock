import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthContextProvider } from "./AuthContext";

import { Landing, Register, Login, Focus } from "./pages";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthContextProvider>
            <Toaster />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/focus" element={<Focus />} />
            </Routes>
          </AuthContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
