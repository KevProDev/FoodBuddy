import Head from "next/head";
import Banner from "../src/components/Banner";
import Header from "../src/components/Header";
import SmallCard from "../src/components/SmallCard";
import Link from "next/link";

export default function Home({ restaurants }) {
  return (
    <div>
      <Header />
      {/* Banner */}
      <Banner />

      <main className="max-w-7xl mx-auto px-4 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          {/* Pull some data from server  API endpoints */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {restaurants.map((item) => (
              <Link
                href="/restaurant/[id]"
                as={`/restaurant/${item.id}`}
                key={item.id}
              >
                <a>
                  <SmallCard
                    key={item.id}
                    image_url={item.image_url}
                    name={item.name}
                    rating={item.rating}
                    photos={item.photos}
                    price={item.price}
                    location={item.location.address1 + " " + item.location.city}
                  />
                </a>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// Made a api call to the data based
export async function getStaticProps() {
  const key = process.env.GOOGLE_API_KEY;

  const exploreData = await fetch("http://localhost:3000/api");

  const data = await exploreData.json();

  // console.log(data);

  return {
    props: {
      restaurants: data,
    },
  };
}
