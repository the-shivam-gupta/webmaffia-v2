// Webmaffia's Google Business Profile. The place id comes from the
// g.page review link (it redirects to ...writereview?placeid=<id>).
const GOOGLE_PLACE_ID =
  process.env.GOOGLE_PLACE_ID || "ChIJzwVJ5Pa25zsRm7Bq_TISLxk";
export const GOOGLE_READ_REVIEWS_URL = `https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`;

// Shown until GOOGLE_PLACES_API_KEY is set (taken from the design reference;
// update them, or set the key so the live numbers replace them).
export const GOOGLE_REVIEWS_FALLBACK = { rating: 4.3, count: "120+" };

// Rating and review count from the Places API (New).
// Needs GOOGLE_PLACES_API_KEY (Places API enabled); returns null without it
// or when the request fails, and the footer then shows the fallback numbers.
export async function getGoogleReviews() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY?.trim();
  if (!apiKey) return null;

  try {
    const response = await fetch(
      `https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "rating,userRatingCount",
        },
        next: { revalidate: 60 * 60 * 24 },
      }
    );
    if (!response.ok) return null;

    const data = await response.json();
    if (typeof data.rating !== "number") return null;

    return {
      rating: data.rating,
      count: data.userRatingCount ?? 0,
    };
  } catch {
    return null;
  }
}
