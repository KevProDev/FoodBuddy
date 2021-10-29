import React from "react";
import { useRouter } from "next/router";
import { HeartIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";

export default function singlepage() {
  const [singlerestaurant, setSingleRestaurant] = useState({});
  // const router = useRouter();
  // const { id } = router.query;

  const restaurants = {
    id: "1pPJ0QRipdFEx-qeu6CNKA",
    alias: "the-budlong-hot-chicken-chicago-2",
    name: "The Budlong Hot Chicken",
    image_url:
      "https://s3-media1.fl.yelpcdn.com/bphoto/P8MA9T-NoulN5YUwdL1u9w/o.jpg",
    is_claimed: true,
    is_closed: false,
    url: "https://www.yelp.com/biz/the-budlong-hot-chicken-chicago-2?adjust_creative=QLi5Q4BC6BNtkm_o5krfPg&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_lookup&utm_source=QLi5Q4BC6BNtkm_o5krfPg",
    phone: "+17732709005",
    display_phone: "(773) 270-9005",
    review_count: 326,
    categories: [
      {
        alias: "southern",
        title: "Southern",
      },
      {
        alias: "chickenshop",
        title: "Chicken Shop",
      },
      {
        alias: "tradamerican",
        title: "American (Traditional)",
      },
    ],
    rating: 4,
    location: {
      address1: "1008 W Armitage",
      address2: "",
      address3: "",
      city: "Chicago",
      zip_code: "60614",
      country: "US",
      state: "IL",
      display_address: ["1008 W Armitage", "Chicago, IL 60614"],
      cross_streets: "Sheffield Ave & Kenmore Ave",
    },
    coordinates: {
      latitude: 41.9182862,
      longitude: -87.6539105,
    },
    photos: [
      "https://s3-media1.fl.yelpcdn.com/bphoto/P8MA9T-NoulN5YUwdL1u9w/o.jpg",
      "https://s3-media3.fl.yelpcdn.com/bphoto/rNkNArvY8ha6hgXnFpRwXw/o.jpg",
      "https://s3-media4.fl.yelpcdn.com/bphoto/bE5_XZrHGp-W-zhCdNDS7Q/o.jpg",
    ],
    price: "$$",
    hours: [
      {
        open: [
          {
            is_overnight: false,
            start: "1100",
            end: "2100",
            day: 0,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2100",
            day: 1,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2100",
            day: 2,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2100",
            day: 3,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2100",
            day: 4,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2100",
            day: 5,
          },
          {
            is_overnight: false,
            start: "1100",
            end: "2100",
            day: 6,
          },
        ],
        hours_type: "REGULAR",
        is_open_now: false,
      },
    ],
    transactions: ["delivery", "pickup"],
  };

  const getRestaurantsFromYelp = () => {
    const yelpUrl =
      "http://localhost:3000/api/restaurant/1pPJ0QRipdFEx-qeu6CNKA";

    return fetch(yelpUrl)
      .then((res) => res.json())
      .then((data) => setSingleRestaurant(data));
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, []);

  console.log(singlerestaurant);
  // useEffect(() => {
  //   fetch(`http://localhost:3000/api/restaurant/${id}`)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setSingleRestaurant(data);
  //     });
  // }, []);

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
          <h2 className="text-2xl font-bold">{singlerestaurant.name}</h2>
          <HeartIcon className="h-5 cursor-pointer" />
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Address</span>
        </div>
        <div className="flex space-x-5">
          <span>Price {singlerestaurant.price}</span>
          <p>
            Rating{" "}
            <span className=""> {singlerestaurant.rating} of 5 stars</span>
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

// // Made a api call to the data based
// export async function getStaticProps() {
//   const key = process.env.GOOGLE_API_KEY;

//   const exploreData = await fetch("http://localhost:3000/api");

//   const data = await exploreData.json();

//   // console.log(data);

//   return {
//     props: {
//       restaurants: data,
//     },
//   };
// }
