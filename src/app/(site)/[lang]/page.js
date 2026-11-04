import { notFound, permanentRedirect } from "next/navigation";
import IndustryDetailPage from "@/components/IndustryDetailPage";
import StaticIndustryPage from "@/components/StaticIndustryPage";
import { getStaticIndustry, STATIC_INDUSTRY_SLUGS } from "@/lib/industries";
import { SITE_URL } from "@/lib/schema";
import {
  getAllServiceLocationPaths,
  getServiceLocationMatch,
} from "@/lib/serviceLocations";
import {
  getIndustries,
  getIndustryBySlug,
  getSeoFields,
  getStrapiImageUrl,
} from "@/lib/strapiPage";

/**
 * Top-level single-segment pages:
 *   - /<industry-slug>  industry pages: static content (src/lib/industries)
 *     first, otherwise the CMS entry from Strapi `industries`
 *   - /<service>-in-<city>  legacy city-variant service URLs, kept only as a
 *     permanent redirect to /services/<service>-in-<city> so old indexed/shared
 *     links keep working.
 *
 * The dynamic segment is named `lang` (not `slug`) because Next requires
 * sibling dynamic segments at the same level to share a name, and the
 * blog/author section lives under app/[lang]. Here the value is an industry
 * or service location slug, never a locale.
 */
export async function generateStaticParams() {
  const [industries, paths] = await Promise.all([
    getIndustries(),
    getAllServiceLocationPaths(),
  ]);

  const industrySlugs = new Set([
    ...STATIC_INDUSTRY_SLUGS,
    ...industries.filter((item) => item.slug).map((item) => item.slug),
  ]);

  return [
    ...[...industrySlugs].map((slug) => ({ lang: slug })),
    ...paths.map(({ serviceLocation }) => ({ lang: serviceLocation })),
  ];
}

// Keep Vercel preview deployments out of search results.
const previewRobots =
  process.env.VERCEL_ENV === "preview"
    ? { robots: { index: false, follow: false } }
    : {};

export async function generateMetadata({ params }) {
  const { lang: slug } = await params;
  const url = `${SITE_URL}/${slug}`;

  const staticPage = getStaticIndustry(slug);
  if (staticPage) {
    return {
      title: staticPage.seo.title,
      description: staticPage.seo.description,
      alternates: { canonical: url },
      robots: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
      openGraph: {
        type: "website",
        locale: "en_IN",
        siteName: "Webmaffia",
        url,
        title: staticPage.seo.title,
        description: staticPage.seo.description,
        images: [
          {
            url: `${SITE_URL}${staticPage.hero.image.src}`,
            width: staticPage.hero.image.width,
            height: staticPage.hero.image.height,
          },
        ],
      },
      twitter: { card: "summary_large_image" },
      ...previewRobots,
    };
  }

  const industry = await getIndustryBySlug(slug);
  if (!industry) return {};

  const seo = getSeoFields(industry.seo);
  const title = seo.title ?? `${industry.title} | Webmaffia`;
  const canonical = seo.canonical ?? url;
  const heroImage = industry.banner?.desktopImage;

  return {
    title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url: canonical,
      title,
      description: seo.description,
      ...(heroImage?.url
        ? {
            images: [
              {
                url: getStrapiImageUrl(heroImage),
                width: heroImage.width,
                height: heroImage.height,
              },
            ],
          }
        : {}),
    },
    twitter: { card: "summary_large_image" },
    ...previewRobots,
  };
}

export default async function TopLevelSlugPage({ params }) {
  const { lang: slug } = await params;

  const staticPage = getStaticIndustry(slug);
  if (staticPage) {
    return <StaticIndustryPage page={staticPage} />;
  }

  const industry = await getIndustryBySlug(slug);
  if (industry) {
    return <IndustryDetailPage industry={industry} />;
  }

  const match = await getServiceLocationMatch(slug);
  if (!match) {
    notFound();
  }

  permanentRedirect(`/services/${slug}`);
}
