// The pointed arrow after a secondary CTA label (same drawing as the banner's
// "See the work" link). Styled by `.banner_cta_secondary--arrow` in
// home-sections.scss; it takes the link's colour and nudges right on hover.
export default function BannerCtaArrow() {
  return (
    <svg
      className="banner_cta_arrow"
      viewBox="0 0 24 12"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 6H22.5M17 0.8L22.7 6L17 11.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
      />
    </svg>
  );
}
