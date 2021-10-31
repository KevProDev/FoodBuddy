import React from "react";
import { useRouter } from "next/router";
import { HeartIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";

export default function singlepage() {
  const [singlerestaurant, setSingleRestaurant] = useState({});
  const router = useRouter();
  const restaurantId = router.query.id;
  console.log(restaurantId);

  return (
    <div className="flex flex-col">
      <Header />
      {/* Left Side */}
      <div className="relative h-40 w-full mx-auto md:h-96">
        <Image
          src="https://s3-media1.fl.yelpcdn.com/bphoto/P8MA9T-NoulN5YUwdL1u9w/o.jpg"
          layout="fill"
          objectFit="cover"
          className=""
        />
      </div>

      {/* Right Side */}
      <div className="flex-grow flex flex-col px-5 py-5 mt-5 w-full lg:w-5/12 mx-auto bg-gray-100 border-b-2">
        <div className="flex justify-between">
          <h2 className="text-2xl font-bold">Name</h2>
          <HeartIcon className="h-5 cursor-pointer" />
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">1008 W Armitage</span>
        </div>
        <div className="flex space-x-5">
          <span>Price </span>
          <p>
            Rating <span className=""> Review of 5 stars</span>
          </p>
        </div>
      </div>
      <div className="flex-grow flex flex-col px-5 pt-5 pb-10 w-full lg:w-5/12 mx-auto bg-gray-100">
        <p className="text-xl pb-2">
          Tell everyone what meal did you have and how was it?
        </p>
        <button className="border-2 py-5 items-center justify-center font-bold bg-blue-600 text-white">
          TELL YOUR STORY
        </button>
      </div>
      <div className="flex-grow flex flex-col px-5 pt-5 pb-10 mt-5 w-full lg:w-5/12 mx-auto bg-gray-100">
        <p className="text-xl pb-2">Reviews</p>
        <div>
          <p>Kevin J.</p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
            nulla doloremque rem amet iste? Facilis est impedit, qui, quod eos
            veritatis nemo minima consequatur explicabo praesentium ab ducimus
            exercitationem non.
          </p>
        </div>
      </div>
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
