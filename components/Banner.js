import Image from "next/image";
function Banner() {
  return (
    <div className="relative h-[300px] sm:h-[400px] lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
      <Image
        src="https://images.unsplash.com/photo-1565895405227-31cffbe0cf86?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2940&q=80"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute top-1/3 text-white w-full text-center">
        <p className="text-sm sm:text-2xl">
          Not sure where what to pick? Perfect.
        </p>
        <button className="text-black bg-white rounded-lg px-10 py-4 shadow-md font-bold hover:shadow-xl my-3 active:scale-90 transition duration-150">
          Know What To Get
        </button>
      </div>
    </div>
  );
}

export default Banner;
