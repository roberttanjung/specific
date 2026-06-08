# Copilot Instructions

## Introduction

SPEcific adalah sebuah Aplikasi Website yang digunakan untuk mengautomisasi proses pekerjaan para Leaders seperti: profiling, roadmap, KPI, form / performance review, hingga performance appraisal.

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

## Section

### Bersifat sama

- Bio
- Aspek Profile
- Kelebihan
- Butuh Ditingkatkan
- Roadmap: Tahap-tahapan yang harus dilalui dalam bentuk Gantt Chart.

### Bersifat berbeda

- Activity
- Bare Minimum
- Performa

#### Activity

- IT Development: SPEctrum, Click Up, dan GitLab

## Tech Stack

- **Next JS v16**: Framework utama untuk membangun aplikasi web.
- **Tailwind v4**: CSS Preprocessor.
- **TypeScript**: Bahasa pemrograman yang digunakan untuk meningkatkan kualitas kode.
- **ESLint**: Alat untuk memastikan konsistensi kode.
- **Prettier**: Alat untuk memastikan format kode yang konsisten.
- **Jest**: Framework untuk pengujian unit.
- **React Testing Library**: Alat untuk pengujian komponen React.
- **Storybook**: Alat untuk mengembangkan dan mendokumentasikan komponen UI.
- **React Hook Form**: Library untuk mengelola form dalam aplikasi React.
- **Yup**: Library untuk validasi skema data.
- **Axios**: Library untuk melakukan HTTP requests.
- **SWR**: Library untuk data fetching.
- **MongoDB**: Database NoSQL yang digunakan untuk menyimpan data aplikasi.
- **Mongoose**: Library untuk memodelkan data MongoDB dalam aplikasi Node.js.
- **Docker**: Platform untuk mengembangkan, mengirim, dan menjalankan aplikasi dalam container.
- **Express**: Framework untuk membangun API backend.
- **cron**: Alat untuk menjadwalkan tugas otomatis, seperti sinkronisasi data harian.

## Source Data

- SPEInside: Mendapatkan sesi data berupa posisi, divisi, dan department
- Click Up
- GitLab
- SPEctrum

## Rules

- Semua Source Data akan disimpan ke DB dan dilakukan sinkronisasi setiap hari di jam 00:00
- Setiap divisi memiliki KPI yang berbeda-beda
- Setiap divisi memiliki department-department dengan Bare Minimum yang berbeda
- Data dapat difilter berdasarkan tahun agar dapat melihat perkembangan anggota tim secara historikal
- Sumber data Activity berbeda-beda untuk setiap divisi:
  - User mampu mengisi aktifitas secara mandiri
  - IT Development: SPEctrum, Click Up, dan GitLab

## Features

- Login SSO dengan Microsoft
- Memiliki fitur untuk merubah format penulisan agar lebih konsisten dan mudah dibaca.
- Dark Mode untuk memberikan pengalaman pengguna yang lebih nyaman, terutama saat bekerja dalam kondisi pencahayaan rendah.
- Dapat membuat KPI secara dinamis sesuai dengan kebutuhan divisi atau department.
- Dapat membuat Bare Minimum secara dinamis sesuai dengan kebutuhan divisi atau department.

## Role Akses

- Head:
  - Dapat membuat KPI
  - Dapat membuat Bare Minimum
- SPV:
  - Dapat mengisi KPI
  - Dapat mengisi Bare Minimum

## Questions

### Digitalisasi

A: Penggunaan App ini merupakan bagian dari proses digitalisasi yang sedang dilakukan oleh perusahaan. Apakah KPI akan menyesuaikan untuk digitalisasikan?

B: -



## Structure

- `src/app`: Folder utama untuk halaman
- `src/components`: Folder untuk komponen UI yang bisa digunakan ulang
- `src/utils`: Folder untuk utilitas dan helper functions yang bisa digunakan di berbagai tempat
- `src/views`: Folder untuk komponen yang spesifik untuk halaman tertentu agar lebih terorganisir

## Style Guide

- Gunakan camelCase untuk penamaan variabel dan fungsi
- Gunakan PascalCase untuk penamaan komponen React
- Gunakan kebijakan single responsibility principle untuk komponen, pastikan setiap komponen hanya memiliki satu tanggung jawab
- Hindari nested components yang terlalu dalam, usahakan untuk memecahnya menjadi komponen yang lebih kecil jika diperlukan
- Nested hanya 1 level, jika lebih dari itu, pertimbangkan untuk memecahnya menjadi komponen yang lebih kecil

### Example

#### Folder Structure

src/
├── app/
│ ├── dashboard/
│ │ ├── page.tsx
│ └── profile/
│ | ├── page.tsx
├── views/
│ ├── Dashboard/
│ │ ├── Dashboard.tsx
│ │ ├── Dashboard.module.css
│ │ ├── Dashboard.types.ts
│ │ └── index.ts
│ └── Profile/
│ ├── Profile.tsx
│ ├── Profile.module.css
│ ├── Profile.types.ts
│ └── index.ts
├── components/
│ ├── Button/
│ │ ├── Button.tsx
│ │ ├── Button.module.css
│ │ ├── Button.types.ts
│ │ └── index.ts
│ └── Card/
│ ├── Card.tsx
│ ├── Card.module.css
│ ├── Card.types.ts
│ └── index.ts
├── utils/
│ ├── api.ts
│ ├── constants.ts
│ └── helpers.ts

## Takeaways

- Sesuaikan file-file yang ada di .github setiap ada perubahan response AI
