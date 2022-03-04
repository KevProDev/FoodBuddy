import Banner from "../components/Restaurantsearch/Banner";
import BusinessList from "../components/Restaurantsearch/BusinessList";
import { getSession } from "next-auth/react";
import Meal from "../components/Restaurantsearch/Meal";

export default function Discovery() {
  return (
    <div>
      {/* <Banner /> */}
      <main className="max-w-7xl mx-auto px-8">
        <section className="pt-6">
          {/* <h2 className="text-xl sm:text-4xl font-semibold pb-5 px-4">
            Explore Feed
          </h2> */}
          <Meal />
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
