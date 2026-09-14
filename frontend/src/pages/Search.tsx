import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navigateTo } from "../utils/Constants";
import favouriteActive from "../assets/svgs/favourite-active.svg";
import favouriteOutline from "../assets/svgs/favourite-outline.svg";
import galleryLeft from "../assets/svgs/gallery_left.svg";
import galleryRight from "../assets/svgs/gallery_right.svg";
import hero from "../assets/nook_hero.jpg";
import boroughs from "../data/boroughs.json" with { type: "json" };
import type { Listing, PropertyType } from "../types/listing";
import { formatPropertyType, propertyTypeOptions } from "../utils/propertyType";
import { getWatchlistIds, toggleWatchlistId } from "../utils/watchlist";
import {
  calculateListingScore,
  calculatePriceDropPercent,
} from "../utils/ListingScore";
import { fetchListings } from "../utils/listingsApi";

type BudgetFilter = "" | "under-1500" | "1500-2000" | "2000-2500" | "2500-plus";
type TypeFilter = "" | PropertyType;
type SizeFilter = "" | "under-45" | "45-65" | "65-85" | "85-plus";

interface ApiListingNote {
  note: string;
}

const MS_PER_DAY = 1000 * 60 * 60 * 24;
function Search() {
  const [area, setArea] = useState("");
  const [rooms, setRooms] = useState(0);
  const [type, setType] = useState<TypeFilter | "">("");
  const [budget, setBudget] = useState<BudgetFilter>("");
  const [size, setSize] = useState<SizeFilter>("");
  const [cardImageIndexes, setCardImageIndexes] = useState<
    Record<number, number>
  >({});
  const [listings, setListings] = useState<Listing[]>([]);
  const [isLoadingListings, setIsLoadingListings] = useState(true);
  const [listingsError, setListingsError] = useState("");
  const [watchlistIds, setWatchlistIds] = useState<number[]>([]);
  const [listingIdsWithNotes, setListingIdsWithNotes] = useState<number[]>([]);

  const images = import.meta.glob("../assets/houses/*", {
    eager: true,
    import: "default",
  }) as Record<string, string>;

  const matchesBudget = (pricePerMonth: number) => {
    switch (budget) {
      case "":
        return true;
      case "under-1500":
        return pricePerMonth < 1500;
      case "1500-2000":
        return pricePerMonth >= 1500 && pricePerMonth <= 2000;
      case "2000-2500":
        return pricePerMonth >= 2000 && pricePerMonth <= 2500;
      case "2500-plus":
        return pricePerMonth >= 2500;
    }
  };

  const matchesSize = (sizeSqm: number) => {
    switch (size) {
      case "":
        return true;
      case "under-45":
        return sizeSqm < 45;
      case "45-65":
        return sizeSqm >= 45 && sizeSqm <= 65;
      case "65-85":
        return sizeSqm >= 65 && sizeSqm <= 85;
      case "85-plus":
        return sizeSqm >= 85;
    }
  };

  const filteredListings = listings.filter((listing) => {
    return (
      (area === "" || listing.location.borough === area) &&
      (rooms === 0 || listing.bedrooms >= rooms) &&
      (type === "" || listing.propertyType === type) &&
      matchesBudget(listing.pricePerMonth) &&
      matchesSize(listing.sizeSqm)
    );
  });

  const clearFilters = () => {
    setArea("");
    setRooms(0);
    setType("");
    setBudget("");
    setSize("");
  };

  const hasActiveFilters =
    area !== "" || rooms !== 0 || type !== "" || budget !== "" || size !== "";

  const changeCardImage = (
    listingId: number,
    totalImages: number,
    direction: "prev" | "next",
  ) => {
    setCardImageIndexes((current) => {
      const activeIndex = current[listingId] ?? 0;
      const nextIndex =
        direction === "next"
          ? (activeIndex + 1) % totalImages
          : (activeIndex - 1 + totalImages) % totalImages;

      return {
        ...current,
        [listingId]: nextIndex,
      };
    });
  };

  useEffect(() => {
    fetchListings()
      .then((nextListings) => {
        setListings(nextListings);

        return Promise.all(
          nextListings.map(async (listing) => {
            try {
              const response = await fetch(`/api/listings/${listing.id}/notes`);

              if (!response.ok) {
                return null;
              }

              const notes = (await response.json()) as ApiListingNote[];
              return notes.some((noteItem) => noteItem.note.trim())
                ? listing.id
                : null;
            } catch {
              return null;
            }
          }),
        );
      })
      .then((noteListingIds) => {
        setListingIdsWithNotes(
          noteListingIds.filter(
            (listingId): listingId is number => listingId !== null,
          ),
        );
      })
      .catch(() => setListingsError("Listings could not be loaded."))
      .finally(() => setIsLoadingListings(false));

    getWatchlistIds()
      .then(setWatchlistIds)
      .catch(console.error);
  }, []);

  const handleWatchlistToggle = async (
    event: React.MouseEvent<HTMLButtonElement>,
    listingId: number,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const nextWatchlistIds = await toggleWatchlistId(listingId, watchlistIds);
    setWatchlistIds(nextWatchlistIds);
  };

  const getPostedDaysAgo = (listedAt: string) => {
    const listedDate = new Date(`${listedAt}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return Math.max(
      0,
      Math.floor((today.getTime() - listedDate.getTime()) / MS_PER_DAY),
    );
  };

  return (
    <div className="min-h-screen text-[#111827] mb-[100px]">
      <div className="relative px-[8vw] pt-[calc(75px+7rem)] pb-12 overflow-hidden">
        <img
          src={hero}
          alt="Listings hero"
          className="absolute inset-0 w-full h-full object-cover object-center z-10"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60 z-20" />
        <div className="relative z-30">
          <p className="text-sm font-medium text-white/50 mb-3">/listings</p>
          <h1 className="text-[clamp(2rem,4.5vw,3rem)] text-white font-extrabold tracking-tight leading-[1.1] max-w-xl mb-4">
            Explore listings
          </h1>
          <p className="mt-4 max-w-3xl text-white/80 text-lg">
            Browse London rentals, compare key details, and filter down to the places that fit.
          </p>
          <div className="flex items-end gap-3 py-10 overflow-x-scroll">
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Area</legend>
              <select
                name="area"
                aria-label="Area"
                value={area}
                id="borough"
                className="select [&::picker(select)]:max-h-65 min-w-62 bg-white"
                onChange={(e) => setArea(e.target.value)}
              >
                <option value="">Any area</option>
                {boroughs.map((item) => (
                  <option value={item.name} key={item.name}>
                    {item.name}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Bedrooms</legend>
              <select
                name="rooms"
                aria-label="Rooms"
                value={rooms}
                id="rooms"
                className="select [&::picker(select)]:max-h-65 min-w-54 bg-white"
                onChange={(e) => setRooms(Number(e.target.value))}
              >
                <option value="0">Any number</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Budget</legend>
              <select
                name="budget"
                aria-label="Budget"
                value={budget}
                id="budget"
                className="select [&::picker(select)]:max-h-65 min-w-58 bg-white"
                onChange={(e) => setBudget(e.target.value as BudgetFilter)}
              >
                <option value="">Any price</option>
                <option value="under-1500">Under £1,500</option>
                <option value="1500-2000">£1,500-£2,000</option>
                <option value="2000-2500">£2,000-£2,500</option>
                <option value="2500-plus">£2,500+</option>
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Property type</legend>
              <select
                name="type"
                aria-label="Type"
                value={type}
                id="type"
                className="select [&::picker(select)]:max-h-65 min-w-58 bg-white"
                onChange={(e) => setType(e.target.value as PropertyType | "")}
              >
                <option value="">Any type</option>
                {propertyTypeOptions.map((propertyType) => (
                  <option value={propertyType} key={propertyType}>
                    {formatPropertyType(propertyType)}
                  </option>
                ))}
              </select>
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Property size</legend>
              <select
                name="size"
                aria-label="Size"
                value={size}
                id="size"
                className="select [&::picker(select)]:max-h-65 min-w-54 bg-white"
                onChange={(e) => setSize(e.target.value as SizeFilter)}
              >
                <option value="">Any size</option>
                <option value="under-45">Under 45m²</option>
                <option value="45-65">45m²-65m²</option>
                <option value="65-85">65m²-85m²</option>
                <option value="85-plus">85m²+</option>
              </select>
            </fieldset>
          </div>
        </div>
      </div>

      <div className="block px-[8vw] mt-12" id="results">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <p className="text-gray-500 text-[0.9rem]">
            {isLoadingListings
              ? "Loading listings..."
              : listingsError
                ? listingsError
                : filteredListings.length === 0
                  ? "No results found. Expand you parameters or try another filter."
                  : filteredListings.length === 1
                    ? "Showing 1 result"
                    : `Showing ${filteredListings.length} results`}
          </p>
          {hasActiveFilters ? (
            <button
              type="button"
              onClick={clearFilters}
              className="flex flex-row text-center border border-[#3F4A36] hover:border-gray-300 hover:shadow-lg rounded-sm px-[1.2rem] py-[0.65rem] w-fit inherit bg-[#3F4A36] hover:bg-[#FFFFFF] backdrop-blur text-white hover:text-black text-[0.875rem] font-semibold tracking-tight no-underline cursor-pointer transition gap-2"
            >
              Clear filters
            </button>
          ) : null}
        </div>

        {isLoadingListings || listingsError || filteredListings.length === 0 ? (
          ""
        ) : (
          <div className="grid 2xl:grid-cols-3 sm:grid-cols-2 xs:grid-cols-2 gap-4">
            {filteredListings.map((listing) => {
              const weeklyPrice = Math.round(listing.pricePerMonth / 4);
              const galleryImages =
                listing.media.galleryImages.length > 0
                  ? listing.media.galleryImages
                  : [listing.media.heroImage];
              const activeImageIndex = cardImageIndexes[listing.id] ?? 0;
              const activeImage =
                images[`../assets/houses/${galleryImages[activeImageIndex]}`];
              const nookScore = calculateListingScore(listing);
              const priceDropPercent = calculatePriceDropPercent(listing);
              const isWatchlisted = watchlistIds.includes(listing.id);
              const hasNoteAttached = listingIdsWithNotes.includes(listing.id);
              const postedDaysAgo = getPostedDaysAgo(listing.listedAt);

              return (
                <Link
                  to={`${listing.id}`}
                  key={listing.id}
                  onClick={navigateTo}
                  className="flex flex-col overflow-hidden rounded-sm bg-white shadow"
                >
                  <div className="relative flex flex-col overflow-hidden rounded-t-sm">
                    <img
                      src={activeImage}
                      alt={`${listing.location.postcode} listing`}
                      className="h-[280px] w-full object-cover hover:scale-105 transition"
                    />
                    {galleryImages.length > 1 ? (
                      <>
                        <button
                          type="button"
                          aria-label="Previous image"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            changeCardImage(
                              listing.id,
                              galleryImages.length,
                              "prev",
                            );
                          }}
                          className="absolute left-0 top-36.5 z-20 flex h-55 w-10 -translate-y-1/2 items-center justify-center text-white transition"
                        >
                          <span className="text-xl leading-none text-white">
                            <img src={galleryLeft} alt="" aria-hidden="true" className="h-8 w-8" />
                          </span>
                        </button>
                        <button
                          type="button"
                          aria-label="Next image"
                          onClick={(event) => {
                            event.preventDefault();
                            event.stopPropagation();
                            changeCardImage(
                              listing.id,
                              galleryImages.length,
                              "next",
                            );
                          }}
                          className="absolute right-0 top-36.5 z-20 flex h-55 w-10 -translate-y-1/2 items-center justify-center text-white transition"
                        >
                          <span className="text-xl leading-none text-white">
                            <img src={galleryRight} alt="" aria-hidden="true" className="h-8 w-8" />
                          </span>
                        </button>
                        <div className="absolute bottom-5 right-1/16 z-20 flex gap-2">
                          {galleryImages.map((imageName, index) => (
                            <span
                              key={`${listing.id}-${imageName}-${index}`}
                              className={`h-1.5 rounded-full transition ${
                                index === activeImageIndex
                                  ? "w-5 bg-white"
                                  : "w-1.5 bg-white/55"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    ) : null}
                    <div className="absolute inset-x-0 bottom-0 h-35 bg-gradient-to-t from-black/50 via-black/35 to-transparent" />

                    <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-bl from-black/40 via-black/0 to-transparent" />

                    <div className="absolute inset-x-0 bottom-0 h-70 bg-gradient-to-l from-black/20 via-black/0 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 h-70 bg-gradient-to-r from-black/20 via-black/0 to-transparent" />

                    <div className="flex absolute top-3 left-12 -translate-x-1/4 z-20">
                      <div className="flex flex-col justify-center text-[1rem] text-black bg-white font-bold leading-tight rounded-sm shadow-lg z-10 gap-1">
                        <div className="flex justify-between items-center border-b border-black border-b-2 px-[12px] py-[8px] pb-0.5 gap-3">
                          <div className="flex flex-col leading-[15px]">
                            <div className="text-[0.68rem] font-extrabold uppercase">Nook</div>
                            <div className="text-[1.15rem] font-extrabold uppercase mb-1.5">score</div></div>
                          <div className="flex items-end gap-1 text-end text-red-700">
                            <span className="text-[1.35rem] font-extrabold leading-none">
                              {nookScore}
                            </span>
                            <span className="text-[0.72rem] font-extrabold leading-none uppercase">
                              / 10
                            </span>
                          </div>
                        </div>
                        <span className="text-[0.65rem] font-extrabold text-red-700 uppercase px-[12.5px] py-[5px] pt-0.5">
                          {priceDropPercent}% price drop
                        </span>
                      </div>
                    </div>
                    <div className="flex absolute top-5 right-1 -translate-x-1/4 z-20">
                      <button
                        type="button"
                        aria-label={
                          isWatchlisted
                            ? "Remove from watchlist"
                            : "Add to watchlist"
                        }
                        onClick={(event) =>
                          handleWatchlistToggle(event, listing.id)
                        }
                        className={` h-[44px] w-[44px] items-center justify-center rounded-full px-3 py-3 backdrop-blur-sm hover:cursor-pointer transition 
                          ${isWatchlisted ? "bg-white/15 hover:bg-black/20" : "bg-white/15 hover:bg-black/20"}`}
                      >
                        <img
                          src={isWatchlisted ? favouriteActive : favouriteOutline}
                          alt=""
                          aria-hidden="true"
                          className="h-[20px] w-[20px] transition-all duration-200"
                        />
                      </button>
                    </div>
                    {hasNoteAttached ? (
                      <div className="absolute right-17 top-5 z-20 flex h-[44px] items-center rounded-full bg-white/90 px-3 text-[0.72rem] font-bold text-[#3F4A36] shadow-md backdrop-blur-sm">
                        note attached
                      </div>
                    ) : null}
                    <div className="absolute inset-x-0 bottom-5 left-3 leading-none">
                      <div className="text-[0.75rem] font-normal text-[#FFFFF2]">
                            {listing.location.street}, <span className="uppercase">{listing.location.postcode}</span>
                      </div>
                      <div className="text-[1.5rem] font-semibold text-[#FFFFFF]">
                        {listing.location.area}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col bg-[#FFFFFF] pt-4 pb-4 px-4 gap-4">
                    <div className="flex">
                      <div className="flex flex-col leading-4">
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
                    </div>
                    <div className="flex justify-between pt-1 gap-3">
                      <span className="flex gap-3 flex-wrap text-sm ">
                        {listing.bedrooms} bed • {listing.bathrooms} bath •{" "}
                        {listing.sizeSqm}m²
                      </span>
                      <div className="flex flex-col items-end gap-1 text-xs opacity-70">
                        <span>Posted {postedDaysAgo} days ago</span>
                      </div>
                    </div>
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

export default Search;
