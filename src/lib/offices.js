// Shared by the footer and the overlay menu so both show the same office
// details, straight from the CMS `offices` list (Strapi footer single type).

const INDIA_CITY_RE = /mumbai|bengaluru/i;

const officeText = (office) => `${office.city ?? ""} ${office.address ?? ""}`;

// Fallback for offices that have no map link set in the CMS.
export const mapsSearchUrl = (address) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

// "Mumbai (India) 403 A Wing..." -> "Mumbai 403 A Wing..." (the country is the
// heading). The CMS splits the text oddly, so join it first, then drop "(India)".
const officeLabel = (office) =>
  officeText(office)
    .replace(/\s*\(\s*India\s*\)/i, "")
    .replace(/\s+/g, " ")
    .trim();

// Short city tag shown in the title of an India office.
const officeCity = (office) => {
  const m = officeText(office).match(INDIA_CITY_RE);
  if (!m) return null;
  return /mumbai/i.test(m[0]) ? "Mumbai" : "Bengaluru";
};

// The address line without the leading city name (the title already says it).
const officeAddress = (office) =>
  officeLabel(office).replace(/^(mumbai|bengaluru)\s*/i, "");

/**
 * One block per CMS office, in CMS order:
 * { key, label ("India - Mumbai" | "USA" | "Dubai"), address, href, email, phone }
 */
export function buildOfficeBlocks(offices = []) {
  return offices.map((office) => {
    const isIndia = INDIA_CITY_RE.test(officeText(office));
    const label = isIndia
      ? `India - ${officeCity(office)}`
      : /dubai/i.test(officeText(office))
        ? "Dubai"
        : office.city || null;
    const address = isIndia ? officeAddress(office) : office.address;

    return {
      key: office.id || office.city,
      label,
      address,
      href: office.addressLink || mapsSearchUrl(officeText(office).trim()),
      email: office.email || "",
      phone: office.phone || "",
    };
  });
}

// "+1 (866) 984-9786" -> "+18669849786" for tel: links.
export const telHref = (phone) => `tel:${String(phone).replace(/[^\d+]/g, "")}`;
