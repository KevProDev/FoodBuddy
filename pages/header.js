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
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  console.log("header", session);

  const loginWithGoogle = () => {
    signIn();
  };
  const logoutWithGoogle = () => {
    signOut();
  };

  return (
    <header className="sticky top-0 z-50 max-w-7xl mx-auto grid grid-cols-2 py-5 px-5 md:px-10 bg-white lg:grid-cols-5">
      {/* Left */}
      <div className="relative flex items-center h-10 cursor-pointer my-auto col-span-1">
        <Link href="/">
          <a href="">FoodBuddy</a>
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
        {!session && (
          <div className="flex items-center space-x-4">
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
        {session && (
          <div className="space-x-4">
            <p
              className="hidden lg:inline-flex col-span-1 cursor-pointer text-lg rounded-2xl py-2"
              onClick={loginWithGoogle}
            >
              {session.user.name}
            </p>
            <p
              className="hidden lg:inline-flex col-span-1 cursor-pointer text-lg rounded-2xl py-2"
              onClick={logoutWithGoogle}
            >
              Sign Out
            </p>
          </div>
        )}
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
            <div className="flex flex-col px-2 pt-2 pb-3 space-y-1">
              <Link href="/">
                <a
                  onClick={() => setIsOpen(!isOpen)}
                  href=""
                  className="cursor-pointer hover:bg-green-500 text-black hover:text-white block py-2 rounded-md text-base font-medium"
                >
                  Home
                </a>
              </Link>
              <Link href="/restaurantsearch">
                <a
                  onClick={() => setIsOpen(!isOpen)}
                  href=""
                  className="cursor-pointer hover:bg-green-500 text-black hover:text-white block py-2 rounded-md text-base font-medium"
                >
                  Search Resturants
                </a>
              </Link>
              <Link href="/foodbuddy">
                <a
                  onClick={() => setIsOpen(!isOpen)}
                  href=""
                  className="cursor-pointer hover:bg-green-500 text-black hover:text-white block py-2 rounded-md text-base font-medium"
                >
                  FoodBuddies
                </a>
              </Link>
              <Link href="/myfavorites">
                <a
                  onClick={() => setIsOpen(!isOpen)}
                  href=""
                  className="cursor-pointer hover:bg-green-500 text-black hover:text-white block py-2 rounded-md text-base font-medium"
                >
                  Your Favorites
                </a>
              </Link>
              {!session && (
                <div className="flex flex-col items-start">
                  <p
                    className=" font-bold cursor-pointer text-xl rounded-2xl py-2"
                    onClick={loginWithGoogle}
                  >
                    Sign In
                    {session && `as ${session.user.name}`}
                  </p>
                  <p
                    className=" text-xl font-bold  cursor-pointer  rounded-2xl py-2"
                    onClick={logoutWithGoogle}
                  >
                    Sign Out
                  </p>
                </div>
              )}
              {session && (
                <div className="flex flex-col items-start">
                  <p
                    className="font-bold cursor-pointer text-xl rounded-2xl py-2"
                    onClick={loginWithGoogle}
                  >
                    {session.user.name}
                  </p>
                  <p
                    className="font-bold cursor-pointer text-xl rounded-2xl py-2"
                    onClick={logoutWithGoogle}
                  >
                    Sign Out
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </Transition>
    </header>
  );
}