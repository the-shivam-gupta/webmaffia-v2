import Image from "next/image";
import Link from "next/link";
import { t } from "@/lib/dictionaries";
import { localizePath } from "@/lib/i18n";
import { formatBlogDate, getBlogCategories, getStrapiImageUrl } from "@/lib/strapiPage";

// `TitleTag` is the heading level of the card title: h2 on the blog list and
// author pages, h3 where the card sits under a section heading (service pages).
export default function BlogListItem({ post, lang = "en", TitleTag = "h2" }) {
  const href = localizePath(lang, `/blog/${post.slug}`);
  const imageUrl = getStrapiImageUrl(post.image);
  const category = getBlogCategories(post)[0];

  return (
    <div className="blog_item">
      <Link href={href}>
        <div className="blog_item_image">
          <Image
            src={imageUrl}
            alt={post.image?.alternativeText || post.heading || t(lang, "blog.postAlt")}
            fill
            sizes="(max-width: 900px) 100vw, 67rem"
            className="blog_item_img"
          />
        </div>
      </Link>
      {category ? (
        <Link
          href={`${localizePath(lang, "/blog")}?category=${category.slug}`}
          className="blog_category_badge"
        >
          {category.title}
        </Link>
      ) : null}
      <div>
        <Link href={href}>
          <TitleTag className="h5 blog_item_title h3_plain">{post.heading}</TitleTag>
          {post.excerpt ? <p>{post.excerpt}</p> : null}
          <div className="blog_para">
            <div className="blogs_date">
              <span>{formatBlogDate(post.date)}</span>
              <span>{post.readTime}</span>
            </div>
            <span className="link blog_link">{t(lang, "blog.readMore")}</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
