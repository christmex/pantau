# Pantau Toleransi

Basis data terbuka kasus intoleransi beragama di Indonesia, 2025–2026.

**https://pantautoleransi.vercel.app**

Tiap kasus dicatat dengan lokasi, tanggal, pihak yang melakukan, pihak yang
terdampak, kronologi, dan seluruh tautan pemberitaan yang dipakai untuk
menyusunnya. Situs ini hanya menampilkan data yang sudah terverifikasi.

## Data

Semua data ada di satu berkas: [`data/religious-intolerance-cases.json`](data/religious-intolerance-cases.json).

Tiap kasus punya kolom berikut.

| Kolom | Isi |
| --- | --- |
| `id` | Pengenal unik, gabungan tanggal dan judul. |
| `title` | Judul ringkas peristiwa. |
| `date` | Tanggal peristiwa terjadi, bukan tanggal pemberitaan. |
| `province`, `city` | Provinsi dan kota atau kabupaten. |
| `category` | Bentuk perbuatan apa adanya dari sumber. |
| `perpetrator` | Pihak yang melakukan, sejauh teridentifikasi dalam sumber. |
| `victim` | Kelompok atau jemaat yang terdampak. |
| `chronology` | Urutan peristiwa, termasuk respons aparat dan hasil mediasi bila ada. |
| `links` | Seluruh tautan sumber yang dipakai. |
| `image` | Foto dari salah satu halaman sumber, beserta nama penerbit dan tautannya. |

Untuk keperluan filter, `category` dipetakan ke tujuh bentuk perbuatan di
[`app/lib/incident-classification.ts`](app/lib/incident-classification.ts).
Pemetaan itu turunan — kolom `category` aslinya tidak diubah.

### Cara data dikumpulkan

Peristiwa ditelusuri dengan bantuan AI dari pemberitaan media, rilis lembaga
bantuan hukum, dan laporan organisasi hak asasi manusia. Satu kasus baru masuk
kalau kronologinya cocok di lebih dari satu sumber. Kalau pelakunya tidak
teridentifikasi, kolomnya ditulis demikian — bukan ditebak.

Daftar ini bukan sensus. Yang masuk hanya kasus yang sempat diberitakan, jadi
angka sebenarnya kemungkinan lebih tinggi.

## Foto

Tidak ada foto yang diambil sendiri. Semuanya berasal dari halaman berita yang
jadi rujukan tiap kasus, dan nama medianya dicantumkan di kartu maupun halaman
detail beserta tautan ke artikel aslinya.

Hak cipta tetap ada pada penerbit masing-masing. Berkas di `public/case-images/`
dipakai sebagai rujukan pemberitaan, bukan sebagai aset bebas pakai. Kalau ada
media yang keberatan fotonya dipakai di sini, buka issue — akan langsung
diturunkan.

## Menjalankan secara lokal

```bash
npm install
npm run dev
```

Buka http://localhost:3000.

Perintah lain:

```bash
npm run build   # build produksi
npm run lint    # eslint
```

## Ikut berkontribusi

- **Menambah kasus** — kirim issue berisi tautan pemberitaannya. Minimal dua
  sumber yang kronologinya cocok.
- **Mengoreksi data** — kalau ada catatan yang keliru, sebutkan kasusnya dan
  tautan yang membantah.
- **Memperbaiki situs** — pull request diterima.

## Lisensi

Kode di repositori ini bebas dipakai. Isi berkas data merangkum pemberitaan
publik; foto dan materi pemberitaan tetap milik penerbitnya masing-masing.
