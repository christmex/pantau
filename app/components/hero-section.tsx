import Image from "next/image";

import { SectionLabel } from "@/app/components/section-label";

export function HeroSection() {
  return (
    <section className="section hero" id="top">
      <div className="hero-copy">
        <SectionLabel label="Basis data terbuka" />
        <h1>Kasus intoleransi beragama di Indonesia.</h1>
        <p>
          Data kasus intoleransi yang terjadi di Indonesia. Data ini dikumpulkan
          menggunakan AI dan akan terus diupdate jika terdapat kasus baru. Situs
          ini hanya menampilkan data yang sudah terverifikasi.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#daftar-kasus">
            Lihat daftar kasus
          </a>
        </div>
      </div>

      <div className="hero-art">
        <Image
          src="/hero-intoleransi.webp"
          alt=""
          fill
          sizes="(max-width: 680px) 100vw, 560px"
          priority
        />
      </div>
    </section>
  );
}
