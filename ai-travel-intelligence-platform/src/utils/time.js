// Timezone-aware time helpers using Intl.DateTimeFormat

export function getZonedParts(timezone) {
  const now = new Date();
  try {
    const timeFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
    const dateFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: timezone,
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

    const timeString = timeFormatter.format(now);
    const dateString = dateFormatter.format(now);

    return {
      timeString,
      dateString,
      timezone,
      valid: true,
    };
  } catch (err) {
    return {
      timeString: "--:--:--",
      dateString: "Unavailable",
      timezone: timezone || "Unknown",
      valid: false,
    };
  }
}

export function timeAgo(minutesAgo) {
  if (minutesAgo < 1) return "Just now";
  if (minutesAgo < 60) return `${Math.round(minutesAgo)} min ago`;
  const hours = Math.floor(minutesAgo / 60);
  return `${hours} hr ago`;
}
