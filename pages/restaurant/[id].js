import React from "react";
import { server } from "../../config";
import Head from "next/head";
import { useAppContext } from "../../context/store";
import { HeartIcon, UserCircleIcon } from "@heroicons/react/outline";
import { useState, useEffect } from "react";
import Image from "next/image";

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
      business: business,
    },
  };
};

// export async function getServerSideProps(context) {
//   const cookies = nookies.get(context);
//   const token = await verifyIdToken(cookies.token);
//   const { email } = token;
//   const collectionRef = collection(db, "users");
//   const q = query(collectionRef, where("email", "==", email));
//   const querySnapshot = await getDocs(q);
//   let usersList = [];
//   querySnapshot.forEach((doc) => {
//     usersList.push({ ...doc.data(), id: doc.id });
//   });

//   return {
//     props: {
//       usersProps: JSON.stringify(usersList) || [],
//     },
//   };
// }

export default function Details(props) {
  console.log("Details Function Begin");
  const business = props.pageProps.business;
  // const appState = useAppContext();
  // const { currentUser } = appState;
  const [currentUser, setCurrentUser] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  // console.log("current user in id page", currentUser);

  useEffect(() => {
    async function getPosts() {
      const posts = collection(db, "favoriteMenuItem");

      const postsSnapshot = await getDocs(posts);

      postsSnapshot.docs.map((doc) => console.log(doc.data()));
      setMenuItems(
        postsSnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.rest_id }))
      );
    }
    getPosts();
  }, []);

  useEffect(function CheckAuthOfUserHandler() {
    return auth.onIdTokenChanged(async (user) => {
      if (!user) {
        console.log("no user");
        setCurrentUser(null);
        return;
      }
      const token = await user.getIdToken();
      console.log("user in id after token recieve", user);
      setCurrentUser(user);
    });
  }, []);

  // useEffect(() => {
  //   async function fetchmenuItems() {
  //     const usersRef = collection(db, "restaurant");
  //     const q = query(usersRef, where("email", "!=", currentUser.user?.email));
  //     const querySnapshot = await getDocs(q);
  //     setFriends(
  //       querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
  //     );
  //   }
  //   fetchmenuItems();
  // }, []);

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
      {console.log("Banner HTML BEGIN")}
      <Head>
        <title>FoodBuddy | {business.name}</title>
      </Head>
      <div className="relative h-[300px] sm:h-[200px] lg:h-[300px] xl:h-[400px] 2xl:h-[700px]">
        <Image src={business.image_url} layout="fill" objectFit="cover" />
      </div>
      <main className="max-w-4xl mx-auto px-8 sm:px-16 pb-16 bg-gray-100">
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
          {menuItems.map((menuItem) => (
            <div>
              <div className="flex items-center pb-2">
                <UserCircleIcon className="h-5 cursor-pointer pr-2" />
                <span className="text-sm">{menuItem.user_id}</span>
              </div>
              <div className="border-gray-200 border-b-2 pb-2">
                <h3 className="font-semibold">{menuItem.menu_item}</h3>
                <p>{menuItem.thoughts}</p>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
