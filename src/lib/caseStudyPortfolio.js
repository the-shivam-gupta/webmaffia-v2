// Everything the /case-study page says about the portfolio is derived from the
// Strapi case studies themselves (names + service tags), so counts, group
// lists, FAQ answers and schema stay correct as projects are added or removed.

export function joinNames(names) {
  if (names.length <= 1) return names.join("");
  return `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}`;
}

function hasTag(item, tag) {
  return (item.type || "").toLowerCase().includes(tag);
}

// Which group a project belongs to, from its service tags.
function groupKeyOf(item) {
  if (hasTag(item, "social media")) {
    return item.name.includes("#") ? "campaigns" : "social";
  }
  if (hasTag(item, "seo")) return "seo";
  if (hasTag(item, "e-commerce")) return "ecommerce";
  if (hasTag(item, "website design") || hasTag(item, "development")) return "web";
  return "other";
}

const GROUP_DEFS = [
  {
    key: "seo",
    heading: "Which clients has Webmaffia delivered website design, development and SEO for?",
  },
  {
    key: "web",
    heading: "Which clients has Webmaffia delivered website design and development for?",
  },
  {
    key: "ecommerce",
    heading: "Which e-commerce websites has Webmaffia designed and developed?",
  },
  { key: "social", heading: "Which brands does Webmaffia run social media for?" },
  { key: "campaigns", heading: "What named social campaigns has Webmaffia created?" },
  { key: "other", heading: "What other projects has Webmaffia delivered?" },
];

export function buildPortfolio(items) {
  const byKey = Object.fromEntries(GROUP_DEFS.map((def) => [def.key, []]));
  items.forEach((item) => byKey[groupKeyOf(item)].push(item));

  const groups = GROUP_DEFS.filter((def) => byKey[def.key].length).map((def) => ({
    ...def,
    items: byKey[def.key],
    lead: `${joinNames(byKey[def.key].map((item) => item.name))}.`,
  }));

  const counts = {
    total: items.length,
    seo: byKey.seo.length,
    web: byKey.seo.length + byKey.web.length + byKey.ecommerce.length,
    social: byKey.social.length + byKey.campaigns.length,
    campaigns: byKey.campaigns.length,
  };

  // Distinct service tags across the portfolio, e.g. ["website design", "seo"].
  const services = [];
  items.forEach((item) =>
    (item.type || "")
      .split(" - ")
      .map((tag) => tag.trim())
      .filter(Boolean)
      .forEach((tag) => {
        const label = tag.toLowerCase() === "seo" ? "SEO" : tag.toLowerCase();
        if (!services.includes(label)) services.push(label);
      })
  );

  return { groups, counts, services, byKey };
}

export function buildIntro({ counts, services }) {
  const parts = [];
  if (counts.web) parts.push(`${counts.web} website design and development`);
  if (counts.social) parts.push(`${counts.social} social media`);
  return (
    `Webmaffia is a digital marketing agency. This page lists ${counts.total} client projects ` +
    `it has delivered across ${joinNames(services)}: ${parts.join(" and ")} engagements. ` +
    `Every entry names the client and the services Webmaffia delivered.`
  );
}

export const SERVICE_LEGEND =
  "Each project below carries a service tag. Website Design - Development means Webmaffia designed the site and built it. Website Design - Development - SEO means Webmaffia designed and built the site and also ran search engine optimisation for it. Social Media means Webmaffia handled the brand’s social media work, including the named campaigns.";

export function buildPortfolioFaq({ counts, services, byKey }) {
  const faqs = [
    {
      question: "What services does Webmaffia provide?",
      answer:
        `The projects on this page cover ${joinNames(services)}. Most engagements combine two or more: ` +
        `${counts.seo} of the ${counts.total} projects listed combined website design, development and SEO.`,
    },
    {
      question: "How many client projects are in Webmaffia's portfolio?",
      answer:
        `${counts.total} projects are listed on this page: ${counts.web} website design and development ` +
        `engagements (${counts.seo} of which also included SEO) and ${counts.social} social media engagements.`,
    },
  ];

  if (byKey.seo.length) {
    faqs.push({
      question: "Which Webmaffia projects combined a website build with SEO?",
      answer: `${joinNames(byKey.seo.map((item) => item.name))}.`,
    });
  }
  if (byKey.campaigns.length) {
    faqs.push({
      question: "What named campaigns has Webmaffia created?",
      answer: `${byKey.campaigns.length} are listed here: ${joinNames(
        byKey.campaigns.map((item) => item.name)
      )}, all social media campaigns.`,
    });
  }
  faqs.push({
    question: "What do the service tags on each project mean?",
    answer: SERVICE_LEGEND.replace(/^Each project below carries a service tag\. /, ""),
  });

  return faqs.map((faq, index) => ({ id: `portfolio-faq-${index}`, ...faq }));
}
