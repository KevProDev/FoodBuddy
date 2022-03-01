import Banner from "../components/Restaurantsearch/Banner";
import BusinessList from "../components/Restaurantsearch/BusinessList";
import { getSession } from "next-auth/react";
import Meal from "../components/Restaurantsearch/Meal";
import Link from "next/link";

const goToMealFeed = () => {};

export default function Home() {
  return (
    <div>
      <Banner />
      <main className="max-w-7xl mx-auto px-4">
        <section className="pt-6">
          {/* <h2 className="text-xl sm:text-4xl font-semibold pt-8 pb-5 px-4">
            Latest Friends Meals
          </h2>
          <Meal />
          <Link href={"/mealFeed"} prefetch={false}>
            <button className="bg-black text-white py-2 md:mx-5 w-[130px]">
              See More
            </button>
          </Link> */}
          <h2 className="text-xl sm:text-4xl font-semibold pt-8 pb-5 px-4">
            Restaurant
          </h2>
          <BusinessList />
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) {
    return {
      props: {},
    };
  }
  return {
    props: {
      session,
    },
  };
}
