import StatisticsBar from "@/components/StatisticsBar";

// The industry pages' stats row, drawn with the same bar as the homepage
// (big light numbers, uppercase labels, ruled cells). An "ISO ..." value is
// shown as the ISO logo, like the homepage does.
const ISO_ICON = {
  url: "/assets/images/footer/ISO-icon.svg",
  alt: "ISO/IEC 27001:2022 certification",
  width: 1181,
  height: 1087,
};

export default function IndustryStats({ items = [] }) {
  const stats = items.map((item, index) => {
    const isIso = /^iso\b/i.test(String(item.value ?? "").trim());
    return {
      id: item.id ?? `${item.label}-${index}`,
      value: isIso ? "" : item.value,
      // Same caption as the homepage bar next to the ISO logo.
      label: isIso ? "ISO/IEC 27001:2022 certified" : item.label,
      icon: isIso ? ISO_ICON : undefined,
    };
  });

  return (
    <StatisticsBar
      stats={stats}
      showLocations={false}
      columns={Math.min(Math.max(stats.length, 1), 5)}
    />
  );
}
