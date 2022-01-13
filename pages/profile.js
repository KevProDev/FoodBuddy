import Head from "next/head";
import { getSession } from "next-auth/react";
import Image from "next/image";

export default function Profile() {
  return (
    <div>
      <Head>
        <title>Profile</title>
      </Head>

      <main className=" max-w-7xl mx-auto px-8">
        <section className=" w-full md:w-1/2">
          <h1 className="font-bold text-2xl tracking-widest pb-8 ">
            USER PROFILE
          </h1>
          <div className="w-[125px] h-[125px] bg-blue-600"></div>
          <form action="">
            <div className="py-4">
              <label className=" text-2xl block mb-1 " htmlFor="Name">
                Name
              </label>
              <input
                type="text"
                placeholder="Name"
                className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              />
            </div>
            <div>
              <label htmlFor="Email Address" className="text-2xl block pb-1">
                Email Address
              </label>
              <input
                type="text"
                placeholder="Email Address"
                className=" bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-600"
              />
            </div>
            <div>
              <label htmlFor="Password" className=" text-2xl block pb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Password"
                className=" bg-gray-200 w-full rounded py-2 px-4 text-gray-700 border-2 border-gray-200 leading-tight focus:outline-none focus:bg-white focus:border-blue-600 "
              />
            </div>
            <div className="pb-4">
              <label htmlFor="Confirm Password" className="text-2xl block pb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Confirm password"
                className=" bg-gray-200 w-full rounded py-2 px-4 text-gray-700 border-2 border-gray-200 leading-tight focus:outline-none focus:bg-white focus:border-blue-600"
              />
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Update
            </button>
          </form>
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
