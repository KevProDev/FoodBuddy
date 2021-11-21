import Image from "next/image";
import { HeartIcon, ChatIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function Business(props) {
  const { business } = props;
  // console.log(business);

  return (
    <Link href={"/restaurant/" + business.id}>
      <a>
        <div className="flex flex-col cursor-pointer hover:bg-gray-100 hover:scale-105 transition transform duration-200 ease-out border-b-2 bg-white pb-4 md:border-2 md:border-black">
          {/* Left Side */}
          <div className="relative h-40 w-full mx-auto">
            <Image
              src={business.imageSrc}
              layout="fill"
              objectFit="cover"
              className=""
            />
          </div>

          {/* Right Side */}
          <div className="flex-grow flex flex-col px-4 mt-2">
            <div className="flex justify-between">
              <h2 className="text-xl font-bold md:text-l">{business.name}</h2>
              <div className="flex justify-items-end space-x-5 items-center">
                {/* <h3 className="text-gray-500">
                  {business.rating} out of 5 Review
                </h3> */}
                <h3 className="text-gray-500">{business.price}</h3>
                <HeartIcon className="h-5 cursor-pointer" />
              </div>
            </div>
            <p className="text-gray-500 text-sm sm:text-xs">
              {business.address} {business.city}
            </p>
            <div className="border-b w-10 pt-2" />
            <div className="flex items-center mb-2">
              <div className="flex pt-2 items-center text-sm space-x-2">
                <ChatIcon className="h-5 cursor-pointer text-gray-500" />
                <p className="font-bold">
                  7 Buddies{" "}
                  <span className="text-gray-500 font-medium">
                    reviewed meals here
                  </span>
                </p>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row gap-5 justify-start">
              <button className="bg-black text-white py-2 px-2 mt-2">
                Friends Opinion
              </button>
              <button className="bg-black text-white py-2 px-2 mt-2">
                Give Your Opinon
              </button>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

// Business.propTypes = {
//   business: PropTypes.object.isRequired,
// };
