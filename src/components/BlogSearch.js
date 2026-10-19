export default function BlogSearch({ defaultValue = "", category = "" }) {
  return (
    <form className="blog_search" action="/blog" method="get" role="search">
      {category ? <input type="hidden" name="category" value={category} /> : null}
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
      <button type="submit">Search</button>
    </form>
  );
}
