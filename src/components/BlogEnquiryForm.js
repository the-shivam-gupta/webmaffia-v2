"use client";

import { useEffect, useState } from "react";

const HEADINGS = [
  "Turn Your Website into a Growth Engine",
  "Rank Higher with Expert SEO",
  "Design That Converts Visitors",
  "Grow Your Brand on Social Media",
  "Content That Wins Customers",
  "Influencer Campaigns That Deliver",
];
const SWAP_MS = 3500;

const ICONS = {
  name: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20c0-3.5 3.6-6 8-6s8 2.5 8 6",
  email: "M3 6h18v12H3zM3 7l9 6 9-6",
  phone:
    "M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A15 15 0 0 1 4 5a1 1 0 0 1 1-1z",
  message: "M4 5h16v11H9l-5 4z",
};

function Field({ name, type = "text", placeholder, required }) {
  return (
    <label className="blog_enquiry_field">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d={ICONS[name]} />
      </svg>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        aria-label={placeholder}
        required={required}
      />
    </label>
  );
}

export default function BlogEnquiryForm() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  useEffect(() => {
    if (paused) return undefined;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % HEADINGS.length),
      SWAP_MS
    );
    return () => clearInterval(timer);
  }, [paused]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus("sending");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          source: "blog-sidebar",
          page: window.location.pathname,
          interest: HEADINGS[index],
        }),
      });
      if (!response.ok) throw new Error("failed");
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="blog_enquiry"
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="blog_enquiry_tag">
        <i aria-hidden="true" />
        Let's work together
      </div>
      <div className="blog_enquiry_heading" aria-live="polite">
        <span key={index}>{HEADINGS[index]}</span>
      </div>
      <div className="blog_enquiry_dots">
        {HEADINGS.map((heading, i) => (
          <button
            key={heading}
            type="button"
            className={i === index ? "is_on" : ""}
            aria-label={heading}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      {status === "sent" ? (
        <p className="blog_enquiry_done">
          Thank you! Our team will get back to you shortly.
        </p>
      ) : (
        <form onSubmit={handleSubmit}>
          <Field name="name" placeholder="Name" required />
          <Field name="email" type="email" placeholder="Email Address" required />
          <Field name="phone" type="tel" placeholder="Phone Number" required />
          <Field name="message" placeholder="Your Message" />
          <button
            type="submit"
            className="blog_enquiry_submit"
            disabled={status === "sending"}
          >
            <span>
              {status === "sending" ? "Sending..." : "Talk to our team"}
            </span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
          <p className="blog_enquiry_note">Reply within 24 hours · No spam</p>
          {status === "error" ? (
            <p className="blog_enquiry_error">
              Something went wrong. Please try again.
            </p>
          ) : null}
        </form>
      )}
    </div>
  );
}
