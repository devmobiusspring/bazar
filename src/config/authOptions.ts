import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";

export const authOptions: AuthOptions = {
  providers: [
    // Enable Google OAuth if client/env vars are provided
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
          }),
        ]
      : []),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined
      ) {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials?.email!,
            credentials?.password!
          );
          const user = userCredential.user;

          if (user) {
            return {
              id: user.uid,
              email: user.email,
            };
          }

          return null;
        } catch (error) {
          console.error("Error Firebase:", error);
          return null;
        }
      },
    }),
  ],
  pages: { signIn: "/auth" },
  secret: process.env.NEXTAUTH_SECRET,
};
