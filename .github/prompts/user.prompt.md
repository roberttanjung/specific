# Prompt: PR Pengguna

## Tujuan

Buat halaman Manajemen Pengguna.

## Halaman Daftar Pengguna (Terautentikasi)

Halaman daftar pengguna yang menampilkan daftar pengguna dalam tampilan tabel.

Tampilan tabel akan menampilkan hal-hal berikut:

- Nama
- Email
- Divisi
- Departemen
- Superintendent
- Direct Report
- Aksi

**Aturannya**:

- Klik area kosong di baris dapat mengarahkan ke detail pengguna
- Arahkan kursor ke Email dapat menampilkan tombol ikon untuk menyalin email

### Aksi

Daftar aksi yang ditampilkan dengan tombol ikon:

- Edit Pengguna: Arahkan ke Detail Pengguna
- Hapus Pengguna: Hapus pengguna

### Hapus Pengguna

Ubah status pengguna menjadi 0.

**Alurnya**:

- Pengguna klik Hapus Pengguna
- Popup pengingat muncul dengan 2 pilihan tombol: Tidak & Ya
- Pengguna klik Tidak maka popup pengingat akan hilang
- Pengguna klik Ya maka proses akan dijalankan

## Halaman Buat / Detail / Perbarui Pengguna (Terautentikasi)

Halaman yang dapat digunakan kembali untuk Membuat, Melihat Detail, dan Memperbarui Pengguna.

**Aturannya**:

- Direct Report dapat dipilih lebih dari satu

**Fieldnya**:

- Nama:
  - tipe: Teks
  - validasi:
    - Wajib diisi
    - min: 4
    - max: 60
- Email:
  - tipe: Email
  - validasi:
    - Wajib diisi
    - min: 4
    - max: 60
- Divisi:
  - tipe: Select
  - Enum:
    - IT Development
  - validasi:
    - Wajib diisi
- Departemen:
  - tipe: Select
  - Enum:
    - Multiplatform
  - validasi:
    - Wajib diisi
- Superintendent:
  - tipe: Autocomplete dengan endpoint
  - Endpoint digunakan untuk mengambil daftar Superintendent di Divisi tersebut
  - validasi:
    - Wajib diisi
    - min: 4
    - max: 60
- Direct Report:
  - tipe: Multiple Autocomplete dengan endpoint
  - Endpoint digunakan untuk mengambil daftar anggota di bawah pembuat

## Tugas

[ ] Buat tampilan tabel sebagai komponen yang dapat digunakan kembali
[ ] Buat halaman daftar pengguna
[ ] Buat halaman Buat / Detail / Perbarui Pengguna
