import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Listing } from "../types/listing";
import bathroom from "../assets/svgs/bathroom.svg";
import bedroom from "../assets/svgs/bedroom.svg";
import sqm from "../assets/svgs/sqm.svg";
import link from "../assets/svgs/link.svg";
import gallery_left from "../assets/svgs/gallery_left.svg";
import gallery_right from "../assets/svgs/gallery_right.svg";
import { getWatchlistIds, toggleWatchlistId } from "../utils/watchlist";
import { calculateListingScore } from "../utils/ListingScore";
import { fetchListingById } from "../utils/listingsApi";

interface ApiListingNote {
  id: number;
  note: string;
  createdAt: string;
}

export function ListingTemplate() {
  // listing
  const { listingId } = useParams();
  const [listing, setListing] = useState<Listing | null>(null);
  const [isLoadingListing, setIsLoadingListing] = useState(true);
  const [listingError, setListingError] = useState<string>("");
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [watchlistIds, setWatchlistIds] = useState<number[]>([]);

  // notes
  const [note, setNote] = useState<string>("");
  const [noteError, setNoteError] = useState<string>("");
  const [isSavingNote, setIsSavingNote] = useState<boolean>(false);
  const [isNoteSaved, setIsNoteSaved] = useState<boolean>(false);

  const images = import.meta.glob("../assets/houses/*", {
    eager: true,
    import: "default",
  }) as Record<string, string>;

  useEffect(() => {
    if (!listingId) {
      setListingError("Listing is no longer available.");
      setIsLoadingListing(false);
      return;
    }

    fetchListingById(listingId)
      .then(setListing)
      .catch(() => setListingError("Listing is no longer available."))
      .finally(() => setIsLoadingListing(false));

    fetch(`/api/listings/${listingId}/notes`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch notes.");
        }

        return response.json() as Promise<ApiListingNote[]>;
      })
      .then((notes) => {
        if (notes[0]?.note) {
          setNote(notes[0].note);
          setIsNoteSaved(true);
        }
      })
      .catch(console.error);

    getWatchlistIds().then(setWatchlistIds).catch(console.error);
  }, [listingId]);

  if (isLoadingListing) {
    return <p className="px-[8vw] pt-32">Loading listing...</p>;
  }

  if (!listing || listingError) {
    return (
      <p className="px-[8vw] pt-32">
        {listingError || "Listing is no longer available."}
      </p>
    );
  }

  const handleWatchlistToggle = async (
    event: React.MouseEvent<HTMLButtonElement>,
    listingId: number,
  ) => {
    event.preventDefault();
    event.stopPropagation();
    const nextWatchlistIds = await toggleWatchlistId(listingId, watchlistIds);
    setWatchlistIds(nextWatchlistIds);
  };

  const handleNoteSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedNote = note.trim();

    if (!trimmedNote) {
      setNoteError("Add a note before saving.");
      return;
    }

    if (trimmedNote.length > 1000) {
      setNoteError("Notes must be 1000 characters or fewer.");
      return;
    }

    setNoteError("");
    setIsSavingNote(true);

    try {
      const response = await fetch("/api/listing-notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listingId: listing.id,
          userReference: "demo-user",
          note: trimmedNote,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save note.");
      }

      const savedNote = (await response.json()) as ApiListingNote;
      setNote(savedNote.note);
      setIsNoteSaved(true);
    } catch {
      setNoteError("Your note could not be saved. Please try again.");
    } finally {
      setIsSavingNote(false);
    }
  };

  const galleryImages =
    listing.media.galleryImages.length > 0
      ? listing.media.galleryImages
      : [listing.media.heroImage];

  const activeImage =
    images[`../assets/houses/${galleryImages[activeImageIndex]}`];

  const nookScore = calculateListingScore(listing);

  const changeImage = (direction: "prev" | "next") => {
    setActiveImageIndex((current) =>
      direction === "next"
        ? (current + 1) % galleryImages.length
        : (current - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  return (
    <>
      <div className="relative flex flex-col min-h-[100vh] text-[#FFFFFF] overflow-hidden">
        <div className="block px-[8vw] mt-10 mb-30">
          <div className="grid aspect-video grid-cols-1 lg:grid-cols-[8fr_2fr] lg:items-stretch mt-12 gap-2 transition">
            <div className="h-full min-h-0">
              <div className="relative h-full overflow-hidden rounded-sm">
                <div className="relative h-full overflow-hidden rounded-sm">
                  <img
                    src={activeImage}
                    alt={`${listing.location.postcode} listing carousel`}
                    className="absolute inset-0 w-full h-full object-cover rounded-sm z-10"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-transparent z-15" />
                  <div className="absolute inset-0 bg-gradient-to-l from-black/30 via-black/0 to-transparent z-15" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-black/0 to-transparent z-15" />
                </div>
                {/* gallery controls */}
                {galleryImages.length > 1 ? (
                  <>
                    <button
                      type="button"
                      aria-label="Previous image"
                      onClick={() => changeImage("prev")}
                      className="flex absolute top-2/4 left-0 h-5/6 justify-center items-center -translate-y-1/2 hover:cursor-pointer z-20"
                    >
                      <img
                        src={gallery_left}
                        alt="Bathrooms"
                        className="h-[60px] w-[60px]"
                      />
                    </button>
                    <button
                      type="button"
                      aria-label="Next image"
                      onClick={() => changeImage("next")}
                      className="flex absolute top-2/4 right-0 h-5/6 justify-center items-center -translate-y-1/2 hover:cursor-pointer z-20"
                    >
                      <img
                        src={gallery_right}
                        alt="Bathrooms"
                        className="h-[60px] w-[60px]"
                      />
                    </button>

                    <div className="relative bottom-7 px-5 left-1/2 z-20 flex -translate-x-1/2 gap-2 z-20">
                      {galleryImages.map((imageName, index) => (
                        <button
                          key={`${imageName}-${index}`}
                          type="button"
                          aria-label={`View image ${index + 1}`}
                          onClick={() => setActiveImageIndex(index)}
                          className={`h-2 rounded-full transition hover:cursor-pointer ${
                            index === activeImageIndex
                              ? "w-6 bg-white"
                              : "w-2 bg-white/55"
                          }`}
                        />
                      ))}
                    </div>
                  </>
                ) : null}
              </div>
            </div>
            <div className="hidden h-full min-h-0 flex-col gap-2 overflow-hidden lg:flex">
              {galleryImages.map((imageName, index) => (
                <button
                  type="button"
                  key={`${imageName}=${index}`}
                  onClick={() => setActiveImageIndex(index)}
                  className={`min-h-0 flex-1 overflow-hidden rounded-sm border transition hover:cursor-pointer ${index === activeImageIndex ? "border-[#3F4A36]" : "border-transparent"}`}
                >
                  <img
                    src={images[`../assets/houses/${imageName}`]}
                    alt={`${listing.location.postcode} thumbnail ${index + 1}`}
                    className="h-full w-full object-cover rounded-sm"
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="">
            <div className="grid xl:grid-cols-[1fr_400px] md:grid-cols-[1fr_350px] sm:grid-cols-[1fr] mt-12 gap-12 transition">
              <div className="text-black">
                <div className="border-b border-[#3F4A36]/15 pb-5">
                  <div className="flex min-[992px]:flex-row flex-col-reverse justify-between gap-8">
                    <div>
                      <div className="leading-tight pb-5">
                        <div className="font-semibold">
                          {listing.location.street},{" "}
                          <span className="uppercase">
                            {listing.location.postcode}
                          </span>{" "}
                          ({listing.location.area})
                        </div>
                        <div className="text-[1.75rem] font-bold text-black">
                          £{listing.pricePerMonth}{" "}
                          <span className="text-[0.85rem] font-normal">
                            / month
                          </span>
                        </div>
                        <div className="text-[0.75rem] font-normal text-gray-400">
                          £{listing.pricePerMonth / 4} per week
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <div className="flex gap-1">
                          <img
                            src={bedroom}
                            alt="Bedrooms"
                            className="h-[23px] w-[23px]"
                          />
                          <span className="text-sm rounded-sm">
                            {listing.bedrooms} bed
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <img
                            src={bathroom}
                            alt="Bathrooms"
                            className="h-[20px] w-[20px]"
                          />
                          <span className="text-sm text-black">
                            {listing.bathrooms} bath
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <img
                            src={sqm}
                            alt="Listing size"
                            className="h-[20px] w-[20px]"
                          />
                          <span className="text-sm text-black">
                            {listing.sizeSqm}m²
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col mb-4">
                      <a
                        href={`${listing.sourceUrl}`}
                        target="blank"
                        className="flex flex-row items-center text-center justify-center border border-[#3F4A36] hover:border-gray-300 hover:shadow-lg rounded-sm px-[1.2rem] py-[0.65rem] min-[1200px]:w-[300px] w-full inherit bg-[#3F4A36] hover:bg-[#FFFFFF] backdrop-blur text-white hover:text-black text-[0.875rem] font-semibold tracking-tight no-underline cursor-pointer transition gap-2"
                      >
                        Visit listing
                        <img
                          src={link}
                          alt="External link"
                          className="h-[18px] w-[18px]"
                        />
                      </a>
                      <button
                        type="button"
                        aria-label={
                          watchlistIds.includes(listing.id)
                            ? "Remove from watchlist"
                            : "Add to watchlist"
                        }
                        onClick={(event) =>
                          handleWatchlistToggle(event, listing.id)
                        }
                        className={` className="inline gap-x-1.5 items-center justify-center rounded-sm border border-gray-300 hover:border-black hover:shadow-lg px-[1.75rem] py-[0.65rem] mt-2 w-full inherit backdrop-blur text-[0.875rem] font-semibold tracking-tight no-underline hover:cursor-pointer transition-all
                      ${watchlistIds.includes(listing.id) ? "bg-[#3F4A36] text-white hover:text-white " : "bg-[#FFFFFF] hover:bg-[#3F4A36] text-black hover:scale-101"}`}
                      >
                        {watchlistIds.includes(listing.id)
                          ? "Remove from watchlist"
                          : "Add to watchlist"}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col justify-between">
                  <div className="border-b border-[#3F4A36]/15 pb-5">
                    <div className="text-[1.1rem] font-bold pt-5">
                      Description
                    </div>
                    <p className="font-light text-gray-600 whitespace-pre-line">
                      {listing.description}
                    </p>
                  </div>
                  <div className="">
                    <div className="text-[1.1rem] font-bold pt-5 pb-2">
                      Features
                    </div>
                    <div className="flex justify-between border-b border-gray-200 py-4">
                      <div className="font-semibold">Nearest station</div>
                      <div className="font-light">{listing.nearestStation}</div>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 py-4">
                      <div className="font-semibold">Estimated crime score</div>
                      <div className="font-light">
                        {listing.metrics.crimeScore}/100
                      </div>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 py-4">
                      <div className="font-semibold">Energy rating</div>
                      <div className="font-light">
                        {listing.metrics.energyRating}
                      </div>
                    </div>
                    <div className="flex justify-between py-4">
                      <div className="font-semibold">Internet speed</div>
                      <div className="font-light">
                        {listing.metrics.internetSpeedMbps} Mbps
                      </div>
                    </div>
                    <br />
                  </div>
                </div>
              </div>
              <div className="flex flex-col text-black">
                <div className="grid gap-6">
                  <div className="bg-white px-5 py-6 rounded-sm border border-gray-300 shadow-sm">
                    <div className="pb-3 leading-tight">
                      <div className="pb-10">
                        <div className="mb-8 text-[1.2rem] font-bold text-black">
                          Nook score
                        </div>
                        <div className="flex items-end gap-3">
                          <span className="text-[clamp(3.75rem,7vw,5rem)] font-extrabold leading-[0.85] tracking-normal text-black">
                            {nookScore}
                          </span>
                          <span className="pb-1.5 text-[1.25rem] font-medium text-black">
                            / 10
                          </span>
                        </div>
                        <div className="mt-4 max-w-[16rem] text-[0.8rem] leading-relaxed text-gray-500">
                          Based on a combination of price drop, crime, internet
                          speed, and energy score.
                        </div>
                      </div>
                      <div className="flex flex-col font-bold">
                        Key information
                      </div>
                      <div className="flex justify-between border-b border-gray-200 py-4">
                        <div className="font-semibold">Property type</div>
                        <div className="font-light capitalize">
                          {listing.propertyType}
                        </div>
                      </div>
                      <div className="flex justify-between border-b border-t border-gray-200 pb-4 pt-4">
                        <div className="font-semibold">Deposit</div>
                        <div className="font-light">
                          {listing.deposit === 0
                            ? "Contact agent"
                            : `£${listing.deposit}`}
                        </div>
                      </div>
                      <form onSubmit={handleNoteSubmit} className="pt-5">
                        <div className="flex items-center justify-between gap-3">
                          <div className="font-bold">Notes</div>
                          {isNoteSaved ? (
                            <div className="text-[0.72rem] font-semibold text-[#3F4A36]">
                              Saved
                            </div>
                          ) : null}
                        </div>
                        <div className="mt-1 mb-3 leading-5 font-light text-gray-600">
                          Add a private note for this listing. Saved notes stay
                          visible in this box.
                        </div>
                        <textarea
                          value={note}
                          onChange={(event) => {
                            setNote(event.target.value);
                            setNoteError("");
                            setIsNoteSaved(false);
                          }}
                          maxLength={1000}
                          className="h-[150px] w-full resize-none rounded-sm border border-gray-200 bg-[#fbf7f5] px-2 py-1 transition hover:border-black focus:border-[#3F4A36] focus:outline-none"
                          placeholder="Add notes about this listing..."
                        />
                        <div className="mt-1 flex items-center justify-between gap-3">
                          {noteError ? (
                            <p className="text-sm text-red-700">{noteError}</p>
                          ) : (
                            <span />
                          )}
                          <span className="text-xs text-gray-400">
                            {note.length}/1000
                          </span>
                        </div>
                        <button
                          type="submit"
                          disabled={isSavingNote || note.trim().length === 0}
                          className="mt-3 w-full rounded-sm border border-[#3F4A36] bg-[#3F4A36] px-[1.2rem] py-[0.65rem] text-[0.875rem] font-semibold text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {isSavingNote ? "Saving..." : "Save notes"}
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="opacity-45 text-[0.8rem]">
                    Listed {listing.listedAt}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListingTemplate;
