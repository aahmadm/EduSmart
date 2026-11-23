# EduSmart — Aplikasi Belajar Siswa SMP Kelas 9B

**EduSmart** adalah aplikasi web pembelajaran mobile-first untuk siswa SMP Kelas 9B yang dirancang dengan antarmuka smartphone interaktif, modul pembelajaran sesuai Kurikulum Merdeka, kuis evaluasi mandiri, jadwal pelajaran, daftar tugas (ADL), sistem runtunan belajar (*streak*), dan **AI Tutor Sokratik**.

---

## Fitur Utama

- **Tampilan Simulator Smartphone & Responsif Penuh**
  - Pada desktop/laptop, tampil dalam bingkai smartphone dengan kontrol skala layar.
  - Pada perangkat HP asli, otomatis menyesuaikan layar penuh (*full-screen*).
- **Modul Pembelajaran Interaktif Matematika Kelas 9 (Kurikulum Merdeka)**
  - 6 Bab lengkap: *Perpangkatan & Bentuk Akar*, *Persamaan & Fungsi Kuadrat*, *Transformasi Geometri*, *Kekongruenan & Kesebangunan*, *Bangun Ruang Sisi Lengkung (BRSL)*, dan *Statistika & Peluang Terapan*.
  - Dilengkapi tab **Konsep & Rumus**, **Contoh Soal**, dan **Cek Pemahaman** interaktif.
- **AI Tutor Sokratik (Bimbingan Langkah demi Langkah)**
  - Tidak langsung memberikan jawaban akhir, melainkan membimbing siswa melalui 4 tahap: *Identifikasi Masalah*, *Konsep/Formula Kunci*, *Pengerjaan Terbimbing*, dan *Tantangan Siswa*.
  - Dilengkapi pengecekan jawaban mandiri, petunjuk tambahan, dan pembuka kunci jawaban lengkap.
- **Kuis Evaluasi Mandiri (*Standalone Quiz Screen*)**
  - Bank soal interaktif untuk 9 mata pelajaran Kelas 9 (*Matematika, IPA, IPS, PAI, Seni Budaya, Bahasa Arab, Bahasa Inggris, Bahasa Indonesia, Bahasa Sunda*).
  - Dilengkapi timer, progress bar, koreksi jawaban instan, pembahasan soal, dan rekap hasil.
- **Jadwal Pelajaran & Daftar Tugas (ADL) Kelas 9B**
  - Jadwal pelajaran mingguan (Senin–Jumat) dan daftar tugas terintegrasi dengan filter status (*Semua, Belum Selesai, Dinilai, Selesai*).
- **Sistem Runtunan Belajar (*Daily Streak*)**
  - Pelacakan konsistensi belajar harian, kalender mingguan, target milestone, dan penyimpanan lokal (`localStorage`).

---

## Struktur Proyek

```text
EduSmart/
├── index.html      # Struktur utama antarmuka aplikasi & layar-layar mandiri
├── css/
│   └── style.css   # Styling mobile-first, tema terang/gelap, & animasi
├── js/
│   ├── data.js     # Data siswa 9B, jadwal, tugas, bank soal, & modul Matematika
│   └── app.js      # Logika aplikasi, kuis, modul reader, streak, & AI Tutor
└── README.md
```

---

## Cara Menjalankan

1. **Buka langsung di browser:**
   Buka file `index.html` menggunakan browser modern (Chrome, Safari, Firefox, atau Edge).
2. **Atau jalankan melalui server lokal** (untuk akses dari HP dalam satu jaringan Wi-Fi):
   ```bash
   python3 -m http.server 8080
   ```
   Lalu buka `http://<IP-LOKAL-KOMPUTER>:8080` di browser HP Anda.
