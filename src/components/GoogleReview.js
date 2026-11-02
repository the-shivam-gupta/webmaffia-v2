import {
  GOOGLE_READ_REVIEWS_URL,
  GOOGLE_REVIEWS_FALLBACK,
} from "@/lib/googleReviews";

const GoogleLogo = () => (
  <svg
    className="footer_google_review_logo"
    viewBox="0 0 48 48"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill="#EA4335"
      d="M24 9.5c3.5 0 6.6 1.2 9.1 3.6l6.8-6.8C35.8 2.4 30.3 0 24 0 14.6 0 6.5 5.4 2.6 13.2l7.9 6.1C12.4 13.6 17.7 9.5 24 9.5z"
    />
    <path
      fill="#4285F4"
      d="M46.5 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.7c-.6 3-2.3 5.5-4.8 7.2l7.6 5.9c4.4-4.1 7-10.1 7-17.6z"
    />
    <path
      fill="#FBBC05"
      d="M10.5 28.7a14.5 14.5 0 0 1 0-9.4l-7.9-6.1a24 24 0 0 0 0 21.6l7.9-6.1z"
    />
    <path
      fill="#34A853"
      d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.9 2.3-8.3 2.3-6.3 0-11.6-4.1-13.5-9.8l-7.9 6.1C6.5 42.6 14.6 48 24 48z"
    />
  </svg>
);

// Google rating card: logo | rating + stars + count | link to the reviews.
// `data` is the live rating from the Places API; without it the fallback
// numbers are shown.
export default function GoogleReview({ data }) {
  const info = data ?? GOOGLE_REVIEWS_FALLBACK;
  const fill = (Math.max(0, Math.min(5, info.rating)) / 5) * 100;

  return (
    <div className="footer_google_review">
      <GoogleLogo />

      <div className="footer_google_review_info">
        <span className="footer_google_review_title">Google Reviews</span>
        <div className="footer_google_review_rating">
          <span className="footer_google_review_score">
            {info.rating.toFixed(1)}
          </span>
          <span className="footer_google_review_stars" aria-hidden="true">
            <span className="footer_google_review_stars_base">★★★★★</span>
            <span
              className="footer_google_review_stars_fill"
              style={{ width: `${fill}%` }}
            >
              ★★★★★
            </span>
          </span>
        </div>
        <span className="footer_google_review_count">
          Based on {info.count} reviews
        </span>
      </div>

      <a
        href={GOOGLE_READ_REVIEWS_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="footer_google_review_cta"
      >
        Read our reviews
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">
          <path
            d="M4 12 12 4M5.5 4H12v6.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
