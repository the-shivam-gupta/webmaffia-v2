import { notFound } from "next/navigation";
import RootShell, { siteMetadata } from "@/components/RootShell";
import { getDir, isLocale, LOCALES } from "@/lib/i18n";

// Blog + author sections. Unknown locale segments 404 via notFound() below.
// Do NOT set `dynamicParams = false` here: it would stop blog posts missing from
// the build-time list from rendering on demand, turning them into cached 404s.

export const metadata = siteMetadata;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  return (
    <RootShell lang={lang} dir={getDir(lang)}>
      {children}
    </RootShell>
  );
}
