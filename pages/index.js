import { useState, useEffect } from "react";
// import useSWR from "swr";
import Link from "next/link";
import Head from "next/head";
import Banner from "../components/Restaurantsearch/Banner";
import Header from "./header";
import SmallCard from "../components/Restaurantsearch/Business";
import BusinessList from "../components/Restaurantsearch/BusinessList";
import Suggestions from "../components/Suggestions";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
export default function Home({ data }) {
  // console.log("index session serverside", session);
  return (
    <div>
      {/* Banner */}
      {/* <Header /> */}
      <Banner />
      <main className="max-w-7xl mx-auto sm:px-16">
        {/* <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5 px-4">Suggestions</h2>
          <Suggestions />
        </section> */}
        <section className="pt-6 px-4">
          <h2 className="text-xl sm:text-4xl font-semibold pb-5 px-4">
            Explore Feed
          </h2>
          <BusinessList />
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  // console.log(ctx);
  const prisma = new PrismaClient();
  const session = await getSession(ctx);

  if (!session) {
    return {
      props: {
        session: null,
      },
    };
  }
  const profile = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  console.log("profile", profile);
  // console.log("session", session);
  return {
    props: {
      session,
      data: session,
      profile,
    },
  };
}
