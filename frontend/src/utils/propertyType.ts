import type { PropertyType } from "../types/listing";

export const propertyTypeLabels: Record<PropertyType, string> = {
    studio: "Studio",
    flat: "Flat",
    terraced_house: "Terraced house",
    "semi-detached_house": "Semi-detached house",
    detached_house: "Detached house",
    cottage: "Cottage",
    house: "House",
};

export const propertyTypeOptions: PropertyType[] = [
    "studio",
    "flat",
    "terraced_house",
    "semi-detached_house",
    "detached_house",
    "cottage",
    "house",
];

export const formatPropertyType = (propertyType: PropertyType) => propertyTypeLabels[propertyType];
