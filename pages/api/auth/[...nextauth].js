import { NextApiHandler } from "next";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    // GitHubProvider({
    //   clientId: process.env.GITHUB_CLIENT_ID,
    //   clientSecret: process.env.GITHUB_CLIENT_SECRET,
    // }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      // authorization: {
      //   params: {
      //     prompt: "consent",
      //     access_type: "offline",
      //     response_type: "code",
      //   },
      // },
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
  // session: {
  //   // Use JSON Web Tokens for session instead of database sessions.
  //   jwt: true,
  //   // strategy: "database",

  //   // // Seconds - How long until an idle session expires and is no longer valid.
  //   // maxAge: 30 * 24 * 60 * 60, // 30 days
  // },

  // callbacks: {
  //   async signIn(user, account, profile) {
  //     if (typeof user.userId !== typeof undefined) {
  //       if (user.isActive === "1") {
  //         return user;
  //       } else {
  //         return false;
  //       }
  //     } else {
  //       return false;
  //     }
  //   },
  //   async session(session, token) {
  //     if (userAccount !== null) {
  //       session.user = userAccount;
  //     } else if (
  //       typeof token.user !== typeof undefined &&
  //       (typeof session.user === typeof undefined ||
  //         (typeof session.user !== typeof undefined &&
  //           typeof session.user.userId === typeof undefined))
  //     ) {
  //       session.user = token.user;
  //     } else if (typeof token !== typeof undefined) {
  //       session.token = token;
  //     }
  //     return session;
  //   },
  //   async jwt(token, user, account, profile, isNewUser) {
  //     if (typeof user !== typeof undefined) {
  //       token.user = user;
  //     }
  //     return token;
  //   },
  // },
  // callbacks: {
  //   async jwt({ token, account }) {
  //     // Persist the OAuth access_token to the token right after signin
  //     if (account) {
  //       console.log(account);
  //       token.accessToken = account.access_token;
  //     }
  //     return token;
  //   },
  // },
  // callbacks: {
  //   async signIn({ user, account, profile, email, credentials }) {
  //     return true;
  //   },
  //   async redirect({ url, baseUrl }) {
  //     return baseUrl;
  //   },
  //   async session({ session, user, token }) {
  //     return session;
  //   },
  //   async jwt({ token, user, account, profile, isNewUser }) {
  //     return token;
  //   },
  // },
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
});
