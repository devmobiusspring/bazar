"use client";
import { createContext, useEffect, useState } from "react";
import { useSession, signOut, signIn, SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { showSnackbar } from "@/store/components";

type AuthContextType = {
  session: any;
  isLoading: boolean;
  isSessionExpired: boolean;
  loginWithEmail: (email: string, password: string) => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, status } = useSession();
  const [isSessionExpired, setIsSessionExpired] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "authenticated" && session?.expires) {
      const sessionExpiry = new Date(session.expires).getTime();
      const currentTime = new Date().getTime();

      if (sessionExpiry <= currentTime) {
        setIsSessionExpired(true);
        signOut({ callbackUrl: "/auth" });
      }
    }
  }, [session, status]);

  const loginWithEmail = async (email: string, password: string) => {
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (res?.error) {
      dispatch(
        showSnackbar({
          snackbar: {
            message:
              "Login failed. Please check your email and password and try again.",
            severity: "error",
            open: true,
          },
        })
      );
      console.error(res.error);
    } else {
      router.push("/");
    }
  };

  return (
    <SessionProvider>
      <AuthContext.Provider
        value={{
          session,
          isLoading: status === "loading",
          isSessionExpired,
          loginWithEmail,
        }}
      >
        {children}
      </AuthContext.Provider>
    </SessionProvider>
  );
};

export { AuthContext, AuthProvider };
