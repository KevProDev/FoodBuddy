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
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.SECRET,
  database: process.env.DATABASE_URL,
  jwt: {
    encryption: true,
    secret: process.env.SECRET,
  },
  // cookie: {
  //   secure: process.env.NODE_ENV && process.env.NODE_ENV === "production",
  // },
  session: {
    // Use JSON Web Tokens for session instead of database sessions.
    jwt: true,
    strategy: "database",

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
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
    // session: async (session, user) => {
    //   session.id = user.id;
    //   return Promise.resolve(session);
    // },
  },
});
