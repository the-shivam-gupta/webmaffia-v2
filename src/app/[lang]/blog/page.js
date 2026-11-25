import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import BlogListItem from "@/components/BlogListItem";
import BlogSearch from "@/components/BlogSearch";
import BlogPagination from "@/components/BlogPagination";
import HomeFaq from "@/components/HomeFaq";
import JsonLd from "@/components/JsonLd";
import { buildLocalizedAlternates, localesWithPosts } from "@/lib/blog-seo";
import { t } from "@/lib/dictionaries";
import { isLocale, localizePath } from "@/lib/i18n";
import {
  categorySlug,
  formatBlogDate,
  getAllBlogCategories,
  getBlogCategories,
  getBlogsByLocale,
  getBlogWithMeta,
  getStrapiImageUrl,
  parseBlogDate,
} from "@/lib/strapiPage";
import {
  buildBreadcrumbSchema,
  buildFaqSchema,
  ORGANIZATION_SCHEMA,
  SITE_URL,
} from "@/lib/schema";

const BLOG_PAGE_SIZE = 9;

// Definitions for the terms the post teasers use without explaining them.
const BLOG_TERMS = [
  {
    name: "SEO (search engine optimisation)",
    text: "The work of getting a website's pages found and ranked in conventional search results such as Google's blue links.",
  },
  {
    name: "GEO (generative engine optimisation)",
    text: "The equivalent work for generative answer engines such as ChatGPT, Perplexity and Google AI Overviews, where the goal is to be retrieved, quoted and cited inside an answer rather than ranked as a link.",
  },
  {
    name: "AI search",
    text: "Any search experience where an AI model writes the answer and the sources sit underneath it, including Google AI Overviews and AI Mode.",
  },
  {
    name: "Zero-click search",
    text: "A search in which the person finds what they need on the results page itself, through an AI summary, a snippet or a map listing, and never visits a website.",
  },
];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June", "July",
  "August", "September", "October", "November", "December",
];

// Date of the newest post -> { iso, label }. parseBlogDate builds the date in
// local time, so it is read back with the local getters (not UTC, which could
// land on the previous day).
function newestPostDate(post) {
  const time = parseBlogDate(post?.date);
  if (!time) return null;
  const date = new Date(time);
  const pad = (n) => String(n).padStart(2, "0");
  return {
    iso: `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`,
    label: `${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`,
  };
}

// /blog?category=<slug> gets its own tab title, description and canonical URL.
// Without a (valid) category the layout's default metadata applies.
export async function generateMetadata({ params, searchParams }) {
  const { lang } = await params;
  if (!isLocale(lang)) return {};

  const { category, q } = await searchParams;
  // Search results are thin, duplicate-prone pages: keep them out of the index
  const isSearch = typeof q === "string" && q.trim() !== "";
  const robots = isSearch ? { robots: { index: false, follow: true } } : {};

  const [{ posts: blogs, isFallback }, postsByLocale] = await Promise.all([
    getBlogWithMeta(lang),
    getBlogsByLocale(),
  ]);

  if (category) {
    const match = blogs
      .flatMap(getBlogCategories)
      .find((item) => item.slug === categorySlug(category));

    if (match) {
      return {
        ...robots,
        title: `${match.title} Articles | Webmaffia`,
        description: `Read the latest ${match.title} articles, guides and insights from the Webmaffia team.`,
        alternates: {
          canonical: `${SITE_URL}${localizePath(lang, "/blog")}?category=${match.slug}`,
        },
      };
    }
    return robots;
  }

  return {
    ...robots,
    alternates: buildLocalizedAlternates({
      lang,
      path: "/blog",
      isFallback,
      availableLocales: localesWithPosts(postsByLocale),
    }),
  };
}

