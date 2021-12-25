import { useEffect, useState } from "react";
import { useAppContext } from "../../context/store";
import Business from "./Business";
export default function BusinessList() {
  const appState = useAppContext();
  const {
    businesses,
    searchBusinesses,
    term,
    location,
    sortBy,
    offset,
    limit,
    total,
    loading,
  } = appState;

  useEffect(() => {
    console.log(businesses);
  }, [businesses]);

  const loadMore = () => searchBusinesses(term, location, sortBy, offset);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-10 md:px-5 md:bg-white">
        {businesses.map((business) => {
          business = {
            id: business.id,
            imageSrc: business.image_url
              ? business.image_url
              : `https://s3-media0.fl.yelpcdn.com/assets/public/large_empty_biz_skyline.yji-a5d24f480b0062becebc68611740ee5d.svg"`,
            name: business.name,
            address: business.location.address1,
            city: business.location.city,
            zipZCode: business.location.zip_code,
            category: business.categories[0].title,
            rating: business.rating,
            reviewCount: business.review_count,
            phone: business.display_phone,
            price: business.price,
            lat: business.coordinates.latitude,
            lng: business.coordinates.longitude,
          };

          return <Business business={business} key={business.id} />;
        })}
      </div>

      {total > limit &&
        businesses.length < total &&
        !loading &&
        offset <= total && (
          <button
            className="bg-black text-white py-2 mt-2 w-1/3 mx-auto items-center justify-center block mb-10"
            onClick={loadMore}
          >
            Load More
          </button>
        )}
    </div>
  );
}
