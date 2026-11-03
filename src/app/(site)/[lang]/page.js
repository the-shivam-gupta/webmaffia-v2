import { notFound, permanentRedirect } from "next/navigation";
import IndustryDetailPage from "@/components/IndustryDetailPage";
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
 *   - /<industry-slug>  CMS-driven industry pages (Strapi `industries`)
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

  return [
    ...industries.filter((item) => item.slug).map((item) => ({ lang: item.slug })),
    ...paths.map(({ serviceLocation }) => ({ lang: serviceLocation })),
  ];
}

export async function generateMetadata({ params }) {
  const { lang: slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) return {};

  const seo = getSeoFields(industry.seo);
  const title = seo.title ?? `${industry.title} | Webmaffia`;
  const url = seo.canonical ?? `${SITE_URL}/${slug}`;
  const heroImage = industry.banner?.desktopImage;

  return {
    title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "en_IN",
      url,
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
    // Keep Vercel preview deployments out of search results.
    ...(process.env.VERCEL_ENV === "preview"
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}

export default async function TopLevelSlugPage({ params }) {
  const { lang: slug } = await params;

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
