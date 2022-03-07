import Head from "next/head";
import { server } from "../../config/index";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Profile(props) {
  const [name, setName] = useState("");
  const router = useRouter();
  const userName = router.query.profile ? router.query.profile : null;

  const userSession = props.session;
  const [follow, setFollow] = useState(false);

  // console.log("Profile", props);

  const followUser = async (e, userToFollow) => {
    // console.log("userToFollow client", userToFollow);
    e.preventDefault();
    const followUser = await fetch(`/api/account/followUser`, {
      method: "POST",
      body: JSON.stringify(userToFollow),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await followUser.json();
    setFollow(true);
    refetch();
    // console.log("response", response);
  };

  const unfollowUser = async (e, userToUnfollow) => {
    // console.log("userToUnfollow client", userToUnfollow);
    e.preventDefault();
    const followUser = await fetch(`/api/account/unfollowUser`, {
      method: "POST",
      body: JSON.stringify(userToUnfollow),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const response = await followUser.json();
    setFollow(false);
    refetch();
    // console.log("response", response);
  };

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
  const checkFollowStatus = async () => {
    const followStatus = await data?.followers?.find(
      (x) => x.user_id === userSession.id
    );
    console.log("followStatus", followStatus);
    if (!followStatus) {
      // console.log("set to false");
      setFollow(false);
    } else {
      // console.log("set to true");
      setFollow(true);
    }
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

  useEffect(() => {
    checkFollowStatus();
  }, [data]);

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
      <div className="h-8 w-full bg-blue-500 mb-4"></div>

      {isSuccess && data && (
        <main className=" max-w-7xl mx-auto px-8">
          <div className="w-full md:w-1/2 md:mx-2">
            <div className="grid grid-cols-4 pb-4 ">
              <h1 className=" col-span-3 text-gray-900 font-bold  text-md sm:text-2xl md:text-lg leading-8 my-auto">
                {data.name}
              </h1>
              {follow ? (
                <>
                  <button
                    className=" col-span-1  py-2 rounded-full bg-blue-500 text-white outline-none"
                    onClick={(e) => unfollowUser(e, data.id)}
                  >
                    Following
                  </button>
                </>
              ) : (
                <>
                  <button
                    className=" col-span-1  py-2 rounded-full bg-blue-500 text-white outline-none"
                    onClick={(e) => followUser(e, data.id)}
                  >
                    Follow
                  </button>
                </>
              )}
              {/* <button
                className=" col-span-1  py-2 rounded-full bg-blue-500 text-white"
                onClick={(e) => followUser(e, data.id)}
              >
                Follow
              </button> */}
            </div>
            <div className="bg-white p-3 border-t-4 border-blue-500">
              <div className="image overflow-hidden grid grid-cols-4">
                <img
                  className="h-auto w-full mx-auto col-span-1 pr-8 md:pr-8"
                  src={data.image ? data.image : "/favicon.ico"}
                  alt="profile of user"
                />
                <div className="flex col-span-3 justify-between">
                  <div className="flex flex-col">
                    <span className="font-bold">
                      {data.fav_meal ? data.fav_meal.length : 0}
                    </span>
                    <span>Meals</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">
                      {data.following ? data.following.length : 0}
                    </span>
                    <span>Following</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold">
                      {data.followers ? data.followers.length : 0}
                    </span>

                    <span>Followers</span>
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
          {data?.users_meals_review?.map((meal) => {
            return (
              <div key={meal.id} className=" w-full h-full py-5 items-center">
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
                              meal.user_image ? meal.user_image : "/favicon.ico"
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
                                onClick={(e) => unLikemeal(e, review.id)}
                              />
                            ) : (
                              <ThumbUpIconOutline
                                className="h-5 cursor-pointer pr-2 text-blue-500"
                                onClick={(e) => likemeal(e, review.id)}
                              />
                            )}

                            {data.user.fav_meal.some(
                              (meal) => meal.meal_id === review.id
                            ) ? (
                              <BookmarkIcon
                                className="h-5 cursor-pointer pr-2 text-blue-500"
                                onClick={(e) => removeSavemeal(e, review.id)}
                              />
                            ) : (
                              <BookmarkIconOutline
                                className="h-5 cursor-pointer pr-2 text-blue-500"
                                onClick={(e) => savemeal(e, review.id)}
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
            );
          })}
        </main>
      )}
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
