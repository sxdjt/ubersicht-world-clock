# World Clock

A minimal [Übersicht](https://tracesof.net/uebersicht/) widget that shows the current time in multiple time zones, color-coded by local business hours. It sits in the bottom-right corner of the desktop and refreshes every 30 seconds.

## Screenshot

<img width="105" height="119" alt="Screenshot 2026-06-25 at 22 33 44" src="https://github.com/user-attachments/assets/057076e5-5980-4de4-af4a-9cfcb92e4cbb" />


(Each row is colored: blue for daytime, grey for off-hours, orange for UTC.)

## Features

- Time zones displayed at once, right-aligned in a compact table
- Color-coded by local business hours so you can see at a glance who is awake
- UTC is always highlighted in orange as a fixed reference
- 24-hour clock (`h23`), so midnight reads `00` and never `24`
- No external dependencies, no API calls; all times are computed locally

## Default Zones

| Code | IANA Time Zone     |
| ---- | ------------------ |
| DEN  | America/Denver     |
| BOS  | America/New_York   |
| LON  | Europe/London      |
| SOF  | Europe/Sofia       |
| BNG  | Asia/Kolkata       |
| UTC  | UTC                |

## Color Scheme

| Color  | Hex       | Meaning                                   |
| ------ | --------- | ----------------------------------------- |
| Blue   | `#00afff` | Daytime / business hours (08:00 - 16:59)  |
| Grey   | `#9e9e9e` | Nighttime / off-hours                     |
| Orange | `#ff8700` | UTC (always highlighted)                  |


## Installation

1. Install [Übersicht](https://tracesof.net/uebersicht/) if you do not already have it.
2. Clone this repository:

   ```bash
   git clone https://github.com/sxdjt/ubersicht-world-clock.git
   ```

3. Copy `world-clock.jsx` into your Übersicht widgets directory:

   ```bash
   cp ubersicht-world-clock/world-clock.jsx ~/Library/Application\ Support/Übersicht/widgets/
   ```

4. Übersicht picks up the new widget automatically. If it does not appear, use the menu bar icon to refresh widgets.

## Configuration

All settings live at the top of `world-clock.jsx`.

### Time Zones

Edit the `ZONES` array. Each entry is a `[displayCode, IANATimeZone]` pair:

```javascript
const ZONES = [
  ["DEN", "America/Denver"],
  ["BOS", "America/New_York"],
  ["LON", "Europe/London"],
  ["SOF", "Europe/Sofia"],
  ["BNG", "Asia/Kolkata"],
  ["UTC", "UTC"],
];
```

The display code is arbitrary text; the time zone must be a valid [IANA time zone name](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

### Business Hours

The daytime color is applied between these hours (24-hour clock, local to each zone):

```javascript
const BUSINESS_HOUR_START = 8;  // 08:00 - first hour counted as daytime
const BUSINESS_HOUR_END = 17;   // 17:00 - first hour counted as off-hours
```

### Colors

```javascript
const COLOR_DAYTIME = "#00afff"; // blue
const COLOR_NIGHT = "#9e9e9e";   // grey
const COLOR_UTC = "#ff8700";     // orange
```

### Position and Styling

Position and font are set in the `className` template literal. To move the widget, edit the `bottom` and `right` offsets:

```javascript
export const className = `
  bottom: 20px;
  right: 20px;
  font-family: Menlo, monospace;
  font-size: 14px;
  ...
`;
```

### Refresh Interval

```javascript
export const refreshFrequency = 30000; // milliseconds
```

## Requirements

- macOS with [Übersicht](https://tracesof.net/uebersicht/) installed
- No other dependencies

## License

[MIT](LICENSE)
