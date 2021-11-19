import Banner from "../components/Home/Banner";
import BusinessList from "../components/Home/BusinessList";

export default function MyFavorites() {
  return (
    <div>
      <Banner />

      <main className="max-w-7xl mx-auto sm:px-16">
        <section className="pt-6">
          <h2 className="text-xl sm:text-4xl font-semibold pb-5 px-4">
            FoodBuddies
          </h2>
          <BusinessList />
        </section>
      </main>
    </div>
  );
}