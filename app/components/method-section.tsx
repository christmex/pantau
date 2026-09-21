import { SectionLabel } from "@/app/components/section-label";

type MethodSectionProps = {
  totalCases: number;
  sourceLinkCount: number;
  imageOutlets: readonly string[];
};

export function MethodSection({
  totalCases,
  sourceLinkCount,
  imageOutlets,
}: MethodSectionProps) {
  const steps = [
    {
      id: "penelusuran",
      number: "01",
      title: "Penelusuran",
      description:
        "Peristiwa dikumpulkan dari pemberitaan media, rilis lembaga bantuan hukum, dan laporan organisasi hak asasi manusia.",
    },
    {
      id: "verifikasi",
      number: "02",
      title: "Verifikasi",
      description: `Satu kasus baru masuk kalau kronologinya cocok di lebih dari satu sumber. Sampai sekarang ada ${sourceLinkCount} tautan untuk ${totalCases} kasus.`,
    },
    {
      id: "pencatatan",
      number: "03",
      title: "Pencatatan",
      description:
        "Tiap kasus dicatat apa adanya menurut sumber. Kalau pelakunya tidak teridentifikasi, ya ditulis begitu — bukan ditebak.",
    },
  ];

  return (
    <section className="section" id="metodologi">
      <SectionLabel label="Metodologi" />

      <h2 className="section-title">Cara data ini dikumpulkan.</h2>

      <div className="method-grid">
        {steps.map((step) => (
          <div className="method-step" key={step.id} id={step.id}>
            <span className="field-label">{step.number}</span>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>

      <p className="note-panel" id="koreksi">
        Daftar ini bukan sensus. Yang masuk ke sini cuma kasus yang sempat
        diberitakan, jadi kemungkinan besar angka sebenarnya lebih tinggi. Kalau
        kamu tahu kasus yang belum tercatat, atau menemukan catatan yang keliru,
        kirim saja tautan beritanya.
      </p>

      <p className="note-panel" id="kredit-foto">
        <strong>Soal foto.</strong> Tidak ada satu pun foto di sini yang kami
        ambil sendiri. Semuanya berasal dari berita yang jadi rujukan tiap
        kasus, dan nama medianya selalu kami tulis — di kartu maupun di halaman
        detail, lengkap dengan tautan ke artikel aslinya. Terima kasih untuk{" "}
        {imageOutlets.join(", ")}. Kalau ada media yang keberatan fotonya
        dipakai di sini, kabari saja, langsung kami turunkan.
      </p>
    </section>
  );
}
