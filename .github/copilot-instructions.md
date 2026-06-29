# Instruksi Copilot

## Pendahuluan

SPEcific adalah aplikasi web yang digunakan untuk mengotomatiskan proses kerja pimpinan, seperti: profiling, roadmap, KPI, formulir / penilaian kinerja, dan penilaian kinerja.

## Daftar Divisi

- IT Development
- HCGA
- Product Development
- Research & Development
- IT Infrastructure, Network, and Security
- Business & Relationship
- FAT
- Compliance & Audit
- BOD/Management

## Bagian

### Serupa

- Bio
- Aspek Profil
- Kekuatan
- Area yang Perlu Ditingkatkan
- Roadmap: Tahapan yang harus dilalui dalam bentuk diagram Gantt.

### Berbeda

- Aktivitas
- Bare Minimum
- Kinerja

#### Aktivitas

- IT Development: SPEctrum, Click Up, dan GitLab

## Tumpukan Teknologi

- **Next.js v16**: Kerangka utama untuk membangun aplikasi web.
- **Material UI**: Pustaka komponen UI untuk membangun antarmuka yang responsif dan aksesibel.
- **TypeScript**: Bahasa pemrograman yang digunakan untuk meningkatkan kualitas kode.
- **ESLint**: Alat untuk memastikan konsistensi kode.
- **Prettier**: Alat untuk memastikan format kode yang konsisten.
- **Jest**: Kerangka kerja untuk pengujian unit.
- **React Testing Library**: Alat untuk menguji komponen React.
- **Storybook**: Alat untuk mengembangkan dan mendokumentasikan komponen UI.
- **React Hook Form**: Pustaka untuk mengelola formulir di aplikasi React.
- **Yup**: Pustaka untuk validasi skema data.
- **Axios**: Pustaka untuk membuat permintaan HTTP.
- **SWR**: Pustaka untuk pengambilan data.
- **MongoDB**: Basis data NoSQL yang digunakan untuk menyimpan data aplikasi.
- **Mongoose**: Pustaka untuk memodelkan data MongoDB di Node.js.
- **Docker**: Platform untuk mengembangkan, mengirim, dan menjalankan aplikasi di kontainer.
- **Express**: Kerangka kerja untuk membangun API backend.
- **cron**: Alat untuk menjadwalkan tugas otomatis, seperti sinkronisasi data harian.

## Data Sumber

- SPEInside: Mengambil data sesi seperti posisi, divisi, dan departemen.
- Click Up
- GitLab
- SPEctrum

## Aturan

- Semua Data Sumber akan disimpan di DB dan disinkronkan setiap pukul 00:00.
- Setiap divisi memiliki KPI yang berbeda.
- Setiap divisi memiliki departemen dengan Bare Minimum yang berbeda.
- Data dapat disaring berdasarkan tahun untuk melihat perkembangan historis anggota tim.
- Sumber data aktivitas bervariasi untuk setiap divisi:
  - Pengguna dapat mengisi aktivitas secara mandiri.
  - IT Development: SPEctrum, Click Up, dan GitLab.

## Fitur

- Memiliki fitur untuk mengubah format penulisan agar lebih konsisten dan lebih mudah dibaca.
- Dark Mode untuk memberikan pengalaman pengguna yang lebih nyaman, terutama saat bekerja dalam kondisi cahaya redup.
- Dapat membuat KPI secara dinamis sesuai kebutuhan divisi atau departemen.
- Dapat membuat Bare Minimum secara dinamis sesuai kebutuhan divisi atau departemen.

## Status Pengguna

- 0: Tidak aktif / Dihapus
- 1: Divisi maupun Departemen belum ditetapkan
- 2: Aktif

## Peran

- Superadmin: Memiliki akses ke semua fitur.

## Akses

- Head:
  - Dapat membuat KPI
  - Dapat membuat Bare Minimum
- SPV:
  - Dapat mengisi KPI
  - Dapat mengisi Bare Minimum

## Struktur

- `src/app`: Folder utama untuk halaman
- `src/components`: Folder untuk komponen UI yang dapat digunakan kembali
- `src/utils`: Folder untuk utilitas dan fungsi pembantu yang dapat digunakan di berbagai tempat
- `src/views`: Folder untuk komponen yang spesifik pada halaman tertentu agar lebih terorganisir

## Panduan Gaya

- Gunakan camelCase untuk nama variabel dan fungsi
- Gunakan PascalCase untuk komponen React
- Ikuti prinsip single responsibility untuk komponen, sehingga setiap komponen hanya memiliki satu tanggung jawab
- Hindari komponen yang sangat bersarang, usahakan untuk memecahnya menjadi komponen yang lebih kecil jika perlu
- Bersarang hanya 1 level; jika lebih dari itu, pertimbangkan untuk memecahnya menjadi komponen yang lebih kecil

### Contoh

#### Struktur Folder

src/
├── app/
│ ├── dashboard/
│ │ ├── page.tsx
│ └── profile/
│ │ ├── page.tsx
├── views/
│ ├── Dashboard/
│ │ ├── DashboardCard.tsx
│ │ ├── Dashboard.module.css
│ │ ├── Dashboard.types.ts
│ │ └── index.ts
│ └── Profile/
│ ├── ProfileIntro.tsx
│ ├── ProfileDetails.tsx
│ ├── Profile.module.css
│ ├── Profile.types.ts
│ └── index.ts
├── components/
│ ├── Button/
│ │ ├── ButtonHide.tsx
│ │ ├── ButtonShow.tsx
│ │ ├── Button.module.css
│ │ ├── Button.types.ts
│ │ └── index.ts
│ └── Card/
│ ├── Card.module.css
│ ├── Card.types.ts
│ └── index.ts
├── utils/
│ ├── api.ts
│ ├── constants.ts
│ └── helpers.ts

