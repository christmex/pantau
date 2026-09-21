const INDONESIAN_MONTH_NAMES = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember",
] as const;

const SHORT_MONTH_LENGTH = 3;

function splitIsoDate(isoDate: string) {
  const [year, month, dayOfMonth] = isoDate.split("-").map(Number);

  return { year, monthIndex: month - 1, dayOfMonth };
}

export function formatLongDate(isoDate: string): string {
  const { year, monthIndex, dayOfMonth } = splitIsoDate(isoDate);

  return `${dayOfMonth} ${INDONESIAN_MONTH_NAMES[monthIndex]} ${year}`;
}

export function formatCompactDate(isoDate: string): string {
  const { year, monthIndex, dayOfMonth } = splitIsoDate(isoDate);
  const shortMonth = INDONESIAN_MONTH_NAMES[monthIndex]
    .slice(0, SHORT_MONTH_LENGTH)
    .toUpperCase();

  return `${String(dayOfMonth).padStart(2, "0")} ${shortMonth} ${year}`;
}
