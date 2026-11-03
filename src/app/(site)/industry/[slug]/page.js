import { notFound } from "next/navigation";
import IndustryDetailPage from "@/components/IndustryDetailPage";
import { SITE_URL } from "@/lib/schema";
import { getIndustries, getIndustryBySlug, getSeoFields } from "@/lib/strapiPage";

export async function generateStaticParams() {
  const industries = await getIndustries();
  return industries.filter((item) => item.slug).map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) return { title: "Industry | Webmaffia" };

  const seo = getSeoFields(industry.seo);
  const title = seo.title ?? `${industry.title} | Webmaffia`;
  const url = seo.canonical ?? `${SITE_URL}/industry/${slug}`;

  return {
    title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical: url },
    openGraph: { title, description: seo.description, url, type: "website" },
  };
}

export default async function IndustrySlugPage({ params }) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);
  if (!industry) notFound();

  return <IndustryDetailPage industry={industry} />;
}
