"use client";

import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import GoogleReview from "@/components/GoogleReview";
import { LEGAL_LINKS } from "@/lib/legal";
import { buildOfficeBlocks, telHref } from "@/lib/offices";

const Footer = ({ footerData, campaignSlugs = [], googleReviews = null }) => {
  const pathname = usePathname();
  const slugMatch = pathname?.match(/^\/case-study\/([^/]+)$/);
  const isCampaignPage =
    slugMatch?.[1] != null && campaignSlugs.includes(slugMatch[1]);
  const showContactIllustration = Boolean(slugMatch) && !isCampaignPage;

  const socialLinks = (footerData?.socialLinks ?? []).filter(
    ({ platform }) => platform !== "X"
  );
  const navLinks = footerData?.navLinks ?? [];
  const services = footerData?.services ?? [];
  const offices = footerData?.offices ?? [];
  const copyright = footerData?.copyright;

  // Follow the CMS order. Every office is its own block with its own title
  // ("India - Mumbai", "India - Bengaluru", "USA", "Dubai"), side by side.
  // Shared with the overlay menu (see lib/offices.js).
  const blocks = buildOfficeBlocks(offices);

  const copyrightText = copyright?.description || copyright?.brand || null;

  return (
    <footer>
      {showContactIllustration ? (
        <div className="footer_contact_illustration_layer" aria-hidden="true">
          <Image
            src="/assets/images/hands.svg"
            alt=""
            width={871}
            height={767}
            className="footer_contact_illustration"
          />
        </div>
      ) : null}

      <div className="footer_nav">
        <div className="footer_col footer_col--connect">
          <div className="footer_col_content">
            <div className="footer_col_title footer_col_title--connect">
              Connect With Us
            </div>
            <p className="footer_connect_subtext">
              Follow our social channels to get a glimpse of Webmaffia
            </p>

            {/* <div className="footer_connect_divider" aria-hidden="true" /> */}

            <div className="footer_social_icons">
              {socialLinks.map(({ platform, url, iconSrc, iconAlt }) =>
                iconSrc ? (
                  <a
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={iconAlt}
                  >
                    <Image src={iconSrc} alt={iconAlt} width={28} height={28} />
                  </a>
                ) : null
              )}
            </div>

            <div className="footer_pixtop_logo">
              <Image src="/assets/images/pixtop-logo.svg" alt="Pixtop Logo" width={100} height={50} />
              <p>PIXTOP MEDIA SOLUTIONS PVT LTD</p>
            </div>

            <div className="footer_iso_certificate_wrap">
              <a
                href="https://cms.webmaffia.com/uploads/ISO_certificate_9e1dbc303c.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="footer_iso_certificate"
                aria-label="ISO/IEC 27001:2022 Certification"
              >
                <Image
                  src="/assets/images/footer/ISO-icon.svg"
                  alt="ISO/IEC 27001:2022 Certification"
                  width={40}
                  height={40}
                />
                <span className="footer_iso_certificate_text">
                  <strong>ISO/IEC 27001:2022</strong>
                  <em>Certificate No. SG/IAS/IS/202402 | Valid until 11/12/2028</em>
                </span>
              </a>
              <GoogleReview data={googleReviews} />
            </div>

            <Script
              src="https://news.google.com/swg/js/v1/publisher.js"
              strategy="lazyOnload"
            />
            <div className="footer_google_source_wrap">
              {/* Google's script only scans the DOM once, so render both
                  themes up front and toggle visibility with CSS. */}
              <div
                className="footer_google_source_light"
                google-add-preferred-source-btn=""
                data-theme="light"
              />
              <div
                className="footer_google_source_dark"
                google-add-preferred-source-btn=""
                data-theme="dark"
              />
            </div>

          </div>
        </div>

        <div className="footer_col footer_col--work">
          <div className="footer_col_content">
            <ul className="footer_links footer_links--nav">
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer_col footer_col--services">
          <div className="footer_col_content">
            <Link href="/services" className="footer_col_title">Our Services</Link>
            <ul className="footer_links footer_links--services">
              {services.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="link">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="footer_connect_details">
        {blocks.map(({ key, label, address, href, email, phone }) => (
          <div
            className="footer_connect_office footer_connect_usa"
            key={key}
          >
            <address>
              {label ? <RegionHead label={label} /> : null}
              <a href={href} target="_blank" rel="noopener noreferrer">
                {address}
              </a>
            </address>
            <OfficeContact email={email} phone={phone} />
          </div>
        ))}
      </div>

      {/* <div className="footer_logo_divider" aria-hidden="true" /> */}

      <Link
        href="https://www.webmaffia.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="footer_logo"
      >
        <Image
          src="/assets/images/maffia-logo.webp"
          alt="Webmaffia"
          width={1318}
          height={210}
        />
      </Link>

      <ul className="footer_legal_links">
        {LEGAL_LINKS.map(({ href, label }) => (
          <li key={href}>
            <Link href={href}>{label}</Link>
          </li>
        ))}
      </ul>

      {copyrightText && (
        <div className="footer_copyright">{copyrightText}</div>
      )}
    </footer>
  );
};

const OfficeContact = ({ email, phone }) =>
  email || phone ? (
    <div className="footer_connect_office_contact">
      {email && <a href={`mailto:${email}`}>{email}</a>}
      {phone && <a href={telHref(phone)}>{phone}</a>}
    </div>
  ) : null;

// "India - Mumbai": the country is the bright part, the city stays dimmer.
// Single-name regions ("USA", "Dubai") are fully bright, like "India".
const RegionHead = ({ label }) => {
  const m = String(label).match(/^(.+?)(\s+-\s+.+)$/);
  return (
    <div className="footer_connect_region_head">
      <span className="footer_connect_usa_label">
        <span className="footer_connect_label_strong">{m ? m[1] : label}</span>
        {m ? m[2] : null}
      </span>
    </div>
  );
};

export default Footer;

export const FeatureSwiper = ({ slides }) => (
  <Swiper
    modules={[Autoplay]}
    loop={true}
    autoplay={{ delay: 3000, disableOnInteraction: false }}
    className="feature_swiper"
  >
    {slides.map((slide, i) => (
      <SwiperSlide key={i}>{slide}</SwiperSlide>
    ))}
  </Swiper>
);

export const TestimonialSwiper = ({ slides }) => (
  <Swiper
    modules={[Navigation]}
    loop={true}
    navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
    className="testimonial-swiper"
  >
    {slides.map((slide, i) => (
      <SwiperSlide key={i}>{slide}</SwiperSlide>
    ))}
  </Swiper>
);

export const ServiceSwiper = ({ slides }) => (
  <Swiper
    modules={[Autoplay]}
    loop={true}
    autoplay={{ delay: 5000, disableOnInteraction: false }}
    className="service-swiper"
  >
    {slides.map((slide, i) => (
      <SwiperSlide key={i}>{slide}</SwiperSlide>
    ))}
  </Swiper>
);
