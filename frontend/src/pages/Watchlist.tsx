import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import hero from "../assets/nook_hero.jpg";
import bedroom from "../assets/svgs/bedroom.svg";
import bathroom from "../assets/svgs/bathroom.svg";
import sqm from "../assets/svgs/sqm.svg";
import type { Listing } from "../types/listing";
import { formatPropertyType } from "../utils/propertyType";
import { getWatchlistIds, toggleWatchlistId } from "../utils/watchlist";
import { navigateTo } from "../utils/Constants";
import { fetchListings } from "../utils/listingsApi";

function Watchlist() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [watchlistIds, setWatchlistIds] = useState<number[]>([]);
  const [isLoadingListings, setIsLoadingListings] = useState(true);
  const [listingsError, setListingsError] = useState("");

  const images = import.meta.glob("../assets/houses/*", {
    eager: true,
    import: "default",
  }) as Record<string, string>;

  const watchlistListings = listings.filter((listing) =>
    watchlistIds.includes(listing.id),
  );

  useEffect(() => {
    fetchListings()
      .then(setListings)
      .catch(() => setListingsError("Watchlist listings could not be loaded."))
      .finally(() => setIsLoadingListings(false));

    getWatchlistIds().then(setWatchlistIds).catch(console.error);
  }, []);

  const handleRemove = async (
    event: React.MouseEvent<HTMLButtonElement>,
    listingId: number,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const nextWatchlistIds = await toggleWatchlistId(listingId, watchlistIds);
    setWatchlistIds(nextWatchlistIds);
  };

  return (
    <div className="min-h-screen text-[#111827] mb-[100px]">
      <div className="relative px-[8vw] pt-[calc(75px+7rem)] pb-12 h-[510px] overflow-hidden">
        <img
          src={hero}
          alt="Watchlist hero"
          className="absolute inset-0 w-full h-full object-cover object-center z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-20" />
        <div className="relative z-30">
          <p className="text-sm font-medium text-white/50 mb-3">/watchlist</p>
          <h1 className="text-[clamp(2rem,4.5vw,3rem)] text-white font-extrabold tracking-tight leading-[1.1] max-w-xl mb-3">
            Places to come back to
          </h1>
          <p className="mt-4 max-w-xl text-white/80 text-lg">
            A shortlist for the places worth another look.
          </p>
        </div>
      </div>
      <div className="block px-[8vw] mt-12" id="results">
        {isLoadingListings ? (
          <div className="text-center">
            <p className="mt-2 text-sm leading-6 text-[#6B7280]">
              Loading your watchlist...
            </p>
          </div>
        ) : listingsError ? (
          <div className="text-center">
            <p className="mt-2 text-sm leading-6 text-[#6B7280]">
              {listingsError}
            </p>
          </div>
        ) : watchlistListings.length === 0 ? (
          <div className="text-center">
            <p className="mt-2 text-sm leading-6 text-[#6B7280]">
              Your watchlist is empty. Save listings from the search page with
              the heart button and they will appear here.
            </p>
            <Link
              to="/listings"
              onClick={navigateTo}
              className="flex flex-row items-center text-center justify-center mx-auto mt-5 border border-[#3F4A36] hover:border-gray-300 hover:shadow-lg rounded-sm px-[1.2rem] py-[0.65rem] w-fit inherit bg-[#3F4A36] hover:bg-[#FFFFFF] backdrop-blur text-white hover:text-black text-[0.875rem] font-semibold tracking-tight no-underline cursor-pointer transition gap-2"
            >
              Browse listings
            </Link>
          </div>
        ) : (
          <div className="">
            <p className="mt-2 mb-6 text-sm leading-6 text-[#6B7280]">
              {watchlistListings.length === 1
                ? `${watchlistListings.length} saved listing`
                : `${watchlistListings.length} saved listings`}
            </p>
          </div>
        )}

        {isLoadingListings ||
        listingsError ||
        watchlistListings.length === 0 ? (
          ""
        ) : (
          <div className="grid 2xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 gap-4">
            {watchlistListings.map((listing) => {
              const weeklyPrice = Math.round(listing.pricePerMonth / 4);
              const imageSrc =
                images[`../assets/houses/${listing.media.heroImage}`];

              return (
                <Link
                  to={`/listings/${listing.id}`}
                  key={listing.id}
                  onClick={navigateTo}
                  className="flex flex-col overflow-hidden rounded-sm bg-white shadow"
                >
                  <div className="relative">
                    <img
                      src={imageSrc}
                      alt={`${listing.location.postcode} listing`}
                      className="h-[280px] w-full object-cover"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                    <div className="absolute inset-x-0 bottom-5 left-3 leading-none">
                      <div className="text-[0.75rem] font-normal text-[#FFFFF2] uppercase">
                        {listing.location.postcode}
                      </div>
                      <div className="text-[1.5rem] font-semibold text-[#FFFFFF]">
                        {listing.location.area}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 bg-white px-4 pb-4 pt-4">
                    <div className="leading-tight">
                      <div className="text-[0.75rem] font-normal text-[#3F4A36]">
                        {formatPropertyType(listing.propertyType)}
                      </div>
                      <div className="mt-1 text-[1.5rem] font-bold">
                        £{listing.pricePerMonth}{" "}
                        <span className="text-[0.75rem] font-normal">
                          / month
                        </span>
                      </div>
                      <div className="text-[0.75rem] font-normal text-gray-400">
                        £{weeklyPrice} per week
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <div className="flex gap-1">
                        <img
                          src={bedroom}
                          alt="Bedrooms"
                          className="h-[23px] w-[23px]"
                        />
                        <span className="text-sm">{listing.bedrooms} bed</span>
                      </div>
                      <div className="flex gap-1">
                        <img
                          src={bathroom}
                          alt="Bathrooms"
                          className="h-[20px] w-[20px]"
                        />
                        <span className="text-sm">
                          {listing.bathrooms} bath
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <img
                          src={sqm}
                          alt="Listing size"
                          className="h-[20px] w-[20px]"
                        />
                        <span className="text-sm">{listing.sizeSqm}m²</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={(event) => handleRemove(event, listing.id)}
                      className="mt-1 w-fit rounded-full border border-[#D1D5DB] px-4 py-2 text-sm font-semibold text-[#111827] transition hover:border-[#3F4A36] hover:text-[#3F4A36]"
                    >
                      Remove from watchlist
                    </button>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Watchlist;
