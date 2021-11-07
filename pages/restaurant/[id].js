import React from "react";
import { server } from "../../config";
import Head from "next/head";
import { useRouter } from "next/router";
import { HeartIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import Image from "next/image";
import Header from "../components/Header";

// export default function Details({business}) {
//   return (
//     <div className="flex flex-col">
//       <Header />
//       {/* Left Side */}
//       <div className="relative h-40 w-full mx-auto md:h-96">
//         <Image
//           src="https://s3-media1.fl.yelpcdn.com/bphoto/P8MA9T-NoulN5YUwdL1u9w/o.jpg"
//           layout="fill"
//           objectFit="cover"
//           className=""
//         />
//       </div>

//       {/* Right Side */}
//       <div className="flex-grow flex flex-col px-5 py-5 mt-5 w-full lg:w-5/12 mx-auto bg-gray-100 border-b-2">
//         <div className="flex justify-between">
//           <h2 className="text-2xl font-bold">Name</h2>
//           <HeartIcon className="h-5 cursor-pointer" />
//         </div>
//         <div className="flex justify-between">
//           <span className="text-gray-400">1008 W Armitage</span>
//         </div>
//         <div className="flex space-x-5">
//           <span>Price </span>
//           <p>
//             Rating <span className=""> Review of 5 stars</span>
//           </p>
//         </div>
//       </div>
//       <div className="flex-grow flex flex-col px-5 pt-5 pb-10 w-full lg:w-5/12 mx-auto bg-gray-100">
//         <p className="text-xl pb-2">
//           Tell everyone what meal did you have and how was it?
//         </p>
//         <button className="border-2 py-5 items-center justify-center font-bold bg-blue-600 text-white">
//           TELL YOUR STORY
//         </button>
//       </div>
//       <div className="flex-grow flex flex-col px-5 pt-5 pb-10 mt-5 w-full lg:w-5/12 mx-auto bg-gray-100">
//         <p className="text-xl pb-2">Reviews</p>
//         <div>
//           <p>Kevin J.</p>
//           <p>
//             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Delectus
//             nulla doloremque rem amet iste? Facilis est impedit, qui, quod eos
//             veritatis nemo minima consequatur explicabo praesentium ab ducimus
//             exercitationem non.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

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
      <div>{business.name}</div>
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
