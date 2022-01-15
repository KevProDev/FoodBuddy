import Head from "next/head";
import { server } from "../config/index";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useQuery } from "react-query";
import { useState } from "react";

export default function Profile(props) {
  const [name, setName] = useState("");

  const fetcher = async () => {
    const profileData = await fetch(`${server}/api/profile`, {
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
  } = useQuery("profile", () => fetcher(), {
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

      <main className=" max-w-7xl mx-auto px-8">
        <section className=" w-full md:w-1/2">
          {isLoading && <div>Loading....</div>}
          <h1 className="font-bold text-2xl tracking-widest pb-8 ">
            USER PROFILE
          </h1>
          {isSuccess && (
            <div>
              <div className=" overflow-hidden relative w-[125px] h-[125px] rounded-full ">
                <Image
                  src={data.user.image}
                  layout="fill"
                  objectFit="cover"
                  priority="true"
                />
              </div>
              <form action="">
                <div className="py-4">
                  <label
                    className=" text-2xl block mb-1 font-bold "
                    htmlFor="Name"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    placeholder={data.user.name}
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-900 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                  />
                </div>

                <p className=" text-2xl font-bold ">Email Address:</p>
                <p className="text-2xl pb-4 ">{data.user.email}</p>

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Update
                </button>
              </form>
            </div>
          )}
        </section>
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
