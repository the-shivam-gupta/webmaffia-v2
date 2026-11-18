export const KLAVIYO_COMPANY_ID = "VNRWsD";
export const KLAVIYO_EMBEDDED_FORM_ID = "TWwQKi";
export const KLAVIYO_POPUP_FORM_ID = "SuDJiL";

const POPUP_SELECTOR = '.kl-private-reset-css-Xuajs1[style*="z-index: 90000"]';
const FIT_MARGIN = 24; // px of breathing room around the card
const FIT_MAX_SCALE = 0.9; // never larger than this on big screens

let fitTimer = null;

// Klaviyo's popup has a fixed pixel size, so on short or narrow windows the
// bottom (or sides) end up off screen. While the popup is open, measure it and
// scale the card + close button together (about the card's centre) so the whole
// thing always fits the window, then centre it. Runs again on resize.
function fitPopup() {
  const overlay = document.querySelector(POPUP_SELECTOR);
  const form = overlay?.querySelector(".klaviyo-form");
  if (!overlay || !form) return false;

  // The element that holds both the form and its close button.
  let wrapper = form;
  while (wrapper.parentElement && wrapper.parentElement !== overlay) {
    wrapper = wrapper.parentElement;
  }

  // Measure the natural (unscaled, untranslated) size.
  wrapper.style.scale = "1";
  wrapper.style.translate = "0 0";
  const f = form.getBoundingClientRect();
  const w = wrapper.getBoundingClientRect();
  if (!f.width || !f.height) return true;

  const vw = document.documentElement.clientWidth;
  const vh = window.innerHeight;
  const scale = Math.min(
    FIT_MAX_SCALE,
    (vw - FIT_MARGIN * 2) / f.width,
    (vh - FIT_MARGIN * 2) / f.height
  );

  const cx = f.left + f.width / 2;
  const cy = f.top + f.height / 2;
  wrapper.style.transformOrigin = `${cx - w.left}px ${cy - w.top}px`;
  wrapper.style.translate = `${vw / 2 - cx}px ${vh / 2 - cy}px`;
  wrapper.style.scale = String(scale);

  // No page scrollbar behind the popup.
  document.documentElement.style.overflow = "hidden";
  return true;
}

// Runs for the whole session (any way the popup gets opened: header button,
// Klaviyo's own triggers, ...). Cheap: one 200ms check.
function startPopupWatcher() {
  if (fitTimer || typeof window === "undefined") return;
  let wasOpen = false;
  let lastKey = "";
  fitTimer = setInterval(() => {
    const present = !!document.querySelector(POPUP_SELECTOR);
    if (present) {
      wasOpen = true;
      // Refit when the window or the form's content size changes.
      const form = document.querySelector(`${POPUP_SELECTOR} .klaviyo-form`);
      const key = `${window.innerWidth}x${window.innerHeight}:${form?.scrollHeight}`;
      if (key !== lastKey) {
        lastKey = key;
        fitPopup();
      }
    } else if (wasOpen) {
      wasOpen = false;
      lastKey = "";
      document.documentElement.style.overflow = "";
    }
  }, 200);
}

startPopupWatcher();

export function openKlaviyoPopup(formId = KLAVIYO_POPUP_FORM_ID) {
  if (typeof window === "undefined") return;

  window._klOnsite = window._klOnsite || [];
  window._klOnsite.push(["openForm", formId]);
  startPopupWatcher();
}