## Konfigurasi Utama dan Praktik Terbaik

Proyek ini mengikuti konfigurasi bersama yang dirancang untuk alur kerja frontend dan backend yang mudah dipelihara.

### Mengambil data dari backend

- Gunakan pembungkus klien API bersama untuk header, token autentikasi, dan error yang terstruktur.
- Utamakan SWR untuk pengambilan data yang di-cache, revalidasi, dan pembaruan optimistis.
- Jaga agar endpoint backend tetap fokus dan mengembalikan payload yang terikat tipe.
- Hindari pengambilan data yang duplikat dengan menggunakan kunci SWR yang unik atau hook data terpusat.

### Menangani data di frontend

- Jaga agar data tetap terikat tipe dengan interface TypeScript.
- Normalisasi respons backend jika diperlukan.
- Gunakan fungsi utilitas untuk pemformatan dan transformasi.
- Pertahankan state UI lokal seminimal mungkin dan turunkan sebagian besar nilai tampilan dari data.
- Tampilkan state loading, skeleton, atau placeholder untuk menghindari pergeseran tata letak.

### Menangani error di frontend

- Bungkus batas rendering dengan `ErrorBoundary` sisi klien.
- Tampilkan error fetch dengan umpan balik yang jelas dan dapat ditindaklanjuti.
- Gunakan pesan toast/snackbar untuk masalah sementara.
- Catat error runtime ke layanan monitoring di produksi.
- Ulangi permintaan yang bisa pulih dengan backoff eksponensial bila sesuai.

### Menangani error di backend

- Validasi payload request dan parameter query.
- Gunakan handler atau middleware error terpusat.
- Kembalikan respons error yang konsisten dengan kode status dan kunci pesan.
- Catat error server dengan konteks request.
- Sembunyikan detail implementasi internal dari klien produksi.

### Autentikasi dan otorisasi

- Validasi autentikasi pada setiap request dan lindungi route sensitif.
- Terapkan kontrol akses berbasis peran di lapisan UI dan API.
- Simpan rahasia di luar kontrol versi dan hindari mengeksposnya ke sisi klien.
- Arahkan pengguna yang belum terautentikasi ke route login.

### Manajemen state

- Utamakan state lokal komponen untuk nilai UI yang sementara.
- Gunakan hook state jarak jauh untuk data yang diambil dari backend.
- Gunakan provider konteks hanya untuk kebutuhan bersama seperti auth, tema, dan pengaturan global.
- Hindari store global yang besar kecuali state lintas komponen memang membutuhkannya.
- Jaga logika state tetap modular dan dapat digunakan kembali.

### Routing

- Gunakan App Router Next.js dengan nested routes dan layout.
- Jaga nama route tetap bersih dan bermakna.
- Lindungi route privat di level layout atau halaman.
- Gunakan parameter query untuk state filter dan sort bila sesuai.
- Gunakan navigasi sisi klien untuk transisi yang lebih nyaman.

### Formulir dan validasi

- Gunakan React Hook Form untuk manajemen formulir yang performant.
- Gunakan Yup untuk validasi skema dan pembuatan pesan error.
- Jaga tata letak formulir terpisah dari logika pengiriman.
- Tampilkan error per field secara inline.
- Gunakan skema validasi bersama antara klien dan server.

### Pengujian

- Tambahkan uji untuk komponen UI, helper, dan alur API.
- Gunakan React Testing Library untuk uji interaksi pengguna.
- Jalankan linting, type check, dan pengujian di CI pada setiap PR.
- Jaga agar pengujian tetap stabil dan terfokus pada perilaku.
- Gunakan snapshot test secukupnya untuk fragmen UI yang stabil.

### Deployment dan CI/CD

- Deploy dengan build yang dapat direproduksi menggunakan `npm run build`.
- Gunakan workflow CI untuk menjalankan linting, type check, pengujian, dan build.
- Gunakan environment variables untuk konfigurasi dan jaga rahasia tetap di luar kontrol versi.
- Deploy hanya dari branch atau tag yang terlindungi.
- Validasi deployment produksi dengan smoke check.

### Logging dan monitoring

- Gunakan logging terstruktur di backend.
- Catat exception sisi klien dan metadata request.
- Pantau uptime, tingkat error, dan tren performa.
- Beri peringatan pada regresi dan deployment yang gagal.
- Jaga logging tetap ringkas agar tidak mengekspos data sensitif.

### Performa dan skalabilitas

- Gunakan lazy loading dan code splitting untuk halaman berat.
- Cache data dan aset secara tepat.
- Jaga respons server tetap kecil dan indeks query basis data.
- Rancang API untuk composability dan horizontal scaling.
- Gunakan state yang ringan bila memungkinkan.

### Maintainability

- Gunakan penamaan, struktur folder, dan pola komponen yang konsisten.
- Jaga komponen tetap fokus dan hindari nesting yang dalam.
- Dokumentasikan utilitas bersama dan keputusan arsitektur.
- Tinjau dependensi secara berkala dan hapus kode yang tidak terpakai.
- Gunakan code review dan linting untuk menegakkan standar.

## Kesimpulan

- Sesuaikan file-file di .github setiap kali ada perubahan pada respons AI.
