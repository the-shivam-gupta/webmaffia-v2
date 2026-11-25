"use client";

import { useEffect, useState } from "react";

const HEADER_OFFSET = 100;

// Compact "On this page" link bar for service pages: one slim row of short
// labels (see buildTocItems in ServiceDetailPage), the section being read is
// underlined. `items` are { id, label, title } and point at the `id` of each
// section wrapper; `title` (the full heading) shows as a tooltip.
export default function ServiceToc({ items, afterStats = false }) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);
    if (!sections.length) return undefined;

    const update = () => {
      // The current section is the last one whose top has passed this line.
      const probe = window.innerHeight * 0.35;
      let current = null;
      for (const section of sections) {
        if (section.getBoundingClientRect().top <= probe) current = section.id;
      }
      setActiveId(current);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [items]);

  const handleClick = (event, id) => {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
      behavior: reduceMotion ? "auto" : "smooth",
    });
    window.history.replaceState(null, "", `#${id}`);
    setActiveId(id);
  };

  return (
    <nav
      className={`service_toc${afterStats ? " service_toc--after_stats" : ""}`}
      aria-label="On this page"
    >
      <p className="service_toc_title">On this page</p>
      <ul className="service_toc_list">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              title={item.title}
              aria-current={activeId === item.id ? "true" : undefined}
              onClick={(event) => handleClick(event, item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
