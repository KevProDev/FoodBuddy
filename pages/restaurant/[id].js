import React from "react";
import { server } from "../../config";
import Head from "next/head";
import { useRouter } from "next/router";
import { HeartIcon, UserCircleIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

export const getStaticPaths = async (context) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const res = await fetch(`${server}/api/businesses/${params.id}`);
  const business = await res.json();

  return {
    revalidate: 86400, // rebuild this static page after every x seconds (when page is visited)
    props: {
      business,
    },
  };
};

export default function Details({ business }) {
  const clientCredentials = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };
  const app = initializeApp(clientCredentials);
  const db = getFirestore(app);

  async function getPosts(db) {
    const posts = collection(db, "posts");
    const postsSnapshot = await getDocs(posts);

    postsSnapshot.docs.map((doc) => console.log(doc.data()));
  }
  getPosts(db);

  const formatTimeString = (str) => {
    if (str.length == 4) {
      return str.slice(0, 2) + ":" + str.slice(2);
    }
    return str;
  };

  const renderHours = (arr) => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    // This formats days into an array - replace day number duplicate with '',

    arr.open.forEach((d, index) => {
      if (index >= 1) {
        d.day == arr.open[index - 1].day ? (d.day = "") : null;
      }
    });

    return (
      <div>
        <h3>Opening Hours</h3>
        {business.hours && business.hours[0].is_open_now && (
          <p>&nbsp;Open Now</p>
        )}
        <table>
          <tbody>
            {arr.open.map((d) => (
              <tr key={d.day}>
                <td>{days[d.day]}</td>
                <td>
                  {formatTimeString(d.start)} = {formatTimeString(d.end)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <Head>
        <title>FoodBuddy | {business.name}</title>
      </Head>
      <div className="relative h-[300px] sm:h-[200px] lg:h-[300px] xl:h-[400px] 2xl:h-[700px]">
        <Image src={business.image_url} layout="fill" objectFit="cover" />
      </div>
      <main className="max-w-4xl mx-auto px-8 sm:px-16 pb-16 bg-gray-100">
        <section className="pt-6">
          <div className="flex justify-between">
            <h1 className="text-xl font-bold md:text-l">{business.name}</h1>
            <div className="flex items-center justify-end">
              <HeartIcon className="h-5 cursor-pointer" />
            </div>
          </div>
          <p>
            {business.location.address1}, {business.location.city}{" "}
            {business.location.state}
          </p>
          <p className="text-gray-500">{business.display_phone}</p>
          <p className="text-gray-500">Price {business.price}</p>
          <div className="border-b-2 mt-5" />
        </section>

        <section>
          <h2 className="font-semibold text-xl md:text-l my-5 ">Reviews</h2>
          <div>
            <div className="flex items-center pb-2">
              <UserCircleIcon className="h-5 cursor-pointer pr-2" />
              <span className="text-sm">Users Name</span>
            </div>
            <div className="border-gray-200 border-b-2 pb-2">
              <h3 className="font-semibold">Food Title</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem
                dolorum necessitatibus maiores doloremque illo adipisci
                laudantium quas, quaerat dolores commodi sunt libero. Magnam
                tenetur iure odio error repudiandae libero! Tempora?
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// export async function getServerSideProps(context) {
//   // console.log("getRestaurantsFromYelp STARTED");
//   const yelpUrl =
//     "https://api.yelp.com/v3/businesses/search?term=restaurant&location=chicago";
//   const apiOption = {
//     method: "GET",
//     withCredentials: true,
//     credentials: "include",
//     headers: {
//       Authorization: `Bearer ${process.env.YELP_API_KEY}`,
//     },
//   };
//   const yelpPath = await fetch(yelpUrl, apiOption);
//   const yelpData = await yelpPath.json();
//   // console.log(yelpData);

//   return {
//     props: {
//       restaurants: yelpData.businesses,
//     },
//   };
// }
