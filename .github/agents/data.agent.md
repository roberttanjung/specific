# Agent: DataAgent

## Agents

**Interface Agent:** `./.github/agents/interface.agent.md`

## Purpose

Agent khusus untuk menyediakan data demi kebutuhan Prompting.

## Data

Sumber data dapat berasal dari daftar sumber dibawah yang diwakili dengan variable:

- `DB`: Diambil dari `./src/db/`.
- `Profile`: Diambil dari `./src/views/Profile/`.
- `Monthly`: Data yang didapat dari `./src/db/twbe.json` dan sudah dimerge berdasarkan `month` dengan format "Month Year" seperti "September 2025" jika ada 3 maka disatukan saja begitu juga dibulan-bulan lainnya. Adapun kolom yang tersedia adalah sebagai berikut: `Month`, `Total Task`, `Total Weight`, `Bugs Ratio`, `Done Rate`, dan `Finish Rate`. `Bugs Ratio` adalah rasio bug dari sprint terkait dengan perhitungan `Total Bugs` / `Total Task`.

## SSOT (Single Source of Truth)

Semua data dan definisi bersama harus mengacu pada satu sumber untuk mencegah kontradiksi lintas halaman dan modul.

### File SSOT

| File                         | Isi                                                                                                   | Dipakai oleh                                                                                   |
| ---------------------------- | ----------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `src/db/twbe.json`           | Raw data TWBE seluruh engineer                                                                        | `src/utils/twbe.ts`                                                                            |
| `src/db/bareMinimum.ts`      | Konstanta `BARE_MINIMUM_MATRIX`, `BARE_MINIMUM_TOOLTIP_LEVELS`, dan fungsi re-scoring KPI + aktivitas | Dashboard, Profile View                                                                        |
| `src/db/constants.ts`        | Konstanta global `REFERENCE_DATE` untuk kalkulasi umur & tenure                                       | Dashboard (`src/app/page.tsx`), Profile View (`src/views/Profile/ProfileView/ProfileView.tsx`) |
| `src/db/softProfile.ts`      | Konstanta `SOFT_PROFILE_TEXT_KEYS` dan `SOFT_PROFILE_TEXT_LABELS` untuk Aspek Profil                  | Dashboard, Profile View                                                                        |
| `src/db/ssot.guard.test.ts`  | Guard test otomatis untuk mendeteksi drift data                                                       | Dijalankan via `npm run test`                                                                  |
| `src/views/Profile/index.ts` | Registry engineer (`engineerProfileRegistry`, `allEngineerProfiles`)                                  | Dashboard, navigasi, KPI Generator                                                             |
| `src/utils/roadmap.ts`       | Mapping roadmap profile -> grid dashboard (`getEngineerRoadmapRows`, `monthNumber`)                   | Dashboard roadmap komparasi (`src/app/page.tsx`)                                               |

### Registry Engineer

- Registry terpusat ada di `src/views/Profile/index.ts`.
- Dashboard (`src/app/page.tsx`) mengonsumsi `allEngineerProfiles` dari registry.
- Navigasi profile (`src/utils/navigation.ts`) mengonsumsi `engineerProfileRegistry` dari registry.
- KPI Generator (`src/views/KpiGenerator/kpi.utils.ts`) mengonsumsi `allEngineerProfiles` dari registry.
- Dashboard roadmap komparasi (`src/app/page.tsx`) mengonsumsi data roadmap via `getEngineerRoadmapRows()` dari `src/utils/roadmap.ts`, yang bersumber dari `allEngineerProfiles`.
- Untuk menambah atau menghapus engineer, cukup edit registry di `src/views/Profile/index.ts`.

### Roadmap Dashboard SSOT

- Sumber data roadmap dashboard adalah `careerRoadmap` pada masing-masing profile engineer di `src/views/Profile/<EngineerName>/`.
- `src/utils/roadmap.ts` bertugas melakukan transformasi periode roadmap menjadi grid minggu (Juni-November, 4 minggu per bulan).
- Dashboard (`src/app/page.tsx`) hanya merender hasil transformasi; tidak boleh memiliki data roadmap statis/hardcoded.

### Guard Test

File `src/db/ssot.guard.test.ts` memverifikasi secara otomatis bahwa:

1. Setiap slug di registry unik dan tidak duplikat.
2. Setiap slug registry memiliki route page profile yang sesuai di `src/app/(admin)/profile/<slug>/page.tsx`.
3. Setiap engineer di registry memiliki data TWBE monthly di `src/db/twbe.json`.
4. Daftar engineer di KPI Generator identik dengan registry profile.

Jalankan guard dengan: `npm run test -- src/db/ssot.guard.test.ts`

### KPI + Activity Re-Scoring Logic

Fungsi `getKpiAchievement()`, `getActivityAchievement()`, `getKpiBasedBareMinimumRatings()`, dan `getKpiBasedBareMinimumReasons()` di `src/db/bareMinimum.ts` mengatur penilaian Bare Minimum berdasarkan capaian KPI TWBE monthly dan Aktivitas yang Sudah Dilakukan per engineer:

