import Banner from "@/components/Banner";
import CareerAccordion from "@/components/CareerAccordion";
import JsonLd from "@/components/JsonLd";
import { formatUpdatedAt } from "@/lib/dates";
import {
  buildBannerCta,
  getCareer,
  getStrapiImageUrl,
  rewriteStrapiHtmlUrls,
} from "@/lib/strapiPage";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  ORGANIZATION_SCHEMA,
  SITE_URL,
} from "@/lib/schema";

const BREADCRUMB_SCHEMA = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Career", path: "/career" },
]);

// Shown only when Strapi returns nothing.
const BASE_CAREER_BANNER = {
  imagePosition: "right",
  subheading: { enabled: true, text: "CAREER" },
  title: { line1: "Be a part of", line2: "webmaffia" },
  description:
    "Are you passionate about crafting exceptional\ndigital experiences? Join our team at Web Maffia\nand embark on an exciting journey where creativity\nmeets innovation. We're seeking talented\nIndividuals who are eager to push the boundaries\nof web design and development. Explore our\ncurrent openings below and take the first step\ntowards shaping the future of the web with us.",
};

// Strapi `banner` component -> Banner props (same shape the About / Awards
// pages build).
function buildCareerBanner(rawBanner) {
  if (!rawBanner) return BASE_CAREER_BANNER;

  const subHeading = rawBanner.subHeading || "";
  const lastSpace = subHeading.lastIndexOf(" ");
  const images = {};

  if (rawBanner.desktopImage?.url) {
    images.banner = {
      url: getStrapiImageUrl(rawBanner.desktopImage),
      alt: rawBanner.desktopImage.alternativeText || "",
      width: rawBanner.desktopImage.width || 871,
      height: rawBanner.desktopImage.height || 767,
    };
  }
  if (rawBanner.mobileImage?.url) {
    images.bannerMobile = {
      url: getStrapiImageUrl(rawBanner.mobileImage),
      alt: rawBanner.mobileImage.alternativeText || "",
    };
  }

  return {
    imagePosition: rawBanner.imagePosition || "right",
    // The hero image is the page's LCP element: load it eagerly.
    priority: true,
    subheading: rawBanner.heading
      ? { enabled: true, text: rawBanner.heading }
      : undefined,
    title: {
      line1: lastSpace > 0 ? subHeading.slice(0, lastSpace) : subHeading,
      ...(lastSpace > 0 ? { line2: subHeading.slice(lastSpace + 1) } : {}),
    },
    description: (rawBanner.description || "").trim(),
    cta: buildBannerCta(rawBanner),
    ...(Object.keys(images).length ? { images } : {}),
  };
}

// Strapi `career` component -> the openings the accordion renders.
function buildCareerOpenings(rawCareer) {
  if (!rawCareer) return null;
  return {
    heading: rawCareer.heading,
    accordion: (rawCareer.accordion || []).map((item) => ({
      id: item.id,
      jobTitle: item.jobTitle,
      description: item.description || "",
    })),
  };
}

// Strapi `details` (repeatable on the Career page: question + rich-text answer)
// -> items.
function buildCareerDetails(rawDetails) {
  return (rawDetails ?? [])
    .map((item, index) => ({
      id: item.id ?? index,
      question: item.question?.trim(),
      html: rewriteStrapiHtmlUrls(item.answer?.trim() ?? ""),
    }))
    .filter((item) => item.question && item.html);
}

// Rich-text answer -> plain text (used by the FAQPage schema).
function htmlToText(html) {
  return html
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&rsquo;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

// Rendered on the server so the banner and the openings are in the page HTML
// (they used to be fetched in the browser after load, which left the HTML
// almost empty and made the page jump when the data arrived).
export default async function CareerPage() {
  const raw = await getCareer();

  const bannerData = buildCareerBanner(raw?.banner);
  const careerData = buildCareerOpenings(raw?.career);
  const details = buildCareerDetails(raw?.details);
  const faqSchema = details.length
    ? buildFaqSchema(
        details.map((item) => ({
          question: item.question,
          answer: htmlToText(item.html),
        }))
      )
    : null;
  const updated = formatUpdatedAt(raw?.updatedAt);

  const careerPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Careers at Webmaffia",
    url: `${SITE_URL}/${raw?.slug || "career"}`,
    ...(updated ? { dateModified: updated.iso } : {}),
    publisher: { "@type": "Organization", name: "Webmaffia", url: `${SITE_URL}/` },
  };

  return (
    <main className="wrapper">
      <JsonLd data={BREADCRUMB_SCHEMA} />
      <JsonLd data={ORGANIZATION_SCHEMA} />
      <JsonLd data={careerPageSchema} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <div className="ml-setter career">
        <Banner data={bannerData} />

        <section className="contact_us">
          <CareerAccordion data={careerData} />
        </section>

        {details.length > 0 && (
          <section className="career_qa" aria-label="About working at Webmaffia">
            {details.map((item) => (
              <article key={item.id} className="career_qa_item">
                <h2 className="career_qa_title">{item.question}</h2>
                <div dangerouslySetInnerHTML={{ __html: item.html }} />
              </article>
            ))}
          </section>
        )}

        {updated && (
          <p className="career_updated">
            Last updated: <time dateTime={updated.iso}>{updated.label}</time>
          </p>
        )}
      </div>
    </main>
  );
}
