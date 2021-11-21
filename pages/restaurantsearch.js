import { useState, useEffect } from "react";
// import useSWR from "swr";
import Link from "next/link";
import Head from "next/head";
import Banner from "../components/Restaurantsearch/Banner";
import Header from "../components/Header";
import SmallCard from "../components/Restaurantsearch/Business";
import BusinessList from "../components/Restaurantsearch/BusinessList";
import Suggestions from "../components/Suggestions";

export default function RestaurantSearch() {
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
            Restaurant Explore
          </h2>
          <BusinessList />
        </section>
      </main>
    </div>
  );
}
