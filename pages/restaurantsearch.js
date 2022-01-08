import Banner from "../components/Restaurantsearch/Banner";
import BusinessList from "../components/Restaurantsearch/BusinessList";
import { getSession } from "next-auth/react";

export default function RestaurantSearch() {
  return (
    <div>
      <Banner />

      <main className="max-w-7xl mx-auto px-8">
        <section className="pt-6">
          <h2 className="text-xl sm:text-4xl font-semibold pb-5 px-4">
            Restaurant Explore
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
