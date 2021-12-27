import Image from "next/image";
import { HeartIcon, ChatIcon } from "@heroicons/react/outline";
import Link from "next/link";

export default function Business(props) {
  const { business } = props;
  // console.log("problem", business);

  return (
    <Link href={"/restaurant/" + business.id} prefetch={false}>
      <a>
        <div className=" cursor-pointer bg-white border-2 border-gray-200 pb-3">
          {/* Left Side */}
          <div className="relative w-full mx-auto h-64">
            <Image src={business.imageSrc} layout="fill" objectFit="cover" />
          </div>

          {/* Right Side */}
          <div className="flex flex-col px-2 pr-5 pt-2">
            <div className="flex items-end justify-between">
              <h2 className="text-md md:text-sm font-bold">{business.name}</h2>
            </div>
            <p className="text-gray-500 text-sm md:text-md">
              {business.address} {business.city}
            </p>
            <h3 className="text-gray-500">{business.rating} out of 5 Review</h3>
            <p className="text-gray-500">{business.category}</p>
            <h3 className="text-gray-500">{business.price}</h3>

            {/* <p className="">
              <span className=" px-2 py-1 bg-green-500 text-white">7</span>
              <span className="pl-1">reviews of meals</span>
            </p> */}

            {/* <div className="border-b w-full pt-2" /> */}

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
