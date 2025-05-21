import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma"; // Import your Prisma client instance
import { z } from "zod";
import bcrypt from "bcryptjs"; // Import bcrypt

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // Ensure your GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are in src/env.ts and .env
      // And uncomment them in src/env.ts:
      // server: {
      //   ...
      //   GOOGLE_CLIENT_ID: z.string().min(1),
      //   GOOGLE_CLIENT_SECRET: z.string().min(1),
      // },
      // runtimeEnv: {
      //   ...
      //   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
      //   GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
      // }
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "jsmith@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.hashedPassword) {
            // User not found or hashedPassword not set
            return null;
          }

          const passwordsMatch = await bcrypt.compare(
            password,
            user.hashedPassword
          );

          if (passwordsMatch) {
            return user; // Return user object if passwords match
          }
        }
        // If credentials are not valid or passwords don't match
        return null;
      },
    }),
  ],
  session: {
    strategy: "jwt", // Using JWT for session strategy is common with App Router
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      // Add any other custom session data from the token here
      // if (token.role && session.user) {
      //   session.user.role = token.role; // Example: adding role to session
      // }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        // Add any other user properties to the token here
        // if (user.role) {
        //  token.role = user.role; // Example: adding role to token
        // }
      }
      return token;
    },
  },
  // pages: { // Optional: define custom pages
  //   signIn: '/auth/signin',
  //   // signOut: '/auth/signout',
  //   // error: '/auth/error', // Error code passed in query string as ?error=
  //   // verifyRequest: '/auth/verify-request', // (used for email/passwordless login)
  //   // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out to disable)
  // },
  // secret: process.env.NEXTAUTH_SECRET, // Already handled by env.ts if set
  // debug: process.env.NODE_ENV === "development",
});
