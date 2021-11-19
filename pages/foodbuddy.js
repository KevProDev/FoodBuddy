import Banner from "../components/FoodBuddy/Banner";
import Header from "../components/Header";

export default function Foodbuddy() {
  return (
    <div>
      <Banner />
      <main className="max-w-7xl mx-auto sm:px-16">
        {/* <section className="pt-6">
          <h2 className="text-4xl font-semibold pb-5 px-4">Suggestions</h2>
          <Suggestions />
        </section> */}
        <section className="pt-6">
          <h2 className="text-xl sm:text-4xl font-semibold pb-5 px-4">
            Lists Of Restaurants
          </h2>
        </section>
      </main>
    </div>
  );
}
