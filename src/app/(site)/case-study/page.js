import Link from "next/link";
import Banner from "@/components/Banner";
import HomeFaq from "@/components/HomeFaq";
import JsonLd from "@/components/JsonLd";
import WorkListSection from "@/components/WorkListSection";
import { getCaseStudyThumbnails } from "@/lib/strapiPage";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  ORGANIZATION_SCHEMA,
  SITE_URL,
} from "@/lib/schema";
import { toCaseStudyItem } from "@/lib/case-study-helpers";
import {
  buildIntro,
  buildPortfolio,
  buildPortfolioFaq,
} from "@/lib/caseStudyPortfolio";
import { formatUpdatedAt } from "@/lib/dates";

const BREADCRUMB_SCHEMA = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Our Work", path: "/case-study" },
]);

export const metadata = {
  alternates: {
    canonical: "https://www.webmaffia.com/case-study",
  },
  title: "Webmaffia Case Studies | Website Design, SEO & Social Media",
  description:
    "Browse the client projects Webmaffia has delivered across website design, development, SEO and social media, from Lupin and Afcons to Tata Housing and Birla Sun Life.",
};

const FALLBACK_INTRO =
  "Webmaffia is a digital marketing agency. This page lists the client projects it has delivered across website design, development, SEO and social media.";

function buildBannerData(description) {
  return {
    imagePosition: "right",
    // The hero image is the page's LCP element: load it eagerly.
    priority: true,
    subheading: {
      enabled: true,
      text: "STORIES WE TELL",
    },
    title: {
      line1: "Webmaffia",
      line2: "case studies",
    },
    description,
    images: {
      banner: {
        url: "/assets/images/case-study.svg",
        alt: "",
        width: 672,
        height: 566,
      },
    },
  };
}

export default async function CaseStudyPage() {
  let items = [];
  let newestUpdate = null;
  try {
    const caseStudies = await getCaseStudyThumbnails();

    items = caseStudies
      .map((entry) => ({
        item: toCaseStudyItem(entry),
        external: !!entry.thumbnail?.externalLink,
        // CMS `order` (thumbnail.order): lowest first; entries without one go last.
        order: Number.isFinite(entry.thumbnail?.order)
          ? entry.thumbnail.order
          : Number.POSITIVE_INFINITY,
      }))
      .sort((a, b) => {
        if (a.order !== b.order) return a.order < b.order ? -1 : 1;
        return Number(a.external) - Number(b.external);
      })
      .map(({ item }) => item);

    newestUpdate = caseStudies
      .map((entry) => entry.updatedAt)
      .filter(Boolean)
      .sort()
      .pop();
  } catch (e) {
    console.error("Failed to fetch case studies:", e);
  }

  const portfolio = buildPortfolio(items);
  const hasItems = items.length > 0;
  const faqItems = hasItems ? buildPortfolioFaq(portfolio) : [];
  const updated = formatUpdatedAt(newestUpdate);
  const bannerData = buildBannerData(hasItems ? buildIntro(portfolio) : FALLBACK_INTRO);

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Webmaffia case studies",
    url: `${SITE_URL}/case-study`,
    ...(updated ? { dateModified: updated.iso } : {}),
    publisher: { "@type": "Organization", name: "Webmaffia", url: `${SITE_URL}/` },
    ...(hasItems
      ? {
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: items.length,
            itemListElement: items.map((item, index) => ({
              "@type": "ListItem",
              position: index + 1,
              name: `${item.name}${item.title ? `: ${item.title}` : ""}`,
              url: item.url?.startsWith("http") ? item.url : `${SITE_URL}${item.url}`,
            })),
          },
        }
      : {}),
  };

  return (
    <main className="wrapper">
      <JsonLd data={BREADCRUMB_SCHEMA} />
      <JsonLd data={ORGANIZATION_SCHEMA} />
      <JsonLd data={pageSchema} />
      {faqItems.length > 0 && <JsonLd data={buildFaqSchema(faqItems)} />}
      <div className="ml-setter work_list">
        <Banner data={bannerData} />

        {hasItems && updated && (
          <div className="portfolio_intro">
            <p className="portfolio_updated">
              Last updated: <time dateTime={updated.iso}>{updated.label}</time>
            </p>
          </div>
        )}

        <WorkListSection items={items} />

        {hasItems && (
          <section className="portfolio_table_section" aria-labelledby="portfolio-table-h">
            <h2 id="portfolio-table-h" className="portfolio_section_title">
              All projects at a glance
            </h2>
            <table className="portfolio_table">
              <caption>Webmaffia client projects and the services delivered</caption>
              <thead>
                <tr>
                  <th scope="col">Client</th>
                  <th scope="col">Services delivered by Webmaffia</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={`${item.name}-${item.image}`}>
                    <td>{item.name}</td>
                    <td>
                      {item.title.split(" - ").map((tag) => (
                        <span className="portfolio_tag" key={tag}>
                          {tag}
                        </span>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        )}

        {faqItems.length > 0 && (
          <div className="portfolio_faq">
            <HomeFaq title="Portfolio FAQ" items={faqItems} />
          </div>
        )}

        {hasItems && (
          <section className="portfolio_about" aria-labelledby="portfolio-about-h">
            <h2 id="portfolio-about-h" className="portfolio_section_title">
              About Webmaffia
            </h2>
            <p className="portfolio_about_text">
              Webmaffia is a digital marketing agency based in Mumbai, India, working
              across website design, website development, SEO and social media. The{" "}
              {items.length} projects on this page were delivered by the Webmaffia team.
            </p>
            <h3 className="portfolio_cta_title">Want work like this for your brand?</h3>
            <p className="portfolio_about_text">
              Tell Webmaffia what you are building - a new website, an SEO programme, a
              social media calendar or a campaign - and the team will come back with a
              scope and a timeline.
            </p>
            <div className="portfolio_about_links">
              <Link href="/contact" className="cta_text">
                Start a <span>project</span>
              </Link>
              <Link href="/services" className="cta_text">
                See our <span>services</span>
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
