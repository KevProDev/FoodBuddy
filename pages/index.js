import Head from "next/head";
import Banner from "../components/Banner";
import Header from "../components/Header";
import SmallCard from "../components/SmallCard";

export default function Home({ restaurants }) {
  console.log(restaurants);
  return (
    <div>
      <Header />
      {/* Banner */}
      <Banner />

      <main className="max-w-7xl mx-auto px-8 sm:px-16">
        <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5">Explore Nearby</h2>
          {/* Pull some data from server  API endpoints */}
          {restaurants.map((item) => (
            <SmallCard
              key={item.id}
              image_url={item.image_url}
              name={item.name}
              rating={item.rating}
              photos={item.photos}
              price={item.price}
            />
          ))}
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
