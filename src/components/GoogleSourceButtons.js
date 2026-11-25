"use client";

import { useEffect } from "react";

// The "Add to Preferred Sources" button on a blog page.
//
// Google's publisher script (loaded once, in the footer) renders every
// `google-add-preferred-source-btn` element it finds when it starts. On a full
// page load the blog's buttons are in the DOM by then. When a visitor arrives
// by client-side navigation (clicking a blog from the list) the script has
// already run, so the new elements stay empty until a reload.
//
// The script exposes `window.PREFERRED_SOURCE.api.init()`, which renders any
// button that has not been initialised yet (it skips the ones it already did,
// such as the footer's). Calling it on mount fixes the navigation case. If the
// script has not loaded yet it will pick these elements up itself when it does,
// but we also keep checking for a few seconds in case it loads right after.
export default function GoogleSourceButtons() {
  useEffect(() => {
    let tries = 0;
    let timer;

    const render = () => {
      const api = window.PREFERRED_SOURCE?.api;
      if (api?.init) {
        api.init();
        return;
      }
      tries += 1;
      if (tries < 40) timer = setTimeout(render, 250);
    };
    render();

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div
        className="blog_google_source_light"
        google-add-preferred-source-btn=""
        data-theme="light"
      />
      <div
        className="blog_google_source_dark"
        google-add-preferred-source-btn=""
        data-theme="dark"
      />
    </>
  );
}
