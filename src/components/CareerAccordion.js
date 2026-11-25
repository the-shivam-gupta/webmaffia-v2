"use client";

import Image from "next/image";
import { useCallback, useState } from "react";

// True when the CMS text contains HTML tags.
const isRichText = (value) => /<[a-z][\s\S]*>/i.test(String(value ?? "").trim());

function OpeningMeta() {
  return <div />;
}

export default function CareerAccordion({ data }) {
  // `undefined` = the visitor has not clicked yet, so the first opening is
  // shown open; after a click `null` means everything is closed.
  const [selectedId, setSelectedId] = useState(undefined);
  const [heights, setHeights] = useState({});

  const heading = data?.heading || "Current openings";
  const openings = data?.accordion || [];

  const firstId = openings.length ? `job-${openings[0].id}` : null;
  const activeId = selectedId === undefined ? firstId : selectedId;

  const toggle = (id) => {
    setSelectedId(activeId === id ? null : id);
  };

  const measureRef = useCallback((id, el) => {
    if (el) {
      const scrollHeight = el.scrollHeight;
      setHeights((prev) => {
        if (prev[id] !== scrollHeight) {
          return { ...prev, [id]: scrollHeight };
        }
        return prev;
      });
    }
  }, []);

  if (!openings.length) {
    return (
      <div className="career_accordion">
        <h2 className="h2">{heading}</h2>
      </div>
    );
  }

  return (
    <div className="career_accordion">
      <h2 className="h2">{heading}</h2>
      <div>
        {openings.map((job, index) => {
          const id = `job-${job.id}`;
          const isActive = activeId === id;
          return (
            <div
              key={id}
              className={`accordion${isActive ? " active" : ""}`}
              onClick={() => toggle(id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  toggle(id);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="accord_title">
                <span className="accord_num">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="accord_name">{job.jobTitle}</span>
                <span>
                  <Image
                    src="/assets/images/icons/down_arrow.webp"
                    alt=""
                    width={27}
                    height={14}
                  />
                </span>
              </div>
              <div
                className="accord_container"
                style={
                  isActive
                    ? {
                        height: heights[id] ? `${heights[id]}px` : "auto",
                        opacity: 1,
                      }
                    : { height: 0, opacity: 0 }
                }
              >
                {/* Strapi rich text arrives as HTML (<p>, <ul>, <strong>...), so
                    it is rendered as markup directly in the wrapper (a child
                    <div> would pick up the wrapper's flex row styling). Plain
                    text keeps the <p>. */}
                {isRichText(job.description) ? (
                  <div
                    className="accord_wrapper service_rich_text"
                    ref={(el) => measureRef(id, el)}
                    dangerouslySetInnerHTML={{ __html: job.description }}
                  />
                ) : (
                  <div
                    className="accord_wrapper"
                    ref={(el) => measureRef(id, el)}
                  >
                    {job.description && <p>{job.description}</p>}
                    <OpeningMeta />
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
