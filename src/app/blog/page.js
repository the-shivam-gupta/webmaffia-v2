import Image from "next/image";
import Link from "next/link";
import BlogListItem from "@/components/BlogListItem";
import BlogPagination from "@/components/BlogPagination";
import JsonLd from "@/components/JsonLd";
import { formatBlogDate, getBlog, getStrapiImageUrl } from "@/lib/strapiPage";
import { buildBreadcrumbSchema } from "@/lib/schema";

const BLOG_PAGE_SIZE = 9;

const BREADCRUMB_SCHEMA = buildBreadcrumbSchema([
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
]);

export default async function BlogPage({ searchParams }) {
  const blogs = await getBlog();

  const featuredBlog = blogs[0];
  const featuredHref = featuredBlog ? `/blog/${featuredBlog.slug}` : "/blog";
  const recommendedBlogs = blogs.slice(1, 5);
  const remainingBlogs = blogs.slice(5);

  const totalPages = Math.max(1, Math.ceil(remainingBlogs.length / BLOG_PAGE_SIZE));
  const { page } = await searchParams;
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

          <BlogPagination currentPage={currentPage} totalPages={totalPages} />
        </section>
      </div>
    </main>
  );
}
