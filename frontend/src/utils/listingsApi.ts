import type { FurnishingStatus, Listing, PropertyType } from "../types/listing";

interface ApiListingImage {
  imageUrl: string;
  isHero: boolean;
}

interface ApiListing {
  id: number;
  sourceUrl: string;
  propertyType: string;
  furnished: string;
  bedrooms: number;
  bathrooms: number;
  sizeSqm: number;
  pricePerMonth: number;
  originalPrice: number;
  deposit: number;
  listedAt: string;
  description: string;
  area: string;
  street: string;
  borough: string;
  postcode: string;
  nearestStation: string;
  crimeScore: number;
  energyRating: string;
  internetSpeedMbps: number;
  images?: ApiListingImage[];
}

const propertyTypeMap: Record<string, PropertyType> = {
  studio: "studio",
  flat: "flat",
  apartment: "flat",
  cottage: "cottage",
  house: "house",
  "terraced house": "terraced_house",
  "semi-detached house": "semi-detached_house",
  "detached house": "detached_house",
};

const furnishingMap: Record<string, FurnishingStatus> = {
  furnished: "furnished",
  "part furnished": "part_furnished",
  "part-furnished": "part_furnished",
  unfurnished: "unfurnished",
};

export async function fetchListings(): Promise<Listing[]> {
  const response = await fetch("/api/listings");

  if (!response.ok) {
    throw new Error("Failed to fetch listings.");
  }

  const listings = (await response.json()) as ApiListing[];
  return listings.map(mapApiListing);
}

export async function fetchListingById(id: string): Promise<Listing> {
  const response = await fetch(`/api/listings/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch listing.");
  }

  return mapApiListing((await response.json()) as ApiListing);
}

function mapApiListing(listing: ApiListing): Listing {
  const galleryImages = listing.images?.map((image) => image.imageUrl) ?? [];
  const heroImage =
    listing.images?.find((image) => image.isHero)?.imageUrl ??
    galleryImages[0] ??
    "";

  return {
    id: listing.id,
    location: {
      area: listing.area,
      street: listing.street,
      borough: listing.borough,
      postcode: listing.postcode,
    },
    nearestStation: listing.nearestStation,
    propertyType: normalisePropertyType(listing.propertyType),
    furnished: normaliseFurnished(listing.furnished),
    bedrooms: listing.bedrooms,
    bathrooms: listing.bathrooms,
    sizeSqm: Number(listing.sizeSqm),
    pricePerMonth: Number(listing.pricePerMonth),
    originalPrice: Number(listing.originalPrice),
    deposit: Number(listing.deposit),
    listedAt: listing.listedAt,
    description: listing.description,
    sourceUrl: listing.sourceUrl,
    media: {
      heroImage,
      galleryImages,
    },
    metrics: {
      crimeScore: Number(listing.crimeScore),
      energyRating: listing.energyRating,
      internetSpeedMbps: listing.internetSpeedMbps,
    },
  };
}

function normalisePropertyType(propertyType: string): PropertyType {
  return propertyTypeMap[propertyType.toLowerCase()] ?? "flat";
}

function normaliseFurnished(furnished: string): FurnishingStatus {
  return furnishingMap[furnished.toLowerCase()] ?? "unfurnished";
}
