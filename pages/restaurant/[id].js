import React from "react";
import { server } from "../../config";
import Head from "next/head";
import { useAppContext } from "../../context/store";
import { HeartIcon, UserCircleIcon } from "@heroicons/react/outline";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";

export const getStaticPaths = async (context) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const res = await fetch(`${server}/api/businesses/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const business = await res.json();

  return {
    revalidate: 86400, // rebuild this static page after every x seconds (when page is visited)
    props: {
      business: business,
      // restaurantReviews,
    },
  };
};

export default function Details(props) {
  // console.log("Details Function Begin");

  const business = props.business.dataYelp;
  const restaurantReview = props.business.getRestaurantReview;
  // console.log("Id Details Page", business);
  // console.log("Id Details Page", restaurantReview);

  const [mealTitle, setMealTitle] = useState("");
  const [mealDescription, setMealDescription] = useState("");
  const mealTitleRef = useRef();
  const mealDescriptionRef = useRef();
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  const newSubmitData = {
    ...business,
    mealTitle,
    mealDescription,
  };

  const submitMealReview = async (e) => {
    // console.log(newSubmitData);
    e.preventDefault();
    const restaurant = await fetch(`/api/businesses/${id}`, {
      method: "POST",
      body: JSON.stringify(newSubmitData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const returnSubmitData = await restaurant.json();
    console.log(returnSubmitData);
  };

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
      {console.log("Banner HTML BEGIN")}
      <Head>
        <title>FoodBuddy | {business.name}</title>
      </Head>
      <div className="relative h-[300px] sm:h-[200px] lg:h-[300px] xl:h-[400px] 2xl:h-[700px]">
        <Image
          src={business.image_url}
          layout="fill"
          objectFit="cover"
          priority="true"
        />
      </div>
      <main className=" ">
        <section className="w-11/12 max-w-4xl mx-auto px-4 sm:px-16 pb-4 bg-gray-100 pt-4 flex flex-col md:flex-row gap-2 md:gap-32  lg:gap-24 ">
          <div>
            <div className="flex flex-col justify-between">
              <h1 className="text-xl font-bold md:text-l">{business.name}</h1>
              <p>{business.categories[0].title}</p>
              {/* <div className="flex items-center justify-end">
                <HeartIcon className="h-5 cursor-pointer" />
              </div> */}
            </div>
            <p>
              {business.location.address1}, {business.location.city}{" "}
              {business.location.state}
            </p>
            <p className="text-gray-500">{business.display_phone}</p>
            <p className="text-gray-500 border-gray-200 pb-2">
              Price {business.price}
            </p>

            <div className="" />
          </div>
          <div className="">
            {business.hours && business.hours[0].open
              ? renderHours(business.hours[0])
              : null}
          </div>
        </section>

        <section className="w-11/12 max-w-4xl mx-auto px-4 sm:px-16 pb-4 bg-gray-100 pt-2 mt-4">
          <h2 className="font-semibold text-xl md:text-l ">
            Tell People About This Meal
          </h2>
          {!session && (
            <a
              className="block w-60 text-lg rounded-md py-2 px-4 bg-yellow-300 text-black mb-4"
              href="/api/auth/signin/google"
              onClick={(e) => {
                e.preventDefault();
                signIn("google");
              }}
            >
              Sign in to post a review
            </a>
          )}
          {session?.user && (
            <form className="relative" onSubmit={submitMealReview}>
              <input
                ref={mealTitleRef}
                value={mealTitle}
                onChange={(e) => setMealTitle(e.target.value)}
                aria-label="Name of your Meal"
                placeholder="Name of your Meal..."
                required
                className="px-4 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-4/5 md:w-1/2 border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <textarea
                ref={mealDescriptionRef}
                value={mealDescription}
                onChange={(e) => setMealDescription(e.target.value)}
                aria-label="What was so great about it"
                placeholder="What was so great about it..."
                rows="4"
                required
                className="px-4 py-2 mt-1 mb-4 focus:ring-blue-500 focus:border-blue-500 block w-4/5 md:w-1/2 border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <button
                className="flex items-center justify-center  right-1 top-1 px-4 font-medium h-8 bg-red-600 text-white rounded w-38"
                type="submit"
              >
                Post Review
              </button>
            </form>
          )}
        </section>

        <section className="w-11/12 max-w-4xl mx-auto px-4 sm:px-16 pb-16 bg-gray-100 pt-2 mt-4">
          <h2 className="font-semibold text-xl md:text-l pb-4 ">
            {restaurantReview.length} People Already Review Their Meal
          </h2>
          {restaurantReview.map((review) => {
            return (
              <div
                key={review.id}
                className="border-gray-200 border-b-2 pb-4 mb-4"
              >
                <div className="flex items-center pb-2">
                  <UserCircleIcon className="h-5 cursor-pointer pr-2" />
                  <span className="text-sm">{review.user_name}</span>
                </div>
                <div className="">
                  <h3 className="font-semibold">{review.title} </h3>
                  <p>{review.description}</p>
                </div>
              </div>
            );
          })}

          {/* <div className="border-gray-200 border-b-2 pb-4 mb-4">
            <div className="flex items-center pb-2">
              <UserCircleIcon className="h-5 cursor-pointer pr-2" />
              <span className="text-sm">Kevin Johnson</span>
            </div>
            <div className="">
              <h3 className="font-semibold">Spick Chicken Soup </h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Dolores magnam minus animi debitis provident unde dolorem magni
                eos hic aperiam, distinctio modi iste officia numquam sunt earum
                quia maiores odit.
              </p>
            </div>
          </div> */}
        </section>
      </main>
    </div>
  );
}
