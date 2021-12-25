import { useState, useEffect } from "react";
import { useAppContext } from "../../context/store";
import Image from "next/image";
import { SearchIcon, LockClosedIcon } from "@heroicons/react/solid";
import { useRef } from "react/cjs/react.development";
function Banner() {
  console.log("Banner Function Begin Home");
  const loginWIthGoogle = () => {
    login();
  };

  const logoutWithGoogle = () => {
    logout();
  };

  const appState = useAppContext();
  const {
    term,
    location,
    sortBy,
    searchBusinesses,
    clearBusinesses,
    setSearchParams,
  } = appState;

  useEffect(() => {
    console.log("Banner useEffect for TERM");
    setState({ ...state, term: term });
  }, [term]);

  const [state, setState] = useState({
    term: term,
    location: location,
    sortBy: sortBy,
  });

  // enter on search trigger
  useEffect(() => {
    const locationInput = document.getElementById("locationInput");

    locationInput.addEventListener("keyup", function (e) {
      if (e.keyCode === 13) {
        e.preventDefault();
        document.getElementById("searchbutton").click();
      }
    });
  }, []);

  const sortByOptions = {
    "Best Match": "best_match",
    "Highest Rated": "rating",
    "Most Reviewed": "review_count",
    Distance: "distance",
  };

  const handleSortByChange = (sortByOption) => {
    setState({ ...state, sortBy: sortByOption });
  };

  const handleInputChange = (e) =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

  const handleSearch = (e) => {
    clearBusinesses();
    if (state.location === "" || (state.term === "" && state.location === ""))
      return;
    setSearchParams({
      term: state.term,
      location: state.location,
      sortBy: state.sortBy,
    });
    searchBusinesses(state.term, state.location, state.sortBy, 0);
    e.preventDefault();
  };

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
    <div className="relative w-full h-[400px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
      {console.log("Banner HTML BEGIN")}
      <Image
        src="https://images.squarespace-cdn.com/content/v1/551aba82e4b06ddeea1f4958/1636043991946-NN53WAVJ8A68H2AU8TU8/CHIUB-Brunch-Table-Cindys.jpg"
        layout="fill"
        objectFit="cover"
        priority="true"
      />

      <div className=" min-h-full flex items-center justify-center py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <form className="mt-8 space-y-6 bg-white" action="#" method="POST">
            {/* <input type="hidden" name="remember" defaultValue="true" /> */}
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Search A Restaurant
                </label>
                <input
                  id="email-address"
                  name="term"
                  onChange={handleInputChange}
                  value={state.term}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Search A Restaurant"
                />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="locationInput"
                  name="location"
                  onChange={handleInputChange}
                  value={state.location}
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="City"
                />
              </div>
            </div>

            <div>
              <button
                id="searchbutton"
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleSearch}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <SearchIcon
                    className="h-5 w-5 text-blue-500 group-hover:text-indigo-400"
                    aria-hidden="true"
                  />
                </span>
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Banner;
