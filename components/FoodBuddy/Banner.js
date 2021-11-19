import { useState, useEffect } from "react";
import { useAppContext } from "../../context/store";
import Image from "next/image";
import { SearchIcon } from "@heroicons/react/solid";
import { login, logout, auth } from "../../firebase/clientApp";
import { signInWithPopup, signOut } from "firebase/auth";
function Banner() {
  console.log("Banner Function Begin");
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
        src="https://images.unsplash.com/photo-1565895405227-31cffbe0cf86?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2940&q=80"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute top-1/3 text-white w-full text-center">
        <div className="sm:flex-row gap-3 flex flex-col justify-center bg-indigo-50 w-11/12 mx-auto px-4 mb-5 text-xl md:border-2 rounded-md sm:rounded-full py-2 pt-4 sm:pt-2 md:shadow-sm md:w-2/3">
          <input
            className="text-sm sm:text-xl pl-5 bg-transparent outline-none text-gray-600 placeholder-gray-400"
            placeholder="Start your search"
            name="term"
            onChange={handleInputChange}
            value={state.term}
            placeholder="Search Restaurant"
          />
          {/* <div className="border-b-2 border-gray-300" /> */}
          <input
            className="text-sm sm:text-xl pl-5 bg-transparent outline-none text-gray-600 placeholder-gray-400"
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

        <button
          className="hidden sm:inline-flex justify-center items-center w-11/12 py-5 mx-auto h-8 text-white text-l rounded-full bg-blue-500 p-2 cursor-pointer md:inline-flex md:mx-2 md:w-2/3"
          onClick={loginWIthGoogle}
        >
          <SearchIcon className="text-white h-5 pr-1" />
          SIGN IN
        </button>
        <button
          className="hidden sm:flex justify-center items-center w-11/12 py-5 mx-auto h-8 text-white text-l rounded-full bg-blue-500 p-2 cursor-pointer md:inline-flex md:mx-2 md:w-2/3"
          onClick={logoutWithGoogle}
        >
          <SearchIcon className="text-white h-5 pr-1" />
          SIGN OUT
        </button>
      </div>
    </div>
  );
}

export default Banner;