// Fallback tool lists for the service pages, restored from the static service
// files removed in "Dynamic: services page". A group is used only while its
// Strapi `tools-we-use` entry has no logos yet; once logos are added in Strapi
// they replace the group here (matched by service slug + group title).
// Shape: { [serviceSlug]: { heading, groups: [{ title, tools: [name] }] } }
const SERVICE_TOOLS_FALLBACK = {
  "digital-strategy": {
    "heading": "Digital Strategy Tools We Use",
    "groups": [
      {
        "title": "Research & Insights",
        "tools": [
          "Semrush",
          "Ahrefs",
          "Similarweb",
          "Google Trends"
        ]
      },
      {
        "title": "Audience & Social",
        "tools": [
          "Meta Audience Insights",
          "LinkedIn Insights",
          "Brandwatch",
          "Surveys & interviews"
        ]
      },
      {
        "title": "Analytics & Measurement",
        "tools": [
          "Google Analytics 4",
          "Google Search Console",
          "Looker Studio",
          "Microsoft Clarity"
        ]
      },
      {
        "title": "Planning & Collaboration",
        "tools": [
          "Figma",
          "FigJam",
          "Notion",
          "Miro"
        ]
      },
      {
        "title": "MarTech",
        "tools": [
          "CRM platforms",
          "Marketing automation",
          "Tag management",
          "CDP readiness"
        ]
      }
    ]
  },
  "website-design-development-services": {
    "heading": "Website Design & Development Tools We Use",
    "groups": [
      {
        "title": "Design & Prototyping",
        "tools": [
          "Figma",
          "FigJam",
          "Adobe Creative Cloud",
          "Design systems"
        ]
      },
      {
        "title": "Development",
        "tools": [
          "Next.js",
          "React",
          "Node.js",
          "Tailwind CSS"
        ]
      },
      {
        "title": "CMS & Integrations",
        "tools": [
          "Strapi",
          "WordPress",
          "CRM integrations",
          "Marketing automation"
        ]
      },
      {
        "title": "Performance & Quality",
        "tools": [
          "Lighthouse",
          "PageSpeed Insights",
          "WAVE accessibility",
          "BrowserStack"
        ]
      },
      {
        "title": "Hosting & Analytics",
        "tools": [
          "Vercel",
          "AWS",
          "Google Analytics 4",
          "Google Search Console"
        ]
      }
    ]
  },
  "social-media-marketing-strategy": {
    "heading": "Social Media Marketing Tools We Use",
    "groups": [
      {
        "title": "Planning & Publishing",
        "tools": [
          "Meta Business Suite",
          "Sprout Social",
          "Hootsuite",
          "Buffer"
        ]
      },
      {
        "title": "Creative & Video",
        "tools": [
          "Adobe Creative Cloud",
          "Figma",
          "Canva",
          "CapCut"
        ]
      },
      {
        "title": "Listening & Insights",
        "tools": [
          "Brandwatch",
          "Talkwalker",
          "Meta Ad Library",
          "Native platform analytics"
        ]
      },
      {
        "title": "Paid Social",
        "tools": [
          "Meta Ads Manager",
          "LinkedIn Campaign Manager",
          "YouTube / Google Ads",
          "X Ads"
        ]
      },
      {
        "title": "Analytics & Reporting",
        "tools": [
          "Google Analytics 4",
          "Looker Studio",
          "UTM tracking",
          "CRM integrations"
        ]
      }
    ]
  },
  "influencer-marketing": {
    "heading": "Influencer Marketing Tools We Use",
    "groups": [
      {
        "title": "Discovery & Vetting",
        "tools": [
          "Qoruz",
          "Modash",
          "HypeAuditor",
          "Native creator marketplaces"
        ]
      },
      {
        "title": "Campaign Management",
        "tools": [
          "Contracts & usage rights",
          "Content approval workflows",
          "Notion",
          "Google Workspace"
        ]
      },
      {
        "title": "Amplification",
        "tools": [
          "Meta partnership ads",
          "YouTube BrandConnect",
          "LinkedIn Thought Leader Ads",
          "Meta Ads Manager"
        ]
      },
      {
        "title": "Compliance",
        "tools": [
          "ASCI influencer guidelines",
          "Endorsement guidelines",
          "Disclosure checklists",
          "Brand safety checks"
        ]
      },
      {
        "title": "Tracking & Reporting",
        "tools": [
          "UTM tracking",
          "Promo codes",
          "Google Analytics 4",
          "Looker Studio"
        ]
      }
    ]
  },
  "content-marketing-strategy": {
    "heading": "Content Marketing Tools We Use",
    "groups": [
      {
        "title": "Research & Planning",
        "tools": [
          "Ahrefs",
          "Semrush",
          "AnswerThePublic",
          "Google Search Console"
        ]
      },
      {
        "title": "Writing & Optimisation",
        "tools": [
          "Surfer SEO",
          "Clearscope",
          "Frase",
          "Grammarly"
        ]
      },
      {
        "title": "Design & Video",
        "tools": [
          "Adobe Creative Cloud",
          "Figma",
          "Canva",
          "Descript"
        ]
      },
      {
        "title": "Publishing & Workflow",
        "tools": [
          "Strapi",
          "WordPress",
          "Notion",
          "Google Workspace"
        ]
      },
      {
        "title": "Analytics & Reporting",
        "tools": [
          "Google Analytics 4",
          "Looker Studio",
          "Schema validator",
          "AI citation tracking"
        ]
      }
    ]
  },
  "app-store-optimization": {
    "heading": "App Store Optimization Tools We Use",
    "groups": [
      {
        "title": "Keyword & Market Research",
        "tools": [
          "AppTweak",
          "Sensor Tower",
          "MobileAction",
          "Google Play Console"
        ]
      },
      {
        "title": "Store Management",
        "tools": [
          "App Store Connect",
          "Google Play Console",
          "Custom product pages",
          "Custom store listings"
        ]
      },
      {
        "title": "Creative & Testing",
        "tools": [
          "Figma",
          "Adobe Creative Cloud",
          "Product page optimization",
          "Store listing experiments"
        ]
      },
      {
        "title": "Reviews & Reputation",
        "tools": [
          "AppFollow",
          "App Store Connect reviews",
          "Play Console reviews",
          "Sentiment tagging"
        ]
      },
      {
        "title": "Analytics & Reporting",
        "tools": [
          "Firebase",
          "Google Analytics 4",
          "App Store Connect analytics",
          "Looker Studio"
        ]
      }
    ]
  },
  "ai-powered-solutions-services": {
    "heading": "AI-Powered Solutions Tools We Use",
    "groups": [
      {
        "title": "AI Models",
        "tools": [
          "OpenAI GPT models",
          "Anthropic Claude",
          "Google Gemini",
          "Open-source models"
        ]
      },
      {
        "title": "Build & Orchestration",
        "tools": [
          "Python",
          "Node.js",
          "LangChain",
          "Vector databases"
        ]
      },
      {
        "title": "Automation & Integration",
        "tools": [
          "n8n",
          "Zapier",
          "Make",
          "CRM and CMS APIs"
        ]
      },
      {
        "title": "Conversational Channels",
        "tools": [
          "Website chat",
          "WhatsApp Business Platform",
          "In-app assistants",
          "Microsoft Teams"
        ]
      },
      {
        "title": "Monitoring & Analytics",
        "tools": [
          "Evaluation test sets",
          "Usage dashboards",
          "Google Analytics 4",
          "Looker Studio"
        ]
      }
    ]
  }
};

export default SERVICE_TOOLS_FALLBACK;
