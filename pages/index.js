import { useState, useEffect } from "react";
// import useSWR from "swr";
import Link from "next/link";
import Head from "next/head";
import Banner from "./components/Banner";
import Header from "./components/Header";
import SmallCard from "./components/Business";
import BusinessList from "./components/BusinessList";

// const yelpUrl =
//   "https://api.yelp.com/v3/businesses/search?term=restaurant&location=chicago";
// const apiOption = {
//   method: "GET",
//   withCredentials: true,
//   credentials: "include",
//   headers: {
//     Authorization: `Bearer ${process.env.YELP_API_KEY}`,
//   },
// };

export default function Home() {
  // const appState = useAppContext();
  // const {
  //   term,
  //   location,
  //   sortBy,
  //   searchBusinesses,
  //   clearBusiness,
  //   setSearchParams,
  // } = appState;

  // useEffect(() => {
  //   setState({ ...state, term: term });
  // }, [term]);

  // const [state, setState] = useState({
  //   term: term,
  //   location: location,
  //   sortBy: sortBy,
  // });

  // const sortByOptions = {
  //   "Best Match": "best_match",
  //   "Highest Rated": "rating",
  //   "Most Reviewed": "review_count",
  //   Distance: "distance",
  // };

  // const handleSortByChange = (sortByOption) => {
  //   setState({ ...state, sortBy: sortByOption });
  // };

  // const handleInputSearch = (e) =>
  //   setState({
  //     ...state,
  //     [e.target.name]: e.target.value,
  //   });

  // const handleSearch = (e) => {
  //   clearBusiness();
  //   if (state.location === "" || (state.term === "" && state.location === ""))
  //     return;
  //   setSearchParams({
  //     term: state.term,
  //     location: state.location,
  //     sortBy: state.sortBy,
  //   });
  //   searchBusinesses(state.term, state.location, state.sortBy, 0);
  //   e.preventDefault();
  // };

  // const renderSortByOptions = () => {
  //   // object keys return sortByOptions key properties
  //   // map through that array based on the keys
  //   // create sortByOptionValue the key value based off the key array
  //   return Object.keys(sortByOptions).map((sortByOption) => {
  //     let sortByOptionValue = sortByOptions[sortByOption];
  //     return (
  //       <li
  //         key={sortByOptionValue}
  //         className={
  //           sortByOptionValue === state.sortBy
  //             ? `${styles.sort_option} ${styles.active}`
  //             : styles.sort_option
  //         }
  //         onClick={handleSortByChange.bind(this, sortByOptionValue)}
  //       >
  //         {sortByOption}
  //       </li>
  //     );
  //   });
  // };

  return (
    <div>
      <Header />
      {/* Banner */}
      <Banner />

      <main className="max-w-7xl mx-auto sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5 px-4">Explore Nearby</h2>
          <BusinessList />
          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {businesses.map((business) => {
              const { id, image_url, name, rating, photos, price, location } =
                business;
              return (
                <Link href="/restaurant/[id]" as={`/restaurant/${id}`} key={id}>
                  <a>
                    <SmallCard
                      key={id}
                      image_url={image_url}
                      name={name}
                      rating={rating}
                      photos={photos}
                      price={price}
                      location={`${location.address1} ${location.city}`}
                    />
                  </a>
                </Link>
              );
            })}
          </div> */}
        </section>
      </main>
    </div>
  );
}

// export async function getServerSideProps() {
//   // console.log("getRestaurantsFromYelp STARTED");
//   const yelpPath = await fetch(`${yelpUrl}`, apiOption);
//   const yelpData = await yelpPath.json();

//   return {
//     props: {
//       data: yelpData,
//     },
//   };
// }
