import Header from "./header";
import Banner from "../components/Restaurantsearch/Banner";
import { getSession } from "next-auth/react";

export default function MyFavorites() {
  return (
    <div>
      <Banner />

      <main className="max-w-7xl mx-auto sm:px-16">
        <section className="pt-6">
          <h2 className="text-xl sm:text-4xl font-semibold pb-5 px-4">
            Your Saves
          </h2>
          Save Restaurant Meals
        </section>
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const session = await getSession(ctx);

  if (!session) {
    return {
      props: {
        session: null,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
}
