import React from "react";
import { server } from "../../config";
import Head from "next/head";
import { useAppContext } from "../../context/store";
import {
  HeartIcon,
  UserCircleIcon,
  ThumbUpIcon as ThumbUpIconOutline,
} from "@heroicons/react/outline";
import { XCircleIcon, ThumbUpIcon } from "@heroicons/react/solid";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

/////////////////////////

/////////////////
export const getStaticPaths = async (context) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  const res = await fetch(`${server}/api/businesses/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const business = await res.json();

  console.log("How many times");

  // this get write errors sometime
  // const getYelpData = await fetch(`${server}/api/businesses/${params.id}`, {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // });
  // const yelpData = await getYelpData.json().then((yelpData) => {
  //   return fetch(`${server}/api/businesses/review/${params.id}`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(yelpData),
  //   });
  // });

  // const restData = await yelpData.json();
  // console.log(restData);

  return {
    revalidate: 1, // rebuild this static page after every x seconds (when page is visited)
    props: {
      business: business,
      // restaurantReviews,
    },
  };
};

export default function Details(props) {
  // console.log(props);
  console.log("Details Function Begin");

  const business = props.business;
  // console.log("PROPS", business);
  // const restaurantReview = props.business.restaurantReviews;

  console.log("Details Function Phase");

  // const [reviews, setReviews] = useState([]);
  const [mealTitle, setMealTitle] = useState("");
  const [mealDescription, setMealDescription] = useState("");
  const mealTitleRef = useRef();
  const mealDescriptionRef = useRef();
  // useSession causes a rerender
  const { data: session } = useSession();
  const router = useRouter();
  // const id = 1;
  const id = router.query.id ? router.query.id : null;

  // useEffect(() => {
  //   console.log("where am it", id);
  // }, []);

  const fetcher = async (id) => {
    const getRestarantReviews = await fetch(
      `${server}/api/businesses/review/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const reviews = await getRestarantReviews.json();
    return reviews;
  };
  const { isSuccess, isLoading, data, isFetching, isError, error, refetch } =
    useQuery(["reviews", id ? id : null], () => fetcher(id), {
      // refetchOnMount: true,
      // refetchOnWindowFocus: false,
      // cacheTime: 100000,
      enabled: !!id,
    });

  //update

  console.log("SWR", { isLoading, isSuccess, isFetching, data });

  // useEffect(() => {
  //   console.log("Details useEffect Begin", props.business.restaurantReviews);
  //   setReviews(() => {
  //     return restaurantReview;
  //   });
  // }, []);

  const newSubmitData = {
    ...business,
    mealTitle,
    mealDescription,
    session,
  };

  const submitMealReview = async (e) => {
    e.preventDefault();
    const restaurant = await fetch(`/api/businesses/review/${id}`, {
      method: "POST",
      body: JSON.stringify(newSubmitData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await restaurant.json().then((value) => {
      // console.log(value);
      refetch();
    });
  };

  // const likeRestaurant = async (e) => {
  //   e.preventDefault();
  //   console.log("works");
  //   const likeRestuarantToDb = await fetch(`/api/businesses/like/${id}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   const likeResponse = await likeRestuarantToDb.json();
  //   console.log(likeResponse);
  // };

  const deleteReview = async (e, mealId) => {
    e.preventDefault();
    console.log(mealId);
    const deletedReview = await fetch(`/api/businesses/review/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mealId: mealId,
      }),
    });
    await deletedReview.json().then((value) => {
      console.log(value);
      refetch();
    });
  };

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

  console.log("Details Function Finish");

  return (
    <div>
      {console.log("Detail HTML BEGIN")}
      <Head>
        <title>FoodBuddy | {business.name}</title>
      </Head>
      <div className="relative h-[300px] sm:h-[200px] lg:h-[300px] xl:h-[400px] 2xl:h-[700px]">
        <Image
          src={business.image_url}
          layout="fill"
          objectFit="cover"
          priority="true"
        />
      </div>
      <main className=" ">
        <section className="w-11/12 max-w-4xl mx-auto px-4 sm:px-16 pb-4 bg-gray-100 pt-4 flex flex-col md:flex-row gap-2 md:gap-32  lg:gap-24 ">
          <div>
            <div className="flex flex-col justify-between">
              <h1 className="text-xl font-bold md:text-l">{business.name}</h1>
              <p>{business.categories[0].title}</p>
              {/* <div className="flex items-center justify-end">
                <HeartIcon className="h-5 cursor-pointer" />
              </div> */}
            </div>
            <p>
              {business.location.address1}, {business.location.city}{" "}
              {business.location.state}
            </p>
            <p className="text-gray-500">{business.display_phone}</p>
            <p className="text-gray-500 border-gray-200 pb-2">
              Price {business.price}
            </p>

            <div className="" />
          </div>
          <div className="">
            {business.hours && business.hours[0].open
              ? renderHours(business.hours[0])
              : null}
          </div>
        </section>

        <section className="w-11/12 max-w-4xl mx-auto px-4 sm:px-16 pb-4 bg-gray-100 pt-2 mt-4">
          <h2 className="font-semibold text-xl md:text-l ">
            Tell People About This Meal
          </h2>
          {!session && (
            <a
              className="block w-60 text-lg rounded-md py-2 px-4 bg-yellow-300 text-black mb-4"
              href="/api/auth/signin/google"
              onClick={(e) => {
                e.preventDefault();
                signIn("google");
              }}
            >
              Sign in to post a review
            </a>
          )}
          {session?.user && (
            <form className="relative" onSubmit={submitMealReview}>
              <input
                ref={mealTitleRef}
                value={mealTitle}
                onChange={(e) => setMealTitle(e.target.value)}
                aria-label="Name of your Meal"
                placeholder="Name of your Meal..."
                required
                className="px-4 py-2 mt-1 focus:ring-blue-500 focus:border-blue-500 block w-4/5 md:w-1/2 border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <textarea
                ref={mealDescriptionRef}
                value={mealDescription}
                onChange={(e) => setMealDescription(e.target.value)}
                aria-label="What was so great about it"
                placeholder="What was so great about it..."
                rows="4"
                required
                className="px-4 py-2 mt-1 mb-4 focus:ring-blue-500 focus:border-blue-500 block w-4/5 md:w-1/2 border-gray-300 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <button
                className="flex items-center justify-center  right-1 top-1 px-4 font-medium h-8 bg-blue-500 text-white rounded w-38"
                type="submit"
              >
                Post Review
              </button>
            </form>
          )}
          {/* <button onClick={likeRestaurant}> Like </button> */}
        </section>

        <section className="w-11/12 max-w-4xl mx-auto px-4 sm:px-16 pb-16 bg-gray-100 pt-2 mt-4">
          {/* {!reviews && (
            <h2 className="font-semibold text-xl md:text-l pb-4 ">
              People Already Review Their Meal
            </h2>
          )} 
           {reviews && (
            <h2 className="font-semibold text-xl md:text-l pb-4 ">
              {reviews.restaurantReviews.length} People Already Review Their
              Meal
            </h2>
          )}  */}
          {/* {reviews && <div>{console.log(reviews)}</div>} */}
          {/* <h2 className="font-semibold text-xl md:text-l pb-4 ">
            {reviews.length} People Already Review Their Meal
           </h2>*/}

          {isSuccess && (
            <>
              {data && (
                <h2 className="font-semibold text-xl md:text-l pb-4 ">
                  {data?.restaurantReviews.length} People Already Review Their
                  Meal
                </h2>
              )}
            </>
          )}

          {isSuccess && (
            <>
              {data?.restaurantReviews.map((review) => {
                return (
                  <div
                    key={review.id}
                    className="border-gray-200 border-b-2 pb-4 mb-4"
                  >
                    <div className="flex items-center pb-2 justify-between">
                      <div className="flex">
                        {/* <UserCircleIcon className="h-5 cursor-pointer pr-2" /> */}
                        <img
                          src={review.user_image}
                          alt="profile of user"
                          className=" w-12 h-12 rounded-full"
                        />
                        <span className="text-sm pl-4">{review.user_name}</span>
                      </div>
                      {!session && <div></div>}
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
                    </div>
                    <div className="">
                      <h3 className="font-semibold">{review.title} </h3>
                      <p>{review.description}</p>
                      <ThumbUpIconOutline className="h-5 cursor-pointer pr-2 text-blue-500" />
                    </div>
                  </div>
                );
              })}
            </>
          )}

          {/* <div className="border-gray-200 border-b-2 pb-4 mb-4">
            <div className="flex items-center pb-2">
              <UserCircleIcon className="h-5 cursor-pointer pr-2" />
              <span className="text-sm">Kevin Johnson</span>
            </div>
            <div className="">
              <h3 className="font-semibold">Spick Chicken Soup </h3>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Dolores magnam minus animi debitis provident unde dolorem magni
                eos hic aperiam, distinctio modi iste officia numquam sunt earum
                quia maiores odit.
              </p>
            </div>
          </div> */}
        </section>
      </main>
    </div>
  );
}
