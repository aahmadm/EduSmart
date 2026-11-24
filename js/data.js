// Data dummy dan state awal untuk Aplikasi Belajar - Jenjang SMP (Sekolah Menengah Pertama)
const initialData = {
  user: {
    nama: "Ahmad Mubarak",
    kelas: "9B",
    detailLain: "Semester Ganjil 2024/2025",
    nisn: "0098943211",
    sekolah: "SMPIT Al-Irsyad Al-Islamiyyah Bandung",
    email: "rayhan.ahmad@smp.belajar.sch.id",
    noHp: "0812-3456-7890",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    streakHari: 5,
    targetHarianPersen: 75,
    targetHarianTeks: "3 dari 4 materi selesai",
    waktuBelajarHariIni: "1j 45m",
    poin: 1240,
    peringkatKelas: 3
  },

  quotes: [
    {
      text: "A person who never made a mistake never tried anything new.",
      author: "Albert Einstein"
    },
    {
      text: "Pendidikan adalah senjata paling ampuh untuk mengubah masa depanmu.",
      author: "Nelson Mandela"
    },
    {
      text: "Hiduplah seolah-olah kamu akan mati besok. Belajarlah seolah-olah kamu akan hidup selamanya.",
      author: "Mahatma Gandhi"
    },
    {
      text: "Kegagalan hanya terjadi bila kita menyerah. Teruslah mencoba dan belajar!",
      author: "B.J. Habibie"
    },
    {
      text: "Investasi terbaik untuk masa depan adalah ilmu pengetahuan.",
      author: "Benjamin Franklin"
    }
  ],

  lanjutkanBelajar: {
    mapel: "Matematika",
    bab: "Bab 2: Persamaan & Fungsi Kuadrat",
    topik: "Sumbu Simetri, Diskriminan, & Nilai Optimum Parabola",
    progress: 68,
    totalModul: 6,
    modulSelesai: 3,
    durasiSisa: "18 Menit Baca",
    warna: "#4F46E5",
    icon: "📐",
    modulId: "mat-bab-2"
  },

  tugasMendatang: {
    id: "tugas-ipa-9b",
    judul: "Praktikum: Uji Makanan & Sistem Peredaran Darah",
    mapel: "IPA",
    tenggat: "Senin Depan, 23:59",
    sisaWaktu: "Jadwal Kelas 9B",
    urgensi: "urgent"
  },

  // 9 Mapel Utama Jenjang SMP Sesuai Kurikulum:
  // Matematika, IPA, IPS, PAI, Seni Budaya, Bahasa Arab, Bahasa Inggris, Bahasa Indonesia, Bahasa Sunda
  mapelUtama: [
    {
      id: "matematika",
      nama: "Matematika",
      subnama: "Aljabar, Geometri, & Statistika",
      icon: "📐",
      warna: "#4F46E5",
      warnaBg: "#EEF2FF",
      totalBab: 6,
      progress: 68,
      soalKey: "kuisMatematikaKelas9",
      babList: [
        { no: 1, judul: "Perpangkatan dan Bentuk Akar", durasi: "15 Menit Baca", selesai: true, modulId: "mat-bab-1" },
        { no: 2, judul: "Persamaan dan Fungsi Kuadrat", durasi: "18 Menit Baca", selesai: true, aktif: true, modulId: "mat-bab-2" },
        { no: 3, judul: "Transformasi Geometri (Translasi & Refleksi)", durasi: "15 Menit Baca", selesai: true, modulId: "mat-bab-3" },
        { no: 4, judul: "Kekongruenan dan Kesebangunan", durasi: "16 Menit Baca", selesai: false, aktif: true, modulId: "mat-bab-4" },
        { no: 5, judul: "Bangun Ruang Sisi Lengkung (Tabung, Kerucut, Bola)", durasi: "20 Menit Baca", selesai: false, modulId: "mat-bab-5" },
        { no: 6, judul: "Statistika dan Peluang Terapan", durasi: "15 Menit Baca", selesai: false, modulId: "mat-bab-6" }
      ]
    },
    {
      id: "ipa",
      nama: "IPA",
      subnama: "Biologi, Fisika, & Kimia Terpadu",
      icon: "🔬",
      warna: "#0284C7",
      warnaBg: "#F0F9FF",
      totalBab: 6,
      progress: 68,
      soalKey: "kuisIpaKelas9",
      babList: [
        { no: 1, judul: "Sistem Reproduksi & Pewarisan Sifat", durasi: "45m", selesai: true },
        { no: 2, judul: "Sistem Peredaran Darah & Ekskresi", durasi: "50m", selesai: false, aktif: true },
        { no: 3, judul: "Listrik Dinamis dalam Kehidupan Sehari-hari", durasi: "55m", selesai: false },
        { no: 4, judul: "Kemagnetan & Pemanfaatannya dalam Teknologi", durasi: "50m", selesai: false },
        { no: 5, judul: "Partikel Materi: Atom, Ion, & Molekul", durasi: "40m", selesai: false },
        { no: 6, judul: "Bioteknologi Pangan Ramah Lingkungan", durasi: "45m", selesai: false }
      ]
    },
    {
      id: "ips",
      nama: "IPS",
      subnama: "Geografi, Sejarah, & Ekonomi Terpadu",
      icon: "🌍",
      warna: "#059669",
      warnaBg: "#ECFDF5",
      totalBab: 5,
      progress: 60,
      soalKey: "kuisIpsKelas9",
      babList: [
        { no: 1, judul: "Interaksi Antarruang Benua Asia & Benua Lain", durasi: "40m", selesai: true },
        { no: 2, judul: "Perubahan Sosial Budaya & Globalisasi", durasi: "45m", selesai: true },
        { no: 3, judul: "Ketergantungan Antarruang & Pengaruhnya pada Ekonomi", durasi: "50m", selesai: false, aktif: true },
        { no: 4, judul: "Masa Kemerdekaan hingga Masa Reformasi", durasi: "55m", selesai: false },
        { no: 5, judul: "Lembaga Sosial & Pelestarian Sumber Daya Alam", durasi: "40m", selesai: false }
      ]
    },
    {
      id: "pai",
      nama: "PAI",
      subnama: "Pendidikan Agama Islam & Budi Pekerti",
      icon: "🕌",
      warna: "#0D9488",
      warnaBg: "#F0FDFA",
      totalBab: 5,
      progress: 85,
      soalKey: "kuisPaiKelas9",
      babList: [
        { no: 1, judul: "Meyakini Hari Akhir & Mengakhiri Kebiasaan Buruk", durasi: "40m", selesai: true },
        { no: 2, judul: "Menatap Masa Depan dengan Optimis, Ikhtiar, & Tawakal", durasi: "45m", selesai: true },
        { no: 3, judul: "Meneladani Tata Krama, Sopan Santun, & Rasa Malu", durasi: "40m", selesai: false, aktif: true },
        { no: 4, judul: "Mengasah Pribadi Berbagi Melalui Zakat & Wakaf", durasi: "45m", selesai: false },
        { no: 5, judul: "Sejarah Perkembangan Peradaban Islam di Nusantara", durasi: "50m", selesai: false }
      ]
    },
    {
      id: "seni_budaya",
      nama: "Seni Budaya",
      subnama: "Seni Rupa, Musik, Tari, & Teater",
      icon: "🎨",
      warna: "#EA580C",
      warnaBg: "#FFF7ED",
      totalBab: 5,
      progress: 75,
      soalKey: "kuisSeniBudayaKelas9",
      babList: [
        { no: 1, judul: "Seni Lukis: Aliran, Gaya, & Teknik Melukis", durasi: "35m", selesai: true },
        { no: 2, judul: "Seni Patung: Ragam Bentuk & Media Pembentuk", durasi: "40m", selesai: true },
        { no: 3, judul: "Bernyanyi Lagu Populer & Teknik Vokal Solo/Grup", durasi: "45m", selesai: false, aktif: true },
        { no: 4, judul: "Gerak Tari Kreasi Pola Lantai Tradisional", durasi: "40m", selesai: false },
        { no: 5, judul: "Perancangan Naskah & Pementasan Teater Modern", durasi: "50m", selesai: false }
      ]
    },
    {
      id: "bahasa_arab",
      nama: "Bahasa Arab",
      subnama: "Mufradat, Tarkib, & Hiwar",
      icon: "📜",
      warna: "#16A34A",
      warnaBg: "#F0FDF4",
      totalBab: 5,
      progress: 65,
      soalKey: "kuisArabKelas9",
      babList: [
        { no: 1, judul: "Ra'sul Sanah Al-Hijriyah (Tahun Baru Hijriah)", durasi: "40m", selesai: true },
        { no: 2, judul: "Haflah Maulidir Rasul (Maulid Nabi)", durasi: "45m", selesai: true },
        { no: 3, judul: "Nuzulul Qur'an wa 'Idul Fitri", durasi: "45m", selesai: false, aktif: true },
        { no: 4, judul: "Jamaluth Thabi'ah (Keindahan Alam Semesta)", durasi: "40m", selesai: false },
        { no: 5, judul: "Al-Hiwar fil Madrosah (Percakapan di Madrasah/Sekolah)", durasi: "40m", selesai: false }
      ]
    },
    {
      id: "bahasa_inggris",
      nama: "Bahasa Inggris",
      subnama: "Grammar, Reading, & Vocabulary",
      icon: "🌏",
      warna: "#9333EA",
      warnaBg: "#FAF5FF",
      totalBab: 5,
      progress: 78,
      soalKey: "kuisBingKelas9",
      babList: [
        { no: 1, judul: "Congratulation, Hope, and Wishes", durasi: "30m", selesai: true },
        { no: 2, judul: "Agreement, Disagreement, and Purpose", durasi: "40m", selesai: true },
        { no: 3, judul: "Procedure Text: Recipes & Manuals", durasi: "45m", selesai: true },
        { no: 4, judul: "Narrative Text: Fairytales & Legends", durasi: "40m", selesai: false, aktif: true },
        { no: 5, judul: "Passive Voice in Information Reports", durasi: "50m", selesai: false }
      ]
    },
    {
      id: "bahasa_indonesia",
      nama: "Bahasa Indonesia",
      subnama: "Teks Laporan, Pidato, & Cerpen",
      icon: "📚",
      warna: "#E11D48",
      warnaBg: "#FFF1F2",
      totalBab: 5,
      progress: 70,
      soalKey: "kuisBindoKelas9",
      babList: [
        { no: 1, judul: "Menyusun Teks Laporan Percobaan", durasi: "35m", selesai: true },
        { no: 2, judul: "Menyampaikan Pidato Persuasif", durasi: "40m", selesai: true },
        { no: 3, judul: "Menyusun Cerita Pendek (Cerpen)", durasi: "45m", selesai: false, aktif: true },
        { no: 4, judul: "Menelaah Teks Tanggapan Kritis", durasi: "40m", selesai: false },
        { no: 5, judul: "Teks Diskusi & Literasi Buku Fiksi", durasi: "40m", selesai: false }
      ]
    },
    {
      id: "bahasa_sunda",
      nama: "Bahasa Sunda",
      subnama: "Basa & Sastra Sunda (Muatan Lokal)",
      icon: "🎋",
      warna: "#D97706",
      warnaBg: "#FFFBEB",
      totalBab: 5,
      progress: 80,
      soalKey: "kuisSundaKelas9",
      babList: [
        { no: 1, judul: "Biantara (Pidato Basa Sunda)", durasi: "35m", selesai: true },
        { no: 2, judul: "Kampung Adat Sunda & Struktur Wangunan", durasi: "40m", selesai: true },
        { no: 3, judul: "Carita Pondok (Carpon) Pangalaman", durasi: "45m", selesai: false, aktif: true },
        { no: 4, judul: "Pakeman Basa: Babasan & Paribasa", durasi: "40m", selesai: false },
        { no: 5, judul: "Paguneman & Naskah Drama Basa Sunda", durasi: "45m", selesai: false }
      ]
    }
  ],

  // Mapel Tambahan Jenjang SMP (untuk filter pencarian modal)
  mapelLain: [],

  // Data Tugas Jenjang SMP Kelas 9B (Diselaraskan dengan Jadwal Pelajaran Kelas 9B)
  tugasList: [
    {
      id: "tugas-ipa-9b",
      judul: "Laporan Praktikum: Uji Makanan & Sistem Peredaran Darah",
      mapel: "IPA",
      guru: "Dra. Siti Rahmah, M.Pd",
      deadline: "2026-11-16T23:59:00",
      tenggatTeks: "Senin (12.30 - 13.50)",
      status: "belum",
      poin: 100,
      icon: "🔬",
      warna: "#0284C7",
      deskripsi: "Tugas praktikum uji golongan darah dan analisis fungsi bilik serta serambi jantung siswa Kelas 9B.",
      soalKey: "kuisIpaKelas9"
    },
    {
      id: "tugas-sunda-9b",
      judul: "Tatakrama Basa Lemes & Analisis Carpon",
      mapel: "Bahasa Sunda",
      guru: "Dra. Yuyun Rohanah",
      deadline: "2026-11-16T15:10:00",
      tenggatTeks: "Senin (14.30 - 15.10)",
      status: "belum",
      poin: 90,
      icon: "🎭",
      warna: "#4338CA",
      deskripsi: "Tugas analisis carpon dan ragam basa hormat ka kolot jeung ka babaturan pikeun murid Kelas 9B.",
      soalKey: "kuisSundaKelas9"
    },
    {
      id: "tugas-paibp-9b",
      judul: "Hukum Tajwid & Perilaku Terpuji (Akidah Akhlak)",
      mapel: "PAI",
      guru: "H. Abdul Somad, M.Pd.I",
      deadline: "2026-11-17T13:50:00",
      tenggatTeks: "Selasa (12.30 - 13.50)",
      status: "belum",
      poin: 95,
      icon: "🕌",
      warna: "#0D9488",
      deskripsi: "Menganalisis hukum bacaan nun sukun/tanwin serta evaluasi hikmah zakat dan haji Kelas 9B.",
      soalKey: "kuisPaiKelas9"
    },
    {
      id: "tugas-bing-9b",
      judul: "Procedure Text: Cooking Recipe & Manual Guide",
      mapel: "Bahasa Inggris",
      guru: "Sarah Wijaya, M.Hum",
      deadline: "2026-11-18T13:50:00",
      tenggatTeks: "Rabu (12.30 - 13.50)",
      status: "belum",
      poin: 90,
      icon: "🌏",
      warna: "#9333EA",
      deskripsi: "Menganalisis generic structure of procedure text dan kata kerja aksi/imperatif pada resep Kelas 9B.",
      soalKey: "kuisBingKelas9"
    },
    {
      id: "tugas-ips-9b",
      judul: "Karakteristik Benua Asia & Dampak Globalisasi",
      mapel: "IPS",
      guru: "Drs. M. Ridwan",
      deadline: "2026-11-18T15:10:00",
      tenggatTeks: "Rabu (13.50 - 15.10)",
      status: "belum",
      poin: 90,
      icon: "🌍",
      warna: "#059669",
      deskripsi: "Kajian letak astronomis dan geografis benua Asia serta dinamika penduduk negara berkembang Kelas 9B.",
      soalKey: "kuisIpsKelas9"
    },
    {
      id: "tugas-mtk-9b",
      judul: "Latihan Soal: Persamaan & Fungsi Kuadrat",
      mapel: "Matematika",
      guru: "Budi Santoso, S.Pd",
      deadline: "2026-11-19T13:50:00",
      tenggatTeks: "Kamis (12.30 - 13.50)",
      status: "belum",
      poin: 100,
      icon: "📐",
      warna: "#4F46E5",
      deskripsi: "Menyelesaikan 10 soal akar persamaan kuadrat, rumus diskriminan, dan titik puncak kurva parabola Kelas 9B.",
      soalKey: "kuisMatematikaKelas9"
    },
    {
      id: "tugas-bindo-9b",
      judul: "Teks Laporan Percobaan & Pidato Persuasif",
      mapel: "Bahasa Indonesia",
      guru: "Ratna Sari, M.Pd",
      deadline: "2026-11-19T15:10:00",
      tenggatTeks: "Kamis (13.50 - 15.10)",
      status: "belum",
      poin: 90,
      icon: "📚",
      warna: "#EA580C",
      deskripsi: "Menelaah struktur teks laporan hasil observasi dan kaidah bahasa persuasif Kelas 9B.",
      soalKey: "kuisBindoKelas9"
    },
    {
      id: "tugas-arab-9b",
      judul: "Mufrodat As-Sa'ah (Jam & Waktu) & Tarjamah Kalimat",
      mapel: "Bahasa Arab",
      guru: "Ustadz Faisal, Lc, M.Ag",
      deadline: "2026-11-20T15:10:00",
      tenggatTeks: "Jumat (13.50 - 15.10)",
      status: "dinilai",
      nilai: 96,
      feedback: "Mumtaz! Pelafalan mufrodat jam dan kaidah 'adad ma'dud sangat tepat.",
      poin: 95,
      icon: "📜",
      warna: "#16A34A",
      deskripsi: "Penilaian harian mufrodat jam dalam bahasa Arab dan pola kalimat sehari-hari Kelas 9B.",
      soalKey: "kuisArabKelas9"
    },
    {
      id: "tugas-info-9b",
      judul: "Logika Algoritma & Pemrograman Blok Sederhana",
      mapel: "Informatika",
      guru: "Fajar Nugraha, S.Kom",
      deadline: "2026-11-20T11:35:00",
      tenggatTeks: "Jumat (10.15 - 11.35)",
      status: "selesai",
      nilai: 98,
      poin: 100,
      icon: "💻",
      warna: "#0284C7",
      deskripsi: "Praktik logika pemrograman algoritma percabangan dan perulangan di Lab Komputer Kelas 9B."
    }
  ],

  // Jadwal Mapel Mingguan Kelas 9B Sesuai Tabel Resmi
  jadwal: {
    Senin: [
      { id: "j-sen-1", jam: "11.00 - 11.35", mapel: "Al-Qur'an", ruang: "Ruang Kelas 9B", guru: "Ustadz H. Ahmad, Lc", icon: "📖", aktif: false },
      { id: "j-sen-2", jam: "11.35 - 12.30", mapel: "Istirahat & Sholat Dzuhur", ruang: "Masjid Sekolah", guru: "Pembiasaan Ibadah", icon: "🕌", aktif: false },
      { id: "j-sen-3", jam: "12.30 - 13.50", mapel: "IPA", ruang: "Laboratorium IPA / Kelas 9B", guru: "Dra. Siti Rahmah, M.Pd", icon: "🔬", aktif: true },
      { id: "j-sen-4", jam: "13.50 - 14.30", mapel: "P. Pancasila", ruang: "Ruang Kelas 9B", guru: "Drs. Hendro Wibowo", icon: "🇮🇩", aktif: false },
      { id: "j-sen-5", jam: "14.30 - 15.10", mapel: "B Sunda", ruang: "Ruang Kelas 9B", guru: "Dra. Yuyun Rohanah", icon: "🎭", aktif: false },
      { id: "j-sen-6", jam: "15.10 - 15.30", mapel: "Sholat Ashar & Persiapan Pulang", ruang: "Masjid Sekolah", guru: "Pembiasaan Ibadah", icon: "🕌", aktif: false }
    ],
    Selasa: [
      { id: "j-sel-1", jam: "11.00 - 11.35", mapel: "Al-Qur'an", ruang: "Ruang Kelas 9B", guru: "Ustadz H. Ahmad, Lc", icon: "📖", aktif: false },
      { id: "j-sel-2", jam: "11.35 - 12.30", mapel: "Istirahat & Sholat Dzuhur", ruang: "Masjid Sekolah", guru: "Pembiasaan Ibadah", icon: "🕌", aktif: false },
      { id: "j-sel-3", jam: "12.30 - 13.50", mapel: "PAIBP", ruang: "Ruang Kelas 9B", guru: "H. Abdul Somad, M.Pd.I", icon: "🕌", aktif: false },
      { id: "j-sel-4", jam: "13.50 - 14.30", mapel: "BK (Bimbingan Konseling)", ruang: "Ruang BK / Kelas 9B", guru: "Rina Kusuma, S.Psi", icon: "🤝", aktif: false },
      { id: "j-sel-5", jam: "14.30 - 15.10", mapel: "CIB", ruang: "Ruang Kelas 9B", guru: "Tim Pembina Karakter 9B", icon: "🌱", aktif: false },
      { id: "j-sel-6", jam: "15.10 - 15.30", mapel: "Sholat Ashar & Persiapan Pulang", ruang: "Masjid Sekolah", guru: "Pembiasaan Ibadah", icon: "🕌", aktif: false }
    ],
    Rabu: [
      { id: "j-rab-1", jam: "11.00 - 11.35", mapel: "Al-Qur'an", ruang: "Ruang Kelas 9B", guru: "Ustadz H. Ahmad, Lc", icon: "📖", aktif: false },
      { id: "j-rab-2", jam: "11.35 - 12.30", mapel: "Istirahat & Sholat Dzuhur", ruang: "Masjid Sekolah", guru: "Pembiasaan Ibadah", icon: "🕌", aktif: false },
      { id: "j-rab-3", jam: "12.30 - 13.50", mapel: "B Inggris", ruang: "Ruang Kelas 9B", guru: "Sarah Wijaya, M.Hum", icon: "🌏", aktif: false },
      { id: "j-rab-4", jam: "13.50 - 15.10", mapel: "IPS", ruang: "Ruang Kelas 9B", guru: "Drs. M. Ridwan", icon: "🌍", aktif: false },
      { id: "j-rab-5", jam: "15.10 - 15.30", mapel: "Sholat Ashar & Persiapan Pulang", ruang: "Masjid Sekolah", guru: "Pembiasaan Ibadah", icon: "🕌", aktif: false }
    ],
    Kamis: [
      { id: "j-kam-1", jam: "11.00 - 11.35", mapel: "Al-Qur'an", ruang: "Ruang Kelas 9B", guru: "Ustadz H. Ahmad, Lc", icon: "📖", aktif: false },
      { id: "j-kam-2", jam: "11.35 - 12.30", mapel: "Istirahat & Sholat Dzuhur", ruang: "Masjid Sekolah", guru: "Pembiasaan Ibadah", icon: "🕌", aktif: false },
      { id: "j-kam-3", jam: "12.30 - 13.50", mapel: "Matematika", ruang: "Ruang Kelas 9B", guru: "Budi Santoso, S.Pd", icon: "📐", aktif: false },
      { id: "j-kam-4", jam: "13.50 - 15.10", mapel: "B. Indonesia", ruang: "Ruang Kelas 9B", guru: "Ratna Sari, M.Pd", icon: "📚", aktif: false },
      { id: "j-kam-5", jam: "15.10 - 15.30", mapel: "Sholat Ashar & Persiapan Pulang", ruang: "Masjid Sekolah", guru: "Pembiasaan Ibadah", icon: "🕌", aktif: false }
    ],
    Jumat: [
      { id: "j-jum-1", jam: "07.00 - 07.20", mapel: "Pembiasaan Pagi / Apel", ruang: "Lapangan Upacara 9B", guru: "Wali Kelas 9B", icon: "🏫", aktif: false },
      { id: "j-jum-2", jam: "07.20 - 08.40", mapel: "PJOK", ruang: "Lapangan Olahraga", guru: "Bambang Pamungkas, S.Pd", icon: "🏃", aktif: false },
      { id: "j-jum-3", jam: "08.40 - 09.35", mapel: "Al-Qur'an", ruang: "Ruang Kelas 9B", guru: "Ustadz H. Ahmad, Lc", icon: "📖", aktif: false },
      { id: "j-jum-4", jam: "09.35 - 10.15", mapel: "Istirahat Pagi & Dhuha", ruang: "Kantin / Masjid Sekolah", guru: "Istirahat", icon: "🥪", aktif: false },
      { id: "j-jum-5", jam: "10.15 - 11.35", mapel: "Informatika", ruang: "Laboratorium Komputer", guru: "Fajar Nugraha, S.Kom", icon: "💻", aktif: false },
      { id: "j-jum-6", jam: "11.35 - 12.30", mapel: "Sholat Jumat Berjamaah", ruang: "Masjid Utama Sekolah", guru: "Dewan Kemakmuran Masjid", icon: "🕌", aktif: false },
      { id: "j-jum-7", jam: "12.30 - 13.50", mapel: "IPA", ruang: "Laboratorium IPA / Kelas 9B", guru: "Dra. Siti Rahmah, M.Pd", icon: "🔬", aktif: false },
      { id: "j-jum-8", jam: "13.50 - 15.10", mapel: "B Arab", ruang: "Ruang Kelas 9B", guru: "Ustadz Faisal, Lc, M.Ag", icon: "📜", aktif: false },
      { id: "j-jum-9", jam: "15.10 - 15.30", mapel: "Doa Penutup & Pulang", ruang: "Ruang Kelas 9B", guru: "Wali Kelas 9B", icon: "🏫", aktif: false }
    ]
  },

  // Notifikasi
  notifikasiList: [
    {
      id: "n0",
      tipe: "info",
      judul: "Lencana Prestasi Dibersihkan",
      pesan: "Daftar dan riwayat lencana prestasi telah berhasil dibersihkan (clear) sesuai instruksi.",
      waktu: "Baru saja",
      belumDibaca: true
    },
    {
      id: "n1",
      tipe: "info",
      judul: "Tugas & Jadwal Pelajaran Dikosongkan",
      pesan: "Daftar tugas dan jadwal pelajaran telah berhasil dibersihkan (clear) sesuai instruksi.",
      waktu: "Hari ini",
      belumDibaca: false
    },
    {
      id: "n2",
      tipe: "info",
      judul: "Selamat Datang di EduSmart SMP",
      pesan: "Siap memulai kegiatan belajar jenjang SMP dengan semangat baru!",
      waktu: "Hari ini",
      belumDibaca: false
    }
  ],

  // Lencana / Prestasi Siswa SMP (Dibersihkan sesuai permintaan pengguna)
  lencanaList: [],

  // 10 Soal Interaktif Matematika Kelas 9 SMP
  kuisMatematikaKelas9: [
    {
      no: 1,
      topik: "Perpangkatan & Eksponen",
      pertanyaan: "Hasil dari operasi hitung pemangkatan 2³ × 2⁴ ÷ 2² adalah ...",
      opsi: [
        { label: "A", teks: "16 (2⁴)" },
        { label: "B", teks: "32 (2⁵)" },
        { label: "C", teks: "64 (2⁶)" },
        { label: "D", teks: "128 (2⁷)" }
      ],
      kunci: "B",
      pembahasan: "Berdasarkan sifat perkalian dan pembagian eksponen bilangan berpangkat dengan basis yang sama: 2^(3 + 4 - 2) = 2⁵ = 32."
    },
    {
      no: 2,
      topik: "Bentuk Akar",
      pertanyaan: "Bentuk paling sederhana dari √72 + √50 - √18 adalah ...",
      opsi: [
        { label: "A", teks: "8√2" },
        { label: "B", teks: "6√2" },
        { label: "C", teks: "10√2" },
        { label: "D", teks: "4√2" }
      ],
      kunci: "A",
      pembahasan: "Sederhanakan masing-masing bentuk akar:\n• √72 = √(36 × 2) = 6√2\n• √50 = √(25 × 2) = 5√2\n• √18 = √(9 × 2) = 3√2\nMaka: 6√2 + 5√2 - 3√2 = (6 + 5 - 3)√2 = 8√2."
    },
    {
      no: 3,
      topik: "Persamaan Kuadrat",
      pertanyaan: "Akar-akar penyelesaian dari persamaan kuadrat x² - 5x + 6 = 0 adalah ...",
      opsi: [
        { label: "A", teks: "x = -2 atau x = -3" },
        { label: "B", teks: "x = 1 atau x = 6" },
        { label: "C", teks: "x = 2 atau x = 3" },
        { label: "D", teks: "x = -1 atau x = 6" }
      ],
      kunci: "C",
      pembahasan: "Faktorkan persamaan kuadrat x² - 5x + 6 = 0:\nCari dua bilangan yang jika dikalikan menghasilkan 6 dan jika dijumlahkan menghasilkan -5, yaitu -2 dan -3.\n(x - 2)(x - 3) = 0, sehingga x = 2 atau x = 3."
    },
    {
      no: 4,
      topik: "Diskriminan Persamaan Kuadrat",
      pertanyaan: "Nilai diskriminan (D = b² - 4ac) dari persamaan kuadrat 2x² - 4x + 1 = 0 adalah ...",
      opsi: [
        { label: "A", teks: "-8" },
        { label: "B", teks: "8" },
        { label: "C", teks: "16" },
        { label: "D", teks: "24" }
      ],
      kunci: "B",
      pembahasan: "Dari persamaan 2x² - 4x + 1 = 0, diketahui:\na = 2, b = -4, c = 1\nRumus diskriminan D = b² - 4ac\nD = (-4)² - 4(2)(1) = 16 - 8 = 8."
    },
    {
      no: 5,
      topik: "Fungsi Kuadrat",
      pertanyaan: "Persamaan sumbu simetri dari grafik fungsi kuadrat f(x) = x² - 6x + 8 adalah ...",
      opsi: [
        { label: "A", teks: "x = -3" },
        { label: "B", teks: "x = 6" },
        { label: "C", teks: "x = 4" },
        { label: "D", teks: "x = 3" }
      ],
      kunci: "D",
      pembahasan: "Diketahui fungsi kuadrat f(x) = x² - 6x + 8, dengan a = 1 dan b = -6.\nRumus persamaan sumbu simetri:\nx = -b / (2a) = -(-6) / (2 × 1) = 6 / 2 = 3."
    },
    {
      no: 6,
      topik: "Transformasi Geometri: Refleksi",
      pertanyaan: "Bayangan titik koordinat P(3, -5) jika dicerminkan terhadap sumbu-X adalah ...",
      opsi: [
        { label: "A", teks: "P'(3, 5)" },
        { label: "B", teks: "P'(-3, -5)" },
        { label: "C", teks: "P'(-3, 5)" },
        { label: "D", teks: "P'(5, -3)" }
      ],
      kunci: "A",
      pembahasan: "Pencerminan suatu titik (x, y) terhadap sumbu-X menghasilkan bayangan (x, -y).\nSehingga titik P(3, -5) menjadi P'(3, -(-5)) = P'(3, 5)."
    },
    {
      no: 7,
      topik: "Transformasi Geometri: Translasi",
      pertanyaan: "Titik A(-2, 4) ditranslasikan oleh komponen vektor T = (3, -2). Koordinat bayangan titik A adalah ...",
      opsi: [
        { label: "A", teks: "A'(-5, 6)" },
        { label: "B", teks: "A'(1, 2)" },
        { label: "C", teks: "A'(1, 6)" },
        { label: "D", teks: "A'(5, 2)" }
      ],
      kunci: "B",
      pembahasan: "Translasi titik (x, y) oleh T = (a, b) menghasilkan bayangan (x + a, y + b).\nA' = (-2 + 3, 4 + (-2)) = (1, 2)."
    },
    {
      no: 8,
      topik: "Kesebangunan Dua Segitiga",
      pertanyaan: "Sebuah pohon setinggi 6 meter memiliki panjang bayangan 4 meter di tanah. Pada waktu yang sama, sebuah tiang bendera menghasilkan bayangan sepanjang 10 meter. Berapakah tinggi tiang bendera tersebut?",
      opsi: [
        { label: "A", teks: "12 meter" },
        { label: "B", teks: "14 meter" },
        { label: "C", teks: "15 meter" },
        { label: "D", teks: "18 meter" }
      ],
      kunci: "C",
      pembahasan: "Gunakan konsep perbandingan sisi-sisi yang bersesuaian pada bangun yang sebangun:\n(Tinggi Tiang) / (Tinggi Pohon) = (Bayangan Tiang) / (Bayangan Pohon)\nt / 6 = 10 / 4\nt = (6 × 10) / 4 = 60 / 4 = 15 meter."
    },
    {
      no: 9,
      topik: "Bangun Ruang: Tabung",
      pertanyaan: "Sebuah tabung memiliki jari-jari alas r = 7 cm dan tinggi t = 10 cm. Volume tabung tersebut adalah ... (π = 22/7)",
      opsi: [
        { label: "A", teks: "1.540 cm³" },
        { label: "B", teks: "1.450 cm³" },
        { label: "C", teks: "440 cm³" },
        { label: "D", teks: "3.080 cm³" }
      ],
      kunci: "A",
      pembahasan: "Rumus volume tabung:\nV = π × r² × t\nV = (22/7) × 7² × 10\nV = (22/7) × 49 × 10 = 22 × 7 × 10 = 1.540 cm³."
    },
    {
      no: 10,
      topik: "Bangun Ruang: Kerucut",
      pertanyaan: "Sebuah kerucut memiliki panjang jari-jari alas r = 6 cm dan garis pelukis s = 10 cm. Luas selimut kerucut tersebut adalah ... (π = 3,14)",
      opsi: [
        { label: "A", teks: "120 cm²" },
        { label: "B", teks: "188,4 cm²" },
        { label: "C", teks: "314 cm²" },
        { label: "D", teks: "376,8 cm²" }
      ],
      kunci: "B",
      pembahasan: "Rumus luas selimut kerucut:\nL = π × r × s\nL = 3,14 × 6 × 10 = 3,14 × 60 = 188,4 cm²."
    }
  ],

  // 5 Soal Interaktif IPA Kelas 9 SMP (Sistem Peredaran Darah & Uji Zat Makanan)
  kuisIpaKelas9: [
    {
      no: 1,
      topik: "Sistem Peredaran Darah",
      pertanyaan: "Organ tubuh manusia yang berfungsi sebagai pemompa darah utama ke seluruh tubuh pada sistem sirkulasi adalah ...",
      opsi: [
        { label: "A", teks: "Paru-paru" },
        { label: "B", teks: "Jantung" },
        { label: "C", teks: "Hati" },
        { label: "D", teks: "Ginjal" }
      ],
      kunci: "B",
      pembahasan: "Jantung merupakan organ berotot tebal (miokardium) yang berfungsi memompa darah secara terus-menerus melalui kontraksi dan relaksasi ke seluruh bagian tubuh."
    },
    {
      no: 2,
      topik: "Komponen Darah",
      pertanyaan: "Sel darah yang mengandung hemoglobin dan memiliki peran utama mengikat serta mengedarkan gas oksigen (O₂) adalah ...",
      opsi: [
        { label: "A", teks: "Eritrosit (Sel darah merah)" },
        { label: "B", teks: "Leukosit (Sel darah putih)" },
        { label: "C", teks: "Trombosit (Keping darah)" },
        { label: "D", teks: "Plasma darah" }
      ],
      kunci: "A",
      pembahasan: "Eritrosit (sel darah merah) mengandung protein hemoglobin yang berfungsi mengikat oksigen dari paru-paru untuk diedarkan ke seluruh sel-sel tubuh."
    },
    {
      no: 3,
      topik: "Uji Bahan Makanan",
      pertanyaan: "Pada kegiatan praktikum uji zat makanan, larutan reagen yang digunakan untuk menguji keberadaan amilum (karbohidrat) adalah ...",
      opsi: [
        { label: "A", teks: "Biuret" },
        { label: "B", teks: "Benedict" },
        { label: "C", teks: "Lugol / Iodin" },
        { label: "D", teks: "Kertas buram" }
      ],
      kunci: "C",
      pembahasan: "Reagen Lugol (iodin) digunakan untuk menguji amilum; warna bahan makanan akan berubah menjadi biru kehitaman jika positif mengandung amilum."
    },
    {
      no: 4,
      topik: "Pembuluh Darah",
      pertanyaan: "Pembuluh darah utama berotot tebal dan elastis yang membawa darah kaya oksigen keluar dari bilik kiri jantung adalah ...",
      opsi: [
        { label: "A", teks: "Vena kava" },
        { label: "B", teks: "Aorta (Arteri besar)" },
        { label: "C", teks: "Vena pulmonalis" },
        { label: "D", teks: "Kapiler darah" }
      ],
      kunci: "B",
      pembahasan: "Aorta adalah pembuluh arteri terbesar yang mengalirkan darah bertekanan tinggi kaya oksigen dari bilik kiri (ventrikel kiri) jantung menuju ke seluruh sistem organ tubuh."
    },
    {
      no: 5,
      topik: "Pembekuan Darah",
      pertanyaan: "Komponen seluler darah yang berperan aktif melepaskan enzim trombokinase saat terjadi luka untuk pembekuan darah adalah ...",
      opsi: [
        { label: "A", teks: "Trombosit (Keping darah)" },
        { label: "B", teks: "Eritrosit" },
        { label: "C", teks: "Neutrofil" },
        { label: "D", teks: "Limfosit" }
      ],
      kunci: "A",
      pembahasan: "Ketika terjadi luka, trombosit (keping darah) akan pecah dan mengeluarkan enzim trombokinase yang bersama ion kalsium dan vitamin K mengubah protrombin menjadi trombin."
    }
  ],

  // 5 Soal Interaktif Bahasa Inggris Kelas 9 SMP (Procedure Text & Imperatives)
  kuisBingKelas9: [
    {
      no: 1,
      topik: "Procedure Text: Social Function",
      pertanyaan: "What is the primary social purpose / function of a procedure text?",
      opsi: [
        { label: "A", teks: "To entertain readers with funny imaginary stories" },
        { label: "B", teks: "To describe how something is made or done through steps" },
        { label: "C", teks: "To persuade readers to buy a commercial product" },
        { label: "D", teks: "To retell a series of past biographical events" }
      ],
      kunci: "B",
      pembahasan: "The communicative purpose of a procedure text (like recipes and user manuals) is to describe how something is made, operated, or done through a sequence of steps or actions."
    },
    {
      no: 2,
      topik: "Language Features: Imperative Sentences",
      pertanyaan: "Which of the following sentences is an example of an imperative sentence (command) commonly found in a recipe?",
      opsi: [
        { label: "A", teks: "She is stirring the soup slowly in the kitchen." },
        { label: "B", teks: "Stir the mixture gently over medium heat." },
        { label: "C", teks: "The cake will taste delicious tomorrow." },
        { label: "D", teks: "I love baking chocolate cookies on Sundays." }
      ],
      kunci: "B",
      pembahasan: "Imperative sentences begin with a base action verb (infinitive without 'to') like 'Stir', 'Cut', 'Pour', or 'Heat' to give instructions to the reader."
    },
    {
      no: 3,
      topik: "Connectives: Sequence Markers",
      pertanyaan: "'First, boil the water. Next, add the tea bag. Finally, pour in the honey.' The words 'First', 'Next', and 'Finally' are called ...",
      opsi: [
        { label: "A", teks: "Temporal conjunctions (sequence connectors)" },
        { label: "B", teks: "Descriptive adjectives" },
        { label: "C", teks: "Proper nouns" },
        { label: "D", teks: "Passive helping verbs" }
      ],
      kunci: "A",
      pembahasan: "Words such as 'First', 'Then', 'Next', 'After that', and 'Finally' are temporal conjunctions used to show the chronological order of steps in a procedure text."
    },
    {
      no: 4,
      topik: "Generic Structure",
      pertanyaan: "What are the three essential generic structures of a recipe procedure text?",
      opsi: [
        { label: "A", teks: "Goal (Aim), Materials (Ingredients), and Steps (Methods)" },
        { label: "B", teks: "Orientation, Complication, and Resolution" },
        { label: "C", teks: "Thesis, Arguments, and Reiteration" },
        { label: "D", teks: "Identification and Description" }
      ],
      kunci: "A",
      pembahasan: "A standard recipe procedure text consists of 3 main parts: (1) Goal/Title (what will be made), (2) Materials/Ingredients (tools and items needed), and (3) Steps/Methods (directions to follow)."
    },
    {
      no: 5,
      topik: "Adverbs of Manner",
      pertanyaan: "In the instruction 'Whisk the egg yolks vigorously until fluffy', which word functions as an adverb of manner?",
      opsi: [
        { label: "A", teks: "Whisk" },
        { label: "B", teks: "Yolks" },
        { label: "C", teks: "Vigorously" },
        { label: "D", teks: "Fluffy" }
      ],
      kunci: "C",
      pembahasan: "'Vigorously' is an adverb of manner (ending in -ly) that describes how the action of whisking should be performed (with energy and force)."
    }
  ],

  // 5 Soal Interaktif IPS Kelas 9 SMP
  kuisIpsKelas9: [
    {
      no: 1,
      topik: "Letak & Karakteristik Benua Asia",
      pertanyaan: "Benua terluas di permukaan bumi yang berbatasan langsung dengan Samudra Arktik di sebelah utara dan Samudra Hindia di sebelah selatan adalah ...",
      opsi: [
        { label: "A", teks: "Benua Afrika" },
        { label: "B", teks: "Benua Asia" },
        { label: "C", teks: "Benua Amerika" },
        { label: "D", teks: "Benua Eropa" }
      ],
      kunci: "B",
      pembahasan: "Benua Asia merupakan benua terbesar di dunia dengan luas sekitar 44 juta km², dihuni lebih dari 60% populasi dunia, dan memiliki bentang alam terlengkap."
    },
    {
      no: 2,
      topik: "Globalisasi & Perubahan Sosial Budaya",
      pertanyaan: "Salah satu dampak positif globalisasi dalam bidang ekonomi bagi pelaku usaha mikro dan kecil di Indonesia adalah ...",
      opsi: [
        { label: "A", teks: "Munculnya sikap konsumerisme berlebihan" },
        { label: "B", teks: "Peluang memperluas jangkauan pasar hingga ke mancanegara melalui e-commerce" },
        { label: "C", teks: "Tergusurnya produk lokal oleh merek luar negeri" },
        { label: "D", teks: "Ketergantungan terhadap barang impor" }
      ],
      kunci: "B",
      pembahasan: "Kemudahan teknologi dan transaksi digital dalam era globalisasi membuka akses pasar ekspor global bagi produk UMKM lokal secara langsung."
    },
    {
      no: 3,
      topik: "Perdagangan Internasional",
      pertanyaan: "Kegiatan menjual barang atau komoditas hasil produksi dalam negeri ke luar negeri disebut kegiatan ...",
      opsi: [
        { label: "A", teks: "Impor" },
        { label: "B", teks: "Ekspor" },
        { label: "C", teks: "Barter" },
        { label: "D", teks: "Transit" }
      ],
      kunci: "B",
      pembahasan: "Ekspor adalah kegiatan memperdagangkan barang/jasa dari dalam negeri ke luar negeri, mendatangkan devisa bagi negara."
    },
    {
      no: 4,
      topik: "Sejarah Menjelang Proklamasi",
      pertanyaan: "Peristiwa penculikan Ir. Soekarno dan Drs. Moh. Hatta oleh para pemuda pejuang ke sebuah wilayah di Karawang untuk mendesak percepatan proklamasi dikenal dengan peristiwa ...",
      opsi: [
        { label: "A", teks: "Bandung Lautan Api" },
        { label: "B", teks: "Peristiwa Rengasdengklok" },
        { label: "C", teks: "Pertempuran Ambarawa" },
        { label: "D", teks: "Serangan Umum 1 Maret" }
      ],
      kunci: "B",
      pembahasan: "Peristiwa Rengasdengklok terjadi pada 16 Agustus 1945, di mana pemuda mendesak Soekarno-Hatta agar memproklamasikan kemerdekaan lepas dari pengaruh Jepang."
    },
    {
      no: 5,
      topik: "Kerja Sama Ekonomi Kawasan",
      pertanyaan: "Integrasi ekonomi antarnegara di Asia Tenggara dalam menciptakan sistem perdagangan bebas dan arus barang tanpa hambatan tarif disebut ...",
      opsi: [
        { label: "A", teks: "MEA (Masyarakat Ekonomi ASEAN)" },
        { label: "B", teks: "APEC" },
        { label: "C", teks: "OPEC" },
        { label: "D", teks: "NAFTA" }
      ],
      kunci: "A",
      pembahasan: "MEA (Masyarakat Ekonomi ASEAN) dibentuk untuk memperkuat integrasi ekonomi regional antarnegara anggota ASEAN."
    }
  ],

  // 5 Soal Interaktif PAI Kelas 9 SMP
  kuisPaiKelas9: [
    {
      no: 1,
      topik: "Akidah: Iman Kepada Hari Akhir",
      pertanyaan: "Meyakini dengan sepenuh hati bahwa seluruh alam semesta beserta isinya akan hancur dan manusia akan dibangkitkan untuk mempertanggungjawabkan perbuatannya merupakan rukun iman ke-...",
      opsi: [
        { label: "A", teks: "Tiga" },
        { label: "B", teks: "Empat" },
        { label: "C", teks: "Lima" },
        { label: "D", teks: "Enam" }
      ],
      kunci: "C",
      pembahasan: "Iman kepada Hari Akhir (Kiamat) adalah rukun iman yang ke-5 dari 6 rukun iman dalam ajaran Islam."
    },
    {
      no: 2,
      topik: "Akhlak: Tawakal & Ikhtiar",
      pertanyaan: "Sikap berserah diri sepenuhnya kepada ketetapan Allah SWT setelah berusaha secara sungguh-sungguh dan maksimal disebut ...",
      opsi: [
        { label: "A", teks: "Tawakal" },
        { label: "B", teks: "Qana'ah" },
        { label: "C", teks: "Riya'" },
        { label: "D", teks: "Takabur" }
      ],
      kunci: "A",
      pembahasan: "Tawakal bermakna menyandarkan hasil ikhtiar (usaha maksimal) kepada kekuasaan dan takdir terbaik dari Allah SWT."
    },
    {
      no: 3,
      topik: "Fikih: Zakat Mal & Zakat Fitrah",
      pertanyaan: "Zakat yang wajib dikeluarkan oleh setiap jiwa muslim menjelang hari raya Idulfitri berupa makanan pokok (beras) disebut zakat ...",
      opsi: [
        { label: "A", teks: "Zakat Mal" },
        { label: "B", teks: "Zakat Fitrah" },
        { label: "C", teks: "Zakat Perniagaan" },
        { label: "D", teks: "Zakat Pertanian" }
      ],
      kunci: "B",
      pembahasan: "Zakat fitrah wajib dibayarkan berupa bahan pangan pokok seberat 2,5 kg atau 3,5 liter beras per jiwa sebelum salat Idulfitri."
    },
    {
      no: 4,
      topik: "Sejarah Kebudayaan Islam (SKI)",
      pertanyaan: "Penyebaran agama Islam di Pulau Jawa berlangsung damai melalui pendekatan akulturasi budaya, kesenian wayang, dan tembang oleh tokoh-tokoh yang dikenal sebagai ...",
      opsi: [
        { label: "A", teks: "Kaum Paderi" },
        { label: "B", teks: "Walisongo" },
        { label: "C", teks: "Bani Umayyah" },
        { label: "D", teks: "Bani Abbasiyah" }
      ],
      kunci: "B",
      pembahasan: "Walisongo (Wali Sembilan) menyebarkan agama Islam di Nusantara dengan hikmah, kebijaksanaan, dan akulturasi nilai budaya lokal yang luhur."
    },
    {
      no: 5,
      topik: "Akhlak Terpuji: Amanah",
      pertanyaan: "Menjalankan tugas piket kelas, menjaga rahasia teman, dan mengembalikan barang titipan tepat waktu merupakan contoh cerminan sikap ...",
      opsi: [
        { label: "A", teks: "Amanah" },
        { label: "B", teks: "Hasad" },
        { label: "C", teks: "Su'udzon" },
        { label: "D", teks: "Ghibah" }
      ],
      kunci: "A",
      pembahasan: "Amanah berarti dapat dipercaya dalam mengemban tanggung jawab dan menunaikan kewajiban dengan penuh dedikasi."
    }
  ],

  // 5 Soal Interaktif Seni Budaya Kelas 9 SMP
  kuisSeniBudayaKelas9: [
    {
      no: 1,
      topik: "Seni Rupa: Aliran Seni Lukis",
      pertanyaan: "Aliran seni lukis yang memandang dunia apa adanya tanpa menambah atau mengurangi kenyataan visual secara objektif disebut ...",
      opsi: [
        { label: "A", teks: "Surealisme" },
        { label: "B", teks: "Realisme" },
        { label: "C", teks: "Kubisme" },
        { label: "D", teks: "Abstrak" }
      ],
      kunci: "B",
      pembahasan: "Realisme adalah gaya seni rupa yang menampilkan objek sesuai dengan kenyataan hidup sehari-hari tanpa dramatisasi."
    },
    {
      no: 2,
      topik: "Seni Patung",
      pertanyaan: "Berdasarkan fungsinya, patung yang dibangun untuk mengenang jasa pahlawan atau peristiwa bersejarah perjuangan bangsa disebut ...",
      opsi: [
        { label: "A", teks: "Patung Religi" },
        { label: "B", teks: "Patung Monumen" },
        { label: "C", teks: "Patung Dekorasi" },
        { label: "D", teks: "Patung Kerajinan" }
      ],
      kunci: "B",
      pembahasan: "Patung monumen difungsikan sebagai tanda peringatan untuk mengenang peristiwa bersejarah atau jasa tokoh bangsa."
    },
    {
      no: 3,
      topik: "Seni Musik: Teori Nada",
      pertanyaan: "Susunan interval jarak nada pada tangga nada diatonis mayor yang baku adalah ...",
      opsi: [
        { label: "A", teks: "1 - 1 - 1/2 - 1 - 1 - 1 - 1/2" },
        { label: "B", teks: "1 - 1/2 - 1 - 1 - 1/2 - 1 - 1" },
        { label: "C", teks: "1 - 1 - 1 - 1/2 - 1 - 1 - 1/2" },
        { label: "D", teks: "1/2 - 1 - 1 - 1/2 - 1 - 1 - 1" }
      ],
      kunci: "A",
      pembahasan: "Tangga nada diatonis mayor berjarak nada: 1 - 1 - 1/2 - 1 - 1 - 1 - 1/2 (contoh: C - D - E - F - G - A - B - C')."
    },
    {
      no: 4,
      topik: "Seni Tari: Pola Lantai",
      pertanyaan: "Formasi penari yang berbaris menyudut ke arah kanan atau kiri panggung membentuk sudut miring disebut pola lantai ...",
      opsi: [
        { label: "A", teks: "Horizontal" },
        { label: "B", teks: "Vertikal" },
        { label: "C", teks: "Diagonal" },
        { label: "D", teks: "Melingkar" }
      ],
      kunci: "C",
      pembahasan: "Pola lantai diagonal membentuk garis miring melintang di atas pentas tari untuk memberikan kesan dinamis dan kokoh."
    },
    {
      no: 5,
      topik: "Seni Teater",
      pertanyaan: "Orang yang bertanggung jawab memimpin seluruh proses penggarapan pementasan teater, mengarahkan pemeran, dan menyatukan visi artistik adalah ...",
      opsi: [
        { label: "A", teks: "Sutradara" },
        { label: "B", teks: "Produser" },
        { label: "C", teks: "Promotor" },
        { label: "D", teks: "Dramaturg" }
      ],
      kunci: "A",
      pembahasan: "Sutradara merupakan pimpinan artistik utama yang mengatur akting pemeran, tata panggung, dan jalan cerita dalam pementasan drama/teater."
    }
  ],

  // 5 Soal Interaktif Bahasa Arab Kelas 9 SMP
  kuisArabKelas9: [
    {
      no: 1,
      topik: "At-Tahiyyat (Ungkapan Sapaan)",
      pertanyaan: "Jawaban yang tepat untuk kalimat sapaan 'صَبَاحَ الخَيْرِ' (Shabaahal khoir) adalah ...",
      opsi: [
        { label: "A", teks: "مَسَاءَ الخَيْرِ (Masaa-al khoir)" },
        { label: "B", teks: "صَبَاحَ النُّوْرِ (Shabaahan nuur)" },
        { label: "C", teks: "أَهْلًا وَسَهْلًا (Ahlan wa sahlan)" },
        { label: "D", teks: "مَعَ السَّلَامَةِ (Ma'as salaamah)" }
      ],
      kunci: "B",
      pembahasan: "Ungkapan 'Shabaahal khoir' (Selamat pagi) secara sopan dibalas dengan 'Shabaahan nuur' (Selamat pagi juga / pagi yang penuh cahaya)."
    },
    {
      no: 2,
      topik: "Mufradat fil Madrosah",
      pertanyaan: "Arti dari kosakata bahasa Arab 'مَدْرَسَةٌ' (Madrasatun) dan 'فَصْلٌ' (Fashlun) berturut-turut adalah ...",
      opsi: [
        { label: "A", teks: "Rumah dan Kamar" },
        { label: "B", teks: "Sekolah dan Ruang Kelas" },
        { label: "C", teks: "Masjid dan Perpustakaan" },
        { label: "D", teks: "Kantor dan Lapangan" }
      ],
      kunci: "B",
      pembahasan: "Dalam mufradat sekolah: 'Madrasatun' artinya sekolah, sedangkan 'Fashlun' artinya ruang kelas."
    },
    {
      no: 3,
      topik: "Qawa'id: Fi'il Madhi",
      pertanyaan: "Fi'il Madhi yang bermakna 'Dia (seorang laki-laki) telah menulis' adalah ...",
      opsi: [
        { label: "A", teks: "قَرَأَ (Qara-a)" },
        { label: "B", teks: "كَتَبَ (Kataba)" },
        { label: "C", teks: "جَلَسَ (Jalasa)" },
        { label: "D", teks: "ذَهَبَ (Dzahaba)" }
      ],
      kunci: "B",
      pembahasan: "Kata kerja 'كَتَبَ' (Kataba) merupakan bentuk Fi'il Madhi lampau untuk dhomir Huwa yang artinya 'telah menulis'."
    },
    {
      no: 4,
      topik: "Al-A'dad (Bilangan Angka)",
      pertanyaan: "Bilangan angka Arab untuk menyebut angka 'Sembilan' adalah ...",
      opsi: [
        { label: "A", teks: "خَمْسَةٌ (Khamsah)" },
        { label: "B", teks: "سَبْعَةٌ (Sab'ah)" },
        { label: "C", teks: "تِسْعَةٌ (Tis'ah)" },
        { label: "D", teks: "عَشَرَةٌ ('Asyarah)" }
      ],
      kunci: "C",
      pembahasan: "Angka dalam bahasa Arab: 5 (khamsah), 7 (sab'ah), 9 (tis'ah), dan 10 ('asyarah)."
    },
    {
      no: 5,
      topik: "Tarjamah Kalimat Sederhana",
      pertanyaan: "Terjemahan bahasa Indonesia dari kalimat 'أَنَا أَتَعَلَّمُ فِي الفَصْلِ' (Ana ata'allamu fil fashli) adalah ...",
      opsi: [
        { label: "A", teks: "Saya sedang membaca buku" },
        { label: "B", teks: "Saya belajar di dalam ruang kelas" },
        { label: "C", teks: "Kami bermain di lapangan sekolah" },
        { label: "D", teks: "Guru menerangkan materi di depan" }
      ],
      kunci: "B",
      pembahasan: "'Ana' (Saya), 'ata'allamu' (sedang belajar), 'fii' (di dalam), 'al-fashli' (ruang kelas)."
    }
  ],

  // 5 Soal Interaktif Bahasa Indonesia Kelas 9 SMP
  kuisBindoKelas9: [
    {
      no: 1,
      topik: "Teks Laporan Percobaan",
      pertanyaan: "Urutan struktur teks laporan percobaan yang sistematis dan benar adalah ...",
      opsi: [
        { label: "A", teks: "Tujuan, Alat & Bahan, Langkah Kerja, Hasil Percobaan, Kesimpulan" },
        { label: "B", teks: "Langkah Kerja, Tujuan, Alat & Bahan, Kesimpulan, Hasil" },
        { label: "C", teks: "Orientasi, Komplikasi, Resolusi, Koda" },
        { label: "D", teks: "Tesis, Rangkaian Argumen, Penegasan Ulang" }
      ],
      kunci: "A",
      pembahasan: "Teks laporan percobaan disusun secara ilmiah mulai dari Tujuan, Alat & Bahan, Prosedur Kerja, Hasil Pengamatan, hingga Kesimpulan akhir."
    },
    {
      no: 2,
      topik: "Pidato Persuasif",
      pertanyaan: "'Marilah kita bersama-sama menjaga kebersihan lingkungan sekolah demi terciptanya suasana belajar yang sehat dan nyaman.' Kalimat tersebut termasuk contoh kalimat ...",
      opsi: [
        { label: "A", teks: "Kalimat deskriptif" },
        { label: "B", teks: "Kalimat persuasif (ajakan)" },
        { label: "C", teks: "Kalimat interogatif" },
        { label: "D", teks: "Kalimat naratif" }
      ],
      kunci: "B",
      pembahasan: "Kalimat persuasif ditandai dengan kata ajakan seperti 'marilah', 'ayo', atau 'hendaknya' untuk membujuk pendengar berbuat kebaikan."
    },
    {
      no: 3,
      topik: "Unsur Intrinsik Cerpen",
      pertanyaan: "Bagian alur cerpen tempat bertemunya berbagai masalah menuju puncak ketegangan cerita disebut ...",
      opsi: [
        { label: "A", teks: "Orientasi" },
        { label: "B", teks: "Klimaks" },
        { label: "C", teks: "Antiklimaks" },
        { label: "D", teks: "Resolusi" }
      ],
      kunci: "B",
      pembahasan: "Klimaks merupakan puncak konflik dalam alur cerita fiksi di mana emosi dan ketegangan cerita mencapai titik tertinggi."
    },
    {
      no: 4,
      topik: "Teks Tanggapan Kritis",
      pertanyaan: "Kalimat tanggapan yang santun dan objektif untuk mengkritik sebuah karya tulis adalah ...",
      opsi: [
        { label: "A", teks: "Buku ini sangat jelek dan sama sekali tidak layak dibaca oleh siapapun." },
        { label: "B", teks: "Buku ini memiliki ide yang menarik, namun alur di bagian tengah perlu diperjelas agar pembaca lebih mudah memahaminya." },
        { label: "C", teks: "Penulis buku ini sepertinya tidak mengerti tata bahasa Indonesia yang benar." },
        { label: "D", teks: "Saya tidak suka dengan pilihan tema buku ini karena membosankan." }
      ],
      kunci: "B",
      pembahasan: "Kritik yang santun dan objektif mengapresiasi kelebihan karya sekaligus memberikan masukan perbaikan yang konstruktif dengan bahasa sopan."
    },
    {
      no: 5,
      topik: "Gaya Bahasa / Majas",
      pertanyaan: "'Angin malam berbisik lembut menyapa lamunanku di balik jendela kamar.' Kutipan cerpen tersebut menggunakan majas ...",
      opsi: [
        { label: "A", teks: "Personifikasi" },
        { label: "B", teks: "Metafora" },
        { label: "C", teks: "Hiperbola" },
        { label: "D", teks: "Litotes" }
      ],
      kunci: "A",
      pembahasan: "Majas personifikasi melekatkan sifat atau perilaku insani (manusia), seperti 'berbisik' dan 'menyapa', kepada benda mati/alam (angin)."
    }
  ],

  // 5 Soal Interaktif Bahasa Sunda Kelas 9 SMP
  kuisSundaKelas9: [
    {
      no: 1,
      topik: "Biantara (Pidato Basa Sunda)",
      pertanyaan: "Dina struktur naskah biantara, ungkapan 'Langkung ti payun, hayu urang sanggakeun puji sinareng sukur ka hadirat Gusti Nu Maha Suci...' perenahna aya dina bagian ...",
      opsi: [
        { label: "A", teks: "Panutup biantara" },
        { label: "B", teks: "Bubuka biantara (mukadimah)" },
        { label: "C", teks: "Eusi biantara" },
        { label: "D", teks: "Du'a panutup" }
      ],
      kunci: "B",
      pembahasan: "Bagian bubuka biantara ngawengku salam bubuka, mukadimah muji sukur ka Gusti Allah, solawat ka Kangjeng Nabi, sarta ngahaturkeun nuhun ka para hadirin."
    },
    {
      no: 2,
      topik: "Budaya Sunda: Kampung Adat",
      pertanyaan: "Salah sahiji kampung adat di Tatar Sunda anu perenahna di wewengkon Tasikmalaya anu kukuh kana tali paranti karuhun nyaéta ...",
      opsi: [
        { label: "A", teks: "Kampung Baduy" },
        { label: "B", teks: "Kampung Naga" },
        { label: "C", teks: "Kampung Kuta" },
        { label: "D", teks: "Kampung Ciptagelar" }
      ],
      kunci: "B",
      pembahasan: "Kampung Naga mangrupa kampung adat Sunda di Kacamatan Salawu, Kabupatén Tasikmalaya anu pangeusina pengkuh ngajaga tradisi karuhun."
    },
    {
      no: 3,
      topik: "Pakeman Basa: Paribasa Sunda",
      pertanyaan: "Paribasa Sunda 'Cikaracak ninggang batu, laun-laun jadi legok' ngandung harti ...",
      opsi: [
        { label: "A", teks: "Nu bodo lamun terus diatik diajar kalawan getol lila-lila bakal bisa" },
        { label: "B", teks: "Kahayang loba tapi teu boga daya upaya" },
        { label: "C", teks: "Ngalakonan pagawéan anu taya mangpaatna" },
        { label: "D", teks: "Kacilakaan anu datangna teu disangka-sangka" }
      ],
      kunci: "A",
      pembahasan: "Paribasa ieu ngagambarkeun pentingna kasabaran jeung kateguhan dina diajar atawa ikhtiar; najan hésé, lamun tuluy diajar tangtu baris kahontal."
    },
    {
      no: 4,
      topik: "Tatakrama Basa Sunda (Lemes)",
      pertanyaan: "Kecap lemes pikeun kecap 'dahar' anu merenah dilarapkeun keur diri sorangan nyaéta ..., sedengkeun keur batur nyaéta ...",
      opsi: [
        { label: "A", teks: "Tuang / Neda" },
        { label: "B", teks: "Neda / Tuang" },
        { label: "C", teks: "Lolodok / Nyatu" },
        { label: "D", teks: "Emam / Dahar" }
      ],
      kunci: "B",
      pembahasan: "Dina tatakrama basa Sunda, 'neda' dipaké lemes keur diri sorangan, sedengkeun 'tuang' dipaké lemes keur ngahormat batur."
    },
    {
      no: 5,
      topik: "Karya Sastra: Carita Pondok (Carpon)",
      pertanyaan: "Karya fiksi dina wangun prosa basa Sunda anu caritana rélatif pondok sarta museur kana hiji kajadian utama disebut ...",
      opsi: [
        { label: "A", teks: "Novél" },
        { label: "B", teks: "Carita Pondok (Carpon)" },
        { label: "C", teks: "Wawacan" },
        { label: "D", teks: "Sajak" }
      ],
      kunci: "B",
      pembahasan: "Carpon (carita pondok) nyaéta karangan prosa fiksi anu rélatif singget, biasana réngsé dibaca sakali diuk, kalawan palaku jeung konflik anu padet."
    }
  ],

  // ==========================================================================
  // MODUL PEMBELAJARAN MATEMATIKA KELAS 9 SMP (KURIKULUM MERDEKA)
  // Berisi 6 Bab Lengkap: Konsep Inti, Rumus Kunci, Contoh Soal Kontekstual,
  // dan Cek Pemahaman Interaktif.
  // ==========================================================================
  modulMatematikaKelas9: [
    {
      id: "mat-bab-1",
      no: 1,
      judul: "Perpangkatan & Bentuk Akar",
      mapel: "Matematika",
      kelas: "Kelas IX SMP",
      kurikulum: "Kurikulum Merdeka / Fase D",
      waktuBaca: "15 Menit Baca",
      totalHalaman: 3,
      capaian: [
        "Memahami sifat-sifat perkalian, pembagian, dan pemangkatan pada bilangan berpangkat bulat positif, nol, dan negatif.",
        "Menyederhanakan dan mengoperasikan aljabar bentuk akar serta merasionalkan penyebut pecahan berakar.",
        "Menuliskan bilangan yang sangat besar atau sangat kecil ke dalam format Notasi Ilmiah (Bentuk Baku)."
      ],
      petaKonsep: "Bilangan Berpangkat ➔ Sifat Eksponen ➔ Bentuk Akar & Merasionalkan ➔ Notasi Ilmiah / Bentuk Baku",
      materiHtml: `
        <div class="module-section-card">
          <div class="module-badge-topic">Bagian 1: Bilangan Berpangkat (Eksponen)</div>
          <p class="module-lead-text">
            Bilangan berpangkat adalah perkalian berulang dari suatu bilangan pokok (basis) yang sama sebanyak <em>n</em> faktor:
          </p>
          <div class="formula-box">
            <div class="formula-title">Definisi Eksponen:</div>
            <div class="formula-item">aⁿ = a × a × a × ... × a  (sebanyak n faktor)</div>
          </div>

          <div class="formula-box">
            <div class="formula-title">Sifat-Sifat Operasi Hitung Eksponen:</div>
            <div class="formula-item">• Perkalian Basis Sama: aᵐ × aⁿ = aᵐ⁺ⁿ</div>
            <div class="formula-item">• Pembagian Basis Sama: aᵐ ÷ aⁿ = aᵐ⁻ⁿ</div>
            <div class="formula-item">• Pemangkatan Pangkat: (aᵐ)ⁿ = aᵐˣⁿ</div>
            <div class="formula-item">• Pangkat dari Perkalian: (a × b)ⁿ = aⁿ × bⁿ</div>
            <div class="formula-item">• Pangkat Nol: a⁰ = 1  (untuk a ≠ 0)</div>
            <div class="formula-item">• Pangkat Negatif: a⁻ⁿ = 1 / aⁿ</div>
            <div class="formula-item">• Pangkat Pecahan: a^(m/n) = ⁿ√(aᵐ)</div>
          </div>

          <div class="tips-box">
            <strong>💡 Jembatan Keledai Eksponen:</strong><br>
            • Jika basisnya <strong>DIKALI</strong>, maka pangkatnya <strong>DITAMBAH</strong>.<br>
            • Jika basisnya <strong>DIBAGI</strong>, maka pangkatnya <strong>DIKURANG</strong>.<br>
            • Jika bilangan berpangkat <strong>DIPANGKATKAN</strong> lagi, maka pangkatnya <strong>DIKALI</strong>.
          </div>
        </div>

        <div class="module-section-card">
          <div class="module-badge-topic">Bagian 2: Operasi Bentuk Akar</div>
          <p class="module-lead-text">
            Bentuk akar adalah akar dari bilangan rasional yang hasilnya merupakan bilangan irasional (misalnya √2, √3, √5).
          </p>

          <div class="formula-box">
            <div class="formula-title">Sifat-Sifat Aljabar Bentuk Akar:</div>
            <div class="formula-item">• Perkalian Akar: √(a × b) = √a × √b  (a, b ≥ 0)</div>
            <div class="formula-item">• Pembagian Akar: √(a / b) = √a / √b  (b > 0)</div>
            <div class="formula-item">• Penjumlahan Sejenis: p√a + q√a = (p + q)√a</div>
            <div class="formula-item">• Pengurangan Sejenis: p√a - q√a = (p - q)√a</div>
          </div>

          <div class="formula-box">
            <div class="formula-title">Merasionalkan Penyebut Pecahan:</div>
            <div class="formula-item">• Bentuk Tunggal: c / √a = (c × √a) / a</div>
            <div class="formula-item">• Bentuk Sekawan (+): c / (√a + √b) = c(√a - √b) / (a - b)</div>
            <div class="formula-item">• Bentuk Sekawan (-): c / (√a - √b) = c(√a + √b) / (a - b)</div>
          </div>
        </div>

        <div class="module-section-card">
          <div class="module-badge-topic">Bagian 3: Notasi Ilmiah (Bentuk Baku)</div>
          <p class="module-lead-text">
            Notasi ilmiah digunakan untuk mempermudah penulisan bilangan yang bernilai sangat besar (seperti massa planet) atau sangat kecil (seperti ukuran virus/bakteri).
          </p>
          <div class="formula-box">
            <div class="formula-title">Format Notasi Ilmiah:</div>
            <div class="formula-item">a × 10ⁿ   dengan syarat: 1 ≤ a &lt; 10 dan n ∈ bilangan bulat</div>
          </div>
          <div style="font-size: 12.5px; line-height: 1.6; color: var(--text-secondary); margin-top: 6px;">
            Contoh:<br>
            • Kecepatan cahaya: 300.000.000 m/s = <strong>3,0 × 10⁸ m/s</strong>.<br>
            • Ukuran virus influenza: 0,00000012 m = <strong>1,2 × 10⁻⁷ m</strong>.
          </div>
        </div>
      `,
      contohSoal: [
        {
          no: 1,
          judul: "Menyederhanakan Operasi Pangkat",
          soal: "Hitunglah hasil dari operasi perpangkatan: (2³ × 2⁴) ÷ 2².",
          diketahui: "Operasi pangkat dengan basis sama yaitu 2: 2³ × 2⁴ ÷ 2²",
          ditanya: "Nilai hasil perhitungan paling sederhana",
          pembahasan: `
            Gunakan sifat eksponen basis sama:<br>
            Langkah 1: 2³ × 2⁴ = 2^(3 + 4) = 2⁷<br>
            Langkah 2: 2⁷ ÷ 2² = 2^(7 - 2) = 2⁵<br>
            Langkah 3: Hitung 2⁵ = 2 × 2 × 2 × 2 × 2 = <strong>32</strong>.
          `,
          hasil: "32 (atau 2⁵)"
        },
        {
          no: 2,
          judul: "Menyederhanakan Bentuk Akar Campuran",
          soal: "Sederhanakan bentuk akar berikut: √72 + √50 - √18.",
          diketahui: "Ekspresi akar √72, √50, dan √18",
          ditanya: "Bentuk sederhana paling ringkas",
          pembahasan: `
            Pecah bilangan di dalam akar menjadi faktor kuadrat sempurna (36, 25, 9):<br>
            • √72 = √(36 × 2) = 6√2<br>
            • √50 = √(25 × 2) = 5√2<br>
            • √18 = √(9 × 2) = 3√2<br>
            Gabungkan suku-suku akar sejenis:<br>
            = 6√2 + 5√2 - 3√2 = (6 + 5 - 3)√2 = <strong>8√2</strong>.
          `,
          hasil: "8√2"
        }
      ],
      cekPemahaman: [
        {
          id: "cp-1-1",
          pertanyaan: "Berapakah hasil dari pemangkatan (3²)³ ÷ 3⁴ ?",
          opsi: [
            { label: "A", teks: "3 (3¹)" },
            { label: "B", teks: "9 (3²)" },
            { label: "C", teks: "27 (3³)" },
            { label: "D", teks: "81 (3⁴)" }
          ],
          kunci: "B",
          penjelasan: "Pangkat dipangkatkan: (3²)³ = 3^(2×3) = 3⁶. Kemudian lakukan pembagian: 3⁶ ÷ 3⁴ = 3^(6-4) = 3² = 9."
        }
      ]
    },
    {
      id: "mat-bab-2",
      no: 2,
      judul: "Persamaan & Fungsi Kuadrat",
      mapel: "Matematika",
      kelas: "Kelas IX SMP",
      kurikulum: "Kurikulum Merdeka / Fase D",
      waktuBaca: "18 Menit Baca",
      totalHalaman: 3,
      capaian: [
        "Menyelesaikan persamaan kuadrat ax² + bx + c = 0 dengan metode pemfaktoran, melengkapkan kuadrat, dan rumus kuadratik (ABC).",
        "Menganalisis diskriminan (D = b² - 4ac) untuk menentukan sifat dan banyak akar riil persamaan kuadrat.",
        "Menggambar dan menginterpretasi grafik fungsi kuadrat f(x) = ax² + bx + c: sumbu simetri, nilai optimum, dan koordinat titik puncak."
      ],
      petaKonsep: "Persamaan Kuadrat ➔ Akar & Rumus ABC ➔ Diskriminan ➔ Fungsi Kuadrat & Kurva Parabola ➔ Aplikasi Lintasan Maksimum",
      materiHtml: `
        <div class="module-section-card">
          <div class="module-badge-topic">Bagian 1: Persamaan Kuadrat</div>
          <p class="module-lead-text">
            Persamaan kuadrat adalah persamaan satu variabel yang memiliki pangkat tertinggi bernilai 2. Bentuk umumnya:
          </p>
          <div class="formula-box">
            <div class="formula-title">Bentuk Umum Persamaan Kuadrat:</div>
            <div class="formula-item">ax² + bx + c = 0   (dengan syarat a ≠ 0 dan a, b, c ∈ bilangan riil)</div>
          </div>

          <div class="formula-box">
            <div class="formula-title">Tiga Metode Mencari Akar-Akar (x₁ dan x₂):</div>
            <div class="formula-item">1. Pemfaktoran: Cari p dan q sehingga p + q = b dan p × q = a × c</div>
            <div class="formula-item">2. Melengkapkan Kuadrat Sempurna: Ubah ke bentuk (x + p)² = q</div>
            <div class="formula-item">3. Rumus Kuadratik (Rumus ABC): x₁,₂ = (-b ± √(b² - 4ac)) / (2a)</div>
          </div>
        </div>

        <div class="module-section-card">
          <div class="module-badge-topic">Bagian 2: Nilai Diskriminan (D)</div>
          <p class="module-lead-text">
            Diskriminan digunakan untuk mengetahui karakteristik dan banyaknya akar riil tanpa perlu menyelesaikan persamaannya.
          </p>
          <div class="formula-box">
            <div class="formula-title">Rumus Diskriminan:</div>
            <div class="formula-item">D = b² - 4ac</div>
          </div>
          <div style="font-size: 12.5px; line-height: 1.6; color: var(--text-secondary); margin-top: 6px;">
            • Jika <strong>D > 0</strong> : Memiliki 2 akar riil yang berbeda (grafik memotong sumbu-X di dua titik).<br>
            • Jika <strong>D = 0</strong> : Memiliki 1 akar kembar riil (grafik menyinggung sumbu-X).<br>
            • Jika <strong>D &lt; 0</strong> : Tidak memiliki akar riil (grafik tidak memotong sumbu-X).
          </div>
        </div>

        <div class="module-section-card">
          <div class="module-badge-topic">Bagian 3: Fungsi Kuadrat & Grafik Parabola</div>
          <p class="module-lead-text">
            Fungsi kuadrat memiliki bentuk f(x) = ax² + bx + c. Grafiknya berbentuk kurva lengkung mulus yang disebut <strong>parabola</strong>.
          </p>
          <div class="formula-box">
            <div class="formula-title">Unsur-Unsur Penting Grafik Fungsi Kuadrat:</div>
            <div class="formula-item">• Arah Terbuka: a > 0 terbuka ke atas (senyum), a &lt; 0 terbuka ke bawah (cemberut)</div>
            <div class="formula-item">• Persamaan Sumbu Simetri: x_p = -b / (2a)</div>
            <div class="formula-item">• Nilai Optimum (Maks/Min): y_p = -D / (4a) = -(b² - 4ac) / (4a)</div>
            <div class="formula-item">• Titik Puncak / Titik Balik: (x_p, y_p) = (-b / (2a), -D / (4a))</div>
          </div>
          <div class="tips-box">
            <strong>💡 Tips Masalah Kontekstual (Tinggi Maksimum):</strong><br>
            Jika sebuah peluru atau bola dilempar ke atas dengan fungsi h(t) = -at² + bt, tinggi maksimum selalu dicapai pada sumbu simetri t = -b / (2a).
          </div>
        </div>
      `,
      contohSoal: [
        {
          no: 1,
          judul: "Mencari Akar dengan Pemfaktoran",
          soal: "Tentukan akar-akar penyelesaian dari persamaan kuadrat x² - 5x + 6 = 0.",
          diketahui: "a = 1, b = -5, c = 6",
          ditanya: "Nilai x₁ dan x₂",
          pembahasan: `
            Cari dua angka p dan q yang jika dikalikan menghasilkan 6 dan dijumlahkan menghasilkan -5.<br>
            Angka tersebut adalah -2 dan -3 (karena -2 × -3 = 6 dan -2 + -3 = -5).<br>
            (x - 2)(x - 3) = 0<br>
            Maka: x - 2 = 0 ➔ <strong>x₁ = 2</strong>, atau x - 3 = 0 ➔ <strong>x₂ = 3</strong>.
          `,
          hasil: "x = 2 atau x = 3"
        },
        {
          no: 2,
          judul: "Aplikasi Nyata: Ketinggian Roket Air",
          soal: "Sebuah roket air diluncurkan ke atas. Tinggi roket h (dalam meter) setelah t detik dirumuskan dengan h(t) = 40t - 5t². Tentukan waktu saat roket mencapai ketinggian maksimum dan berapa tinggi maksimumnya.",
          diketahui: "h(t) = -5t² + 40t (dengan a = -5, b = 40, c = 0)",
          ditanya: "(a) Waktu puncak t, (b) Tinggi maksimum h(t)",
          pembahasan: `
            (a) Waktu mencapai tinggi puncak = sumbu simetri:<br>
            t_p = -b / (2a) = -40 / (2 × -5) = -40 / -10 = <strong>4 detik</strong>.<br><br>
            (b) Substitusikan t = 4 detik ke rumus h(t):<br>
            h(4) = 40(4) - 5(4)² = 160 - 5(16) = 160 - 80 = <strong>80 meter</strong>.
          `,
          hasil: "Waktu: 4 detik, Tinggi Maksimum: 80 meter"
        }
      ],
      cekPemahaman: [
        {
          id: "cp-2-1",
          pertanyaan: "Persamaan sumbu simetri dari grafik fungsi kuadrat f(x) = x² - 6x + 8 adalah ...",
          opsi: [
            { label: "A", teks: "x = 2" },
            { label: "B", teks: "x = 3" },
            { label: "C", teks: "x = 4" },
            { label: "D", teks: "x = 6" }
          ],
          kunci: "B",
          penjelasan: "Sumbu simetri: x = -b / (2a) = -(-6) / (2 × 1) = 6 / 2 = 3."
        }
      ]
    },
    {
      id: "mat-bab-3",
      no: 3,
      judul: "Transformasi Geometri",
      mapel: "Matematika",
      kelas: "Kelas IX SMP",
      kurikulum: "Kurikulum Merdeka / Fase D",
      waktuBaca: "15 Menit Baca",
      totalHalaman: 3,
      capaian: [
        "Memahami prinsip perubahan posisi objek geometri melalui Translasi (pergeseran).",
        "Menentukan koordinat bayangan objek hasil Refleksi (pencerminan) terhadap berbagai garis cermin.",
        "Menganalisis hasil Rotasi (perputaran sudut) dan Dilatasi (perbesaran/pengecilan faktor skala k)."
      ],
      petaKonsep: "Transformasi Geometri ➔ Translasi (Geser) ➔ Refleksi (Cermin) ➔ Rotasi (Putar) ➔ Dilatasi (Skala)",
      materiHtml: `
        <div class="module-section-card">
          <div class="module-badge-topic">Bagian 1: Translasi (Pergeseran)</div>
          <p class="module-lead-text">
            Translasi memindahkan setiap titik pada bidang datar sejauh jarak dan arah tertentu yang dinyatakan dalam komponen vektor T(a, b).
          </p>
          <div class="formula-box">
            <div class="formula-title">Rumus Koordinat Translasi:</div>
            <div class="formula-item">P(x, y) ──[ T(a, b) ]──> P'(x + a, y + b)</div>
          </div>
        </div>

        <div class="module-section-card">
          <div class="module-badge-topic">Bagian 2: Refleksi (Pencerminan)</div>
          <p class="module-lead-text">
            Refleksi memindahkan titik dengan menggunakan sifat bayangan pada cermin datar: jarak titik ke cermin sama dengan jarak cermin ke bayangan.
          </p>
          <div class="formula-box">
            <div class="formula-title">Tabel Rumus Refleksi Titik P(x, y):</div>
            <div class="formula-item">• Terhadap Sumbu-X: P(x, y) ➔ P'(x, -y)</div>
            <div class="formula-item">• Terhadap Sumbu-Y: P(x, y) ➔ P'(-x, y)</div>
            <div class="formula-item">• Terhadap Titik Asal O(0,0): P(x, y) ➔ P'(-x, -y)</div>
            <div class="formula-item">• Terhadap Garis y = x: P(x, y) ➔ P'(y, x)</div>
            <div class="formula-item">• Terhadap Garis y = -x: P(x, y) ➔ P'(-y, -x)</div>
            <div class="formula-item">• Terhadap Garis x = h: P(x, y) ➔ P'(2h - x, y)</div>
            <div class="formula-item">• Terhadap Garis y = k: P(x, y) ➔ P'(x, 2k - y)</div>
          </div>
        </div>

        <div class="module-section-card">
          <div class="module-badge-topic">Bagian 3: Rotasi & Dilatasi</div>
          <div class="formula-box">
            <div class="formula-title">Rotasi dengan Pusat O(0,0):</div>
            <div class="formula-item">• Rotasi +90° (Berlawanan arah jarum jam): P(x, y) ➔ P'(-y, x)</div>
            <div class="formula-item">• Rotasi 180°: P(x, y) ➔ P'(-x, -y)</div>
            <div class="formula-item">• Rotasi -90° atau +270°: P(x, y) ➔ P'(y, -x)</div>
          </div>
          <div class="formula-box">
            <div class="formula-title">Dilatasi dengan Pusat O(0,0) Faktor Skala k:</div>
            <div class="formula-item">P(x, y) ──[ O, k ]──> P'(k × x, k × y)</div>
          </div>
        </div>
      `,
      contohSoal: [
        {
          no: 1,
          judul: "Menentukan Bayangan Hasil Refleksi",
          soal: "Tentukan koordinat bayangan titik P(3, -5) jika dicerminkan terhadap sumbu-X.",
          diketahui: "Titik asal P(x = 3, y = -5), cermin: sumbu-X",
          ditanya: "Koordinat titik bayangan P'",
          pembahasan: `
            Pencerminan terhadap sumbu-X mempertahankan koordinat x dan mengubah tanda koordinat y:<br>
            P(x, y) ➔ P'(x, -y)<br>
            P(3, -5) ➔ P'(3, -(-5)) = <strong>P'(3, 5)</strong>.
          `,
          hasil: "P'(3, 5)"
        },
        {
          no: 2,
          judul: "Translasi Titik Dua Dimensi",
          soal: "Titik A(-2, 4) ditranslasikan oleh vektor pergeseran T(3, -2). Tentukan koordinat titik A'.",
          diketahui: "Titik A(-2, 4), vektor T(a = 3, b = -2)",
          ditanya: "Koordinat bayangan A'",
          pembahasan: `
            Tambahkan setiap komponen koordinat:<br>
            x' = x + a = -2 + 3 = 1<br>
            y' = y + b = 4 + (-2) = 2<br>
            Maka diperoleh <strong>A'(1, 2)</strong>.
          `,
          hasil: "A'(1, 2)"
        }
      ],
      cekPemahaman: [
        {
          id: "cp-3-1",
          pertanyaan: "Titik B(4, -3) jika dicerminkan terhadap garis y = x menghasilkan bayangan ...",
          opsi: [
            { label: "A", teks: "B'(-3, 4)" },
            { label: "B", teks: "B'(-4, 3)" },
            { label: "C", teks: "B'(3, -4)" },
            { label: "D", teks: "B'(4, 3)" }
          ],
          kunci: "A",
          penjelasan: "Pencerminan terhadap garis y = x cukup menukar posisi x dan y: (x, y) ➔ (y, x), sehingga B(4, -3) ➔ B'(-3, 4)."
        }
      ]
    },
    {
      id: "mat-bab-4",
      no: 4,
      judul: "Kekongruenan dan Kesebangunan",
      mapel: "Matematika",
      kelas: "Kelas IX SMP",
      kurikulum: "Kurikulum Merdeka / Fase D",
      waktuBaca: "16 Menit Baca",
      totalHalaman: 3,
      capaian: [
        "Membedakan konsep kekongruenan (bentuk dan ukuran sama) dengan kesebangunan (bentuk sama, ukuran sebanding).",
        "Menggunakan syarat kekongruenan dan kesebangunan segitiga untuk membuktikan kesamaan bentuk.",
        "Menyelesaikan masalah kontekstual pengukuran tidak langsung (mengukur tinggi tiang bendera/pohon menggunakan bayangan sinar matahari)."
      ],
      petaKonsep: "Kekongruenan Bangun Datar ➔ Syarat Kongruen Segitiga ➔ Kesebangunan Bangun Datar ➔ Pengukuran Tinggi Nyata dengan Bayangan",
      materiHtml: `
        <div class="module-section-card">
          <div class="module-badge-topic">Bagian 1: Kekongruenan (≅)</div>
          <p class="module-lead-text">
            Dua bangun datar dikatakan <strong>kongruen</strong> jika memiliki bentuk dan ukuran yang persis sama. Jika ditumpuk, keduanya akan saling menutupi secara sempurna.
          </p>
          <div class="formula-box">
            <div class="formula-title">Syarat Kekongruenan Dua Segitiga:</div>
            <div class="formula-item">1. Sisi - Sisi - Sisi (s - s - s): Ketiga pasang sisi yang bersesuaian sama panjang.</div>
            <div class="formula-item">2. Sisi - Sudut - Sisi (s - sd - s): Dua sisi dan satu sudut yang diapit sama besar.</div>
            <div class="formula-item">3. Sudut - Sisi - Sudut (sd - s - sd): Dua sudut dan satu sisi yang berada di antaranya sama.</div>
          </div>
        </div>

        <div class="module-section-card">
          <div class="module-badge-topic">Bagian 2: Kesebangunan (~)</div>
          <p class="module-lead-text">
            Dua bangun datar dikatakan <strong>sebangun</strong> jika bentuknya sama tetapi ukurannya dapat berbeda (seperti foto dengan ukuran diperbesar/diperkecil).
          </p>
          <div class="formula-box">
            <div class="formula-title">Syarat Dua Bangun Datar Sebangun:</div>
            <div class="formula-item">1. Sudut-sudut yang bersesuaian sama besar.</div>
            <div class="formula-item">2. Perbandingan panjang sisi-sisi yang bersesuaian adalah sebanding: a₁/a₂ = b₁/b₂ = c₁/c₂ = k</div>
          </div>

          <div class="tips-box">
            <strong>💡 Perbedaan Utama:</strong><br>
            • Dua bangun yang <strong>kongruen sudah pasti sebangun</strong> (skala k = 1).<br>
            • Dua bangun yang <strong>sebangun belum tentu kongruen</strong>.
          </div>
        </div>

        <div class="module-section-card">
          <div class="module-badge-topic">Bagian 3: Pengukuran Tinggi Nyata dengan Bayangan</div>
          <p class="module-lead-text">
            Karena sinar matahari datang sejajar pada saat yang bersamaan, sudut elevasi sinar matahari sama, sehingga objek dan bayangannya membentuk segitiga siku-siku yang sebangun.
          </p>
          <div class="formula-box">
            <div class="formula-title">Rumus Kesebangunan Bayangan:</div>
            <div class="formula-item">Tinggi Objek / Tinggi Pembanding = Panjang Bayangan Objek / Panjang Bayangan Pembanding</div>
          </div>
        </div>
      `,
      contohSoal: [
        {
          no: 1,
          judul: "Mengukur Tinggi Tiang Bendera dari Bayangan",
          soal: "Sebuah pohon setinggi 6 meter memiliki panjang bayangan 4 meter di tanah. Pada waktu yang sama, sebuah tiang bendera menghasilkan bayangan sepanjang 10 meter. Berapakah tinggi tiang bendera tersebut?",
          diketahui: "Tinggi pohon = 6 m, bayangan pohon = 4 m, bayangan tiang = 10 m",
          ditanya: "Tinggi tiang bendera (t)",
          pembahasan: `
            Gunakan perbandingan kesebangunan:<br>
            (Tinggi Tiang) / (Tinggi Pohon) = (Bayangan Tiang) / (Bayangan Pohon)<br>
            t / 6 = 10 / 4<br>
            t = (6 × 10) / 4 = 60 / 4 = <strong>15 meter</strong>.
          `,
          hasil: "15 meter"
        }
      ],
      cekPemahaman: [
        {
          id: "cp-4-1",
          pertanyaan: "Sebuah gedung memiliki bayangan sepanjang 20 m saat sebuah tongkat setinggi 2 m menghasilkan bayangan sepanjang 5 m. Berapakah tinggi gedung tersebut?",
          opsi: [
            { label: "A", teks: "6 meter" },
            { label: "B", teks: "8 meter" },
            { label: "C", teks: "10 meter" },
            { label: "D", teks: "12 meter" }
          ],
          kunci: "B",
          penjelasan: "Tinggi Gedung / 2 = 20 / 5 ➔ Tinggi Gedung / 2 = 4 ➔ Tinggi Gedung = 2 × 4 = 8 meter."
        }
      ]
    },
    {
      id: "mat-bab-5",
      no: 5,
      judul: "Bangun Ruang Sisi Lengkung (BRSL)",
      mapel: "Matematika",
      kelas: "Kelas IX SMP",
      kurikulum: "Kurikulum Merdeka / Fase D",
      waktuBaca: "20 Menit Baca",
      totalHalaman: 3,
      capaian: [
        "Menghitung luas selimut, luas permukaan total, dan volume tabung (silinder).",
        "Menghitung garis pelukis, luas selimut, luas permukaan, dan volume kerucut.",
        "Menghitung luas permukaan dan volume bola serta belahan bola padat."
      ],
      petaKonsep: "Bangun Ruang Sisi Lengkung ➔ Tabung (Silinder) ➔ Kerucut ➔ Bola ➔ Aplikasi Volume dan Bahan Pembuatan",
      materiHtml: `
        <div class="module-section-card">
          <div class="module-badge-topic">Bagian 1: Tabung (Silinder)</div>
          <p class="module-lead-text">
            Tabung memiliki 3 sisi: 2 sisi lingkaran identik (alas dan tutup) serta 1 sisi lengkung (selimut tabung yang jika dibentangkan berbentuk persegi panjang).
          </p>
          <div class="formula-box">
            <div class="formula-title">Rumus Tabung:</div>
            <div class="formula-item">• Luas Selimut: L_s = 2 × π × r × t</div>
            <div class="formula-item">• Luas Permukaan Total: L_p = 2 × π × r × (r + t)</div>
            <div class="formula-item">• Luas Tabung Tanpa Tutup: L = π × r × (r + 2t)</div>
            <div class="formula-item">• Volume Tabung: V = π × r² × t</div>
          </div>
        </div>

        <div class="module-section-card">
          <div class="module-badge-topic">Bagian 2: Kerucut</div>
          <p class="module-lead-text">
            Kerucut memiliki alas berbentuk lingkaran dan selimut kerucut yang mengerucut ke sebuah titik puncak. Hubungan jari-jari (r), tinggi (t), dan garis pelukis (s) memenuhi teorema Pythagoras: s² = r² + t².
          </p>
          <div class="formula-box">
            <div class="formula-title">Rumus Kerucut:</div>
            <div class="formula-item">• Garis Pelukis: s = √(r² + t²)</div>
            <div class="formula-item">• Luas Selimut: L_s = π × r × s</div>
            <div class="formula-item">• Luas Permukaan Total: L_p = π × r × (r + s)</div>
            <div class="formula-item">• Volume Kerucut: V = (1/3) × π × r² × t</div>
          </div>
        </div>

        <div class="module-section-card">
          <div class="module-badge-topic">Bagian 3: Bola</div>
          <div class="formula-box">
            <div class="formula-title">Rumus Bola:</div>
            <div class="formula-item">• Luas Permukaan Bola: L = 4 × π × r²</div>
            <div class="formula-item">• Volume Bola: V = (4/3) × π × r³</div>
            <div class="formula-item">• Luas Setengah Bola Padat (Pejal): L = 3 × π × r²</div>
          </div>
          <div class="tips-box">
            <strong>💡 Penggunaan Nilai π:</strong><br>
            • Gunakan <strong>π = 22/7</strong> jika panjang jari-jari (r) merupakan kelipatan 7.<br>
            • Gunakan <strong>π = 3,14</strong> jika jari-jari bukan kelipatan 7.
          </div>
        </div>
      `,
      contohSoal: [
        {
          no: 1,
          judul: "Menghitung Volume Tabung",
          soal: "Sebuah tabung memiliki jari-jari alas r = 7 cm dan tinggi t = 10 cm. Hitunglah volume tabung tersebut (π = 22/7).",
          diketahui: "r = 7 cm, t = 10 cm, π = 22/7",
          ditanya: "Volume tabung (V)",
          pembahasan: `
            V = π × r² × t<br>
            V = (22/7) × (7)² × 10<br>
            V = (22/7) × 49 × 10 = 22 × 7 × 10 = <strong>1.540 cm³</strong>.
          `,
          hasil: "1.540 cm³"
        },
        {
          no: 2,
          judul: "Luas Selimut Kerucut",
          soal: "Sebuah kerucut memiliki jari-jari r = 6 cm dan garis pelukis s = 10 cm. Hitunglah luas selimut kerucut tersebut (π = 3,14).",
          diketahui: "r = 6 cm, s = 10 cm, π = 3,14",
          ditanya: "Luas selimut (L_s)",
          pembahasan: `
            L_s = π × r × s<br>
            L_s = 3,14 × 6 × 10 = 3,14 × 60 = <strong>188,4 cm²</strong>.
          `,
          hasil: "188,4 cm²"
        }
      ],
      cekPemahaman: [
        {
          id: "cp-5-1",
          pertanyaan: "Berapakah volume bola yang memiliki jari-jari r = 3 cm? (gunakan π = 3,14)",
          opsi: [
            { label: "A", teks: "37,68 cm³" },
            { label: "B", teks: "113,04 cm³" },
            { label: "C", teks: "150,72 cm³" },
            { label: "D", teks: "226,08 cm³" }
          ],
          kunci: "B",
          penjelasan: "V = (4/3) × π × r³ = (4/3) × 3,14 × 27 = 4 × 3,14 × 9 = 113,04 cm³."
        }
      ]
    },
    {
      id: "mat-bab-6",
      no: 6,
      judul: "Statistika & Peluang Terapan",
      mapel: "Matematika",
      kelas: "Kelas IX SMP",
      kurikulum: "Kurikulum Merdeka / Fase D",
      waktuBaca: "15 Menit Baca",
      totalHalaman: 3,
      capaian: [
        "Menghitung ukuran pemusatan data: Mean (rata-rata), Median (nilai tengah), dan Modus.",
        "Menganalisis ukuran penyebaran data: Jangkauan (Range) dan Kuartil.",
        "Menentukan peluang teoritik dan peluang empirik suatu kejadian serta menghitung frekuensi harapan."
      ],
      petaKonsep: "Statistika Deskriptif ➔ Ukuran Pemusatan (Mean, Median, Modus) ➔ Kuartil ➔ Peluang Teoritik ➔ Frekuensi Harapan",
      materiHtml: `
        <div class="module-section-card">
          <div class="module-badge-topic">Bagian 1: Ukuran Pemusatan Data</div>
          <div class="formula-box">
            <div class="formula-title">Mean, Median, & Modus:</div>
            <div class="formula-item">• Mean (Rata-rata): x̄ = (Jumlah seluruh data) / (Banyak data) = (Σ x) / n</div>
            <div class="formula-item">• Median (Me): Nilai tengah dari data yang telah diurutkan dari terkecil ke terbesar.</div>
            <div class="formula-item">• Modus (Mo): Nilai data yang memiliki frekuensi kemunculan terbanyak.</div>
          </div>
        </div>

        <div class="module-section-card">
          <div class="module-badge-topic">Bagian 2: Ukuran Penyebaran Data</div>
          <div class="formula-box">
            <div class="formula-title">Jangkauan & Kuartil:</div>
            <div class="formula-item">• Jangkauan (Range): J = Nilai Maksimum - Nilai Minimum</div>
            <div class="formula-item">• Kuartil: Membagi data terurut menjadi 4 bagian sama besar (Q₁ = Kuartil Bawah, Q₂ = Median, Q₃ = Kuartil Atas)</div>
            <div class="formula-item">• Jangkauan Interkuartil: QR = Q₃ - Q₁</div>
          </div>
        </div>

        <div class="module-section-card">
          <div class="module-badge-topic">Bagian 3: Peluang Teoritik & Frekuensi Harapan</div>
          <p class="module-lead-text">
            Peluang menunjukkan kemungkinan terjadinya suatu peristiwa A dari keseluruhan ruang sampel S.
          </p>
          <div class="formula-box">
            <div class="formula-title">Rumus Peluang:</div>
            <div class="formula-item">• Peluang Kejadian A: P(A) = n(A) / n(S)   (dengan 0 ≤ P(A) ≤ 1)</div>
            <div class="formula-item">• Peluang Komplemen: P(A') = 1 - P(A)</div>
            <div class="formula-item">• Frekuensi Harapan: F_h(A) = N × P(A)  (N = jumlah percobaan)</div>
          </div>
        </div>
      `,
      contohSoal: [
        {
          no: 1,
          judul: "Menghitung Mean, Median, dan Modus",
          soal: "Diberikan data nilai ulangan matematika 8 orang siswa: 7, 8, 6, 8, 9, 7, 8, 10. Tentukan Mean, Median, dan Modus data tersebut.",
          diketahui: "Data: 7, 8, 6, 8, 9, 7, 8, 10 (n = 8)",
          ditanya: "Mean, Median, Modus",
          pembahasan: `
            Langkah 1: Urutkan data: 6, 7, 7, 8, 8, 8, 9, 10.<br>
            • Mean = (6 + 7 + 7 + 8 + 8 + 8 + 9 + 10) / 8 = 63 / 8 = <strong>7,875</strong>.<br>
            • Median (data ke-4 dan ke-5): (8 + 8) / 2 = <strong>8</strong>.<br>
            • Modus: Nilai yang paling sering muncul adalah <strong>8</strong> (muncul 3 kali).
          `,
          hasil: "Mean = 7,875; Median = 8; Modus = 8"
        }
      ],
      cekPemahaman: [
        {
          id: "cp-6-1",
          pertanyaan: "Dalam sebuah kantong terdapat 5 kelereng merah, 3 kelereng biru, dan 2 kelereng kuning. Jika satu kelereng diambil secara acak, peluang terambil kelereng biru adalah ...",
          opsi: [
            { label: "A", teks: "1/10" },
            { label: "B", teks: "3/10" },
            { label: "C", teks: "1/2" },
            { label: "D", teks: "3/5" }
          ],
          kunci: "B",
          penjelasan: "Total kelereng n(S) = 5 + 3 + 2 = 10. Kelereng biru n(B) = 3. Peluang P(B) = n(B) / n(S) = 3/10."
        }
      ]
    }
  ]
};
