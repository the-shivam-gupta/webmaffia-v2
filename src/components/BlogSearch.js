"use client";

import { useRouter } from "next/navigation";
import BlogCategorySelect from "@/components/BlogCategorySelect";
import { localizePath } from "@/lib/i18n";

export default function BlogSearch({ defaultValue = "", category = "", categories = [], lang = "en" }) {
  const router = useRouter();
  const blogPath = localizePath(lang, "/blog");

  // A plain GET form sends every field, even empty ones, which leaves URLs
  // like /blog?q=&category= after picking "All categories". Build the URL here
  // instead and only keep the filters that have a value.
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const params = new URLSearchParams();
    for (const name of ["q", "category"]) {
      const value = String(data.get(name) ?? "").trim();
      if (value) params.set(name, value);
    }
    const query = params.toString();
    router.push(query ? `${blogPath}?${query}` : blogPath);
  };

  return (
    <form
      className="blog_search"
      action={blogPath}
      method="get"
      role="search"
      onSubmit={handleSubmit}
    >
      <div className="blog_search_bar">
        <div className="blog_search_field">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <path d="M20 20l-4-4" />
          </svg>
          <input
            type="search"
            name="q"
            defaultValue={defaultValue}
            placeholder="Search articles"
            aria-label="Search articles"
            autoComplete="off"
          />
        </div>
        <button type="submit">Search</button>
      </div>
      {categories.length ? <BlogCategorySelect categories={categories} value={category} /> : null}
    </form>
  );
}
