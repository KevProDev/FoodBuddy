import { useState, useEffect } from "react";
// import useSWR from "swr";
import Link from "next/link";
import Head from "next/head";
import Banner from "../components/Home/Banner";
import Header from "../components/Header";
import SmallCard from "../components/Home/Business";
import BusinessList from "../components/Home/BusinessList";
import Suggestions from "../components/Suggestions";

export default function Home() {
  return (
    <div>
      {/* Banner */}
      <Banner />

      <main className="max-w-7xl mx-auto sm:px-16">
        {/* <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5 px-4">Suggestions</h2>
          <Suggestions />
        </section> */}
        <section className="pt-6">
          <h2 className="text-xl sm:text-4xl font-semibold pb-5 px-4">
            Meal Feed
          </h2>
          <BusinessList />
        </section>
      </main>
    </div>
  );
}
