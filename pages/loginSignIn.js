import Image from "next/image";
import { LockClosedIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { signIn, getCsrfToken } from "next-auth/react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { server } from "../config";

export async function getServerSideProps(context) {
  // const previousUrl = context.req.headers.referer;

  return {
    props: {
      crsfToken: await getCsrfToken(context),
      // previousUrl: previousUrl,
    },
  };
}

export default function loginSignIn({ csrfToken, previousUrl }) {
  const [error, setError] = useState(null);
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);

  let redirectUrl = server;

  const login = (e) => {
    e.preventDefault();
    signIn("google", {
      callbackUrl: redirectUrl,
    });
  };

  useEffect(() => {
    const url = new URL(location.href);
    redirectUrl = url.searchParams.get("callbackUrl");
  });

  const modalState = () => {
    setModalOpen(!modalOpen);
  };

  const modalHandler = (() => {
    if (modalOpen) {
      return {
        modal: "block",
        background: "bg-blue-700",
      };
    }
    if (!modalOpen) {
      return {
        modal: "hidden",
        background: "",
      };
    }
  })();

  return (
    <main>
      <section>
        <div className="  grid grid-flow-row grid-cols-1 grid-rows-5 md:grid-rows-2 md:grid-flow-col h-screen md:grid-cols-2  ">
          <div className=" relative bg-green-500 row-span-1 md:row-span-2 md:col-span-1 block ">
            <Image
              src="https://images.squarespace-cdn.com/content/v1/551aba82e4b06ddeea1f4958/1636043991946-NN53WAVJ8A68H2AU8TU8/CHIUB-Brunch-Table-Cindys.jpg"
              layout="fill"
              objectFit="cover"
              priority="true"
              eager="true"
            />
          </div>
          <div className="row-span-4 md:row-span-2 col-span-1 ">
            <div className=" w-3/4 my-[5%] md:my-[25%] m-auto space-y-8">
              <div>
                <img
                  src="/BLACK.png"
                  alt="company logo"
                  className="mx-auto h-12 w-auto"
                />
                <h2 className="mt-2 text-center text-2xl font-extrabold text-gray-900">
                  Sign in to your account
                </h2>
              </div>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  // tenantKey: ""
                }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .max(30, "Must be 30 characters or less")
                    .email("Invalid email address")
                    .required("Please enter your email"),
                  password: Yup.string().required("Please enter your password"),
                  // tenantKey: Yup.string()
                  //   .max(20, "Must be 20 characters or less")
                  //   .required("Please enter your organization name"),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                  const res = await signIn("domain-login", {
                    redirect: false,
                    email: values.email,
                    password: values.password,
                    // tenantKey: values.tenantKey,
                    callbackUrl: redirectUrl,
                  });
                  if (res?.error) {
                    setError(res.error);
                  } else {
                    setError(null);
                  }
                  if (res.url) router.push(res.url);
                  setSubmitting(false);
                }}
              >
                {(formik) => (
                  <form
                    onSubmit={formik.handleSubmit}
                    className="mt-8 space-y-6"
                    action="#"
                    method="POST"
                  >
                    <input type="hidden" name="remember" defaultValue="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                      <div>
                        <input
                          name="csrfToken"
                          type="hidden"
                          defaultValue={csrfToken}
                        />
                      </div>
                      <div className="text-red-400 text-md text-center rounded p-2">
                        {error && `Sorry, we could'nt find your account`}
                      </div>
                      <div>
                        <label htmlFor="email-address" className="sr-only">
                          Email address
                        </label>
                        <Field
                          id="email-address"
                          name="email"
                          aria-label="enter your email"
                          aria-required="true"
                          type="email"
                          autoComplete="email"
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-700 focus:border-blue-500 focus:z-10 sm:text-sm"
                          placeholder="Email address"
                        />
                        <div className="text-red-600 text-sm">
                          <ErrorMessage name="email " />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="password" className="sr-only">
                          Password
                        </label>
                        <Field
                          name="password"
                          aria-label="enter your password"
                          aria-required="true"
                          type="password"
                          autoComplete="current-password"
                          required
                          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-700 focus:border-blue-500 focus:z-10 sm:text-sm"
                          placeholder="Password"
                        />
                      </div>
                      <div className="text-red-600 text-sm">
                        <ErrorMessage name="password" />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          id="remember-me"
                          name="remember-me"
                          type="checkbox"
                          className="h-4 w-4 text-indigo-600 focus:ring-blue-700 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="remember-me"
                          className="ml-2 block text-sm text-gray-900"
                        >
                          Remember me
                        </label>
                      </div>

                      {/* <div className="text-sm">
                        <a
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          Forgot your password?
                        </a>
                      </div> */}
                    </div>

                    <div>
                      <button
                        // type="submit"
                        onClick={login}
                        className="group relative w-full flex justify-center py-2 mb-4 px-4 border border-transparent text-sm font-medium rounded-md text-gray-800 bg-white border-gray-800 items-center "
                      >
                        <img
                          src="/google.png"
                          alt="Google"
                          className=" w-6 h-6 mr-2 "
                        />
                        Sign In with Google
                      </button>
                      <button
                        type="submit"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 mb-4"
                      >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                          <LockClosedIcon
                            className="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                            aria-hidden="true"
                          />
                        </span>
                        {formik.isSubmitting ? "Please wait..." : "Sign In"}
                      </button>

                      <p className="my-2 text-center text-sm text-gray-600">
                        Or{" "}
                        {/* <a
                          href="#"
                          className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                        </a> */}
                      </p>
                      <button
                        type="button"
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-700"
                        data-modal-toggle="authentication-modal"
                        onClick={modalState}
                      >
                        Create a account
                      </button>
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div
          id="authentication-modal"
          aria-hidden="true"
          className={` ${modalHandler.modal} ${modalHandler.background} overflow-y-auto overflow-x-hidden fixed right-0 left-0 top-0 z-50 justify-center items-center h-modal md:h-full md:inset-0`}
        >
          <div className="relative m-auto px-4 py-[10%] md:py-[0%] my-[0%] md:my-[5%] h-[100vh] md:h-full w-full max-w-md  ">
            {/* <!-- Modal content --> */}
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex justify-end p-2">
                <button
                  type="button"
                  className="text-gray-400  bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                  data-modal-toggle="authentication-modal"
                  onClick={modalState}
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </button>
              </div>
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                  name: "",
                  // tenantKey: ""
                }}
                validationSchema={Yup.object({
                  email: Yup.string()
                    .max(30, "Must be 30 characters or less")
                    .email("Invalid email address")
                    .required("Please enter your email"),
                  password: Yup.string().required("Please enter your password"),
                  name: Yup.string()
                    .max(11, "Must be 11 characters or less")
                    .required("Please enter your username"),
                })}
                onSubmit={async (values, { setSubmitting }) => {
                  const res = await signIn("create-account", {
                    redirect: false,
                    email: values.email,
                    password: values.password,
                    name: values.name,
                    callbackUrl: `${window.location.origin}`,
                  });
                  if (res?.error) {
                    setError(res.error);
                  } else {
                    setError(null);
                  }
                  if (res.url) router.push(res.url);
                  setSubmitting(false);
                }}
              >
                {(formik) => (
                  <form
                    className="px-6 pb-4 space-y-6 lg:px-8 sm:pb-6 xl:pb-8"
                    action="#"
                    method="POST"
                    onSubmit={formik.handleSubmit}
                  >
                    <div>
                      <input
                        name="csrfToken"
                        type="hidden"
                        defaultValue={csrfToken}
                      />
                    </div>

                    <img
                      src="/BLACK.png"
                      alt="company logo"
                      className="mx-auto h-12 w-auto"
                    />

                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                      Create your account
                    </h3>

                    <div>
                      <div className="text-red-400 text-md text-center rounded p-2">
                        {error}
                      </div>
                      <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Username
                      </label>
                      <Field
                        // id="name"
                        name="name"
                        aria-label="name"
                        aria-required="true"
                        type="text"
                        autoComplete="username"
                        required
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="Username"
                      />
                      <div className="text-red-600 text-sm">
                        <ErrorMessage name="name" />
                      </div>
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Your email
                      </label>
                      <Field
                        // id="email-address"
                        name="email"
                        aria-label="enter your email"
                        aria-required="true"
                        autoComplete="email"
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        placeholder="name@company.com"
                        required
                      />
                    </div>
                    <div className="text-red-600 text-sm">
                      <ErrorMessage name="email" />
                    </div>
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Password
                      </label>
                      <Field
                        type="password"
                        name="password"
                        aria-label="enter your password"
                        aria-required="true"
                        // id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                        required
                      />
                    </div>
                    <div className="text-red-600 text-sm">
                      <ErrorMessage name="password" />
                    </div>
                    <div className="flex justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 bg-gray-50 rounded border border-gray-300 focus:ring-3 focus:ring-blue-300 dark:bg-gray-600 dark:border-gray-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
                            // required
                          />
                          <label
                            // htmlFor="remember"
                            className="font-medium text-gray-900 dark:text-gray-300"
                          >
                            Remember me
                          </label>
                        </div>
                        <div className="ml-3 text-sm">
                          <input
                            type="hidden"
                            name="remember"
                            defaultValue="true"
                          />
                        </div>
                      </div>
                      {/* <a
                        href="#"
                        className="text-sm text-blue-700 hover:underline dark:text-blue-500"
                      >
                        Lost Password?
                      </a> */}
                    </div>
                    <button
                      type="submit"
                      className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      {formik.isSubmitting
                        ? "Please wait..."
                        : "Create account"}
                    </button>
                    {/* <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                      Not registered?{" "}
                      <a
                        href="#"
                        className="text-blue-700 hover:underline dark:text-blue-500"
                      >
                        Create account
                      </a>
                    </div> */}
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
