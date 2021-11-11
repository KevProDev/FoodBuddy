import { useState, useEffect } from "react";
// import useSWR from "swr";
import Link from "next/link";
import Head from "next/head";
import Banner from "./components/Banner";
import Header from "./components/Header";
import SmallCard from "./components/Business";
import BusinessList from "./components/BusinessList";

export default function Home() {
  return (
    <div>
      <Header />
      {/* Banner */}
      <Banner />

      <main className="max-w-7xl mx-auto sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5 px-4">Explore Nearby</h2>
          <BusinessList />
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {businesses.map((business) => {
              const { id, image_url, name, rating, photos, price, location } =
                business;
              return (
                <Link href="/restaurant/[id]" as={`/restaurant/${id}`} key={id}>
                  <a>
                    <SmallCard
                      key={id}
                      image_url={image_url}
                      name={name}
                      rating={rating}
                      photos={photos}
                      price={price}
                      location={`${location.address1} ${location.city}`}
                    />
                  </a>
                </Link>
              );
            })}
          </div> */}
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
