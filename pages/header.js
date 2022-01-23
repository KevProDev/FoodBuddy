import { useState } from "react";
import { MenuIcon, UserCircleIcon } from "@heroicons/react/solid";
import { Transition } from "@headlessui/react";
import { signIn, signOut, useSession, getSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { getCsrfToken } from "next-auth/react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const loginWithGoogle = () => {
    signIn("google");
  };
  const logoutWithGoogle = () => {
    signOut("google");
  };

  const loginDemo = () => {
    signIn("domain-login", {
      username: "Demo",
      password: "Demo",
    });
  };

  return (
    <header className="bg-white sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto grid grid-cols-2 py-3 px-5 md:px-10 bg-white lg:grid-cols-5">
        {/* Left */}
        <div className="relative flex items-center h-10 cursor-pointer my-auto col-span-1">
          <Link href="/">
            <a href="">
              <img src="/BLACK.png" alt="company logo" />
            </a>
          </Link>
        </div>

        {/* Middle */}
        {/* <div className="hidden lg:flex items-center py-2 font-semibold col-span-2 justify-end pr-5 list-none space-x-8 text-lg ">
        <Link href="/restaurantsearch">
          <a href="">Restaurant Search</a>
        </Link>
      </div> */}
        {/* Right */}
        <div className="flex grid-cols-2 items-center space-x-4 justify-end text-gray-600 col-span-1 lg:col-span-4">
          {!session && (
            <div className="flex items-center space-x-4">
              {/* <Link href="/restaurantsearch">
              <a href="" className="font-bold hidden lg:inline-block">
                Restaurant Search
              </a>
            </Link> */}
              <button
                className="hidden lg:inline-flex col-span-1 cursor-pointer text-md rounded-md py-2 px-3 text-white border-blue-500 border hover:text-blue-500 bg-blue-500 hover:bg-white hover:border hover:border-blue-500 "
                onClick={loginWithGoogle}
              >
                Sign in
                {session && `as ${session.user.name}`}
              </button>
              <button
                className="hidden lg:inline-flex col-span-1 cursor-pointer text-md rounded-md py-2 px-3 text-white border-blue-500 border hover:text-blue-500 bg-blue-500 hover:bg-white hover:border hover:border-blue-500 "
                onClick={loginDemo}
              >
                Demo Login
                {session && `as ${session.user.name}`}
              </button>
              {/* <Link href="/api/auth/credentials-signin">
                <a href="">
                  <button className="hidden lg:inline-flex col-span-1 cursor-pointer text-md rounded-md py-2 px-3 text-white border-blue-500 border hover:text-blue-500 bg-blue-500 hover:bg-white hover:border hover:border-blue-500 ">
                    Demo Login
                    {session && `as ${session.user.name}`}
                  </button>
                </a>
              </Link> */}
              {/* <p
              className="hidden lg:inline-flex col-span-1 cursor-pointer text-md rounded-2xl py-2"
              onClick={logoutWithGoogle}
            >
              Sign Out
            </p> */}
            </div>
          )}
          {session && (
            <div className="space-x-4">
              {/* <Link href="/restaurantsearch">
              <a href="" className=" font-bold hidden lg:inline-block">
                Restaurant Search
              </a>
            </Link> */}
              {/* <p
              className="hidden lg:inline-flex col-span-1 cursor-pointer text-md rounded-2xl py-2"
              onClick={loginWithGoogle}
            >
              {session.user.name}
            </p> */}
              <button
                className="hidden lg:inline-flex col-span-1 cursor-pointer text-md rounded-md py-2 px-3 text-white border-blue-500 border hover:text-blue-500 bg-blue-500 hover:bg-white hover:border hover:border-blue-500"
                onClick={logoutWithGoogle}
              >
                Sign Out
              </button>
              {/* <Link href="/profile">
                <a
                  href=""
                  className=" font-bold hidden lg:inline-block py-2 px-2"
                >
                  Profile
                </a>
              </Link> */}
            </div>
          )}
          <button
            className="flex lg:hidden items-center space-x-2 rounded-full p-2 text-black"
            onClick={() => setIsOpen(!isOpen)}
            type="button"
            aria-controls="mobile-menu"
            aria-expanded="true"
          >
            <MenuIcon className="h-6" />
            {/* <UserCircleIcon className="h-8" /> */}
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
            <div className="lg:hidden id:mobile-menu">
              <div className="flex flex-col px-2 pt-2 pb-3 space-y-1">
                {/* <Link href="/">
                <a
                  onClick={() => setIsOpen(!isOpen)}
                  href=""
                  className="cursor-pointer hover:bg-green-500 text-black hover:text-white block py-2 rounded-md text-base font-medium"
                >
                  Home
                </a>
              </Link> */}
                {/* <Link href="/restaurantsearch">
                <a
                  onClick={() => setIsOpen(!isOpen)}
                  href=""
                  className="cursor-pointer hover:bg-green-500 text-black hover:text-white block py-2 rounded-md text-base font-medium"
                >
                  Resturants Search
                </a>
              </Link> */}

                {!session && (
                  <div className="flex flex-col items-start">
                    <button
                      className=" font-bold cursor-pointer text-xl rounded-2xl py-2"
                      onClick={loginWithGoogle}
                    >
                      Sign In
                      {session && `as ${session.user.name}`}
                    </button>
                    <button
                      className="font-bold cursor-pointer text-xl rounded-2xl py-2"
                      onClick={loginDemo}
                    >
                      Demo Login
                      {session && `as ${session.user.name}`}
                    </button>
                  </div>
                )}
                {session && (
                  <div className="flex flex-col items-start">
                    <button
                      className="font-bold cursor-pointer text-xl rounded-2xl py-2"
                      onClick={loginWithGoogle}
                    >
                      {session.user.name}
                    </button>
                    <button
                      className="font-bold cursor-pointer text-xl rounded-2xl py-2"
                      onClick={logoutWithGoogle}
                    >
                      Sign Out
                    </button>
                    <Link href="/profile">
                      <a href="" className=" font-bold hidden lg:inline-block">
                        Profile
                      </a>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </header>
  );
}
