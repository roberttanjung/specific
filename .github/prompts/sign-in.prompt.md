# Prompt: PR Sign In

## sequenceDiagram

autonumber
actor Admin as Admin (Browser)
participant Server as Next.js Server (Route Handler)
participant DB as MongoDB

%% SECTION 1: PROSES LOGIN MANUAL %%
Note over Admin, Server: FASE 1: Autentikasi Kredensial Manual & Penerbitan Token
Admin->>Server: Input & Kirim Form (Email & Password Manual) via POST

Note over Server, DB: Pengecekan Akun ke Database
Server->>DB: Query User berdasarkan Email di koleksi 'users'
DB-->>Server: Mengembalikan Data User beserta Password Terenkripsi (Hashed)

alt Email Tidak Terdaftar
  Server-->>Admin: 401 Unauthorized (Kredensial Salah)
else Email Ditemukan
  Note over Server: Verifikasi Keamanan Password
  Server->>Server: Komparasi Password Input dengan Hash di DB (e.g., via bcrypt.compare)
  
  alt Password Tidak Cocok
    Server-->>Admin: 401 Unauthorized (Kredensial Salah)
  else Password Cocok (Sukses)
    Note over Server: Pembuatan Bearer Token
    Server->>Server: Generate JWT (Payload: userId, role) + Sign dengan JWT_SECRET
    Server-->>Admin: Kirim Response 200 OK + Payload JWT Token
  end
end

%% SECTION 2: PENGGUNAAN BEARER TOKEN %%
Note over Admin, DB: FASE 2: Otorisasi Akses Admin Area (Bearer Token)
Admin->>Server: Request Data Dashboard (Headers: Authorization: Bearer <JWT>)

Note over Server: Verifikasi Autentisitas Token
Server->>Server: Dekripsi & Cek Validasi JWT (Signature & Expiry) via JWT_SECRET

alt Token Valid & Aktif
    Server->>DB: Query Data Internal Admin (e.g., Laporan Keuangan, Log User)
    DB-->>Server: Mengembalikan Data dari Koleksi MongoDB
    Server-->>Admin: 200 OK (Kirim Data JSON untuk Render Halaman Admin)
else Token Tidak Valid / Expired
    Server-->>Admin: 403 Forbidden / 401 Unauthorized (Sesi Berakhir)
end