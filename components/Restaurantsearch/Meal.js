import { useEffect, useState } from "react";
import Link from "next/link";
import { server } from "../../config";
import { useQuery } from "react-query";

export default function MealFood() {
  const [mealFeed, setMealFeed] = useState([]);

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

  const loadMore = async (e) => {
    e.preventDefault();
    const getMeals = await fetch(`/api/newsFeed/pagination`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        previousCursor: data.previousCursor,
        userIdMealArray: data.userIdMealArray,
      }),
    });

    const mealsBack = await getMeals.json();
    setMealFeed(mealsBack);
  };

  // useEffect(()=> {

  // },[])

  return (
    <div>
      {isSuccess && data && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3  mb-4 md:px-5 md:bg-white">
          {data.meals.map((meal) => {
            return (
              <div key={meal.id}>
                <div className=" w-full h-full py-5 items-center">
                  <div className=" relative pl-1 flex rounded-xl ">
                    {/* <!-- Tag Discount --> */}
                    {/* <div className="top-0 left-0 mt-3 px-2 rounded-lg absolute z-30 bg-green-500 text-gray-100 text-xs md:text-sm font-medium md:block">
                      Rating
                    </div>
                    <div className="top-0 left-0 h-2 md:h-3 mt-5 px-2 absolute z-20 bg-green-500"></div> */}
                    {/* <div className="top-0 left-0 h-2 md:h-3 mt-6 pl-5 rounded-3xl absolute z-0 bg-green-600"></div> */}
                    <div className=" gap-4 pb-2 w-full bg-white  z-10">
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

                      <div className="">
                        <Link href={`/profile/${meal.user_name}`}>
                          <div className="flex items-center gap-2 pb-2">
                            <img
                              src={
                                meal.user_image
                                  ? meal.user_image
                                  : "/favicon.ico"
                              }
                              alt="profile of user"
                              className=" w-8 h-8 rounded-full cursor-pointer"
                            />
                            <a href="">
                              <span className="text-xs ">{meal.user_name}</span>
                            </a>
                          </div>
                        </Link>
                        <div className="">
                          <Link
                            key={meal.id}
                            href={`/restaurant/${meal.rest_id}`}
                            prefetch={false}
                          >
                            <h3 className="font-semibold cursor-pointer">
                              {meal.rest_name}{" "}
                            </h3>
                          </Link>
                          <h3 className="">{meal.title} </h3>
                          <p className=" font-light text-gray-600 text-sm pb-3 ">
                            {meal.description}
                          </p>
                        </div>

                        {/* {session && ( */}
                        {/* <div className="flex">
                          {data.user && (
                            <>
                              {data.user.likes.some(
                                (like) => like.meal_id === review.id
                              ) ? (
                                <ThumbUpIcon
                                  className="h-5 cursor-pointer pr-2 text-blue-500"
                                  onClick={(e) => unLikeMeal(e, review.id)}
                                />
                              ) : (
                                <ThumbUpIconOutline
                                  className="h-5 cursor-pointer pr-2 text-blue-500"
                                  onClick={(e) => likeMeal(e, review.id)}
                                />
                              )}

                              {data.user.fav_meal.some(
                                (meal) => meal.meal_id === review.id
                              ) ? (
                                <BookmarkIcon
                                  className="h-5 cursor-pointer pr-2 text-blue-500"
                                  onClick={(e) => removeSaveMeal(e, review.id)}
                                />
                              ) : (
                                <BookmarkIconOutline
                                  className="h-5 cursor-pointer pr-2 text-blue-500"
                                  onClick={(e) => saveMeal(e, review.id)}
                                />
                              )}
                            </>
                          )}

                          {session?.id === review.user_id && (
                            <XCircleIcon
                              className="h-6 cursor-pointer pr-2 text-blue-500"
                              onClick={(e) => {
                                deleteReview(e, review.id);
                              }}
                            >
                              Delete
                            </XCircleIcon>
                          )}
                        </div> */}
                        {/* // )} */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <Link prefetch={false}>
                  <a className="inset-x-0 bottom-0 flex justify-center bg-blue-500 rounded-xl w-full p-1 text-gray-100 hover:bg-white text-sm md:text-base border hover:border-blue-500 hover:text-blue-900">
                    See or Recommended A Meal
                  </a>
                </Link> */}
              </div>
            );
          })}
          {mealFeed.meals?.map((meald) => {
            return (
              <div key={meald.id}>
                <div className=" w-full h-full py-5 items-center">
                  <div className=" relative pl-1 flex rounded-xl ">
                    {/* <!-- Tag Discount --> */}
                    {/* <div className="top-0 left-0 mt-3 px-2 rounded-lg absolute z-30 bg-green-500 text-gray-100 text-xs md:text-sm font-medium md:block">
                      Rating
                    </div>
                    <div className="top-0 left-0 h-2 md:h-3 mt-5 px-2 absolute z-20 bg-green-500"></div> */}
                    {/* <div className="top-0 left-0 h-2 md:h-3 mt-6 pl-5 rounded-3xl absolute z-0 bg-green-600"></div> */}
                    <div className=" gap-4 pb-2 w-full bg-white  z-10">
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

                      <div className="">
                        <Link href={`/profile/${meald.user_name}`}>
                          <div className="flex items-center gap-2 pb-2">
                            <img
                              src={
                                meald.user_image
                                  ? meald.user_image
                                  : "/favicon.ico"
                              }
                              alt="profile of user"
                              className=" w-8 h-8 rounded-full cursor-pointer"
                            />
                            <a href="">
                              <span className="text-xs ">
                                {meald.user_name}
                              </span>
                            </a>
                          </div>
                        </Link>
                        <div className="">
                          <Link
                            key={meald.id}
                            href={`/restaurant/${meald.rest_id}`}
                            prefetch={false}
                          >
                            <h3 className="font-semibold cursor-pointer">
                              {meald.rest_name}{" "}
                            </h3>
                          </Link>
                          <h3 className="">{meald.title} </h3>
                          <p className=" font-light text-gray-600 text-sm pb-3 ">
                            {meald.description}
                          </p>
                        </div>

                        {/* {session && ( */}
                        {/* <div className="flex">
                          {data.user && (
                            <>
                              {data.user.likes.some(
                                (like) => like.meald_id === review.id
                              ) ? (
                                <ThumbUpIcon
                                  className="h-5 cursor-pointer pr-2 text-blue-500"
                                  onClick={(e) => unLikeMeald(e, review.id)}
                                />
                              ) : (
                                <ThumbUpIconOutline
                                  className="h-5 cursor-pointer pr-2 text-blue-500"
                                  onClick={(e) => likeMeald(e, review.id)}
                                />
                              )}

                              {data.user.fav_meald.some(
                                (meald) => meald.meald_id === review.id
                              ) ? (
                                <BookmarkIcon
                                  className="h-5 cursor-pointer pr-2 text-blue-500"
                                  onClick={(e) => removeSaveMeald(e, review.id)}
                                />
                              ) : (
                                <BookmarkIconOutline
                                  className="h-5 cursor-pointer pr-2 text-blue-500"
                                  onClick={(e) => saveMeald(e, review.id)}
                                />
                              )}
                            </>
                          )}

                          {session?.id === review.user_id && (
                            <XCircleIcon
                              className="h-6 cursor-pointer pr-2 text-blue-500"
                              onClick={(e) => {
                                deleteReview(e, review.id);
                              }}
                            >
                              Delete
                            </XCircleIcon>
                          )}
                        </div> */}
                        {/* // )} */}
                      </div>
                    </div>
                  </div>
                </div>
                {/* <Link prefetch={false}>
                  <a className="inset-x-0 bottom-0 flex justify-center bg-blue-500 rounded-xl w-full p-1 text-gray-100 hover:bg-white text-sm md:text-base border hover:border-blue-500 hover:text-blue-900">
                    See or Recommended A Meald
                  </a>
                </Link> */}
              </div>
            );
          })}
          <button
            className="bg-black text-white py-2 mt-2 w-1/3 mx-auto items-center justify-center block mb-10"
            onClick={loadMore}
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
