import Image from "next/image";

function SmallCard({ photos, image_url, price, rating, name }) {
  return (
    <div className="flex items-center mb-2 mt-5 space-x-5 rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out">
      {/* Left Side */}
      <div className="relative h-28 w-1/2">
        <Image src={image_url} layout="fill" className="rounded-lg" />
      </div>

      {/* Right Side */}
      <div>
        <h2>{name}</h2>
        <h3 className="text-gray-500">{price}</h3>
      </div>
    </div>
  );
}

export default SmallCard;
