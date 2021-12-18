import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "../../../lib/prisma";

// const prisma = new PrismaClient();

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  database: process.env.DATABASE_URL,
  // cookie: {
  //   secure: process.env.NODE_ENV && process.env.NODE_ENV === "production",
  // },
  jwt: {
    encryption: true,
    secret: process.env.SECRET,
  },
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    jwt: true,
    strategy: "jwt",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  // pages: {
  //   signIn: "/signin",
  // },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      // first time jwt callback is run, user object is available
      if (account) {
        token.accessToken = account.access_token;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, user, token }) {
      session.accessToken = token.accessToken;
      session.id = token.id;
      console.log(session);
      return session;
    },
  },
  // jwt: ({ token, user }) => {
  //   // first time jwt callback is run, user object is available
  //   if (user) {
  //     token.id = user.id;
  //   }
  //   return token;
  // },
  // async signIn({ user, account, profile, email, credentials }) {
  //   return true;
  // },
  // async redirect({ url, baseUrl }) {
  //   return baseUrl;
  // },
  // },
  // callbacks: {
  //   session: ({ session, token }) => {
  //     if (token) {
  //       session.id = token.id;
  //     }
  //     return session;
  //   },
  // },
});
