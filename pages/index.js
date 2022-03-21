import Banner from "../components/Restaurantsearch/Banner";
import BusinessList from "../components/Restaurantsearch/BusinessList";
import { getSession, GetSessionParams } from "next-auth/react";
import Meal from "../components/Restaurantsearch/Meal";
import Link from "next/link";
import { useSession } from "next-auth/react";

const goToMealFeed = () => {};

export default function Home() {
  const { data: session } = useSession();

  return (
    <div>
      <Banner />
      <main className="max-w-7xl mx-auto px-4">
        <section className="pt-6">
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
