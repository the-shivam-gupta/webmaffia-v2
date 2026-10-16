import Image from "next/image";
import Link from "next/link";
import { formatBlogDate, getBlogCategories, getStrapiImageUrl } from "@/lib/strapiPage";

export default function BlogListItem({ post }) {
  const href = `/blog/${post.slug}`;
  const imageUrl = getStrapiImageUrl(post.image);
  const category = getBlogCategories(post)[0];

  return (
    <div className="blog_item">
      <Link href={href}>
        <div className="blog_item_image">
          <Image
            src={imageUrl}
            alt={post.image?.alternativeText || post.heading || "Blog post"}
            fill
            sizes="(max-width: 900px) 100vw, 67rem"
            className="blog_item_img"
          />
        </div>
      </Link>
      {category ? (
        <Link
          href={`/blog?category=${category.slug}`}
          className="blog_category_badge"
        >
          {category.title}
        </Link>
      ) : null}
      <div>
        <Link href={href}>
          <div className="h5 blog_item_title">{post.heading}</div>
          {post.excerpt ? <p>{post.excerpt}</p> : null}
          <div className="blog_para">
            <div className="blogs_date">
              <span>{formatBlogDate(post.date)}</span>
              <span>{post.readTime}</span>
            </div>
            <span className="link blog_link">READ MORE</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
