import { formatLongDate } from "@/app/lib/format-date";

type SiteFooterProps = {
  totalCases: number;
  updatedAt: string;
};

const FOOTER_LINKS = [
  { href: "#daftar-kasus", label: "Daftar kasus" },
  { href: "#sebaran", label: "Sebaran provinsi" },
] as const;

export function SiteFooter({ totalCases, updatedAt }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-main">
          <div>
            <span className="footer-brand">
              <span className="brand-mark" aria-hidden="true" />
              Pantau Toleransi
            </span>
            <p className="footer-intro">
              Basis data terbuka kasus intoleransi beragama di Indonesia.
            </p>
          </div>

          <div className="footer-column">
            <strong>Data</strong>
            {FOOTER_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 Pantau Toleransi</span>
          <span>
            {totalCases} kasus · diperbarui {formatLongDate(updatedAt)}
          </span>
        </div>
      </div>
    </footer>
  );
}
