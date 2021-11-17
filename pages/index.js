import { useState, useEffect } from "react";
// import useSWR from "swr";
import Link from "next/link";
import Head from "next/head";
import Banner from "./components/Banner";
import Header from "./components/Header";
import SmallCard from "./components/Business";
import BusinessList from "./components/BusinessList";
import Suggestions from "./components/Suggestions";

export default function Home() {
  return (
    <div>
      <Header />
      {/* Banner */}
      <Banner />

      <main className="max-w-7xl mx-auto sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5 px-4">Suggestions</h2>
          <Suggestions />
        </section>
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5 px-4">Explore Nearby</h2>
          <BusinessList />
        </section>
      </main>
    </div>
  );
}

// export async function getServerSideProps() {
//   // console.log("getRestaurantsFromYelp STARTED");
//   const yelpPath = await fetch(`${yelpUrl}`, apiOption);
//   const yelpData = await yelpPath.json();

//   return {
//     props: {
//       data: yelpData,
//     },
//   };
// }
