import React from "react";
import { useRouter } from "next/router";
import { HeartIcon } from "@heroicons/react/outline";

export default function singlepage({ restaurants }) {
  const router = useRouter();

  const { id } = router.query;
  return (
    <div className="flex flex-col rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out border-2 p-5">
      {/* Left Side */}
      <div className="relative h-40 w-full mx-auto">
        {/* <Image
          src={image_url}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        /> */}
      </div>

      {/* Right Side */}
      <div className="flex-grow flex flex-col px-4 mt-2">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">Budlong</h2>
          <HeartIcon className="h-5 cursor-pointer" />
        </div>
        <p className="text-gray-500 text-sm sm:text-xs">{id}</p>
        <h3 className="text-gray-500">{id} out of 5</h3>
        <div className="border-b w-10 pt-2" />
        <p className="text-sm pt-2 text-gray-600">
          The Best spicy chicken sandwich
        </p>
        <h3 className="text-gray-500">{id}</h3>
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
