export const SourceKind = {
  Government: "PEMERINTAH",
  Institution: "LEMBAGA",
  News: "BERITA",
} as const;

export type SourceKind = (typeof SourceKind)[keyof typeof SourceKind];

const INSTITUTION_HOSTNAMES = new Set([
  "amnesty.id",
  "lbhmakassar.org",
  "lbhsemarang.id",
  "mui-bogor.org",
  "morningstarnews.org",
]);

const EXCERPT_MAX_LENGTH = 190;
const PARTY_MAX_LENGTH = 72;

export function toHostname(link: string): string {
  return new URL(link).hostname.replace(/^www\./, "");
}

export function classifySource(link: string): SourceKind {
  const hostname = toHostname(link);

  if (hostname.endsWith(".go.id")) {
    return SourceKind.Government;
  }

  if (hostname.endsWith(".or.id") || INSTITUTION_HOSTNAMES.has(hostname)) {
    return SourceKind.Institution;
  }

  return SourceKind.News;
}

export const VERIFICATION_STATUS = "Terverifikasi";

function truncateAtBoundary(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }

  const trimmed = text.slice(0, maxLength);
  const lastSeparator = Math.max(
    trimmed.lastIndexOf("; "),
    trimmed.lastIndexOf(". "),
    trimmed.lastIndexOf(", "),
  );
  const cutPoint = lastSeparator > 0 ? lastSeparator : trimmed.lastIndexOf(" ");

  return `${trimmed.slice(0, cutPoint)}…`;
}

export function buildExcerpt(chronology: string): string {
  return truncateAtBoundary(chronology, EXCERPT_MAX_LENGTH);
}

export function shortenParty(party: string): string {
  const withoutParenthetical = party.replace(/\s*\([^)]*\)/g, "");
  const [firstClause] = withoutParenthetical.split(";");

  return truncateAtBoundary(firstClause.trim(), PARTY_MAX_LENGTH);
}
