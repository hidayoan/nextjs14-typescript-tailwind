// import { loginUser, getUser } from "@/FirebaseProvider/user";
import { getUser, loginUser } from "@/service/auth.service";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await loginUser(credentials as any);
          if (res.status === 200) {
            return res as any;
          } else {
            return null;
          }
        } catch (error) {
          console.error(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      try {
        const { email } = token;

        if (email) {
          const user = await getUser(email) as any;
          if (user) {
            delete user.password
            return {
              ...session,
              user: {
                ...session.user,
                ...user,
              },
            };
          }
        }
        return session;
      } catch (error) {
        return session;
      }
    }
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
};