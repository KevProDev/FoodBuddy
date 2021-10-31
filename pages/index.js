import { useState, useEffect } from "react";
// import useSWR from "swr";
import Link from "next/link";
import Head from "next/head";
import Banner from "./components/Banner";
import Header from "./components/Header";
import SmallCard from "./components/SmallCard";

export default function Home({ restaurants }) {
  const [singlerestaurant, setSingleRestaurant] = useState({});
  console.log(restaurants);

  return (
    <div>
      <Header />
      {/* Banner */}
      <Banner />

      <main className="max-w-7xl mx-auto px-4 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          {/* Pull some data from server  API endpoints */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {restaurants.map((item) => (
              <Link
                href="/restaurant/[id]"
                as={`/restaurant/${item.id}`}
                key={item.id}
              >
                <a>
                  <SmallCard
                    key={item.id}
                    image_url={item.image_url}
                    name={item.name}
                    rating={item.rating}
                    photos={item.photos}
                    price={item.price}
                    location={item.location.address1 + " " + item.location.city}
                  />
                </a>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  // console.log("getRestaurantsFromYelp STARTED");
  const yelpUrl =
    "https://api.yelp.com/v3/businesses/search?term=restaurant&location=chicago";
  const apiOption = {
    method: "GET",
    withCredentials: true,
    credentials: "include",
    headers: {
      Authorization: `Bearer ${process.env.YELP_API_KEY}`,
    },
  };
  const yelpPath = await fetch(yelpUrl, apiOption);
  const yelpData = await yelpPath.json();
  // console.log(yelpData);

  return {
    props: {
      restaurants: yelpData.businesses,
    },
  };
}
