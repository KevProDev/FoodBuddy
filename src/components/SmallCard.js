import Image from "next/image";
import { HeartIcon } from "@heroicons/react/outline";

function SmallCard({ location, photos, image_url, price, rating, name }) {
  return (
    <div className="flex flex-col rounded-xl cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out border-2 p-5">
      {/* Left Side */}
      <div className="relative h-40 w-full mx-auto">
        <Image
          src={image_url}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>

      {/* Right Side */}
      <div className="flex-grow flex flex-col px-4 mt-2">
        <div className="flex justify-between">
          <h2 className="text-xl font-bold">{name}</h2>
          <HeartIcon className="h-5 cursor-pointer" />
        </div>
        <p className="text-gray-500 text-sm sm:text-xs">{location}</p>
        <h3 className="text-gray-500">{rating} out of 5</h3>
        <div className="border-b w-10 pt-2" />
        <p className="text-sm pt-2 text-gray-600">
          The Best spicy chicken sandwich
        </p>
        <h3 className="text-gray-500">{price}</h3>
      </div>
    </div>
  );
}

export default SmallCard;
