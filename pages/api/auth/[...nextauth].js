import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
  // callbacks: {
  //   jwt: ({ token, user }) => {
  //     // first time jwt callback is run, user object is available
  //     if (user) {
  //       token.id = user.id;
  //     }
  //     return token;
  //   },
  //   session: ({ session, token }) => {
  //     if (token) {
  //       session.id = token.id;
  //     }
  //     return session;
  //   },
  // },
  jwt: {
    encryption: true,
    secret: process.env.SECRET,
  },
});
