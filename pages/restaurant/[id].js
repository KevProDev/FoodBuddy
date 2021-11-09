import React from "react";
import { server } from "../../config";
import Head from "next/head";
import { useRouter } from "next/router";
import { HeartIcon, UserCircleIcon } from "@heroicons/react/outline";
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
      <div className="relative h-[300px] sm:h-[200px] lg:h-[300px] xl:h-[400px] 2xl:h-[700px]">
        <Image src={business.image_url} layout="fill" objectFit="cover" />
      </div>
      <main className="max-w-4xl mx-auto px-8 sm:px-16">
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
