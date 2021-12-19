import React from "react";
import { server } from "../../config";
import Head from "next/head";
import { useAppContext } from "../../context/store";
import { HeartIcon, UserCircleIcon } from "@heroicons/react/outline";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import { Router, useRouter } from "next/router";

export const getStaticPaths = async (context) => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps = async ({ params }) => {
  console.log(server);
  const res = await fetch(`${server}/api/businesses/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const business = await res.json();

  return {
    revalidate: 1, // rebuild this static page after every x seconds (when page is visited)
    props: {
      business: business,
      // restaurantReviews,
    },
  };
};

export default function Details(props) {
  console.log("Details Function Begin");

  const business = props.business.dataYelp;
  const restaurantReview = props.business.restaurantReviews;

  console.log("Details Function Phase");

  const [reviews, setReviews] = useState([]);
  const [mealTitle, setMealTitle] = useState("");
  const [mealDescription, setMealDescription] = useState("");
  const mealTitleRef = useRef();
  const mealDescriptionRef = useRef();
  // useSession causes a rerender
  const { data: session } = useSession();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    console.log("Details useEffect Begin", props.business.restaurantReviews);
    setReviews(() => {
      return restaurantReview;
    });
  }, []);

  const newSubmitData = {
    ...business,
    mealTitle,
    mealDescription,
  };

  const submitMealReview = async (e) => {
    e.preventDefault();
    const restaurant = await fetch(`/api/${id}`, {
      method: "POST",
      body: JSON.stringify(newSubmitData),
      headers: {
        "Content-Type": "application/json",
      },
    });
    await restaurant.json().then((value) => {
      setReviews(value);
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
    const deletedReview = await fetch(`/api/${id}`, {
      method: "DELETE",
      body: mealId,
    });
    await deletedReview.json().then((value) => {
      setReviews(value);
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

  return <div>Kevin</div>;
}
