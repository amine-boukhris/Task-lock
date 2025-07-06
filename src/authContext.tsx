import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "./lib/supabase";
// import type { User } from "./types";
import { type User } from "@supabase/supabase-js";
import { useNavigate } from "react-router";

type AuthContextType = {
  user: User | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
});

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (!data.user?.email) {
        navigate("/login");
      }

      setUser(data.user);
      setLoading(false);
    };

    getUser();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
