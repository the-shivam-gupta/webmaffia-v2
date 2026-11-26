export const KLAVIYO_COMPANY_ID = "VNRWsD";
export const KLAVIYO_EMBEDDED_FORM_ID = "TWwQKi";
export const KLAVIYO_POPUP_FORM_ID = "SuDJiL";

const POPUP_SELECTOR = '.kl-private-reset-css-Xuajs1[style*="z-index: 90000"]';
const FIT_MARGIN = 24; // px of breathing room around the card
const PHONE_MAX_WIDTH = 767; // same breakpoint as the site's mobile() mixin
const PHONE_V_MARGIN = 16; // px kept free above/below the card on phones
const FIT_MAX_SCALE = 0.9; // never larger than this on big screens

let fitTimer = null;

// Klaviyo stacks the title, each field, the services list and the button as
// siblings in one column, with only generated class names to tell them apart.
// Mark that column and its text/email/phone rows so the stylesheet can lay the
// fields out two per row on wider screens (see klaviyo.scss).
const WIDE_CARD_MIN_WIDTH = 880; // below this the card uses 40px side padding
// px of card width. Half the width, minus the side padding x2 (72px, or 40px on
// narrow cards), the 20px gap and 24px of input inset on each side, must hold
// the longest placeholder ("Your Organization's Name", ~252px at 20px).
const TWO_COLUMN_MIN_WIDTH = 710;
const FIELD_INPUTS ='input[type="text"], input[type="email"], input[type="tel"]';
let measureCtx = null;
// True when every field's placeholder fits inside its box (minus the inset).
function placeholdersFit(inputs) {
  measureCtx = measureCtx || document.createElement("canvas").getContext("2d");
  return [...inputs].every((input) => {
    const style = getComputedStyle(input);
    measureCtx.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
    const text = measureCtx.measureText(input.placeholder || "").width;
    const room =
      input.clientWidth -
      parseFloat(style.paddingLeft) -
      parseFloat(style.paddingRight);
    return text <= room;
  });
}

function tagFieldRows(form) {
  const inputs = form.querySelectorAll(FIELD_INPUTS);
  if (inputs.length < 2) return;
  let column = inputs[0];
  while (column && !column.contains(inputs[inputs.length - 1])) {
    column = column.parentElement;
  }
  if (!column || column === form) return;
  column.setAttribute("data-kl-grid", "");
  // Slimmer side padding on narrower cards (see klaviyo.scss).
  if (form.offsetWidth < WIDE_CARD_MIN_WIDTH) {
    form.setAttribute("data-kl-narrow", "");
  } else {
    form.removeAttribute("data-kl-narrow");
  }
  // Two fields per row only when the card is wide enough for the longest
  // placeholder ("Your Organization's Name") to fit in half the width without
  // being clipped; narrower cards keep one field per row. offsetWidth is the
  // layout width, so the fit-to-window scale doesn't affect it.
  if (form.offsetWidth >= TWO_COLUMN_MIN_WIDTH) {
    column.setAttribute("data-kl-cols", "2");
    // Don't trust the arithmetic: Klaviyo's rows lose a variable amount of
    // width to their own insets. Measure, and fall back to one field per row
    // if any placeholder would be clipped.
    if (!placeholdersFit(inputs)) column.removeAttribute("data-kl-cols");
  } else {
    column.removeAttribute("data-kl-cols");
  }
  for (const row of column.children) {
    if (row.querySelector(FIELD_INPUTS)) row.setAttribute("data-kl-field", "");
  }
}

