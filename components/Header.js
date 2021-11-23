import { useState, useEffect } from "react";
import { useAppContext } from "../context/store";
import Image from "next/image";
import {
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
  SearchIcon,
} from "@heroicons/react/solid";
import { Link as ScrollLink } from "react-scroll";
import { Transition } from "@headlessui/react";
// import { login, logout } from "../firebase/clientApp";
import { signIn, signOut, useSession } from "next-auth/client";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [session] = useSession();

  const loginWithGoogle = () => {
    signIn("google");
  };
  const logoutWithGoogle = () => {
    signOut("google");
  };

  return (
    <header className="sticky top-0 z-50 max-w-7xl mx-auto grid grid-cols-2 py-5 px-5 md:px-10 bg-white lg:grid-cols-5">
      {/* Left */}
      <div className="relative flex items-center h-10 cursor-pointer my-auto col-span-1">
        <Link href="/">
          <a href="">
            <Image
              src="https://image.flaticon.com/icons/png/512/921/921265.png"
              layout="fill"
              objectFit="contain"
              objectPosition="left"
            />
          </a>
        </Link>
      </div>

      {/* Middle */}
      <div className="hidden lg:flex items-center py-2 font-semibold col-span-3 justify-end pr-5 list-none space-x-8 text-lg ">
        <Link href="/restaurantsearch">
          <a href="">Find A Restaurant</a>
        </Link>
        <Link href="/foodbuddy">
          <a href="">FoodBuddies</a>
        </Link>
        <Link href="/myFavorites">
          <a href="">Saves</a>
        </Link>
      </div>
      {/* Right */}
      <div className="flex grid-cols-2 items-center space-x-4 justify-end text-gray-600 col-span-1 sm:col-span-1">
        {session ? (
          <div className="flex items-center space-x-4">
            <p>{session.user.name}</p>
            <p
              className="hidden lg:inline-flex col-span-1 cursor-pointer text-lg rounded-2xl py-2"
              onClick={logoutWithGoogle}
            >
              Sign Out
            </p>
          </div>
        ) : (
          <div className="space-x-4">
            <p
              className="hidden lg:inline-flex col-span-1 cursor-pointer text-lg rounded-2xl py-2"
              onClick={loginWithGoogle}
            >
              Sign In
              {session && `as ${session.user.name}`}
            </p>
            <p
              className="hidden lg:inline-flex col-span-1 cursor-pointer text-lg rounded-2xl py-2"
              onClick={logoutWithGoogle}
            >
              Sign Out
            </p>
          </div>
        )}
        {/* <GlobeAltIcon className="h-6 cursor-pointer" /> */}
        <button
          className="flex lg:hidden items-center space-x-2 border-2 rounded-full p-2"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-controls="mobile-menu"
          aria-expanded="true"
        >
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-8" />
        </button>
      </div>
      <Transition
        className="flex col-span-3"
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {() => (
          <div className="md:hidden id:mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <ScrollLink
                href="/"
                activeClass="/"
                to="/"
                smooth={true}
                offset={50}
                duration={500}
                className="cursor-pointer hover:bg-green-500 text-black hover:text-white block py-2 rounded-md text-base font-medium"
              >
                Home
              </ScrollLink>
              <ScrollLink
                href="/restaurantsearch"
                activeClass="/"
                to="/restaurantSearch"
                smooth={true}
                offset={50}
                duration={500}
                className="cursor-pointer hover:bg-green-500 text-black hover:text-white block py-2 rounded-md text-base font-medium"
              >
                Search Resturants
              </ScrollLink>
              <ScrollLink
                href="/foodbuddy"
                activeClass="/"
                to="/foodbuddy"
                smooth={true}
                offset={50}
                duration={500}
                className="cursor-pointer hover:bg-green-500 text-black hover:text-white block py-2 rounded-md text-base font-medium"
              >
                FoodBuddies
              </ScrollLink>
              <ScrollLink
                href="/myfavorites"
                activeClass="/"
                to="/myfavorites"
                smooth={true}
                offset={50}
                duration={500}
                className="cursor-pointer hover:bg-green-500 text-black hover:text-white block py-2 rounded-md text-base font-medium"
              >
                Your Favorites
              </ScrollLink>
              <ScrollLink
                href="/myfavorites"
                activeClass="/"
                to="/myfavorites"
                smooth={true}
                offset={50}
                duration={500}
                className="cursor-pointer hover:bg-green-500 text-black hover:text-white block py-2 rounded-md text-base font-sm"
              >
                Sign In
              </ScrollLink>
              <ScrollLink
                href="/"
                activeClass="/"
                to="/"
                smooth={true}
                offset={50}
                duration={500}
                className="cursor-pointer hover:bg-green-500 text-black hover:text-white block py-2 rounded-md text-base font-sm"
              >
                Sign Out
              </ScrollLink>
            </div>
          </div>
        )}
      </Transition>
    </header>
  );
}
