import Image from "next/image";

// "250+" -> { number: "250", mark: "+" }; a trailing "+" or "★" is rendered as a
// superscript.
function splitValue(value) {
  const trimmed = String(value ?? "").trim();
  const mark = /[+★]$/.test(trimmed) ? trimmed.slice(-1) : "";
  return { number: mark ? trimmed.slice(0, -1).trim() : trimmed, mark };
}

// Static for now (not pulled from the footer offices).
const LOCATIONS = ["INDIA", "USA", "UAE"];

// `showLocations={false}` hides the "INDIA · USA · UAE" line (the industry pages
// already list their offices); `columns` sets the desktop column count.
export default function StatisticsBar({ stats = [], showLocations = true, columns = 5 }) {
  if (!stats.length) return null;

  return (
    <section data-section="statistics" className="statistics_bar">
      {showLocations ? (
        <div className="statistics_locations">
          {LOCATIONS.map((location) => (
            <span key={location}>{location}</span>
          ))}
        </div>
      ) : null}

      <div className="statistics_grid" style={{ "--stat-cols": columns }}>
        {stats.map((stat) => {
          const { number, mark } = splitValue(stat.value);

          return (
            <div
              className={`statistics_item${stat.icon ? " statistics_item--icon" : ""}`}
              key={stat.id}
            >
              {stat.icon ? (
                <Image
                  src={stat.icon.url}
                  alt={stat.icon.alt}
                  width={stat.icon.width}
                  height={stat.icon.height}
                  className="statistics_icon dark_img"
                />
              ) : null}
              {number ? (
                <div className="statistics_value">
                  {number}
                  {mark ? <sup>{mark}</sup> : null}
                </div>
              ) : null}
              <div className="statistics_label">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