// Klaviyo's popup has a fixed pixel size, so on short or narrow windows the
// bottom (or sides) end up off screen. While the popup is open, measure it and
// scale the card + close button together (about the card's centre) so the whole
// thing always fits the window, then centre it. Runs again on resize.
function fitPopup(reveal = true) {
  const overlay = document.querySelector(POPUP_SELECTOR);
  const form = overlay?.querySelector(".klaviyo-form");
  if (!overlay || !form) return false;

  // The element that holds both the form and its close button.
  let wrapper = form;
  while (wrapper.parentElement && wrapper.parentElement !== overlay) {
    wrapper = wrapper.parentElement;
  }

  tagFieldRows(form);

  // Lock the page scroll BEFORE measuring: hiding the page scrollbar widens the
  // viewport, and measuring first left the card a few px off-centre.
  // Lock <body>, not <html>: body is this site's scroller (html/body are
  // height: 100%), and locking <html> resets the scroll position to the top.
  document.body.style.overflow = "hidden";

  const vw =document.documentElement.clientWidth;
  const vh = window.innerHeight;
  const phone = vw <= PHONE_MAX_WIDTH;

  // Measure the natural (unscaled, untranslated) size.
  wrapper.style.scale = "1";
  wrapper.style.translate = "0 0";
  form.style.maxHeight = "";
  form.style.overflowY = "";
  const f = form.getBoundingClientRect();
  const w = wrapper.getBoundingClientRect();
  if (!f.width || !f.height) return true;

  let scale;
  if (phone) {
    // Full-width card (CSS), never scaled: if it is taller than the screen,
    // the card scrolls inside itself instead of shrinking the text.
    scale = 1;
    if (f.height > vh - PHONE_V_MARGIN * 2) {
      form.style.maxHeight = `${vh - PHONE_V_MARGIN * 2}px`;
      form.style.overflowY = "auto";
    }
  } else {
    scale = Math.min(
      FIT_MAX_SCALE,
      (vw - FIT_MARGIN * 2) / f.width,
      (vh - FIT_MARGIN * 2) / f.height
    );
  }

  const cx = f.left + f.width / 2;
  const cy = f.top + f.height / 2;
  wrapper.style.transformOrigin = `${cx - w.left}px ${cy - w.top}px`;
  wrapper.style.translate = `${vw / 2 - cx}px ${vh / 2 - cy}px`;
  wrapper.style.scale = String(scale);

  // Self-correct: measure where the card really landed and nudge it onto the
  // exact centre (layout can shift a few px, e.g. when the page scrollbar goes).
  const g = form.getBoundingClientRect();
  const dx = vw / 2 - (g.left + g.width / 2);
  const dy = vh / 2 - (g.top + g.height / 2);
  if (Math.abs(dx) > 0.5 || Math.abs(dy) > 0.5) {
    wrapper.style.translate = `${vw / 2 - cx + dx}px ${vh / 2 - cy + dy}px`;
  }

  // Reveal only now: until the first fit the popup is hidden by CSS (see
  // klaviyo.scss), so it never flashes at full size before shrinking.
  if (reveal) overlay.dataset.fitted = "1";

  return true;
}

// Runs for the whole session (any way the popup gets opened: header button,
// Klaviyo's own triggers, ...). Cheap: one 200ms check.
function startPopupWatcher() {
  if (fitTimer || typeof window === "undefined") return;
  let wasOpen = false;
  let presentSince = 0;
  let lastKey = "";
  fitTimer = setInterval(() => {
    const present = !!document.querySelector(POPUP_SELECTOR);
    if (present) {
      if (!wasOpen) presentSince = performance.now();
      wasOpen = true;
      // Refit when the window or the form's content size changes.
      const form = document.querySelector(`${POPUP_SELECTOR} .klaviyo-form`);
      const key = `${window.innerWidth}x${window.innerHeight}:${form?.scrollHeight}`;
      if (key !== lastKey) {
        lastKey = key;
        // Popups opened by the header button are revealed by the faster loop in
        // openKlaviyoPopup; this reveals the ones Klaviyo opens by itself.
        fitPopup(performance.now() - presentSince > 800);
      } else if (
        performance.now() - presentSince > 800 &&
        !document.querySelector(POPUP_SELECTOR)?.dataset.fitted
      ) {
        fitPopup(true);
      }
    } else if (wasOpen) {
      wasOpen = false;
      lastKey = "";
      document.body.style.overflow = "";
    }
  }, 200);
}

startPopupWatcher();

export function openKlaviyoPopup(formId = KLAVIYO_POPUP_FORM_ID) {
  if (typeof window === "undefined") return;

  window._klOnsite = window._klOnsite || [];
  window._klOnsite.push(["openForm", formId]);
  startPopupWatcher();

  // The watcher polls every 200ms, which is too slow while the popup opens:
  // Klaviyo's form keeps growing for a moment (fields render in), so a single
  // early fit ends up off-centre. Refit on every frame and reveal the popup
  // only once its size has been stable for ~120ms. Gives up after 5s (covers a
  // slow first load of Klaviyo's script); the watcher then reveals it anyway.
  const start = performance.now();
  let lastHeight = -1;
  let stableSince = 0;
  const tick = () => {
    const now = performance.now();
    const overlay = document.querySelector(POPUP_SELECTOR);
    const form = overlay?.querySelector(".klaviyo-form");
    if (form) {
      const height = form.scrollHeight;
      if (height !== lastHeight) {
        lastHeight = height;
        stableSince = now;
      }
      const stable = now - stableSince > 120;
      fitPopup(stable);
      if (stable) return;
    }
    if (now - start < 5000) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
