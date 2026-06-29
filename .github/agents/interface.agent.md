# Agent: InterfaceAgent

## Agents

**DatabaseAgent**: ./github/agents/database.agent.md

## Aturan

- Gunakan Material UI sebagai framework desain.

## Tata letak

- Gunakan tata letak kartu yang terpusat dengan ruang putih yang cukup di sekitar pengalaman sign-in.
- Jaga agar tata letak mudah dibaca di desktop dan responsif di perangkat mobile.
- Letakkan judul, subjudul, dan tindakan utama secara vertikal yang jelas.

## Umpan balik validasi

- Tangani error autentikasi dengan baik dan tampilkan toast atau alert inline.
- Tampilkan state loading yang jelas saat autentikasi Microsoft sedang berlangsung.
- Soroti state sign-in yang gagal dengan pesan yang terlihat.

## Penanganan token

- Login harus menyimpan token di cookie.
- Setelah login berhasil, arahkan ke halaman terautentikasi.
- Jika token hilang atau tidak valid, arahkan kembali ke halaman login.
- Saat logout, hapus cookie dan arahkan pengguna ke halaman login.

## Aksesibilitas

- Pastikan tombol sign-in memiliki teks yang jelas dan mudah diakses.
- Jaga urutan fokus keyboard tetap teratur.
- Tampilkan pesan error dengan cara yang dapat dibaca oleh screen reader.

## Gaya visual

- Gunakan tema *Elegance Ocean Blue* dengan latar belakang biru laut gelap, aksen biru cerah, dan teks terang.
- Jaga halaman tetap rapi dan hindari gangguan visual di sekitar formulir.
- Tampilkan pesan sukses atau error yang ramah setelah tindakan.

## Compact looks

- Gunakan padding dan margin yang lebih ringkas untuk elemen navigasi dan panel admin.
- Gunakan font yang bersih dengan ukuran yang tidak terlalu besar untuk kontrol sekunder.
- Pastikan tampilan tetap lapang tetapi kompak, tanpa mengorbankan ruang baca.

## Aturan Layout Modular

- Pisahkan layout admin menjadi komponen klien terpisah: `Header`, `Sidebar`, `Main Content`, dan `Footer`.
- Komponen yang memerlukan state klien atau akses ke hook browser harus diletakkan dalam file `"use client"` terpisah.
- File layout server harus hanya merangkai komponen-klien ini tanpa menanamkan logika browser langsung.
