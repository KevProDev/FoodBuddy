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
import { Link } from "react-scroll";
import { Transition } from "@headlessui/react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 grid grid-cols-2 shadow-md py-5 px-5 md:px-10 bg-white md:grid-cols-6">
      {/* Left */}
      <div className="relative flex items-center h-10 cursor-pointer my-auto col-span-1">
        <Image
          src="https://image.flaticon.com/icons/png/512/921/921265.png"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Middle */}
      <div className="hidden md:flex items-center py-2 font-semibold col-span-4 justify-end pr-5 list-none space-x-8 text-lg ">
        <li>Find A Restaurant</li>
        <li>FoodBuddies</li>
        <li>Saves</li>
      </div>
      {/* Right */}
      <div className="flex items-center space-x-4 justify-end text-gray-600 col-span-1">
        <p className="hidden lg:inline-flex cursor-pointer text-lg">Sign In</p>
        {/* <GlobeAltIcon className="h-6 cursor-pointer" /> */}
        <button
          className="flex items-center space-x-2 border-2 rounded-full p-2"
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          aria-controls="mobile-menu"
          aria-expanded="false"
        >
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-8" />
          {/* <span className="sr-only">Open main menu</span> */}

          {/* {!isOpen ? (
            <div className="flex items-center space-x-2">
              <MenuIcon className="h-6" />
              <UserCircleIcon className="h-8" />
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <MenuIcon className="h-6" />
              <UserCircleIcon className="h-8" />
            </div>
          )} */}
        </button>
      </div>
      {// This works}
      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="md:hidden id:mobile-menu">
            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                href="/"
                activeClass="/"
                to="/"
                smooth={true}
                offset={50}
                duration={500}
                className="cursor-pointer hover:bg-green-500 text-black hover:text-white block px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
            </div>
          </div>
        )}
      </Transition>
    </header>
  );
}
