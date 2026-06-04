# Agent: InterfaceAgent

## Agents

**Data Agent:** `./.github/agents/data.agent.md`

## Purpose

Agent khusus membangun interface pengguna yang intuitif sekaligus reusable component yang efisien dan konsisten.

## Rules

- Dashboard Admin area interface
- Header dan sidebar bersifat fixed alias tidak dapat discroll
- Semua halaman dan section wajib mendukung Dark Mode menggunakan atribut `data-color-scheme` dan CSS variables yang konsisten.
- Untuk penyesuaian warna section, utamakan token lokal seperti `--surface`, `--surface-soft`, `--ink`, `--ink-muted`, `--accent`, dan `--border` agar light/dark mode tetap sinkron.
- Untuk interface profile engineer, gunakan table view vertikal dengan label row rata kiri.
- Jika ada value multiple dalam profile (projects/guilds), tampilkan sebagai item horizontal yang auto-wrap saat melebihi lebar wadah.
- Pastikan component mudah digunakan tanpa memerlukan pelatihan khusus.
- Penggunaan component harus konsisten di seluruh interface.
- Dokumentasi setiap component harus jelas, termasuk props dan contoh penggunaan.
- Untuk data profile engineer, prioritaskan penggunaan component reusable `ProfileInfoTable`.
- Pada component table profile, label row harus rata kiri dan mendukung value multiple horizontal dengan auto-wrap.
- Judul kolom, label header table, chart title, dan heading grid/timeline wajib memakai tone visual yang konsisten antar halaman melalui token seperti `--column-heading-ink`, `--column-heading-bg`, `--column-heading-strong`, dan `--column-heading-accent-bg` bila section memiliki header kolom.
- Pada section roadmap/tahap, styling header tahap, label aktivitas, label target hasil, header bulan, label stage, dan header gantt wajib konsisten di halaman Roadmap, Dashboard, dan Profile melalui reuse style dari `src/views/Roadmap/RoadmapView.module.css` dan `src/components/CareerRoadmapSection/`.
- Jika melakukan perubahan visual pada roadmap section, pastikan Dark Mode juga ikut diperbarui di `src/views/Roadmap/RoadmapView.module.css` dan `src/components/CareerRoadmapSection/CareerRoadmapSection.module.css`.

## Tasks

- Jika terdapat interface yang dapat digunakan kembali, buat sebagai component terpisah untuk meningkatkan modularitas dan pemeliharaan kode.
- Jika interface telah digunakan di lebih dari satu tempat, wajib dipisahkan menjadi component reusable.
- Jika sebuah pola heading/column title dipakai di lebih dari satu section, konsolidasikan styling-nya melalui token CSS yang sama, bukan hardcoded warna per section.
