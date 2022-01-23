import Head from "next/head";
import { server } from "../../config/index";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useQuery } from "react-query";
import { useState } from "react";
import { useRouter } from "next/router";

export default function Profile(props) {
  const [name, setName] = useState("");
  const router = useRouter();
  const userName = router.query.profile ? router.query.profile : null;

  console.log("Profile", props);

  const fetcher = async (userName) => {
    const profileData = await fetch(`${server}/api/account/${userName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const profile = await profileData.json();
    return profile;
  };
  const {
    isSuccess,
    isLoading,
    data,
    isFetching,
    isError,
    error,
    refetch,
    isRefetching,
  } = useQuery("profile", () => fetcher(userName), {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    // cacheTime: 100000,
    enabled: true,
  });

  // console.log("DATA", data);
  console.log("Query", {
    isLoading,
    isSuccess,
    isFetching,
    data,
    isRefetching,
  });

  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>
      <div className="h-20 w-full bg-blue-500 mb-4"></div>

      <main className=" max-w-7xl mx-auto px-8">
        <div className="w-full md:w-1/3 md:mx-2">
          <div className="grid grid-cols-4 pb-4 ">
            <h1 className=" col-span-3 text-gray-900 font-bold text-3xl leading-8 my-auto">
              {isSuccess && data && data.name}
            </h1>
            <button className=" col-span-1  py-2 rounded-full bg-blue-500 text-white">
              Follow
            </button>
          </div>
          <div className="bg-white p-3 border-t-4 border-blue-500">
            <div className="image overflow-hidden grid grid-cols-4">
              <img
                className="h-auto w-full mx-auto col-span-1 pr-8 md:pr-8"
                src="/vercel.svg"
                alt=""
              />
              <div className="flex col-span-3 justify-between">
                <div className="flex flex-col">
                  <span className="font-bold">7</span>
                  <span>Meals</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">16</span>
                  <span>Followers</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold">2</span>
                  <span>Following</span>
                </div>
              </div>
            </div>

            {/* <h3 className="text-gray-600 font-lg text-semibold leading-6">
              Owner at Her Company Inc.
            </h3>
            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reprehenderit, eligendi dolorum sequi illum qui unde aspernatur
              non deserunt
            </p>
            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li className="flex items-center py-3">
                <span>Status</span>
                <span className="ml-auto">
                  <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                    Active
                  </span>
                </span>
              </li>
              <li className="flex items-center py-3">
                <span>Member since</span>
                <span className="ml-auto">Nov 07, 2016</span>
              </li>
            </ul> */}
          </div>

          <div className="my-4"></div>

          {/* <div className="bg-white p-3 hover:shadow">
            <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
              <span className="text-green-500">
                <svg
                  className="h-5 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
              <span>Similar Profiles</span>
            </div>
            <div className="grid grid-cols-3">
              <div className="text-center my-2"></div>
              <div className="text-center my-2"></div>
              <div className="text-center my-2"></div>
              <div className="text-center my-2"></div>
            </div>
          </div> */}
        </div>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) {
    return {
      props: {},
    };
  }
  return {
    props: {
      session,
    },
  };
}
