# EduSmart (Kelas 9B)

**EduSmart** adalah aplikasi belajar berbasis web yang dibuat khusus untuk menemani aktivitas belajar siswa SMP Kelas 9B. Aplikasi ini menggabungkan materi pelajaran (sesuai Kurikulum Merdeka), latihan soal, jadwal kelas, hingga asisten belajar berbasis AI dalam satu tampilan yang ringan dan nyaman diakses lewat HP maupun laptop.

## Apa saja yang ada di dalam EduSmart?

* **Nyaman di HP maupun Laptop**
  Kalau dibuka lewat HP, tampilannya otomatis menyesuaikan layar penuh layaknya aplikasi biasa. Nah, kalau kamu membukanya di laptop atau PC, tampilannya akan dibungkus dalam *frame* smartphone yang ukurannya bisa kamu atur sendiri biar tetap pas di mata.

* **Materi Matematika Kelas 9 Lengkap**
  Berisi 6 bab utama sesuai Kurikulum Merdeka—mulai dari *Perpangkatan & Bentuk Akar*, *Persamaan Kuadrat*, *Transformasi Geometri*, *Kesebangunan*, *Bangun Ruang Sisi Lengkung*, sampai *Statistika & Peluang*. Setiap bab sudah dibagi rapi ke dalam ringkasan konsep, contoh soal, dan latihan cepat untuk ngetes pemahamanmu.

* **AI Tutor yang Ngebimbing (Bukan Sekadar Kasih Contekan)**
  Bingung ngerjain soal? Fitur AI Tutor di sini dirancang pakai metode Sokratik. Jadi, dia nggak langsung ngasih jawaban akhir, melainkan ngebimbing kamu pelan-pelan lewat 4 tahap: memahami soal, mencari rumus yang pas, langkah pengerjaan, sampai ngasih tantangan kecil. Kalau mentok, tenang aja—tetap ada tombol petunjuk dan kunci jawaban lengkapnya.

* **Kuis Mandiri untuk 9 Mata Pelajaran**
  Mau latihan sebelum ulangan? Ada bank soal interaktif untuk 9 mapel (Matematika, IPA, IPS, PAI, Seni Budaya, B. Arab, B. Inggris, B. Indonesia, dan B. Sunda). Lengkap dengan *timer*, koreksi otomatis, pembahasan soal, dan rekap skor di akhir.

* **Jadwal Pelajaran & Catatan Tugas (ADL)**
  Nggak perlu lagi tanya-tanya di grup kelas soal jadwal besok atau PR yang belum kelar. Kamu bisa cek jadwal Senin–Jumat dan memantau daftar tugas berdasarkan statusnya (*Belum Selesai*, *Selesai*, atau *Sudah Dinilai*).

* **Daily Streak (Biar Makin Rajin)**
  Mirip seperti di aplikasi belajar bahasa, ada fitur *streak* harian dan kalender mingguan untuk memantau seberapa konsisten kamu belajar setiap harinya. Progresnya tersimpan otomatis di browser (`localStorage`).

## Susunan Folder

Biar gampang kalau mau ngoprek kodenya, struktur proyek ini dibuat sesederhana mungkin tanpa *framework* yang ribet:

```text
EduSmart/
├── index.html      # Halaman utama & kerangka antarmuka aplikasi
├── css/
│   └── style.css   # Pengaturan tampilan, animasi, serta mode terang/gelap
├── js/
│   ├── data.js     # Pusat data (jadwal, tugas, bank soal, & materi Matematika)
│   └── app.js      # Logika utama untuk kuis, streak, dan simulasi AI Tutor
└── README.md
```

## Cara Menjalankan di Perangkat Sendiri

Proyek ini murni menggunakan HTML, CSS, dan JavaScript standar, jadi kamu nggak perlu instal macam-macam untuk mencobanya.

**Cara 1: Langsung buka di browser (Paling gampang)**

1. Unduh atau *clone* repositori ini ke komputermu.
2. Klik dua kali pada file `index.html`, dan aplikasi akan langsung terbuka di Chrome, Edge, Firefox, atau Safari.

**Cara 2: Akses lewat HP (Satu jaringan Wi-Fi)**
Kalau kamu mau nyobain langsung di HP tapi file-nya ada di laptop, jalankan server lokal sederhana lewat terminal/CMD di dalam folder proyek:

```bash
python3 -m http.server 8080
```

Setelah itu, buka browser di HP kamu dan ketik alamat `http://<IP-LAPTOP-KAMU>:8080` (pastikan HP dan laptop terhubung ke Wi-Fi yang sama, ya!).