export default async function BlogPage({ params, searchParams }) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();

  const { posts: blogs } = await getBlogWithMeta(lang);
  const allCategories = await getAllBlogCategories(lang);

  const blogPath = localizePath(lang, "/blog");
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: t(lang, "breadcrumb.home"), path: "/" },
    { name: t(lang, "breadcrumb.blog"), path: blogPath },
  ]);

  const { page, category, q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";

  // Freshness: the newest post's date and the post count (real data, so it
  // moves on its own whenever a post is added).
  const newest = newestPostDate(blogs[0]);
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: t(lang, "meta.blog.title"),
    url: `${SITE_URL}${blogPath}`,
    ...(newest ? { dateModified: newest.iso } : {}),
    publisher: { "@type": "Organization", name: "Webmaffia", url: `${SITE_URL}/` },
  };

  // /blog?category=<slug> shows every post tagged with that category
  const activeCategory = category
    ? blogs
        .flatMap(getBlogCategories)
        .find((item) => item.slug === categorySlug(category)) ?? null
    : null;
  const categoryPosts = activeCategory
    ? blogs.filter((post) =>
        getBlogCategories(post).some((item) => item.slug === activeCategory.slug)
      )
    : [];

  // /blog?q=<text> lists posts whose title or slug contains every search word.
  // With an active category the search runs inside that category only.
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  const searchPosts = query
    ? (activeCategory ? categoryPosts : blogs).filter((post) => {
        const haystack = `${post.heading ?? ""} ${post.slug ?? ""}`.toLowerCase();
        return words.every((word) => haystack.includes(word));
      })
    : [];
  const isFiltered = Boolean(activeCategory || query);

  // The intro and terms are English copy, so other languages skip them; they
  // sit on the first page of the unfiltered listing only.
  const showIntro =
    lang === "en" && !isFiltered && (Number.parseInt(page, 10) || 1) === 1;

  // Real questions the listing leaves unanswered (English copy, first page of
  // the unfiltered listing only, like the intro). Also feeds the FAQPage schema.
  const faqItems = showIntro
    ? [
        {
          id: "geo-vs-seo",
          question: "What is the difference between GEO and SEO?",
          answer:
            "SEO (search engine optimisation) is the work of getting a website's pages found and ranked in conventional search results such as Google's blue links. GEO (generative engine optimisation) is the equivalent work for answer engines such as ChatGPT, Perplexity and Google AI Overviews, where the goal is to be retrieved, quoted and cited inside an answer rather than ranked as a link. Most businesses need both, because AI answers often draw on pages that already rank well.",
        },
        {
          id: "seo-or-rebuild",
          question: "Should I fix my SEO or rebuild my website first?",
          answer:
            "It depends on what is holding the site back. Spending on SEO for a website that converts poorly sends traffic into a dead end, while rebuilding a site without an SEO strategy risks losing the rankings it already has. The Webmaffia post \"SEO or Website Rebuild First?\" explains how to diagnose which problem to fix first.",
        },
        {
          id: "who-writes",
          question: "Who writes the Webmaffia blog?",
          answer:
            "The Webmaffia team writes and edits the posts: the strategists, designers and developers who deliver the agency's SEO, AI, website design and development work. Each post names its author, and the Authors page lists the team behind the articles.",
        },
        {
          id: "topics",
          question: "What topics does the Webmaffia blog cover?",
          answer: `The Webmaffia blog covers ${
            allCategories.length > 0
              ? allCategories.map((item) => item.title).join(", ")
              : "search, AI search, website design and development"
          }. Use the category filter next to the search box to narrow the list to one topic.`,
        },
      ]
    : [];
  const faqSchema = faqItems.length ? buildFaqSchema(faqItems) : null;

  const featuredBlog = isFiltered ? null : blogs[0];
  const featuredHref = featuredBlog
    ? localizePath(lang, `/blog/${featuredBlog.slug}`)
    : blogPath;
  const featuredCategory = featuredBlog ? getBlogCategories(featuredBlog)[0] : null;
  const recommendedBlogs = isFiltered ? [] : blogs.slice(1, 5);
  const remainingBlogs = query ? searchPosts : activeCategory ? categoryPosts : blogs.slice(5);

  const totalPages = Math.max(1, Math.ceil(remainingBlogs.length / BLOG_PAGE_SIZE));
  const requestedPage = Number.parseInt(page, 10) || 1;
  const currentPage = Math.min(Math.max(requestedPage, 1), totalPages);

  const otherBlogs = remainingBlogs.slice(
    (currentPage - 1) * BLOG_PAGE_SIZE,
    currentPage * BLOG_PAGE_SIZE
  );

  return (
    <main className="wrapper">
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={ORGANIZATION_SCHEMA} />
      {faqSchema && <JsonLd data={faqSchema} />}
      <JsonLd data={blogSchema} />
      <div className="blog_listing">

        <section className="our_blog">
          <div className="blog_search_row">
            {/* The page's h1 while unfiltered; with a search / category the
                filter bar below carries the h1, so this stays a plain div. */}
            {isFiltered ? (
              <div className="blog_page_title">Blogs</div>
            ) : (
              <h1 className="blog_page_title">Blogs</h1>
            )}
          </div>
          {newest && !isFiltered ? (
            <p className="blog_updated">
              Last updated: <time dateTime={newest.iso}>{newest.label}</time> ·{" "}
              {blogs.length} {blogs.length === 1 ? "post" : "posts"}
            </p>
          ) : null}
          {showIntro ? (
            <div className="blog_intro">
              <p className="blog_intro_text">
                The Webmaffia blog publishes practical guides on search, AI search and
                the web for business owners and marketing teams. Posts are written by
                the Webmaffia team
                {allCategories.length > 0
                  ? ` and fall into ${allCategories.length} ${
                      allCategories.length === 1 ? "category" : "categories"
                    } you can filter below: ${allCategories
                      .map((item) => item.title)
                      .join(", ")}`
                  : ""}
                . The archive holds {blogs.length} {blogs.length === 1 ? "article" : "articles"}
                {newest ? `, and the newest was published on ${newest.label}` : ""}.
              </p>
            </div>
          ) : null}
          {/* Search + category filter sit below the intro (right under the
              title when a search / category is active and there is no intro). */}
          <div className="blog_search_wrap">
            <BlogSearch
              defaultValue={query}
              category={activeCategory?.slug}
              categories={allCategories}
              lang={lang}
            />
          </div>
          {query ? (
            <div className="blog_filter_bar">
              <div>
                <span className="blog_filter_label">
                  {activeCategory ? `Search in ${activeCategory.title}` : "Search"}
                </span>
                <h1>&ldquo;{query}&rdquo;</h1>
                <p>
                  {searchPosts.length}{" "}
                  {searchPosts.length === 1 ? "article" : "articles"} found
                </p>
              </div>
              <Link
                href={activeCategory ? `${blogPath}?category=${activeCategory.slug}` : blogPath}
                className="blog_filter_clear"
              >
                {activeCategory ? `Clear search` : "View all articles"}
              </Link>
            </div>
          ) : null}
          {activeCategory && !query ? (
            <div className="blog_filter_bar">
              <div>
                <span className="blog_filter_label">Category</span>
                <h1>{activeCategory.title}</h1>
                <p>
                  {categoryPosts.length}{" "}
                  {categoryPosts.length === 1 ? "article" : "articles"}
                </p>
              </div>
              <Link href={blogPath} className="blog_filter_clear">
                View all articles
              </Link>
            </div>
          ) : null}

          {featuredBlog && currentPage === 1 ? (
          <div className="blog_top">
            <div className="main_blog">
              <Link href={featuredHref}>
                <div className="main_blog_image">
                  <Image
                    src={getStrapiImageUrl(featuredBlog.image)}
                    alt={featuredBlog.image?.alternativeText || featuredBlog.heading || t(lang, "blog.featuredAlt")}
                    fill
                    sizes="(max-width: 900px) 100vw, 67rem"
                    className="main_blog_img"
                    priority
                  />
                </div>
              </Link>
              {featuredCategory ? (
                <Link
                  href={`${blogPath}?category=${featuredCategory.slug}`}
                  className="blog_category_badge"
                >
                  {featuredCategory.title}
                </Link>
              ) : null}
              <Link href={featuredHref} className="main_blog_text">
                <h2 className="h5">{featuredBlog.heading}</h2>
                <div className="blogs_date">
                  <span>{formatBlogDate(featuredBlog.date)}</span>
                  <span>{featuredBlog.readTime}</span>
                </div>
              </Link>
            </div>

            {recommendedBlogs.length > 0 ? (
              <aside className="recommended_blogs">
                <div className="recommended_title">Recommended</div>
                {recommendedBlogs.map((blog) => (
                  <Link
                    key={blog.id}
                    href={localizePath(lang, `/blog/${blog.slug}`)}
                    className="recommended_item"
                  >
                    <div className="recommended_image">
                      <Image
                        src={getStrapiImageUrl(blog.image)}
                        alt={blog.image?.alternativeText || blog.heading || t(lang, "blog.postAlt")}
                        fill
                        sizes="(max-width: 900px) 40vw, 18rem"
                        className="recommended_img"
                      />
                    </div>
                    <div className="recommended_info">
                      <div className="recommended_heading">{blog.heading}</div>
                      <div className="recommended_meta">
                        <span>{formatBlogDate(blog.date)}</span>
                        <span>{blog.readTime}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </aside>
            ) : null}
          </div>
          ) : null}

          <div className="other_blogs">
            {otherBlogs.map((blog) => (
              <BlogListItem
              key={blog.id}
              post={blog}
              lang={lang}
               />
            ))}
          </div>

          {isFiltered && otherBlogs.length === 0 ? (
            <p className="blog_filter_empty">
              {query ? "No articles match your search." : "No articles in this category yet."}
            </p>
          ) : null}

          <BlogPagination
            currentPage={currentPage}
            totalPages={totalPages}
            category={activeCategory?.slug}
            query={query}
            lang={lang}
          />
        </section>

        {showIntro ? (
          <section className="blog_terms_section" aria-labelledby="blog-terms-h">
            <h2 id="blog-terms-h" className="blog_terms_title">
              Terms used across these posts
            </h2>
            <dl className="blog_terms">
              {BLOG_TERMS.map((term) => (
                <div key={term.name}>
                  <dt>{term.name}</dt>
                  <dd>{term.text}</dd>
                </div>
              ))}
            </dl>
          </section>
        ) : null}

        {faqItems.length > 0 ? (
          <div className="blog_faq">
            <HomeFaq title="Questions about our blog" items={faqItems} />
          </div>
        ) : null}

        {showIntro ? (
          <section className="blog_about" aria-labelledby="blog-about-h">
            <h2 id="blog-about-h" className="blog_about_title">
              About the authors
            </h2>
            <p className="blog_about_text">
              These posts are written and edited by the Webmaffia team: the strategists,
              designers and developers who deliver the agency&rsquo;s SEO, generative
              engine optimisation, AI, website design and development work. Articles draw
              on what the team sees in live client projects, and each post names its
              author, its category and the date it was published.
            </p>
            <h3 className="blog_cta_title">Want this work done for you?</h3>
            <p className="blog_about_text">
              Webmaffia does the work these posts describe: SEO and generative engine
              optimisation, AI-powered solutions, website design and web development. If
              you are weighing up whether to fix your SEO or rebuild your site, or you
              want to understand how your brand is currently described in AI answers,
              tell us what you are trying to change and we will tell you what we would
              do first.
            </p>
            <div className="blog_about_links">
              <Link href="/contact" className="cta_text">
                Get in <span>touch</span>
              </Link>
              <Link href="/services" className="cta_text">
                See our <span>services</span>
              </Link>
              <Link href={localizePath(lang, "/author")} className="cta_text">
                Meet our <span>authors</span>
              </Link>
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}