- `KPI_TARGETS`: Threshold target KPI (minTask=30, minWeight=50, maxBugsRatio=0.15, minDoneRate=95%, minFinishRate=95%).
- `getKpiAchievement(rows)`: Menghitung hit rate KPI (taskHitRate, weightHitRate, bugsHitRate, doneHitRate, finishHitRate) dari row monthly.
- `getActivityAchievement(activities)`: Menghitung achievement aktivitas dari jumlah project, jumlah evidence item, dan kelengkapan deskripsi aktivitas.
- `getKpiBasedBareMinimumRatings(kpi, activity)`: Menghitung ulang 7 aspek bare minimum dari kombinasi KPI + aktivitas (tanpa faktor level/grade atau lama bekerja).
- `getKpiBasedBareMinimumReasons(kpi, activity)`: Menyediakan alasan penilaian per aspek berdasarkan kombinasi hit rate KPI + aktivitas.

Dashboard dan Profile View **keduanya** menerapkan re-scoring ini sebelum display, sehingga nilai Bare Minimum identik di semua tempat.

### Roadmap Target from Bare Minimum

- Target roadmap karir diturunkan dari hasil Bare Minimum terbaru menggunakan `getRoadmapGoalFromBareMinimumRatings()`.
- Goal roadmap dipersonalisasi per engineer menggunakan konteks `needsImprove` dan `softProfile.developmentAreas`, sehingga target tidak seragam antar engineer.
- Target specialist ditentukan secara spesifik berdasarkan aspek Bare Minimum terkuat tiap engineer (bukan generic specialist).
- Pada dashboard komparasi, assignment target specialist didistribusikan unik per engineer agar pembacaan diferensiasi roadmap lebih jelas.
- Potensi engineer untuk menjadi **SPEcialist** diprioritaskan jika memenuhi threshold kelayakan; bila belum layak, goal diarahkan lebih dulu ke peningkatan level Middle/Senior Frontend Engineer.

### Aspek Profil (Soft Profile)

Label dan key Aspek Profil tersentralisasi di `src/db/softProfile.ts`:

- `SOFT_PROFILE_TEXT_KEYS`: Array 5 key (collaborationType, workStyle, strengths, developmentAreas, uniqueSellingPoint).
- `SOFT_PROFILE_TEXT_LABELS`: Mapping key → label Indonesia.

Dashboard dan Profile View keduanya derive tabel Aspek Profil dari konstanta ini. Perubahan label otomatis sync di semua halaman.

### Reference Date

Konstanta `REFERENCE_DATE` di `src/db/constants.ts` menetapkan baseline untuk kalkulasi umur dan lama bekerja (5 Mei 2026, akhir periode profiling). Dashboard dan Profile View keduanya menggunakan date yang sama, sehingga umur dan tenure engineer identik di semua halaman.

## Dashboard Section Ordering

Urutan section di Dashboard (`src/app/page.tsx`) dirancang untuk memandu pembaca melalui profiling dari yang umum ke spesifik: **Identitas -> Karakteristik -> Kualitas -> Kelebihan -> Roadmap -> Performa**.

### Urutan Section

1. **Summary Komparasi** (Identitas)
   - Biodata dasar setiap engineer: nama, level/grade, umur, lama bekerja
   - Overview score: Bare Minimum Avg dan kelebihan utama
   - Tujuan: Pembaca langsung kenal siapa engineers, level berapa, score berapa

2. **Aspek Profil Komparasi** (Karakteristik)
   - Soft profile setiap engineer: tipe kolaborasi, gaya kerja, kelebihan, area pengembangan, USP
   - Tujuan: Pembaca memahami karakteristik kerja dan cara mereka berkontribusi

3. **Bare Minimum Frontend Engineer** (Kualitas)
   - Evaluasi kualitas kompeten per 7 aspek fundamental frontend
   - Rating disesuaikan dengan KPI achievement TWBE monthly + Aktivitas yang Sudah Dilakukan
   - Tujuan: Pembaca tahu kualitas evaluasi setiap engineer secara mendetail

4. **Kelebihan Komparasi** (Strength Highlights)
   - Tabel komparatif transposed
   - Header kolom adalah nama engineer
   - Poin kelebihan ditampilkan vertikal per baris berdasarkan urutan item `good`

5. **Roadmap Karir Komparasi** (Roadmap)
   - Timeline Gantt roadmap engineer Juni-November 2026
   - Data bersumber dari `allEngineerProfiles` via `getEngineerRoadmapRows()`

6. **Performa TWBE Komparasi** (Performa)
   - Data performa TWBE dalam bentuk visual chart
   - Metrik: total task, total weight, bugs ratio, finish rate per engineer
   - Tujuan: Pembaca yang ingin deep dive ke data aktual TWBE

### Section Nonaktif

- `Area Pengembangan Komparasi` tidak termasuk section aktif Dashboard saat ini.

### Prinsip Ordering

- Navigasi dari identitas (siapa?) → karakteristik (bagaimana cara kerjanya?) → kualitas (seberapa baik?) → performa (data apa saja?)
- Setiap section berdiri sendiri tapi saling melengkapi narasi profiling
- Title dan description setiap section jelas menyebutkan tujuan setiap tahap evaluasi
