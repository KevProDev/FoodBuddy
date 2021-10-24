import Image from "next/image";

function SmallCard({ photos, image_url, price, rating, name }) {
  return (
    <div className="flex">
      {/* Left Side */}
      <div className="relative h-36 w-36">
        <Image src={image_url} layout="fill" className="rounded-lg" />
      </div>

      {/* Right Side */}
      <div>
        <h2>{name}</h2>
        <h3>{price}</h3>
      </div>
    </div>
  );
}

export default SmallCard;
