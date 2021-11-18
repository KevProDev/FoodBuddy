import { useState, useEffect } from "react";
import { useAppContext } from "../../context/store";
import Image from "next/image";
import {
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UsersIcon,
  SearchIcon,
} from "@heroicons/react/solid";

export default function Header() {
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
        <li>FoodBuddy</li>
        <li>Saves</li>
      </div>
      {/* Right */}
      <div className="flex items-center space-x-4 justify-end text-gray-600 col-span-1">
        <p className="hidden lg:inline-flex cursor-pointer text-lg">Sign In</p>
        {/* <GlobeAltIcon className="h-6 cursor-pointer" /> */}
        <div className="flex border-2 rounded-full p-2 items-center space-x-2">
          <MenuIcon className="h-6" />
          <UserCircleIcon className="h-8" />
        </div>
      </div>
    </header>
  );
}
