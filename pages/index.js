import Banner from "../components/Restaurantsearch/Banner";
import BusinessList from "../components/Restaurantsearch/BusinessList";
import { getSession } from "next-auth/react";
import MealFood from "../components/Restaurantsearch/MealFeed";

export default function Home() {
  return (
    <div>
      <Banner />
      <main className="max-w-7xl mx-auto px-4">
        <section className="pt-6">
          {/* <h2 className="text-xl sm:text-4xl font-semibold pb-5 px-4">
            Explore Feed
          </h2> */}
          <MealFood />
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
