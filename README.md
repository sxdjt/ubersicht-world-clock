# World Clock widget for Übersicht.

Shows the current time in your configured zones, coloured by local business hours:

- blue   : daytime / business hours (08:00-16:59 in that zone)
- grey   : nighttime / off-hours
- orange : UTC, always highlighted

```jsx
const ZONES = [
  ["DEN", "America/Denver"],
  ["BOS", "America/New_York"],
  ["LON", "Europe/London"],
  ["SOF", "Europe/Sofia"],
  ["BNG", "Asia/Kolkata"],
  ["UTC", "UTC"],
];
```

<img width="100" height="122" alt="Screenshot 2026-08-30 at 09 37 15" src="https://github.com/user-attachments/assets/dafc896a-4674-4800-8556-e4f7d56328f8" />

Example font is [Berkeley Mono](https://usgraphics.com/products/berkeley-mono)
