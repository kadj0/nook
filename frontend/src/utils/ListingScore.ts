import type { Listing } from "../types/listing";

const energyScores: Record<string, number> = {
  A: 10,
  B: 8.5,
  C: 7,
  D: 5.5,
  E: 4,
  F: 2.5,
  G: 1,
  "N/A": 5,
};

const SCORE_WEIGHTS = {
  priceDrop: 0.35,
  crime: 0.25,
  energy: 0.15,
  internet: 0.15,
  size: 0.1,
};

// limiting score to 10
function clamp(value: number, max = 10) {
  return Math.max(0, Math.min(max, value));
}

function getPriceDropScore(pricePerMonth: number, originalPrice: number) {
  if (originalPrice <= 0 || pricePerMonth >= originalPrice) {
    return 0;
  }

  const dropPercent = ((originalPrice - pricePerMonth) / originalPrice) * 100;

  return clamp((dropPercent / 15) * 10);
}

function getCrimeScore(crimeScore: number) {
  if (crimeScore <= 0) {
    return 5;
  }

  return clamp(crimeScore / 10);
}

function getInternetScore(internetSpeedMbps: number) {
  return clamp((internetSpeedMbps / 1000) * 10);
}

function getSizeScore(sizeSqm: number, bedrooms: number) {
  const bedroomCount = Math.max(0, bedrooms);
  const targetSizeSqm = bedroomCount === 0 ? 32 : 45 + (bedroomCount - 1) * 20;

  return clamp((sizeSqm / targetSizeSqm) * 10);
}

export function calculateListingScore(listing: Listing) {
  const priceDrop = getPriceDropScore(
    listing.pricePerMonth,
    listing.originalPrice,
  );
  const crime = getCrimeScore(listing.metrics.crimeScore);
  const energy = energyScores[listing.metrics.energyRating.toUpperCase()] ?? 5;
  const internet = getInternetScore(listing.metrics.internetSpeedMbps);
  const size = getSizeScore(listing.sizeSqm, listing.bedrooms);

  const score =
    priceDrop * SCORE_WEIGHTS.priceDrop +
    crime * SCORE_WEIGHTS.crime +
    energy * SCORE_WEIGHTS.energy +
    internet * SCORE_WEIGHTS.internet +
    size * SCORE_WEIGHTS.size;

  return Number(score.toFixed(2));
}

export function calculatePriceDropPercent(listing: Listing) {
  if (
    listing.originalPrice <= 0 ||
    listing.pricePerMonth >= listing.originalPrice
  ) {
    return 0;
  }

  return Math.round(
    ((listing.originalPrice - listing.pricePerMonth) / listing.originalPrice) *
      100,
  );
}
