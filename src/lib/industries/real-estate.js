// Static content for /real-estate. Source: real-estate.html (industry-pages).
// One file per industry page; the shared layout is StaticIndustryPage.js.
// Icons are picked by name from the ICONS map in that component.

export const realEstate = {
  slug: "real-estate",
  name: "Real Estate",
  updated: "2026-11-26",
  seo: {
    title: "Real Estate Digital Marketing Agency in Mumbai | Webmaffia",
    description:
      "Mumbai real estate digital marketing agency. Websites, SEO, AI, social, content, ASO and influencer marketing that turn project launches into site visits.",
  },
  schema: {
    serviceName: "Real estate digital marketing",
    serviceType: "Digital marketing for real estate companies",
    serviceDescription:
      "Real estate digital marketing uses websites, search, social media, content, apps and automation to help developers and brokers fill project launches with qualified enquiries, convert them into site visits and bookings, and build trust with home buyers, NRIs, channel partners and investors.",
    catalogName: "Real Estate marketing services",
    areaServed: ["India", "United Arab Emirates"],
  },

  hero: {
    label: "Real estate marketing",
    title: "Real estate digital marketing that turns launches into site visits",
    leadStrong:
      "Webmaffia is a Mumbai real estate digital marketing agency for developers, builders and brokers.",
    lead: "One team covers all eight services a property brand needs, from the first launch teaser to the final booking.",
    primary: { text: "Get a plan", href: "/contact" },
    secondary: { text: "View Our Work", href: "/case-study" },
    image: {
      src: "/assets/images/real-estate/modern-villa.png",
      alt: "Modern villa with large glass windows",
      width: 1672,
      height: 941,
    },
  },

  stats: [
    { value: "8", label: "Services under one roof" },
    { value: "4", label: "Offices: Mumbai, Bengaluru, USA, Dubai" },
    { value: "ISO 27001", label: "Certified information security" },
    { value: "4.3★", label: "Google rating, 46+ reviews" },
  ],

  approach: {
    label: "Our approach",
    title: "What makes a real estate website generate leads, not just look good?",
    paragraphs: [
      "Webmaffia builds real estate websites and campaigns for property developers (developer websites, project microsites and listing portals) that do more than look good. They showcase your projects, answer buyer questions before they are asked, build credibility and guide every visitor towards the next step: an enquiry, a site visit or a booking.",
      "Because all eight Webmaffia services (digital strategy, design and development, SEO, AI-powered solutions, social media, content marketing, app store optimization and influencer marketing) sit with one team, your launch story stays consistent from the hoarding to the WhatsApp chat.",
    ],
    image: {
      src: "/assets/images/real-estate/laptop-scenary.png",
      alt: "Real estate project website shown on a laptop",
      width: 1408,
      height: 768,
    },
  },

  problems: {
    label: "The problems we solve",
    title: "What digital challenges do real estate businesses face?",
    items: [
      { title: "Why are my leads low quality?", text: "Clear calls to action, qualifying forms and better content structure attract buyers who are ready to visit, not just browse." },
      { title: "How do I make project information clear?", text: "Configurations, floor plans, amenities, pricing cues and location advantages are organised so buyers can decide quickly." },
      { title: "How do I fix a poor mobile experience?", text: "Most property searches start on a phone. We build mobile-first pages that load fast on any network." },
      { title: "How do I build trust and credibility with buyers?", text: "RERA details, delivery track record, construction updates and testimonials are made easy to find and verify." },
      { title: "How do I get found online?", text: "A micro-market is the specific locality a project actually sells into (Thane West or Lower Parel rather than Mumbai). Micro-market SEO targets those locality-and-configuration searches. Together with Google Business Profiles for your sales offices and AI-ready content, it helps buyers find you first." },
    ],
  },

  services: {
    label: "Our services",
    title: "Which real estate marketing services does Webmaffia offer?",
    items: [
      { icon: "compass", title: "Digital strategy", href: "/services/digital-strategy", text: "Launch roadmaps, buyer personas, micro-market positioning and a channel plan tied to site visits and bookings." },
      { icon: "code", title: "Design and development", href: "/services/website-design-development-services", text: "Developer websites, project microsites and listing portals with floor plans, walkthroughs and CRM-connected enquiry forms." },
      { icon: "seo", title: "SEO", href: "/services/search-engine-optimization-services", text: "Project, location and configuration pages that rank for searches like \"2 BHK in Thane\", plus schema for AI answers." },
      { icon: "chip", title: "AI-powered solutions", href: "/services/ai-powered-solutions-services", text: "Lead scoring, WhatsApp and chat assistants, and enquiry routing so sales teams call the hottest leads first." },
      { icon: "social", title: "Social media", href: "/services/social-media-marketing-strategy", text: "Launch campaigns, construction updates, walkthrough reels and community stories on Instagram, YouTube and LinkedIn." },
      { icon: "doc", title: "Content marketing", href: "/services/content-marketing-strategy", text: "Location guides, buyer explainers, NRI investment guides and project stories that answer real buyer questions." },
      { icon: "app", title: "App store optimization", href: "/services/app-store-optimization", text: "Store listings, keywords and creatives for your customer, broker and post-sales apps, so home buyers, channel partners and existing residents find and install the right app." },
      { icon: "mega", title: "Influencer marketing", href: "/services/influencer-marketing", text: "Campaigns with local creators, home and design voices, and advocacy from your channel partners (the brokers and sales partners who sell your projects), all briefed to follow ASCI advertising rules." },
    ],
  },

  types: {
    label: "Website types and features",
    title: "Developer website, project microsite or listing portal: which do you need?",
    columns: ["Feature", "Developer website", "Project microsite", "Listing portal"],
    rows: [
      { name: "Project or property listings", has: [true, true, true] },
      { name: "Floor plans and configurations", has: [true, true, true] },
      { name: "Virtual tours / 360°", has: [false, true, true] },
      { name: "CRM-connected lead management", has: [true, true, true] },
      { name: "Multi-city, multi-project support", has: [true, false, true] },
      { name: "Advanced search filters", has: [false, false, true] },
      { name: "RERA details block", has: [true, true, true] },
    ],
  },

  process: {
    label: "Our process",
    title: "How does working with Webmaffia work? A simple 3-step process",
    steps: [
      { title: "Discover & Plan", text: "Webmaffia learns your projects, buyers and launch calendar, then agrees a clear strategy and channel plan." },
      { title: "Design & Develop", text: "Webmaffia designs the experience, builds a fast, secure website and prepares launch content and campaigns." },
      { title: "Launch & Grow", text: "Webmaffia goes live, tracks enquiries to site visits, and keeps optimising content, SEO and campaigns." },
    ],
  },

  receive: {
    label: "What you receive",
    title: "What is included in a Webmaffia real estate engagement?",
    intro: "Every Webmaffia real estate engagement includes the following as standard, from the first build through to ongoing growth:",
    items: [
      "Custom website design and development",
      "CMS setup with project and listing templates",
      "SEO and structured data setup",
      "Mobile and cross-browser testing",
      "CRM and WhatsApp lead integration",
      "Analytics and enquiry tracking",
      "Launch social and content calendar",
      "Admin training and documentation",
      "Ongoing support and growth recommendations",
    ],
  },

  band: {
    label: "Security and compliance",
    title: "Is the website RERA compliant and secure?",
    text: "Property marketing carries legal and reputational risk. Webmaffia builds compliance into the page templates it ships (the project pages, listing pages and enquiry forms used across your website and microsites), and your legal team approves what goes live.",
    points: [
      "RERA registration details and QR codes where your state authority requires them",
      "Artist's impression and pricing disclaimers in the right places",
      "Privacy practices aligned with India's DPDP Act and GDPR",
      "SSL, secure hosting, backups and regular security updates",
    ],
  },

  why: {
    label: "Why Webmaffia",
    title: "Why do real estate brands choose Webmaffia?",
    items: [
      { icon: "users", title: "Real estate focus", text: "Webmaffia understands launches, channel partners, NRI buyers and the site-visit funnel." },
      { icon: "spark", title: "Design that sells", text: "Clean, premium, conversion-focused design that reflects the project." },
      { icon: "chart", title: "Performance driven", text: "Fast pages, better rankings and leads tracked through to site visits." },
      { icon: "shield", title: "One accountable team", text: "All eight services, one plan and a dedicated point of contact." },
    ],
  },

  results: {
    label: "Real results",
    title: "How big is Webmaffia, and what certifications does it hold?",
    items: [
      { value: "8", label: "Webmaffia delivers all eight real estate services through one accountable team" },
      { value: "4", label: "Webmaffia has four offices across India, the USA and the UAE" },
      { value: "4.3★", label: "Webmaffia holds a 4.3-star Google rating from 46+ reviews" },
      { value: "2028", label: "Webmaffia’s ISO/IEC 27001:2022 certification is valid until 2028" },
    ],
  },

  faq: {
    label: "Frequently asked questions",
    title: "Got questions? We’ve got answers.",
    items: [
      { question: "What is real estate digital marketing?", answer: "Real estate digital marketing uses websites, search, social media, content, apps and automation to help developers and brokers fill launches with qualified enquiries, convert them into site visits and bookings, and build trust with buyers, NRIs and channel partners." },
      { question: "Which services does Webmaffia offer for real estate companies?", answer: "Webmaffia offers all eight under one roof: digital strategy, website design and development, SEO, AI-powered solutions, social media, content marketing, app store optimization and influencer marketing." },
      { question: "How long does it take to build a real estate website?", answer: "It depends on scope. A single-project microsite is quicker than a multi-project developer website with listings and CRM integration. Webmaffia gives a realistic timeline after discovery." },
      { question: "Can you integrate with our existing CRM?", answer: "Often, yes. Enquiries can be passed to your CRM or sales tool so no lead sits in an inbox. This depends on the integration options your CRM offers, and Webmaffia checks it during discovery." },
      { question: "Do property portals replace a developer website?", answer: "No. Portals bring reach, but you do not own the audience or the data. Your own website builds brand trust, captures direct enquiries and ranks for your project and location searches. Most developers use both." },
      { question: "How should RERA details appear on real estate marketing?", answer: "Show the RERA registration number, and QR code where your state authority requires it, on project pages and advertisements. Rules differ by state, so Webmaffia follows your legal team's guidance." },
      { question: "Will our website rank on Google and AI Overviews?", answer: "Webmaffia builds with fast performance, crawl-friendly architecture, structured data and answer-first content so pages can rank and be cited in AI answers such as Google AI Overviews, ChatGPT and Perplexity. No agency can guarantee a specific ranking or citation." },
      { question: "How much does real estate digital marketing cost?", answer: "Cost depends on the number of projects, services, content volume, cities and integrations. Webmaffia shares a scoped plan after a discovery call." },
    ],
  },
};
