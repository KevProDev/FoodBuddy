import { useState, useEffect } from "react";
// import useSWR from "swr";
import Link from "next/link";
import Head from "next/head";
import Banner from "../components/Restaurantsearch/Banner";
import SmallCard from "../components/Restaurantsearch/Business";
import BusinessList from "../components/Restaurantsearch/BusinessList";
import Suggestions from "../components/Suggestions";
import { signIn, signOut, useSession, getSession } from "next-auth/react";

export default function RestaurantSearch() {
  return (
    <div>
      <Banner />

      <main className="max-w-7xl mx-auto px-8">
        <section className="pt-6">
          <h2 className="text-xl sm:text-4xl font-semibold pb-5 px-4">
            Restaurant Explore
          </h2>
          <BusinessList />
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) {
    return {
      props: {},
    };
  }

  return {
    props: {
      session,
    },
  };
}
