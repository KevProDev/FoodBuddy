import Image from "next/image";
import { HeartIcon, ChatIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function Business(props) {
  const { business } = props;
  console.log("problem", business);

  return (
    <Link href={"/restaurant/" + business.id} prefetch={false}>
      <a>
        <div className=" grid grid-cols-4 cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out bg-white border-2 border-gray-200">
          {/* Left Side */}
          <div className="relative w-full col-span-1 mx-auto">
            <Image src={business.imageSrc} layout="fill" objectFit="cover" />
          </div>

          {/* Right Side */}
          <div className="flex flex-col gap-2 col-span-3 px-2 pr-5 pt-2">
            <div className="flex items-end justify-between">
              <h2 className="text-md md:text-sm font-bold">{business.name}</h2>
              <div className="flex justify-items-end space-x-5">
                <h3 className="text-gray-500">{business.price}</h3>
                {/* <HeartIcon className="h-5 cursor-pointer" /> */}
              </div>
            </div>
            <p className="text-gray-500 -mt-2">{business.category}</p>
            <p className="">
              <span className=" px-2 py-1 bg-green-500 text-white">7</span>
              <span className="pl-1">reviews of meals</span>
            </p>

            <div className="border-b w-full pt-2" />
            <div className="flex flex-col">
              <p className="text-gray-500 text-sm md:text-md">
                {business.address} {business.city}
              </p>
              <h3 className="text-gray-500">
                {business.rating} out of 5 Review
              </h3>
              <div className="flex pt-2 text-sm space-x-2">
                {/* <ChatIcon className="h-5 cursor-pointer text-gray-500" /> */}
                {/* <p className="font-bold">
                  <span className=" px-2 py-1 bg-green-500 text-white">7</span>
                  <span className=" font-medium pl-1">reviews of meals</span>
                </p> */}
              </div>
            </div>
            {/* <div className="flex flex-col lg:flex-row gap-5 justify-start">
              <button className="bg-black text-white py-2 px-2 mt-2">
                Friends Opinion
              </button>
              <button className="bg-black text-white py-2 px-2 mt-2">
                Give Your Opinon
              </button>
            </div> */}
          </div>
        </div>
      </a>
    </Link>
  );
}

// Business.propTypes = {
//   business: PropTypes.object.isRequired,
// };
