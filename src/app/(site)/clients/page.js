import Link from "next/link";
import Banner from "@/components/Banner";
import ClientsLogosGrid from "@/components/ClientsLogosGrid";
import HomeFaq from "@/components/HomeFaq";
import JsonLd from "@/components/JsonLd";
import {
  buildBannerCta,
  getCaseStudyThumbnails,
  getClientBanner,
  getClients,
  getStrapiImageUrl,
} from "@/lib/strapiPage";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  ORGANIZATION_SCHEMA,
  SITE_URL,
} from "@/lib/schema";
import { toCaseStudyItem } from "@/lib/case-study-helpers";
import { buildPortfolio, joinNames } from "@/lib/caseStudyPortfolio";
import { formatUpdatedAt } from "@/lib/dates";

export const metadata = {
  alternates: {
    canonical: "https://www.webmaffia.com/clients",
  },
  title: "Webmaffia Clients | Brands We Partner With",
  description:
    "Meet the brands Webmaffia partners with, including Afcons, Nayara Energy, Lupin, Tata Housing and Welspun Flooring, and see the projects behind them.",
};

const BREADCRUMB_SCHEMA = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Our Client", path: "/clients" },
]);

function splitParagraphs(text) {
  if (!text) return [];
  return text
    .split("\n\n")
    .filter(Boolean)
    .map((p) => p.trim());
}

function buildClientsBannerData(rawBanner) {
  if (!rawBanner) return null;

  const subHeading = rawBanner.subHeading || "";
  const lastSpace = subHeading.lastIndexOf(" ");

  const paragraphs = splitParagraphs(rawBanner.description);

  let images;
  if (rawBanner.desktopImage?.url) {
    images = {
      banner: {
        url: getStrapiImageUrl(rawBanner.desktopImage),
        alt: rawBanner.desktopImage.alternativeText || "",
        width: rawBanner.desktopImage.width || 871,
        height: rawBanner.desktopImage.height || 767,
      },
    };
    if (rawBanner.mobileImage?.url) {
      images.bannerMobile = {
        url: getStrapiImageUrl(rawBanner.mobileImage),
        alt: rawBanner.mobileImage.alternativeText || "",
      };
    }
  }

  return {
    imagePosition: rawBanner.imagePosition || "right",
    // The hero image is the page's LCP element: load it eagerly.
    priority: true,
    subheading: rawBanner.heading
      ? { enabled: true, text: rawBanner.heading.trim() }
      : undefined,
    title: {
      line1: lastSpace > 0 ? subHeading.slice(0, lastSpace) : subHeading,
      ...(lastSpace > 0 ? { line2: subHeading.slice(lastSpace + 1) } : {}),
    },
    descriptions: paragraphs.length ? paragraphs : undefined,
    cta: buildBannerCta(rawBanner),
    ...(images ? { images } : {}),
  };
}

