import { bfsiFintech } from "@/lib/industries/bfsi-fintech";
import { consumerLifestyle } from "@/lib/industries/consumer-lifestyle";
import { energyMetalsManufacturing } from "@/lib/industries/energy-metals-manufacturing";
import { infrastructureTelecom } from "@/lib/industries/infrastructure-telecom";
import { pharmaHealthcare } from "@/lib/industries/pharma-healthcare";
import { realEstate } from "@/lib/industries/real-estate";

// Industry pages that are fully static (content lives in this folder, one file
// per page). A slug found here wins over the same slug in Strapi.
export const STATIC_INDUSTRIES = {
  [realEstate.slug]: realEstate,
  [pharmaHealthcare.slug]: pharmaHealthcare,
  [infrastructureTelecom.slug]: infrastructureTelecom,
  [energyMetalsManufacturing.slug]: energyMetalsManufacturing,
  [bfsiFintech.slug]: bfsiFintech,
  [consumerLifestyle.slug]: consumerLifestyle,
};

export function getStaticIndustry(slug) {
  return STATIC_INDUSTRIES[slug] ?? null;
}

export const STATIC_INDUSTRY_SLUGS = Object.keys(STATIC_INDUSTRIES);

// Every industry page, in the order shown in "Explore other industries" (all of
// them, including the current page). Add a line here for each new industry.
export const INDUSTRY_LINKS = [
  { slug: "real-estate", name: "Real Estate" },
  { slug: "pharma-healthcare", name: "Pharma & Healthcare" },
  { slug: "infrastructure-telecom", name: "Infrastructure & Telecom" },
  { slug: "energy-metals-manufacturing", name: "Energy, Metals & Manufacturing" },
  { slug: "bfsi-fintech", name: "BFSI & Fintech" },
  { slug: "consumer-lifestyle", name: "Consumer & Lifestyle" },
];
