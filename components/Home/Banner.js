import { useState, useEffect } from "react";
import { useAppContext } from "../../context/store";
import Image from "next/image";
import { SearchIcon } from "@heroicons/react/solid";
// import { login, logout, auth } from "../../firebase/clientApp";
// import { signInWithPopup, signOut } from "firebase/auth";
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
    currentUser,
  } = appState;

  // console.log("check after login", currentUser);
  // const term = appState.term;

  useEffect(() => {
    console.log("Banner useEffect for TERM");
    setState({ ...state, term: term });
  }, [term]);

  const [state, setState] = useState({
    term: term,
    location: location,
    sortBy: sortBy,
  });

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

  const renderSortByOptions = () => {
    // object keys return sortByOptions key properties
    // map through that array based on the keys
    // create sortByOptionValue the key value based off the key array
    return Object.keys(sortByOptions).map((sortByOption) => {
      let sortByOptionValue = sortByOptions[sortByOption];
      return (
        <li
          key={sortByOptionValue}
          className={
            sortByOptionValue === state.sortBy
              ? `${styles.sort_option} ${styles.active}`
              : styles.sort_option
          }
          onClick={handleSortByChange.bind(this, sortByOptionValue)}
        >
          {sortByOption}
        </li>
      );
    });
  };

  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
      {console.log("Banner HTML BEGIN")}
      <Image
        src="https://images.squarespace-cdn.com/content/v1/551aba82e4b06ddeea1f4958/1636043991946-NN53WAVJ8A68H2AU8TU8/CHIUB-Brunch-Table-Cindys.jpg"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute top-1/3 text-white w-full text-center">
        <div className="sm:flex-row gap-3 flex flex-col justify-center bg-indigo-50 w-11/12 md:w-2/3 lg:w-1/2 mx-auto px-4 mb-5 text-xl md:border-2 rounded-md sm:rounded-full py-2 pt-4 sm:pt-2 md:shadow-sm ">
          <input
            className="text-sm sm:text-xl md:text-xl pl-5 bg-transparent outline-none text-gray-600 placeholder-gray-400"
            placeholder="Start your search"
            name="term"
            onChange={handleInputChange}
            value={state.term}
            placeholder="Search Restaurant"
          />
          {/* <div className="border-b-2 border-gray-300" /> -*/}
          <input
            className="text-sm sm:text-xl md:text-xl pl-5 bg-transparent outline-none text-gray-600 placeholder-gray-400"
            placeholder="Start your search"
            name="location"
            onChange={handleInputChange}
            value={state.location}
            placeholder="City"
          />
          <button
            className="flex w-full sm:w-auto justify-center items-center py-5 ml-auto h-8 text-white text-l rounded-full bg-green-500 p-2 cursor-pointer"
            onClick={handleSearch}
          >
            <SearchIcon className="text-white h-5 pr-1" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Banner;
