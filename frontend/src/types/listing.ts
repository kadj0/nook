export interface ListingMetrics {
    crimeScore: number;
    energyRating: string;
    internetSpeedMbps: number;
}

export interface ListingMedia {
    heroImage: string;
    galleryImages: string[];
}

export interface ListingLocation {
    area: string;
    street: string;
    borough: string;
    postcode: string;
}

export type PropertyType =
    | "studio"
    | "flat"
    | "terraced_house"
    | "semi-detached_house"
    | "detached_house"
    | "cottage"
    | "house";

export type FurnishingStatus = "furnished" | "part_furnished" | "unfurnished";

export interface Listing {
    id: number;
    location: ListingLocation;
    nearestStation: string;
    propertyType: PropertyType;
    furnished: FurnishingStatus;
    bedrooms: number;
    bathrooms: number;
    sizeSqm: number;
    pricePerMonth: number;
    originalPrice: number;
    deposit: number;
    listedAt: string;
    description: string;
    sourceUrl: string;
    media: ListingMedia;
    metrics: ListingMetrics;
}
