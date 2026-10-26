import Image from "next/image";
import Link from "next/link";
import BlogListItem from "@/components/BlogListItem";
import BlogSearch from "@/components/BlogSearch";
import BlogPagination from "@/components/BlogPagination";
import JsonLd from "@/components/JsonLd";
import {
  categorySlug,
  formatBlogDate,
  getAllBlogCategories,
  getBlog,
  getBlogCategories,
  getStrapiImageUrl,
} from "@/lib/strapiPage";
import { buildBreadcrumbSchema } from "@/lib/schema";

const BLOG_PAGE_SIZE = 9;

const BREADCRUMB_SCHEMA = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
]);

// /blog?category=<slug> gets its own tab title, description and canonical URL.
// Without a (valid) category the layout's default "Blog | Webmaffia" metadata applies.
export async function generateMetadata({ searchParams }) {
  const { category, q } = await searchParams;
  // Search results are thin, duplicate-prone pages: keep them out of the index
  const isSearch = typeof q === "string" && q.trim() !== "";
  const robots = isSearch ? { robots: { index: false, follow: true } } : {};
  if (!category) return robots;

  const blogs = await getBlog();
  const match = blogs
    .flatMap(getBlogCategories)
    .find((item) => item.slug === categorySlug(category));
  if (!match) return robots;

  return {
    ...robots,
    title: `${match.title} Articles | Webmaffia`,
    description: `Read the latest ${match.title} articles, guides and insights from the Webmaffia team.`,
    alternates: {
      canonical: `https://www.webmaffia.com/blog?category=${match.slug}`,
    },
  };
}

export default async function BlogPage({ searchParams }) {
  const blogs = await getBlog();
  const allCategories = await getAllBlogCategories();

  const { page, category, q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";

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

  const featuredBlog = isFiltered ? null : blogs[0];
  const featuredHref = featuredBlog ? `/blog/${featuredBlog.slug}` : "/blog";
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
      <JsonLd data={BREADCRUMB_SCHEMA} />
      <div className="blog_listing">

        <section className="our_blog">
          <BlogSearch defaultValue={query} category={activeCategory?.slug} categories={allCategories} />
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
                href={activeCategory ? `/blog?category=${activeCategory.slug}` : "/blog"}
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
              <Link href="/blog" className="blog_filter_clear">
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
                    alt={featuredBlog.image?.alternativeText || featuredBlog.heading || "Featured blog post"}
                    fill
                    sizes="(max-width: 900px) 100vw, 67rem"
                    className="main_blog_img"
                    priority
                  />
                </div>
              </Link>
              {featuredCategory ? (
                <Link
                  href={`/blog?category=${featuredCategory.slug}`}
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
                    href={`/blog/${blog.slug}`}
                    className="recommended_item"
                  >
                    <div className="recommended_image">
                      <Image
                        src={getStrapiImageUrl(blog.image)}
                        alt={blog.image?.alternativeText || blog.heading || "Blog post"}
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
          />
        </section>
      </div>
    </main>
  );
}
