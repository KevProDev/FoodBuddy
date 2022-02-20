import { useEffect, useState } from "react";
import Link from "next/link";
import { server } from "../../config";
import { useQuery } from "react-query";

export default function MealFood() {
  const fetcher = async () => {
    const getRestaurantReview = await fetch(`${server}/api/newsFeed`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const reviews = await getRestaurantReview.json();
    return reviews;
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
  } = useQuery("followersReview", () => fetcher(), {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  console.log("useQuery", {
    isLoading,
    isSuccess,
    isFetching,
    data,
    isRefetching,
  });

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3  mb-10 md:px-5 md:bg-white">
        <Link href={"/"} prefetch={false}>
          <div className=" w-full h-full py-5 flex justify-center items-center">
            <div className="relative pl-1 flex justify-center rounded-xl hover:scale-105 duration-500 transform transition cursor-pointer">
              {/* <!-- Tag Discount --> */}
              <div className="top-0 left-0 mt-3 px-2 rounded-lg absolute z-30 bg-green-500 text-gray-100 text-xs md:text-sm font-medium md:block">
                Rating
              </div>
              <div className="top-0 left-0 h-2 md:h-3 mt-5 px-2 absolute z-20 bg-green-500"></div>
              <div className="top-0 left-0 h-2 md:h-3 mt-6 pl-5 rounded-3xl absolute z-0 bg-green-600"></div>
              <div className="pb-2 w-[340px] bg-white border-grey-800 border-b border-l border-r rounded-xl shadow-xl z-10">
                <div className="relative">
                  {/* <!-- :src="image.largeImageURL"     --> */}
                  {/* <img
                src={business.imageSrc}
                className=" h-52 w-full object-cover rounded-t-xl"
                alt=""
              /> */}
                  {/* <!-- Tag rekomendasi --> */}
                  <div className="bottom-0 right-0 mb-2 mr-2 px-2 rounded-lg absolute bg-yellow-500 text-gray-100 text-xs font-medium">
                    {/* {business.category} */}
                  </div>
                </div>
                <div className="px-2 py-1">
                  {/* <!-- Product Title --> */}
                  <div className="text-sm md:text-base font-bold pr-2">
                    {/* {business.name} */}
                  </div>

                  <p className="pb-2 md:pb-2 text-xs md:text-lg text-gray-500">
                    {/* {business.address} {business.city} */}
                  </p>

                  {/* <!-- Alamat --> */}

                  {/* <!-- Tombol pesan --> */}
                  <Link href={"/"} prefetch={false}>
                    <a className="inset-x-0 bottom-0 flex justify-center bg-blue-500 rounded-xl w-full p-1 text-gray-100 hover:bg-white text-sm md:text-base border hover:border-blue-500 hover:text-blue-900">
                      View Restaurants
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
