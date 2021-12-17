import { useState, useEffect } from "react";
import Banner from "../components/Restaurantsearch/Banner";
import BusinessList from "../components/Restaurantsearch/BusinessList";
import { signIn, signOut, useSession, getSession } from "next-auth/react";

export default function Home() {
  return (
    <div>
      {console.log("Index HTML BEGIN")}
      <Banner />
      <main className="max-w-7xl mx-auto sm:px-16">
        <section className="pt-6">
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
  // const prisma = new PrismaClient();
  const session = await getSession(ctx);
  // console.log(session);

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