export default async function Clients() {
  const [clients, clientBannerData, caseStudies] = await Promise.all([
    getClients(),
    getClientBanner(),
    getCaseStudyThumbnails().catch(() => []),
  ]);

  const bannerData = clientBannerData?.banner
    ? buildClientsBannerData(clientBannerData.banner)
    : null;

  const clientLogos = (clients ?? [])
    .filter((client) => client.logo?.url)
    .map((client) => ({
      id: client.documentId,
      src: getStrapiImageUrl(client.logo),
      alt: client.name || "",
      width: client.logo?.width || 317,
      height: client.logo?.height || 122,
    }));

  // Everything below is derived from the Strapi clients, so it stays right as
  // clients are added or removed. Names are trimmed and de-duplicated.
  const clientNames = [
    ...new Set(
      (clients ?? [])
        .map((client) => client.name?.replace(/\s+/g, " ").trim())
        .filter(Boolean)
    ),
  ];
  const hasClients = clientNames.length > 0;  const sampleNames = joinNames(clientNames.slice(0, 5));

  const projects = (caseStudies ?? []).map(toCaseStudyItem);
  const portfolio = buildPortfolio(projects);

  const updated = formatUpdatedAt(
    [
      ...(clients ?? []).map((client) => client.updatedAt),
      clientBannerData?.updatedAt,
    ]
      .filter(Boolean)
      .sort()
      .pop()
  );

  const faqItems = hasClients
    ? [
        {
          question: "Who are Webmaffia's clients?",
          answer: `Webmaffia works with ${clientNames.length} clients listed on this page, including ${sampleNames}.`,
        },
        ...(projects.length
          ? [
              {
                question: "Where can I see the work Webmaffia has done for its clients?",
                answer: `The Webmaffia case studies page lists ${projects.length} client projects across ${joinNames(portfolio.services)}.`,
              },
            ]
          : []),
        {
          question: "How do I start a project with Webmaffia?",
          answer:
            "Use the Webmaffia contact page to tell the team what you are building: a new website, an SEO programme, a social media calendar or a campaign. The team will come back with a scope and a timeline.",
        },
        {
          question: "Where is Webmaffia based?",
          answer: "Webmaffia is a digital marketing agency based in Mumbai, India.",
        },
      ].map((faq, index) => ({ id: `clients-faq-${index}`, ...faq }))
    : [];

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Webmaffia clients",
    url: `${SITE_URL}/clients`,
    ...(updated ? { dateModified: updated.iso } : {}),
    publisher: { "@type": "Organization", name: "Webmaffia", url: `${SITE_URL}/` },
    ...(hasClients
      ? {
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: clientNames.length,
            itemListElement: clientNames.map((name, index) => ({
              "@type": "ListItem",
              position: index + 1,
              item: { "@type": "Organization", name },
            })),
          },
        }
      : {}),
  };

  return (
    <main className="wrapper clients_wrapper">
      <JsonLd data={BREADCRUMB_SCHEMA} />
      <JsonLd data={ORGANIZATION_SCHEMA} />
      <JsonLd data={pageSchema} />
      {faqItems.length > 0 && <JsonLd data={buildFaqSchema(faqItems)} />}
      <div className="ml-setter clients_page">
        {bannerData && (
          <Banner
            data={bannerData}
            dataSection="clients_hero"
            className="hero_section banner_para flex"
          />
        )}

        {hasClients && updated && (
          <div className="clients_intro">
            <p className="clients_updated">
              Last updated: <time dateTime={updated.iso}>{updated.label}</time>
            </p>
          </div>
        )}

        <ClientsLogosGrid logos={clientLogos} />

        {hasClients && (
          <section className="clients_names" aria-labelledby="clients-names-h">
            <h2 id="clients-names-h" className="clients_section_title">
              Webmaffia clients, A to Z
            </h2>
            <ul className="clients_names_list">
              {[...clientNames]
                .sort((a, b) => a.localeCompare(b, "en", { sensitivity: "base" }))
                .map((name) => (
                  <li key={name}>{name}</li>
                ))}
            </ul>
          </section>
        )}

        {faqItems.length > 0 && (
          <div className="clients_faq">
            <HomeFaq title="Clients FAQ" items={faqItems} />
          </div>
        )}

        {hasClients && (
          <section className="clients_about" aria-labelledby="clients-about-h">
            <h2 id="clients-about-h" className="clients_section_title">
              About Webmaffia
            </h2>
            <p className="clients_about_text">
              Webmaffia is a digital marketing agency based in Mumbai, India, working
              across website design, website development, SEO and social media for the
              clients on this page.
            </p>
            <h3 className="clients_cta_title">Want to work with Webmaffia?</h3>
            <p className="clients_about_text">
              Tell Webmaffia what you are building and the team will come back with a
              scope and a timeline. You can also look at the projects behind these
              clients first.
            </p>
            <div className="clients_about_links">
              <Link href="/contact" className="cta_text">
                Start a <span>project</span>
              </Link>
              <Link href="/case-study" className="cta_text">
                See our <span>work</span>
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
