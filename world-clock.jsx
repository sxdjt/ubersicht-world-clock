// World Clock widget for Übersicht.
//
// Shows the current time in six zones, colored by local business hours:
//   - blue   : daytime / business hours (08:00-16:59 in that zone)
//   - grey   : nighttime / off-hours
//   - orange : UTC, always highlighted

// A trivial command only exists to drive the refresh interval below; its output
// is unused. The displayed times come from the current Date inside render().
export const command = "date +%s";

// Refresh every 30s so the minute display never lags by more than half a minute.
export const refreshFrequency = 30000;

// City code -> IANA timezone (same set as the original geeklet).
const ZONES = [
  ["DEN", "America/Denver"],
  ["BOS", "America/New_York"],
  ["LON", "Europe/London"],
  ["SOF", "Europe/Sofia"],
  ["BNG", "Asia/Kolkata"],
  ["UTC", "UTC"],
];

// Business-hours window (24-hour clock, local to each zone) for the daytime color.
const BUSINESS_HOUR_START = 8;  // 08:00 - first hour counted as daytime
const BUSINESS_HOUR_END = 17;   // 17:00 - first hour counted as off-hours

// Colors approximating the original ANSI 256-color palette.
const COLOR_DAYTIME = "#00afff"; // blue   (ANSI 256 #39)
const COLOR_NIGHT = "#9e9e9e";   // grey   (ANSI 256 #244)
const COLOR_UTC = "#ff8700";     // orange (ANSI 256 #208)

// Return { hhmm, hour } for a timezone. hourCycle "h23" forces 00-23 so midnight
// is "00", never "24", and the business-hours comparison stays correct.
function zoneTime(timezone) {
  const now = new Date();
  const hhmm = new Intl.DateTimeFormat("en-GB", {
    timeZone: timezone, hour: "2-digit", minute: "2-digit", hourCycle: "h23",
  }).format(now);
  const hour = parseInt(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: timezone, hour: "2-digit", hourCycle: "h23",
    }).format(now),
    10
  );
  return { hhmm, hour };
}

// Pick the display color: UTC always orange, else daytime/night by the hour.
function colorFor(code, hour) {
  if (code === "UTC") return COLOR_UTC;
  if (hour >= BUSINESS_HOUR_START && hour < BUSINESS_HOUR_END) return COLOR_DAYTIME;
  return COLOR_NIGHT;
}

// Position (bottom-right) and styling. Move the widget by editing the
// bottom/right offsets here. text-align keeps the rows flush to the right edge.
export const className = `
  bottom: 20px;
  right: 20px;
  font-family: "BerkeleyMono-Regular", Menlo, monospace;
  font-size: 14px;
  line-height: 1.3;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.8);

  table { border-collapse: collapse; }
  td { padding: 0 0 0 8px; white-space: pre; text-align: right; }
  .code { font-weight: 600; }
`;

export const render = () => {
  return (
    <table>
      <tbody>
        {ZONES.map(([code, timezone]) => {
          const { hhmm, hour } = zoneTime(timezone);
          const color = colorFor(code, hour);
          return (
            <tr key={code} style={{ color }}>
              <td className="code">{code}</td>
              <td>{hhmm}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
