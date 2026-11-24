// ==========================================================================
// EduSmart - Aplikasi Belajar Siswa (Main Logic & State Management)
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  // Muat tugas tersimpan atau inisialisasi tugas Kelas 9B
  const CURRENT_TASK_VERSION = "v_9b_final";
  let savedTasks = null;
  if (localStorage.getItem("edusmart_task_version") !== CURRENT_TASK_VERSION) {
    savedTasks = JSON.parse(JSON.stringify(initialData.tugasList));
    localStorage.setItem("edusmart_tasks", JSON.stringify(savedTasks));
    localStorage.setItem("edusmart_task_version", CURRENT_TASK_VERSION);
  } else {
    try {
      savedTasks = JSON.parse(localStorage.getItem("edusmart_tasks"));
    } catch (e) {
      savedTasks = null;
    }
    if (!savedTasks || !Array.isArray(savedTasks) || savedTasks.length === 0) {
      savedTasks = JSON.parse(JSON.stringify(initialData.tugasList));
      localStorage.setItem("edusmart_tasks", JSON.stringify(savedTasks));
    }
  }

  // ==========================================================================
  // SISTEM AKUN SISWA (MULTI-AKUN, DAFTAR, MASUK, & GANTI AKUN)
  // ==========================================================================
  const ACCOUNTS_STORAGE_KEY = "edusmart_accounts";
  const ACTIVE_ACCOUNT_KEY = "edusmart_active_account_id";

  const loadAccounts = () => {
    let accounts = null;
    try {
      accounts = JSON.parse(localStorage.getItem(ACCOUNTS_STORAGE_KEY));
    } catch (e) {
      accounts = null;
    }
    if (!Array.isArray(accounts) || accounts.length === 0) {
      accounts = [{
        id: "default_ahmad",
        ...initialData.user,
        password: initialData.user.password || "edusmart123"
      }];
      localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
    }
    return accounts;
  };

  const saveAccounts = (accounts) => {
    localStorage.setItem(ACCOUNTS_STORAGE_KEY, JSON.stringify(accounts));
  };

  let accountsList = loadAccounts();
  let activeAccountId = localStorage.getItem(ACTIVE_ACCOUNT_KEY) || accountsList[0].id;
  let activeAccount = accountsList.find(a => a.id === activeAccountId) || accountsList[0];
  localStorage.setItem(ACTIVE_ACCOUNT_KEY, activeAccount.id);

  // 1. Inisialisasi State Aplikasi
  let appState = {
    user: { ...activeAccount },
    quotes: [...initialData.quotes],
    quoteIndex: 0,
    currentTab: "view-home",
    selectedDay: "Senin",
    taskFilter: "semua",
    tasks: savedTasks,
    notifications: [...initialData.notifikasiList],
    isDarkMode: localStorage.getItem("edusmart_theme") === "dark"
  };

  // ==========================================================================
  // SISTEM RUNTUNAN BELAJAR (STREAK SYSTEM) - PERSISTENSI & LOGIKA HARIAN
  // ==========================================================================
  let savedStreak = null;
  try {
    savedStreak = JSON.parse(localStorage.getItem("edusmart_streak"));
  } catch(e) {
    savedStreak = null;
  }

  const todayDateStr = new Date().toISOString().split("T")[0];
  const indonesianDays = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const currentDayIndex = new Date().getDay();
  const currentDayName = indonesianDays[currentDayIndex];

  if (!savedStreak) {
    savedStreak = {
      count: 5,
      longestStreak: 12,
      lastActiveDate: todayDateStr,
      todayCompleted: true,
      freezes: 1,
      totalCheckins: 28,
      weekly: {
        Senin: true,
        Selasa: true,
        Rabu: true,
        Kamis: true,
        Jumat: true,
        Sabtu: true,
        Minggu: false
      }
    };
    localStorage.setItem("edusmart_streak", JSON.stringify(savedStreak));
  } else {
    // Validasi pergantian tanggal & perlindungan streak
    if (savedStreak.lastActiveDate !== todayDateStr) {
      const last = new Date(savedStreak.lastActiveDate);
      const curr = new Date(todayDateStr);
      const diffTime = Math.abs(curr - last);
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Berganti 1 hari wajar: hari ini belum check-in
        savedStreak.todayCompleted = false;
        // Jika awal pekan (Senin), reset weekly display
        if (currentDayName === "Senin") {
          savedStreak.weekly = { Senin: false, Selasa: false, Rabu: false, Kamis: false, Jumat: false, Sabtu: false, Minggu: false };
        }
      } else if (diffDays > 1) {
        // Terlewat lebih dari 1 hari: cek apakah ada perlindungan streak freeze
        if (savedStreak.freezes > 0) {
          savedStreak.freezes--;
          savedStreak.todayCompleted = false;
        } else {
          // Streak terputus jika tidak ada freeze
          savedStreak.count = 0;
          savedStreak.todayCompleted = false;
          savedStreak.weekly = { Senin: false, Selasa: false, Rabu: false, Kamis: false, Jumat: false, Sabtu: false, Minggu: false };
        }
      }
      localStorage.setItem("edusmart_streak", JSON.stringify(savedStreak));
    }
  }

  appState.streak = savedStreak;
  appState.user.streakHari = savedStreak.count;

  // Trigger Aktivitas Belajar untuk Memperpanjang / Mempertahankan Streak
  const triggerStreakActivity = (source = "Aktivitas Belajar") => {
    const streak = appState.streak;

    if (!streak.todayCompleted) {
      streak.count++;
      streak.todayCompleted = true;
      streak.lastActiveDate = todayDateStr;
      streak.weekly[currentDayName] = true;
      streak.totalCheckins = (streak.totalCheckins || 28) + 1;
      if (streak.count > streak.longestStreak) {
        streak.longestStreak = streak.count;
      }

      // Bonus Poin Streak
      appState.user.poin += 25;
      appState.user.streakHari = streak.count;

      // Cek apakah mencapai milestone (misal 5 atau 7 hari untuk lencana)
      if (streak.count >= 5) {
        let badge = initialData.lencanaList.find(b => b.nama.includes("Streak Master"));
        if (!badge) {
          initialData.lencanaList.push({
            nama: "Streak Master",
            icon: "🔥",
            desc: `Berhasil belajar ${streak.count} hari berturut-turut`,
            didapat: true
          });
        } else {
          badge.didapat = true;
        }
        renderBadges();
      }

      // Kirim Notifikasi
      appState.notifications.unshift({
        id: `streak-${Date.now()}`,
        tipe: "info",
        judul: `Runtunan Belajar Meningkat! 🔥`,
        pesan: `Selamat! Kamu telah aktif belajar hari ini (${source}). Runtunan belajarmu meningkat menjadi ${streak.count} Hari berturut-turut! (+25 Poin)`,
        waktu: "Baru saja",
        belumDibaca: true
      });
      renderNotifications();

      alert(`🎉 Hore! Runtunan Belajar (Streak) meningkat menjadi ${streak.count} Hari berturut-turut! 🔥\nAnda mendapatkan bonus +25 Poin karena konsisten belajar.`);
    }

    localStorage.setItem("edusmart_streak", JSON.stringify(streak));
    renderHeader();
    renderWeeklyStreakWidget();
  };

  // Render Widget Mini Runtunan Mingguan di Beranda
  const renderWeeklyStreakWidget = () => {
    const statusTextEl = document.getElementById("weekly-streak-status-text");
    const todayPillEl = document.getElementById("weekly-today-pill");
    const daysRowEl = document.getElementById("weekly-days-row");
    const berandaStreakVal = document.getElementById("stat-streak-value");
    const berandaStreakSub = document.getElementById("stat-streak-sub");
    const profileStreakVal = document.getElementById("profile-stat-streak");

    const streak = appState.streak;
    if (berandaStreakVal) berandaStreakVal.textContent = `${streak.count} Hari`;
    if (profileStreakVal) profileStreakVal.textContent = `${streak.count} Hari`;

    if (berandaStreakSub) {
      berandaStreakSub.textContent = streak.todayCompleted ? "✓ Hari ini aktif!" : "⚡ Belum check-in";
      berandaStreakSub.style.color = streak.todayCompleted ? "var(--success)" : "#EA580C";
    }

    if (statusTextEl) {
      statusTextEl.textContent = `${streak.count} Hari Konsisten`;
    }

    if (todayPillEl) {
      if (streak.todayCompleted) {
        todayPillEl.className = "weekly-streak-badge";
        todayPillEl.textContent = "Hari ini Aktif ✓";
      } else {
        todayPillEl.className = "weekly-streak-badge pending";
        todayPillEl.textContent = "⚡ Belum Aktif";
      }
    }

    if (!daysRowEl) return;
    daysRowEl.innerHTML = "";

    const weekDaysOrder = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
    const shortNames = {
      Senin: "Sen",
      Selasa: "Sel",
      Rabu: "Rab",
      Kamis: "Kam",
      Jumat: "Jum",
      Sabtu: "Sab",
      Minggu: "Min"
    };

    weekDaysOrder.forEach(day => {
      const isDayActive = !!streak.weekly[day];
      const isToday = (day === currentDayName);

      const node = document.createElement("div");
      node.className = `weekly-day-node ${isDayActive ? "active" : ""} ${isToday ? "today" : ""}`;

      let iconContent = "⚪";
      if (isDayActive) {
        iconContent = "🔥";
      } else if (isToday && !streak.todayCompleted) {
        iconContent = "⏳";
      }

      node.innerHTML = `
        <span class="weekly-day-name">${shortNames[day]}</span>
        <div class="weekly-day-circle">${iconContent}</div>
      `;
      daysRowEl.appendChild(node);
    });
  };

  // Render Streak Hub Modal Sheet Lengkap
  const renderStreakHub = () => {
    const content = document.getElementById("streak-hub-content");
    if (!content) return;

    const streak = appState.streak;
    const weekDaysOrder = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
    const shortNames = {
      Senin: "Sen",
      Selasa: "Sel",
      Rabu: "Rab",
      Kamis: "Kam",
      Jumat: "Jum",
      Sabtu: "Sab",
      Minggu: "Min"
    };

    let daysHtml = weekDaysOrder.map(day => {
      const isDayActive = !!streak.weekly[day];
      const isToday = (day === currentDayName);
      let icon = isDayActive ? "🔥" : (isToday && !streak.todayCompleted ? "⏳" : "⚪");
      return `
        <div class="weekly-day-node ${isDayActive ? 'active' : ''} ${isToday ? 'today' : ''}">
          <span class="weekly-day-name">${shortNames[day]}</span>
          <div class="weekly-day-circle">${icon}</div>
        </div>
      `;
    }).join("");

    const milestones = [
      { days: 3, label: "Pelajar Rajin", points: 50, icon: "🥉" },
      { days: 7, label: "Pejuang Tangguh (Lencana 🔥)", points: 150, icon: "🥈" },
      { days: 14, label: "Master Disiplin", points: 300, icon: "🥇" },
      { days: 30, label: "Legenda Prestasi", points: 1000, icon: "💎" }
    ];

    let milestonesHtml = milestones.map(m => {
      const isDone = streak.count >= m.days;
      const progress = Math.min(streak.count, m.days);
      const pct = Math.round((progress / m.days) * 100);

      return `
        <div class="milestone-item-row ${isDone ? 'achieved' : ''}">
          <div class="milestone-icon-wrap">${m.icon}</div>
          <div class="milestone-info">
            <div class="milestone-title">${m.days} Hari: ${m.label}</div>
            <div class="milestone-reward">+${m.points} Poin Belajar</div>
            ${!isDone ? `
              <div style="width: 100%; height: 5px; background: var(--border-color); border-radius: 99px; overflow: hidden; margin-top: 4px;">
                <div style="width: ${pct}%; height: 100%; background: #EA580C; border-radius: 99px;"></div>
              </div>
            ` : ''}
          </div>
          <span class="milestone-status-badge ${isDone ? 'badge-achieved' : 'badge-progress'}">
            ${isDone ? '✓ Tercapai' : `${progress}/${m.days} Hari`}
          </span>
        </div>
      `;
    }).join("");

    content.innerHTML = `
      <!-- Hero Flame Card -->
      <div class="streak-hero-card">
        <div class="streak-flame-giant">🔥</div>
        <div class="streak-count-giant">${streak.count} HARI</div>
        <div style="font-weight: 800; font-size: 15px; margin-top: 2px;">Runtunan Belajar Aktif!</div>
        <p style="font-size: 12px; opacity: 0.95; line-height: 1.45; max-width: 290px; margin: 4px auto 0;">
          ${streak.todayCompleted 
            ? 'Hebat! Api belajarmu tetap menyala hari ini. Terus pertahankan ritme belajarmu besok!' 
            : 'Api belajarmu butuh energi hari ini! Selesaikan kuis atau klaim untuk menjaga runtunan.'}
        </p>
        <div class="streak-hero-badge">
          ${streak.todayCompleted ? '✓ Hari Ini Selesai Belajar' : '⚡ Belum Check-in Hari Ini'}
        </div>
      </div>

      <!-- Weekly Calendar Track -->
      <div style="background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-lg); padding: 12px 14px;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
          <span style="font-size: 12px; font-weight: 800; color: var(--text-main);">Jadwal Runtunan Minggu Ini:</span>
          <span style="font-size: 11px; color: var(--text-muted);">${streak.count} hari berturut-turut</span>
        </div>
        <div class="weekly-days-row">
          ${daysHtml}
        </div>
      </div>

      <!-- Quick Stats Row -->
      <div class="streak-stats-row">
        <div class="streak-stat-box">
          <div class="streak-stat-val" style="color: #EA580C;">${streak.longestStreak} Hari</div>
          <div class="streak-stat-lbl">Rekor Terpanjang</div>
        </div>
        <div class="streak-stat-box">
          <div class="streak-stat-val" style="color: var(--primary);">${streak.totalCheckins || 28} Hari</div>
          <div class="streak-stat-lbl">Total Hari Belajar</div>
        </div>
        <div class="streak-stat-box">
          <div class="streak-stat-val" style="color: #0284C7;">${streak.freezes || 1} ❄️</div>
          <div class="streak-stat-lbl">Streak Freeze</div>
        </div>
      </div>

      <!-- Milestone Target Card -->
      <div class="streak-milestone-card">
        <div style="font-size: 12.5px; font-weight: 800; color: var(--text-main); margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
          <span>🎯</span> Target & Hadiah Runtunan Belajar
        </div>
        <div style="display: flex; flex-direction: column; gap: 4px;">
          ${milestonesHtml}
        </div>
      </div>

      <!-- Action Row: Tombol Aksi + Tombol Keluar Berbentuk X dalam Lingkaran (Tidak Memanjangkan Halaman) -->
      <div style="display: flex; align-items: center; gap: 10px; margin-top: 6px;">
        ${!streak.todayCompleted ? `
          <button class="continue-btn" id="btn-claim-streak-action" style="flex: 1; background: linear-gradient(135deg, #EA580C 0%, #F97316 100%); font-size: 13px; padding: 11px 14px;">
            🔥 Klaim Streak Hari Ini (+25 Poin)
          </button>
        ` : `
          <button class="continue-btn" id="btn-quick-quiz-from-streak" style="flex: 1; font-size: 13px; padding: 11px 14px;">
            ⚡ Kerjakan Kuis Kilat
          </button>
        `}
        <button class="streak-circle-close-btn" id="btn-exit-streak-hub" data-close="modal-streak-hub" title="Keluar dari Halaman Runtunan" aria-label="Keluar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `;

    const exitBtn = document.getElementById("btn-exit-streak-hub");
    if (exitBtn) {
      exitBtn.addEventListener("click", () => {
        document.getElementById("modal-streak-hub").classList.remove("active");
      });
    }

    const claimBtn = document.getElementById("btn-claim-streak-action");
    if (claimBtn) {
      claimBtn.addEventListener("click", () => {
        triggerStreakActivity("Check-in Harian");
        renderStreakHub();
      });
    }

    const quizBtn = document.getElementById("btn-quick-quiz-from-streak");
    if (quizBtn) {
      quizBtn.addEventListener("click", () => {
        document.getElementById("modal-streak-hub").classList.remove("active");
        openKuisKilatSelector();
      });
    }
  };

  const openStreakHub = () => {
    renderStreakHub();
    document.getElementById("modal-streak-hub").classList.add("active");
  };

  // Terapkan Tema (Light/Dark)
  const applyTheme = (isDark) => {
    document.documentElement.setAttribute("data-theme", isDark ? "dark" : "light");
    const themeStatus = document.getElementById("theme-status-text");
    if (themeStatus) themeStatus.textContent = isDark ? "Dark" : "Light";
    localStorage.setItem("edusmart_theme", isDark ? "dark" : "light");
  };
  applyTheme(appState.isDarkMode);

  // Update Jam Status Bar
  const updateClock = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const clockEl = document.getElementById("current-time");
    if (clockEl) clockEl.textContent = `${hours}:${minutes}`;
  };
  updateClock();
  setInterval(updateClock, 30000);

  // 2. Render Header & Informasi Siswa (Sesuai Wireframe)
  const renderHeader = () => {
    const user = appState.user;
    document.getElementById("header-user-name").textContent = user.nama;
    document.getElementById("greeting-name").textContent = user.nama;
    const headerAvatar = document.getElementById("header-avatar");
    if (headerAvatar && user.avatar) headerAvatar.src = user.avatar;
    const profileAvatar = document.getElementById("profile-avatar-img");
    if (profileAvatar && user.avatar) profileAvatar.src = user.avatar;
    const sidebarAvatar = document.getElementById("sidebar-user-avatar");
    if (sidebarAvatar && user.avatar) sidebarAvatar.src = user.avatar;
    const sidebarName = document.getElementById("sidebar-user-name");
    if (sidebarName) sidebarName.textContent = user.nama;
    const sidebarSub = document.getElementById("sidebar-user-sub");
    if (sidebarSub) sidebarSub.textContent = `Siswa Aktif • Kelas ${user.kelas} SMP`;
    document.getElementById("greeting-kelas").textContent = user.kelas;
    document.getElementById("greeting-detail-lain").textContent = user.detailLain;

    // Greeting berdasarkan jam
    const hour = new Date().getHours();
    let salam = "Halo";
    if (hour >= 4 && hour < 11) salam = "Selamat Pagi";
    else if (hour >= 11 && hour < 15) salam = "Selamat Siang";
    else if (hour >= 15 && hour < 18) salam = "Selamat Sore";
    else salam = "Selamat Malam";
    document.getElementById("greeting-greeting-text").textContent = salam;

    // Stats di Profile
    document.getElementById("profile-name").textContent = user.nama;
    document.getElementById("profile-badge-class").textContent = user.kelas;
    document.getElementById("profile-school-name").textContent = user.sekolah;
    document.getElementById("profile-stat-points").textContent = user.poin.toLocaleString();
    document.getElementById("profile-stat-rank").textContent = `#${user.peringkatKelas}`;
    document.getElementById("profile-stat-streak").textContent = `${user.streakHari} Hari`;

    document.getElementById("info-nisn").textContent = user.nisn;
    document.getElementById("info-email").textContent = user.email;
    document.getElementById("info-phone").textContent = user.noHp;

    // Stats di Beranda
    document.getElementById("stat-streak-value").textContent = `${user.streakHari} Hari`;
    document.getElementById("stat-target-value").textContent = `${user.targetHarianPersen}%`;
    document.getElementById("stat-time-value").textContent = user.waktuBelajarHariIni;
  };

  // 3. Quotes Card Logic (Sesuai Wireframe Albert Einstein)
  const renderQuote = () => {
    const q = appState.quotes[appState.quoteIndex];
    const textEl = document.getElementById("quote-text-display");
    const authorEl = document.getElementById("quote-author-display");
    
    // Animasi transisi halus
    textEl.style.opacity = "0";
    authorEl.style.opacity = "0";
    setTimeout(() => {
      textEl.textContent = `"${q.text}"`;
      authorEl.textContent = `— ${q.author}`;
      textEl.style.opacity = "1";
      authorEl.style.opacity = "1";
    }, 150);
  };

  document.getElementById("btn-refresh-quote").addEventListener("click", () => {
    appState.quoteIndex = (appState.quoteIndex + 1) % appState.quotes.length;
    renderQuote();
  });

  // 4. Render Grid 6 Mapel yang Dipelajari (Sesuai 6 kotak berikon ketupat pada wireframe)
  const renderSubjectsGrid = () => {
    const container = document.getElementById("subjects-grid-container");
    container.innerHTML = "";

    initialData.mapelUtama.forEach((mapel) => {
      const card = document.createElement("div");
      card.className = "subject-item-card";
      card.innerHTML = `
        <div class="subject-icon-box" style="background-color: ${mapel.warnaBg}; border-color: ${mapel.warna}33;">
          <div class="subject-inner-diamond" style="background: ${mapel.warna}; box-shadow: 0 4px 10px ${mapel.warna}40;">
            <span>${mapel.icon}</span>
          </div>
        </div>
        <div class="subject-name">${mapel.nama}</div>
        <div class="subject-subinfo">${mapel.totalBab} Bab • ${mapel.progress}%</div>
      `;

      card.addEventListener("click", () => openSubjectDetail(mapel));
      container.appendChild(card);
    });
  };

  // ==========================================================================
  // LAYAR MODUL PEMBELAJARAN INTERAKTIF (STANDALONE MODULE READER)
  // Menampilkan ringkasan teori, formula penting, contoh soal, & cek pemahaman
  // ==========================================================================
  let activeModuleState = {
    mapel: null,
    bab: null,
    moduleData: null,
    currentTab: "konsep"
  };

  const renderModuleTabContent = (tabKey) => {
    const container = document.getElementById("module-reader-content");
    if (!container || !activeModuleState.moduleData) return;

    const mod = activeModuleState.moduleData;
    activeModuleState.currentTab = tabKey;

    if (tabKey === "konsep") {
      // Tab 1: Konsep & Rumus
      let capaianListHtml = (mod.capaian || []).map(c => `<li>${c}</li>`).join("");

      container.innerHTML = `
        <div class="module-section-card" style="border-top: 4px solid var(--primary);">
          <div style="display: flex; justify-content: space-between; align-items: flex-start; gap: 8px;">
            <div>
              <div class="module-badge-topic">Kurikulum Merdeka • Kelas IX SMP</div>
              <h2 style="font-size: 16px; font-weight: 800; color: var(--text-main); margin-top: 4px;">
                Bab ${mod.no}: ${mod.judul}
              </h2>
            </div>
            <span style="font-size: 26px;">📐</span>
          </div>

          <div style="background: var(--bg-card-subtle); padding: 10px 12px; border-radius: var(--radius-md); font-size: 12px; margin-top: 6px;">
            <div style="font-weight: 800; color: var(--text-main); margin-bottom: 4px;">🎯 Tujuan Pembelajaran:</div>
            <ul style="padding-left: 18px; line-height: 1.55; color: var(--text-secondary); margin: 0;">
              ${capaianListHtml}
            </ul>
          </div>

          ${mod.petaKonsep ? `
            <div style="font-size: 11.5px; color: var(--text-muted); background: var(--bg-app); padding: 8px 10px; border-radius: 6px; border: 1px dashed var(--border-color); margin-top: 4px;">
              <strong>Peta Alur Materi:</strong> ${mod.petaKonsep}
            </div>
          ` : ''}
        </div>

        ${mod.materiHtml}
      `;
    } else if (tabKey === "contoh") {
      // Tab 2: Contoh Soal & Pembahasan Bertahap
      if (!mod.contohSoal || mod.contohSoal.length === 0) {
        container.innerHTML = `<div class="module-section-card"><p>Belum ada contoh soal untuk bab ini.</p></div>`;
        return;
      }

      let examplesHtml = mod.contohSoal.map(ex => `
        <div class="example-card">
          <span class="example-badge">💡 Contoh Soal #${ex.no}</span>
          <div class="example-title">${ex.judul}</div>
          <div class="example-problem">
            <strong>Soal Kasus:</strong><br>
            ${ex.soal}
          </div>
          <div class="example-step-section">
            <div><strong>Diketahui:</strong> ${ex.diketahui}</div>
            <div><strong>Ditanyakan:</strong> ${ex.ditanya}</div>
            <div class="example-solution-box">
              <strong style="color: #16A34A; display: block; margin-bottom: 4px;">Langkah Pembahasan:</strong>
              ${ex.pembahasan}
            </div>
            <div style="margin-top: 6px; font-weight: 800; color: var(--primary);">
              Jawaban Akhir: ${ex.hasil}
            </div>
          </div>
        </div>
      `).join("");

      container.innerHTML = `
        <div style="font-size: 13px; font-weight: 700; color: var(--text-secondary); padding: 0 4px;">
          Pelajari ${mod.contohSoal.length} contoh soal kontekstual dan cara penyelesaiannya:
        </div>
        ${examplesHtml}
      `;
    } else if (tabKey === "latihan") {
      // Tab 3: Cek Pemahaman Interaktif
      if (!mod.cekPemahaman || mod.cekPemahaman.length === 0) {
        container.innerHTML = `<div class="module-section-card"><p>Belum ada latihan pemahaman.</p></div>`;
        return;
      }

      let checksHtml = mod.cekPemahaman.map((cp, idx) => {
        let optionsHtml = cp.opsi.map(op => `
          <button class="check-option-item" data-cpid="${cp.id}" data-opkey="${op.label}" data-correct="${op.label === cp.kunci}">
            <span style="font-weight: 800; min-width: 20px;">${op.label}.</span>
            <span>${op.teks}</span>
          </button>
        `).join("");

        return `
          <div class="check-card" id="card-${cp.id}">
            <div class="check-header">
              <span>✍️</span> Cek Pemahaman Cepat #${idx + 1}
            </div>
            <div class="check-question-text">
              ${cp.pertanyaan}
            </div>
            <div class="check-options-list">
              ${optionsHtml}
            </div>
            <div class="check-feedback-box" id="feedback-${cp.id}"></div>
          </div>
        `;
      }).join("");

      container.innerHTML = `
        <div style="background: var(--bg-card-subtle); padding: 12px; border-radius: var(--radius-md); font-size: 12.5px; color: var(--text-secondary); line-height: 1.5;">
          <strong>⚡ Uji Pemahaman Mandiri:</strong> Pilih salah satu jawaban di bawah ini untuk menguji pemahaman konsep Anda secara langsung.
        </div>
        ${checksHtml}
      `;

      // Event listener tombol opsi cek pemahaman interaktif
      container.querySelectorAll(".check-option-item").forEach(btn => {
        btn.addEventListener("click", () => {
          const cpId = btn.dataset.cpid;
          const isCorrect = btn.dataset.correct === "true";
          const opKey = btn.dataset.opkey;
          const card = document.getElementById(`card-${cpId}`);
          const feedback = document.getElementById(`feedback-${cpId}`);
          const questionData = mod.cekPemahaman.find(q => q.id === cpId);

          // Kunci semua tombol pada pertanyaan ini
          card.querySelectorAll(".check-option-item").forEach(opt => {
            opt.disabled = true;
            opt.style.cursor = "default";
            if (opt.dataset.correct === "true") {
              opt.classList.add("selected-correct");
            }
          });

          if (isCorrect) {
            btn.classList.add("selected-correct");
            feedback.className = "check-feedback-box show";
            feedback.style.background = "#DCFCE7";
            feedback.style.border = "1px solid #86EFAC";
            feedback.style.color = "#166534";
            feedback.innerHTML = `
              <strong>🎉 Luar Biasa, Jawaban Anda Benar! (${opKey})</strong><br>
              ${questionData.penjelasan}
            `;
          } else {
            btn.classList.add("selected-wrong");
            feedback.className = "check-feedback-box show";
            feedback.style.background = "#FEE2E2";
            feedback.style.border = "1px solid #FCA5A5";
            feedback.style.color = "#991B1B";
            feedback.innerHTML = `
              <strong>Jawaban Kurang Tepat (${opKey})</strong><br>
              Kunci Jawaban yang Benar adalah <strong>${questionData.kunci}</strong>.<br>
              ${questionData.penjelasan}
            `;
          }
        });
      });
    }

    container.scrollTop = 0;
  };

  const openModuleReader = (mapel, bab) => {
    // Sembunyikan modal detail jika terbuka
    const modalDetail = document.getElementById("modal-detail-mapel");
    if (modalDetail) modalDetail.classList.remove("active");

    // Ambil data modul matematika sesuai bab
    let moduleData = null;
    if (mapel.id === "matematika" && initialData.modulMatematikaKelas9) {
      moduleData = initialData.modulMatematikaKelas9.find(m => m.id === bab.modulId || m.no === bab.no);
    }

    if (!moduleData) {
      moduleData = {
        id: `modul-${mapel.id}-${bab.no}`,
        no: bab.no,
        judul: bab.judul,
        mapel: mapel.nama,
        kelas: "Kelas IX SMP",
        kurikulum: "Kurikulum Merdeka / Fase D",
        waktuBaca: bab.durasi || "15 Menit Baca",
        capaian: [
          "Memahami kompetensi dasar dan konsep inti materi pembelajaran.",
          "Menganalisis contoh penerapan kontekstual dalam kehidupan nyata.",
          "Mengerjakan latihan mandiri untuk memperkuat penguasaan materi."
        ],
        petaKonsep: `${mapel.nama} ➔ Bab ${bab.no}: ${bab.judul} ➔ Ringkasan Materi & Evaluasi`,
        materiHtml: `
          <div class="module-section-card">
            <div class="module-badge-topic">Capaian Pembelajaran Bab ${bab.no}</div>
            <p class="module-lead-text">
              Modul ini membahas materi esensial <strong>${bab.judul}</strong> untuk siswa <strong>${mapel.nama}</strong> Kelas IX SMP sesuai kurikulum.
            </p>
            <div class="formula-box">
              <div class="formula-title">Tujuan Pembelajaran:</div>
              <div class="formula-item">• Memahami konsep dasar dan formula penting.</div>
              <div class="formula-item">• Mampu memecahkan soal latihan dengan tepat.</div>
            </div>
            <div class="tips-box">
              <strong>💡 Rekomendasi:</strong> Bacalah ringkasan materi dan coba kuis latihan untuk menguji pemahaman.
            </div>
          </div>
        `,
        contohSoal: [
          {
            no: 1,
            judul: `Latihan Pemahaman ${bab.judul}`,
            soal: `Pelajari konsep utama bab ini dan lanjutkan ke kuis evaluasi berkala untuk menguji kemampuan Anda.`,
            diketahui: `Materi Bab ${bab.no} ${mapel.nama}`,
            ditanya: `Pemahaman konsep materi`,
            pembahasan: `Pelajari rangkuman konsep dan lanjutkan ke evaluasi kuis.`,
            hasil: `Kompetensi Terpenuhi`
          }
        ],
        cekPemahaman: [
          {
            id: `cp-${mapel.id}-${bab.no}`,
            pertanyaan: `Apakah Anda sudah memahami materi pokok ${bab.judul}?`,
            opsi: [
              { label: "A", teks: "Ya, saya sudah memahami konsepnya" },
              { label: "B", teks: "Perlu latihan soal lebih lanjut" }
            ],
            kunci: "A",
            penjelasan: "Bagus! Silakan lanjutkan ke kuis evaluasi untuk menguji pemahaman."
          }
        ]
      };
    }

    activeModuleState = {
      mapel: mapel,
      bab: bab,
      moduleData: moduleData,
      currentTab: "konsep"
    };

    // Update Header
    document.getElementById("module-screen-badge-icon").textContent = mapel.icon || "📐";
    document.getElementById("module-screen-mapel-text").textContent = `${mapel.nama} • Kelas IX SMP`;
    document.getElementById("module-screen-title").textContent = `Bab ${bab.no}: ${moduleData.judul}`;
    document.getElementById("module-meta-duration").textContent = moduleData.waktuBaca || bab.durasi || "15 Menit Baca";

    // Update Status
    const isDone = bab.selesai;
    const statusEl = document.getElementById("module-meta-status");
    const statusIcon = document.getElementById("module-meta-status-icon");
    const statusText = document.getElementById("module-meta-status-text");
    if (isDone) {
      statusEl.className = "module-meta-tag status";
      statusIcon.textContent = "✓";
      statusText.textContent = "Sudah Selesai";
    } else {
      statusEl.className = "module-meta-tag";
      statusIcon.textContent = "📖";
      statusText.textContent = "Sedang Dipelajari";
    }

    // Tombol Tandai Selesai
    const completeBtn = document.getElementById("btn-mark-module-complete");
    const completeIcon = document.getElementById("module-complete-icon");
    const completeText = document.getElementById("module-complete-text");
    if (isDone) {
      completeBtn.classList.add("already-done");
      completeIcon.textContent = "✓";
      completeText.textContent = "Modul Selesai";
    } else {
      completeBtn.classList.remove("already-done");
      completeIcon.textContent = "✅";
      completeText.textContent = "Tandai Selesai (+20 Poin)";
    }

    // Reset Tab aktif ke "konsep"
    document.querySelectorAll(".module-nav-tab").forEach(tab => {
      tab.classList.toggle("active", tab.dataset.moduletab === "konsep");
    });

    renderModuleTabContent("konsep");

    // Buka tampilan layar modul
    document.getElementById("module-reader-screen").classList.add("active");
  };

  // 5. Modal Detail Mapel
  const openSubjectDetail = (mapel) => {
    document.getElementById("modal-mapel-icon").textContent = mapel.icon;
    document.getElementById("modal-mapel-nama").textContent = mapel.nama;
    document.getElementById("modal-mapel-sub").textContent = `${mapel.subnama} • Kelas IX SMP`;
    document.getElementById("modal-mapel-progress-text").textContent = `${mapel.progress}% Selesai (${mapel.babList.filter(b => b.selesai).length}/${mapel.babList.length} Bab)`;

    const chapterList = document.getElementById("modal-chapter-list");
    chapterList.innerHTML = "";

    mapel.babList.forEach((bab) => {
      const item = document.createElement("div");
      item.className = `chapter-item ${bab.selesai ? "completed" : ""}`;
      item.style.cursor = "pointer";
      item.innerHTML = `
        <div class="chapter-left">
          <div class="chapter-number" style="${bab.selesai ? 'background: #DCFCE7; color: #16A34A;' : ''}">
            ${bab.selesai ? "✓" : bab.no}
          </div>
          <div class="chapter-info">
            <h4>${bab.judul}</h4>
            <p>📖 Modul • ${bab.durasi || bab.waktuBaca || "15 Menit Baca"} ${bab.selesai ? "• Selesai ✓" : bab.aktif ? "• Sedang Dipelajari" : "• Belum Selesai"}</p>
          </div>
        </div>
        <button class="task-action-btn" style="${bab.selesai ? 'background: var(--bg-card-subtle); color: var(--text-secondary);' : 'background: var(--primary); color: #fff;'}">
          ${bab.selesai ? "Pelajari Lagi" : "Buka Modul"}
        </button>
      `;

      // Klik tombol atau baris bab langsung membuka Layar Modul Pembelajaran
      const triggerModule = () => openModuleReader(mapel, bab);
      item.querySelector("button").addEventListener("click", (e) => {
        e.stopPropagation();
        triggerModule();
      });
      item.addEventListener("click", triggerModule);

      chapterList.appendChild(item);
    });

    const btnUjian = document.getElementById("modal-btn-ujian");
    if (btnUjian) {
      btnUjian.onclick = () => {
        document.getElementById("modal-detail-mapel").classList.remove("active");
        const matchingTask = appState.tasks.find(t => t.mapel.toLowerCase().includes(mapel.nama.toLowerCase()) || mapel.nama.toLowerCase().includes(t.mapel.toLowerCase()));
        startQuiz(matchingTask || {
          id: `kuis-${mapel.id}`,
          mapel: mapel.nama,
          judul: `Kuis Evaluasi: ${mapel.nama}`,
          poin: 100,
          soalKey: mapel.soalKey
        });
      };
    }

    document.getElementById("modal-detail-mapel").classList.add("active");
  };

  // 6. Modal Mapel Lain (Katalog Semua Mapel)
  const renderAllSubjectsModal = () => {
    const listContainer = document.getElementById("all-subjects-list");
    const searchInput = document.getElementById("search-mapel-input");

    const renderList = (filterText = "") => {
      listContainer.innerHTML = "";
      const all = [...initialData.mapelUtama, ...initialData.mapelLain];
      const filtered = all.filter(m => m.nama.toLowerCase().includes(filterText.toLowerCase()));

      if (filtered.length === 0) {
        listContainer.innerHTML = `<div style="text-align: center; padding: 20px; color: var(--text-muted);">Mata pelajaran tidak ditemukan</div>`;
        return;
      }

      filtered.forEach(mapel => {
        const row = document.createElement("div");
        row.style.cssText = `
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          background: var(--bg-app);
          border: 1px solid var(--border-color);
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: background 0.2s;
        `;
        row.innerHTML = `
          <div style="display: flex; align-items: center; gap: 12px;">
            <span style="font-size: 22px;">${mapel.icon}</span>
            <div>
              <div style="font-weight: 700; font-size: 14px;">${mapel.nama}</div>
              <div style="font-size: 11px; color: var(--text-muted);">${mapel.subnama || 'Kurikulum Merdeka'}</div>
            </div>
          </div>
          <span style="font-size: 12px; font-weight: 700; color: var(--primary);">${mapel.progress || 0}%</span>
        `;
        row.addEventListener("click", () => {
          document.getElementById("modal-mapel-lain").classList.remove("active");
          if (mapel.babList) {
            openSubjectDetail(mapel);
          } else {
            alert(`Membuka silabus mata pelajaran ${mapel.nama}`);
          }
        });
        listContainer.appendChild(row);
      });
    };

    renderList();
    searchInput.addEventListener("input", (e) => renderList(e.target.value));
  };

  // 7. Render Tab 2: Tugas (ADL - Aktivitas Daftar Lembar Tugas)
  const renderTasks = () => {
    const container = document.getElementById("tasks-list-container");
    container.innerHTML = "";

    const counts = {
      semua: appState.tasks.length,
      belum: appState.tasks.filter(t => t.status === "belum").length,
      dinilai: appState.tasks.filter(t => t.status === "dinilai").length,
      selesai: appState.tasks.filter(t => t.status === "selesai").length
    };

    document.getElementById("count-semua").textContent = counts.semua;
    document.getElementById("count-belum").textContent = counts.belum;
    document.getElementById("count-dinilai").textContent = counts.dinilai;
    document.getElementById("count-selesai").textContent = counts.selesai;

    const filtered = appState.tasks.filter(t => {
      if (appState.taskFilter === "semua") return true;
      return t.status === appState.taskFilter;
    });

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 45px 20px; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-xl); border: 1.5px dashed var(--border-color);">
          <div style="font-size: 42px; margin-bottom: 10px;">📋</div>
          <h4 style="font-weight: 700; font-size: 15px; color: var(--text-main); margin-bottom: 4px;">Daftar Tugas Kosong</h4>
          <p style="font-size: 12.5px; line-height: 1.5;">Tidak ada tugas pada kategori ini. Semua tugas telah dibersihkan.</p>
        </div>
      `;
      renderDeadlineReminder();
      return;
    }

    filtered.forEach(task => {
      const item = document.createElement("div");
      item.className = "task-card-item";

      const badgeClass = task.status === "belum" ? "status-belum" : task.status === "dinilai" ? "status-dinilai" : "status-selesai";
      const statusText = task.status === "belum" ? "Belum Dikumpulkan" : task.status === "dinilai" ? `Nilai: ${task.nilai}/100` : "Telah Selesai";

      item.innerHTML = `
        <div class="task-header-row">
          <span class="task-mapel-tag">${task.mapel}</span>
          <span class="task-status-badge ${badgeClass}">${statusText}</span>
        </div>
        <div class="task-title">${task.judul}</div>
        <div class="task-desc">${task.deskripsi}</div>
        ${task.feedback ? `<div style="background: #F8FAFC; border-left: 3px solid var(--primary); padding: 6px 10px; font-size: 11.5px; color: var(--text-secondary); border-radius: 4px;">💬 Catatan Guru: "${task.feedback}"</div>` : ''}
        <div class="task-footer-row">
          <div class="task-deadline">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            Tenggat: ${task.tenggatTeks || new Date(task.deadline).toLocaleDateString("id-ID", { day: 'numeric', month: 'short' })}
          </div>
          ${task.status === "belum" ? `
            <button class="task-action-btn" data-action="quiz" data-id="${task.id}">⚡ Kerjakan Kuis</button>
          ` : `
            <button class="task-action-btn" style="background: var(--bg-card-subtle); color: var(--text-secondary);" data-action="view" data-id="${task.id}">Lihat Nilai & Berkas</button>
          `}
        </div>
      `;

      const actionBtn = item.querySelector(".task-action-btn");
      if (actionBtn && task.status === "belum") {
        actionBtn.addEventListener("click", () => {
          startQuiz(task);
        });
      } else if (actionBtn) {
        actionBtn.addEventListener("click", () => {
          showInteractiveModal(`Detail Tugas: ${task.judul}`, `
            <div>
              <div style="font-weight: 700; margin-bottom: 6px; font-size: 14px;">Status: <span style="color: var(--success);">Telah Selesai Dikumpulkan ✓</span></div>
              <div style="font-size: 13px; color: var(--text-secondary); margin-bottom: 12px;">Nilai yang diperoleh: <strong style="color: var(--primary); font-size: 16px;">${task.nilai || 100}/100</strong></div>
              ${task.feedback ? `<div style="background: var(--bg-card-subtle); border-left: 3px solid var(--primary); padding: 8px 12px; font-size: 12px; border-radius: 4px; margin-bottom: 14px;">💬 <strong>Catatan Guru:</strong><br>${task.feedback}</div>` : ''}
              <button class="continue-btn" id="btn-re-quiz" style="width: 100%;">
                Kerjakan Ulang Kuis 🔄
              </button>
            </div>
          `);
          const reBtn = document.getElementById("btn-re-quiz");
          if (reBtn) {
            reBtn.addEventListener("click", () => {
              document.getElementById("modal-interactive").classList.remove("active");
              startQuiz(task);
            });
          }
        });
      }

      container.appendChild(item);
    });
  };

  // Filter Chips Tugas
  document.querySelectorAll(".filter-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      document.querySelectorAll(".filter-chip").forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      appState.taskFilter = chip.dataset.filter;
      renderTasks();
    });
  });

  // 8. Render Tab 3: Jadwal Mapel
  const renderSchedule = () => {
    const container = document.getElementById("schedule-items-container");
    container.innerHTML = "";

    const items = initialData.jadwal[appState.selectedDay] || [];
    if (items.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 45px 20px; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-xl); border: 1.5px dashed var(--border-color);">
          <div style="font-size: 42px; margin-bottom: 10px;">📅</div>
          <h4 style="font-weight: 700; font-size: 15px; color: var(--text-main); margin-bottom: 4px;">Jadwal Pelajaran Kosong</h4>
          <p style="font-size: 12.5px; line-height: 1.5;">Tidak ada jadwal kelas untuk hari <strong>${appState.selectedDay}</strong>. Seluruh jadwal telah dibersihkan.</p>
        </div>
      `;
      return;
    }

    items.forEach(sch => {
      const card = document.createElement("div");
      card.className = `schedule-card ${sch.aktif ? "active-class" : ""}`;
      card.innerHTML = `
        <div class="schedule-icon-wrap">${sch.icon}</div>
        <div class="schedule-details">
          <div class="schedule-time">${sch.jam}</div>
          <div class="schedule-subject">${sch.mapel}</div>
          <div class="schedule-room">📍 ${sch.ruang} • ${sch.guru}</div>
        </div>
      `;
      container.appendChild(card);
    });
  };

  document.querySelectorAll(".day-pill").forEach(pill => {
    pill.addEventListener("click", () => {
      document.querySelectorAll(".day-pill").forEach(p => p.classList.remove("active"));
      pill.classList.add("active");
      appState.selectedDay = pill.dataset.day;
      renderSchedule();
    });
  });

  // 9. Render Lencana di Tab Profil
  const renderBadges = () => {
    const container = document.getElementById("badges-container");
    if (!container) return;
    container.innerHTML = "";

    const badges = initialData.lencanaList || [];

    if (badges.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 32px 16px; color: var(--text-muted); background: var(--bg-card); border-radius: var(--radius-xl); border: 1.5px dashed var(--border-color); grid-column: span 2; width: 100%;">
          <div style="font-size: 38px; margin-bottom: 8px;">🎖️</div>
          <h4 style="font-weight: 700; font-size: 14.5px; color: var(--text-main); margin-bottom: 4px;">Lencana Prestasi Kosong</h4>
          <p style="font-size: 12px; line-height: 1.5; max-width: 280px; margin: 0 auto 12px;">Seluruh lencana prestasi telah dibersihkan. Kerjakan tugas kuis kilat untuk mulai membuka lencana baru!</p>
          <button class="filter-chip" id="btn-reset-badge-catalog" style="font-size: 11.5px; padding: 6px 14px; font-weight: 700;">
            + Tampilkan Tantangan Lencana (Terkunci)
          </button>
        </div>
      `;

      const btnCatalog = document.getElementById("btn-reset-badge-catalog");
      if (btnCatalog) {
        btnCatalog.addEventListener("click", () => {
          initialData.lencanaList = [
            { nama: "Streak Master", icon: "🔥", desc: "Belajar 5 hari berturut-turut", didapat: false },
            { nama: "Peneliti Muda IPA", icon: "🔬", desc: "Menyelesaikan 10 modul IPA Terpadu", didapat: false },
            { nama: "Master Matematika", icon: "📐", desc: "Skor sempurna latihan Matematika", didapat: false },
            { nama: "Penutur Bahasa", icon: "🗣️", desc: "Selesaikan kuis bahasa daerah/asing", didapat: false },
            { nama: "Juara Kuis Kilat", icon: "🏆", desc: "Skor 80+ pada kuis evaluasi SMP", didapat: false }
          ];
          renderBadges();
        });
      }
      return;
    }

    badges.forEach(badge => {
      const box = document.createElement("div");
      box.className = "badge-item";
      box.style.opacity = badge.didapat ? "1" : "0.55";
      box.innerHTML = `
        <div class="badge-icon">${badge.icon}</div>
        <div style="flex: 1; min-width: 0;">
          <div class="badge-name">${badge.nama} ${badge.didapat ? '<span style="color: var(--success); font-weight: 800;">✓</span>' : '<span style="color: var(--text-muted); font-size: 11px;">🔒</span>'}</div>
          <div class="badge-desc">${badge.desc}</div>
        </div>
      `;
      container.appendChild(box);
    });
  };

  // 10. Navigasi 4 Tab Bawah (Home, Tugas ADL, Jadwal, Profil)
  const switchTab = (targetId) => {
    document.querySelectorAll(".view-screen").forEach(view => {
      view.classList.remove("active-view");
    });
    const targetView = document.getElementById(targetId);
    if (targetView) targetView.classList.add("active-view");

    document.querySelectorAll(".nav-item-btn").forEach(btn => {
      if (btn.dataset.target === targetId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    appState.currentTab = targetId;

    // Trigger re-render bila diperlukan
    if (targetId === "view-tugas") renderTasks();
    if (targetId === "view-jadwal") renderSchedule();
    if (targetId === "view-profil") renderBadges();
  };

  document.querySelectorAll(".nav-item-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      switchTab(btn.dataset.target);
    });
  });

  // Shortcut klik avatar header -> pindah ke Profil
  document.getElementById("btn-open-profile-from-header").addEventListener("click", () => {
    switchTab("view-profil");
  });

  // Listener Pembuka Runtunan Belajar (Streak Hub)
  const btnStreakHub = document.getElementById("btn-open-streak-hub");
  if (btnStreakHub) {
    btnStreakHub.addEventListener("click", () => openStreakHub());
  }

  const weeklyStreakWidget = document.getElementById("weekly-streak-widget");
  if (weeklyStreakWidget) {
    weeklyStreakWidget.addEventListener("click", () => openStreakHub());
  }

  const btnStreakProfile = document.getElementById("btn-open-streak-profile");
  if (btnStreakProfile) {
    btnStreakProfile.addEventListener("click", () => openStreakHub());
  }

  // 11. Modal Helper & Dialogs
  const showInteractiveModal = (title, htmlContent) => {
    document.getElementById("interactive-title").textContent = title;
    document.getElementById("interactive-content").innerHTML = htmlContent;
    document.getElementById("modal-interactive").classList.add("active");
  };

  // Close modals listener
  document.querySelectorAll("[data-close]").forEach(btn => {
    btn.addEventListener("click", () => {
      const targetModal = document.getElementById(btn.dataset.close);
      if (targetModal) targetModal.classList.remove("active");
    });
  });

  // Close modal when clicking outside sheet
  document.querySelectorAll(".modal-overlay").forEach(overlay => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) overlay.classList.remove("active");
    });
  });

  // Modal Notifikasi
  const renderNotifications = () => {
    const container = document.getElementById("notification-list-container");
    container.innerHTML = "";

    const hasUnread = appState.notifications.some(n => n.belumDibaca);
    document.getElementById("notif-badge").style.display = hasUnread ? "block" : "none";

    appState.notifications.forEach(n => {
      const card = document.createElement("div");
      card.style.cssText = `
        padding: 12px 14px;
        background: ${n.belumDibaca ? 'var(--primary-bg)' : 'var(--bg-app)'};
        border-radius: var(--radius-md);
        border: 1px solid var(--border-color);
      `;
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 4px;">
          <strong style="font-size: 13px; color: var(--text-main);">${n.judul}</strong>
          <span style="font-size: 10.5px; color: var(--text-muted);">${n.waktu}</span>
        </div>
        <p style="font-size: 12px; color: var(--text-secondary); line-height: 1.4;">${n.pesan}</p>
      `;
      container.appendChild(card);
    });
  };

  document.getElementById("btn-notification").addEventListener("click", () => {
    renderNotifications();
    document.getElementById("modal-notifikasi").classList.add("active");
    // Tandai sudah dibaca setelah dibuka
    setTimeout(() => {
      appState.notifications.forEach(n => n.belumDibaca = false);
      const badge = document.getElementById("notif-badge");
      if (badge) badge.style.display = "none";
    }, 1500);
  });

  // Sidebar Menu Drawer (Hamburger)
  const sidebar = document.getElementById("sidebar-menu");
  document.getElementById("btn-menu").addEventListener("click", () => {
    sidebar.classList.add("active");
  });
  document.getElementById("btn-close-sidebar").addEventListener("click", () => {
    sidebar.classList.remove("active");
  });
  sidebar.addEventListener("click", (e) => {
    if (e.target === sidebar) sidebar.classList.remove("active");
  });

  // Sidebar Actions
  document.getElementById("btn-toggle-theme").addEventListener("click", () => {
    appState.isDarkMode = !appState.isDarkMode;
    applyTheme(appState.isDarkMode);
  });

  document.getElementById("btn-menu-offline").addEventListener("click", () => {
    alert("Semua modul materi IPA Terpadu dan Matematika SMP telah disimpan secara offline di perangkat Anda.");
    sidebar.classList.remove("active");
  });

  document.getElementById("btn-menu-grade").addEventListener("click", () => {
    alert("Rata-rata Nilai Semester Ini: 92.5 (Peringkat 3 di Kelas 9B SMP Negeri 1 Prestasi Bangsa)");
    sidebar.classList.remove("active");
  });

  document.getElementById("btn-menu-help").addEventListener("click", () => {
    showInteractiveModal("Pusat Bantuan", `
      <div style="line-height: 1.6;">
        <h4 style="font-weight: 700; margin-bottom: 6px;">Cara Menggunakan Aplikasi Belajar SMP:</h4>
        <p style="margin-bottom: 8px;">1. <strong>Beranda:</strong> Pantau streak harian, materi IPA & Matematika, dan pilih 6 mapel utama.</p>
        <p style="margin-bottom: 8px;">2. <strong>Tugas (ADL):</strong> Kelola tugas, upload laporan praktikum, dan lihat nilai guru.</p>
        <p style="margin-bottom: 8px;">3. <strong>Jadwal:</strong> Cek ruangan dan jadwal pelajaran dari Senin hingga Jumat.</p>
        <p>4. <strong>Profil:</strong> Pantau poin belajar, peringkat kelas, dan lencana prestasi.</p>
      </div>
    `);
    sidebar.classList.remove("active");
  });

  document.getElementById("btn-menu-about").addEventListener("click", () => {
    showInteractiveModal("Tentang EduSmart SMP", `
      <div style="text-align: center; padding: 10px 0;">
        <div style="font-size: 36px; margin-bottom: 10px;">🎓</div>
        <h3 style="font-size: 16px; font-weight: 800; margin-bottom: 4px;">EduSmart SMP Edition</h3>
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">Versi 2.4.0 (Kurikulum Merdeka Jenjang SMP)</p>
        <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5;">
          Aplikasi pendamping belajar siswa Sekolah Menengah Pertama (SMP) untuk memfasilitasi pembelajaran interaktif IPA, Matematika, IPS, dan mapel terpadu lainnya.
        </p>
      </div>
    `);
    sidebar.classList.remove("active");
  });

  const authModal = document.getElementById("modal-auth");
  const authFeedback = document.getElementById("auth-feedback");
  const formRegister = document.getElementById("form-register");
  const formLogin = document.getElementById("form-login");
  const authAccountsPanel = document.getElementById("auth-accounts-panel");
  const authAccountsListEl = document.getElementById("auth-accounts-list");

  const showAuthFeedback = (msg, type = "error") => {
    if (!authFeedback) return;
    authFeedback.textContent = msg;
    authFeedback.className = `auth-feedback ${type}`;
    authFeedback.style.display = "block";
  };

  const clearAuthFeedback = () => {
    if (authFeedback) authFeedback.style.display = "none";
  };

  const applyActiveAccount = (account) => {
    activeAccount = account;
    appState.user = { ...account };
    localStorage.setItem(ACTIVE_ACCOUNT_KEY, account.id);
    renderHeader();
    renderAccountsList();
  };

  const renderAccountsList = () => {
    if (!authAccountsListEl) return;
    accountsList = loadAccounts();
    authAccountsListEl.innerHTML = accountsList.map(acc => {
      const isCurrent = acc.id === activeAccount.id;
      return `
        <div class="auth-account-item ${isCurrent ? "active" : ""}">
          <div class="auth-account-info">
            <img src="${acc.avatar}" alt="Avatar" class="auth-account-avatar">
            <div class="auth-account-meta">
              <div class="auth-account-name">${acc.nama} ${isCurrent ? "(Aktif)" : ""}</div>
              <div class="auth-account-sub">Kelas ${acc.kelas} • ${acc.email}</div>
            </div>
          </div>
          <div class="auth-account-actions">
            ${!isCurrent ? `<button type="button" class="auth-use-btn" data-switch-id="${acc.id}">Pakai</button>` : ""}
            ${accountsList.length > 1 && !isCurrent ? `<button type="button" class="auth-del-btn" data-delete-id="${acc.id}" title="Hapus Akun">✕</button>` : ""}
          </div>
        </div>
      `;
    }).join("");

    authAccountsListEl.querySelectorAll("[data-switch-id]").forEach(btn => {
      btn.addEventListener("click", () => {
        const target = accountsList.find(a => a.id === btn.dataset.switchId);
        if (target) {
          applyActiveAccount(target);
          authModal.classList.remove("active");
        }
      });
    });

    authAccountsListEl.querySelectorAll("[data-delete-id]").forEach(btn => {
      btn.addEventListener("click", () => {
        accountsList = accountsList.filter(a => a.id !== btn.dataset.deleteId);
        saveAccounts(accountsList);
        renderAccountsList();
      });
    });
  };

  const switchAuthTab = (tabName) => {
    clearAuthFeedback();
    document.querySelectorAll("[data-auth-tab]").forEach(b => {
      b.classList.toggle("active", b.dataset.authTab === tabName);
    });
    if (formRegister) formRegister.style.display = tabName === "register" ? "flex" : "none";
    if (formLogin) formLogin.style.display = tabName === "login" ? "flex" : "none";
    if (authAccountsPanel) authAccountsPanel.style.display = tabName === "accounts" ? "block" : "none";
    if (tabName === "accounts") renderAccountsList();
  };

  const openAuthModal = (defaultTab = "register") => {
    switchAuthTab(defaultTab);
    if (authModal) authModal.classList.add("active");
  };

  document.querySelectorAll("[data-auth-tab]").forEach(btn => {
    btn.addEventListener("click", () => switchAuthTab(btn.dataset.authTab));
  });

  const btnOpenAuth = document.getElementById("btn-open-auth");
  if (btnOpenAuth) {
    btnOpenAuth.addEventListener("click", () => {
      sidebar.classList.remove("active");
      openAuthModal("register");
    });
  }

  const btnProfileAuth = document.getElementById("btn-profile-auth");
  if (btnProfileAuth) {
    btnProfileAuth.addEventListener("click", () => openAuthModal("register"));
  }

  if (formRegister) {
    formRegister.addEventListener("submit", (e) => {
      e.preventDefault();
      const nama = document.getElementById("reg-nama").value.trim();
      const kelas = document.getElementById("reg-kelas").value.trim() || "9B";
      const nisnInput = document.getElementById("reg-nisn").value.trim();
      const email = document.getElementById("reg-email").value.trim().toLowerCase();
      const noHp = document.getElementById("reg-hp").value.trim() || "-";
      const password = document.getElementById("reg-password").value;

      if (!nama || !email || password.length < 4) {
        showAuthFeedback("Mohon isi nama, email valid, dan kata sandi min. 4 karakter.", "error");
        return;
      }

      accountsList = loadAccounts();
      if (accountsList.some(a => a.email.toLowerCase() === email)) {
        showAuthFeedback("Email sudah terdaftar. Silakan masuk atau gunakan email lain.", "error");
        return;
      }

      const newAccount = {
        id: "acc_" + Date.now(),
        nama,
        kelas,
        detailLain: initialData.user.detailLain || "Semester Ganjil 2024/2025",
        nisn: nisnInput || String(Math.floor(1000000000 + Math.random() * 9000000000)),
        sekolah: initialData.user.sekolah,
        email,
        noHp,
        password,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(nama)}&background=16A34A&color=fff&size=150`,
        streakHari: 1,
        targetHarianPersen: 0,
        targetHarianTeks: "0 dari 4 materi selesai",
        waktuBelajarHariIni: "0j 0m",
        poin: 0,
        peringkatKelas: accountsList.length + 1
      };

      accountsList.push(newAccount);
      saveAccounts(accountsList);
      applyActiveAccount(newAccount);
      formRegister.reset();
      document.getElementById("reg-kelas").value = "9B";
      authModal.classList.remove("active");
    });
  }

  if (formLogin) {
    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const identifier = document.getElementById("login-identifier").value.trim().toLowerCase();
      const password = document.getElementById("login-password").value;

      accountsList = loadAccounts();
      const matched = accountsList.find(a =>
        (a.email.toLowerCase() === identifier || a.nisn === identifier) && a.password === password
      );

      if (!matched) {
        showAuthFeedback("Email/NISN atau kata sandi salah.", "error");
        return;
      }

      applyActiveAccount(matched);
      formLogin.reset();
      authModal.classList.remove("active");
    });
  }

  document.getElementById("btn-logout").addEventListener("click", () => {
    if (confirm("Apakah Anda yakin ingin keluar atau ganti akun?")) {
      sidebar.classList.remove("active");
      openAuthModal("login");
    }
  });

  // Tombol "Mapel Lain" di Card Beranda
  document.getElementById("btn-open-mapel-lain").addEventListener("click", () => {
    renderAllSubjectsModal();
    document.getElementById("modal-mapel-lain").classList.add("active");
  });

  // Card "Lanjutkan Belajar" di Beranda (Membuka Modul Matematika Kelas 9 yang Sedang Berjalan)
  document.getElementById("btn-continue-learning").addEventListener("click", () => {
    const mathSubject = initialData.mapelUtama.find(m => m.id === "matematika");
    if (mathSubject) {
      // Buka bab 2 (Persamaan & Fungsi Kuadrat) atau bab aktif
      const activeBab = mathSubject.babList.find(b => b.modulId === "mat-bab-2") || mathSubject.babList[1] || mathSubject.babList[0];
      openModuleReader(mathSubject, activeBab);
    }
  });

  // Setup Event Listener untuk Layar Modul Pembelajaran (Module Reader)
  document.querySelectorAll(".module-nav-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      document.querySelectorAll(".module-nav-tab").forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderModuleTabContent(tab.dataset.moduletab);
    });
  });

  const closeModuleReader = () => {
    document.getElementById("module-reader-screen").classList.remove("active");
    if (activeModuleState.mapel) {
      openSubjectDetail(activeModuleState.mapel);
    }
  };
  const btnModuleBack = document.getElementById("btn-module-back");
  if (btnModuleBack) btnModuleBack.addEventListener("click", closeModuleReader);

  const btnModuleClose = document.getElementById("btn-module-close");
  if (btnModuleClose) btnModuleClose.addEventListener("click", closeModuleReader);

  // Tandai Modul Selesai (+20 Poin Belajar & Progres Mapel)
  const btnMarkComplete = document.getElementById("btn-mark-module-complete");
  if (btnMarkComplete) {
    btnMarkComplete.addEventListener("click", () => {
      if (!activeModuleState.bab) return;
      const bab = activeModuleState.bab;
      const mapel = activeModuleState.mapel;

      if (!bab.selesai) {
        bab.selesai = true;
        bab.aktif = false;

        // Tambah poin siswa
        appState.user.poin += 20;
        renderHeader();

        // Hitung ulang progres mata pelajaran
        const doneCount = mapel.babList.filter(b => b.selesai).length;
        mapel.progress = Math.round((doneCount / mapel.babList.length) * 100);

        // Perbarui streak aktivitas harian
        triggerStreakActivity(`Selesai Belajar Modul: ${bab.judul}`);

        // Update tampilan tombol di footer modul
        btnMarkComplete.classList.add("already-done");
        document.getElementById("module-complete-icon").textContent = "✓";
        document.getElementById("module-complete-text").textContent = "Modul Selesai";

        // Update tag status di header modul
        const statusEl = document.getElementById("module-meta-status");
        if (statusEl) {
          statusEl.className = "module-meta-tag status";
          document.getElementById("module-meta-status-icon").textContent = "✓";
          document.getElementById("module-meta-status-text").textContent = "Sudah Selesai";
        }

        alert(`🎉 Luar Biasa!\n\nAnda telah menyelesaikan Modul Bab ${bab.no}: "${bab.judul}".\n+20 Poin Belajar berhasil diperoleh dan progres mata pelajaran telah diperbarui!`);
      } else {
        alert(`Modul Bab ${bab.no} sudah selesai dipelajari sebelumnya. Sangat baik untuk terus membaca ulang materi!`);
      }
    });
  }

  // Tombol Lanjut ke Kuis dari Footer Modul
  const btnModuleQuiz = document.getElementById("btn-goto-module-quiz");
  if (btnModuleQuiz) {
    btnModuleQuiz.addEventListener("click", () => {
      const mapel = activeModuleState.mapel || initialData.mapelUtama.find(m => m.id === "matematika");
      document.getElementById("module-reader-screen").classList.remove("active");

      const matchingTask = appState.tasks.find(t => t.mapel.toLowerCase().includes(mapel.nama.toLowerCase()) || mapel.nama.toLowerCase().includes(t.mapel.toLowerCase()));
      startQuiz(matchingTask || {
        id: `kuis-${mapel.id}`,
        mapel: mapel.nama,
        judul: `Kuis Evaluasi: ${mapel.nama}`,
        poin: 100,
        soalKey: mapel.soalKey || "kuisMatematikaKelas9"
      });
    });
  }

  // Urgent Task Reminder Click -> Langsung buka tugas kuis yang belum dikerjakan
  document.getElementById("btn-open-urgent-task").addEventListener("click", () => {
    const urgentTask = appState.tasks.find(t => t.status === "belum");
    if (urgentTask) {
      startQuiz(urgentTask);
    } else {
      switchTab("view-tugas");
    }
  });

  // Kuis Kilat: Pemilih Mengerjakan Tugas yang Belum Selesai (IPA, Matematika, B. Inggris)
  const openKuisKilatSelector = () => {
    const pendingTasks = appState.tasks.filter(t => t.status === "belum");
    if (pendingTasks.length === 0) {
      showInteractiveModal("⚡ Kuis Kilat - Tugas Sekolah", `
        <div style="text-align: center; padding: 20px 10px;">
          <div style="font-size: 46px; margin-bottom: 12px;">🎉</div>
          <h4 style="font-size: 16px; font-weight: 800; color: var(--text-main); margin-bottom: 6px;">Semua Tugas Selesai!</h4>
          <p style="font-size: 13px; color: var(--text-secondary); line-height: 1.5; margin-bottom: 18px;">
            Luar biasa! Kamu sudah menyelesaikan seluruh tugas kuis kilat jenjang SMP. Semua tugas telah dikumpulkan dengan nilai optimal.
          </p>
          <button class="continue-btn" id="btn-practice-free" style="width: 100%;">
            Latihan Bebas (Kuis Matematika 10 Soal) 🔄
          </button>
        </div>
      `);
      const freeBtn = document.getElementById("btn-practice-free");
      if (freeBtn) {
        freeBtn.addEventListener("click", () => {
          document.getElementById("modal-interactive").classList.remove("active");
          startQuiz(null);
        });
      }
      return;
    }

    let taskItemsHtml = pendingTasks.map((t) => {
      let icon = "📚";
      let badgeColor = "var(--primary)";
      if (t.mapel === "IPA") { icon = "🔬"; badgeColor = "#0284C7"; }
      else if (t.mapel === "Matematika") { icon = "📐"; badgeColor = "#4F46E5"; }
      else if (t.mapel === "IPS") { icon = "🌍"; badgeColor = "#059669"; }
      else if (t.mapel === "PAI") { icon = "🕌"; badgeColor = "#0D9488"; }
      else if (t.mapel === "Seni Budaya" || t.mapel === "Seni budaya") { icon = "🎨"; badgeColor = "#EA580C"; }
      else if (t.mapel === "Bahasa Arab") { icon = "📜"; badgeColor = "#16A34A"; }
      else if (t.mapel === "Bahasa Inggris" || t.mapel === "B. Inggris") { icon = "🌏"; badgeColor = "#9333EA"; }
      else if (t.mapel === "Bahasa Indonesia") { icon = "📚"; badgeColor = "#E11D48"; }
      else if (t.mapel === "Bahasa Sunda") { icon = "🎋"; badgeColor = "#D97706"; }

      const questionCount = t.soalKey && initialData[t.soalKey] ? initialData[t.soalKey].length : 5;

      return `
        <div style="background: var(--bg-card); border: 1.5px solid var(--border-color); border-radius: var(--radius-md); padding: 12px 14px; display: flex; flex-direction: column; gap: 8px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 11px; font-weight: 800; color: ${badgeColor}; background: var(--bg-card-subtle); padding: 3px 8px; border-radius: 6px;">
              ${icon} ${t.mapel}
            </span>
            <span style="font-size: 11px; color: #EA580C; font-weight: 700;">
              ⏰ ${t.tenggatTeks || 'Tenggat Dekat'}
            </span>
          </div>
          <div>
            <div style="font-weight: 800; font-size: 13.5px; color: var(--text-main); margin-bottom: 2px;">${t.judul}</div>
            <div style="font-size: 11.5px; color: var(--text-muted);">${t.deskripsi}</div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px; padding-top: 8px; border-top: 1px dashed var(--border-color);">
            <span style="font-size: 11.5px; color: var(--text-secondary); font-weight: 600;">
              📝 ${questionCount} Soal • +${t.poin} Poin
            </span>
            <button class="continue-btn btn-start-task-quiz" data-task-id="${t.id}" style="padding: 6px 14px; font-size: 12px; border-radius: var(--radius-full);">
              Kerjakan ⚡
            </button>
          </div>
        </div>
      `;
    }).join("");

    showInteractiveModal("⚡ Kuis Kilat: Tugas Belum Selesai", `
      <div>
        <p style="font-size: 12.5px; color: var(--text-secondary); margin-bottom: 12px; line-height: 1.45;">
          Berikut tugas SMP yang belum dikerjakan. Pilih tugas untuk diselesaikan langsung melalui kuis kilat interaktif:
        </p>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          ${taskItemsHtml}
        </div>
      </div>
    `);

    setTimeout(() => {
      document.querySelectorAll(".btn-start-task-quiz").forEach(btn => {
        btn.addEventListener("click", () => {
          const taskId = btn.dataset.taskId;
          const targetTask = appState.tasks.find(t => t.id === taskId);
          document.getElementById("modal-interactive").classList.remove("active");
          if (targetTask) {
            startQuiz(targetTask);
          }
        });
      });
    }, 50);
  };

  // Quick Action Buttons (Improvisasi Tengah Jenjang SMP)
  document.getElementById("quick-action-quiz").addEventListener("click", () => {
    openKuisKilatSelector();
  });

  // ==========================================================================
  // SISTEM AI TUTOR SOKRATIK (BIMBINGAN LANGKAH DEMI LANGKAH TANPA LANGSUNG JAWABAN)
  // ==========================================================================
  let aiTutorChatHistory = [
    {
      id: "ai-welcome",
      sender: "ai",
      type: "welcome",
      text: `Halo ${appState.user.nama || 'Ahmad Rayhan'}! 👋 Aku <strong>AI Tutor Sokratik Kelas 9B</strong>.<br><br>Aku di sini untuk membimbingmu memahami konsep dan memecahkan soal-soal pelajaran <strong>tanpa langsung memberikan jawaban akhir</strong>. Aku akan memandu langkah demi langkah agar kamu benar-benar paham cara mengerjakannya! 💡<br><br>Silakan pilih pertanyaan contoh di atas atau ketik soal yang ingin kamu pelajari.`
    }
  ];

  let currentPendingChallenge = null;

  const renderAiTutorMessages = () => {
    const area = document.getElementById("ai-tutor-messages-area");
    if (!area) return;

    area.innerHTML = aiTutorChatHistory.map(msg => {
      if (msg.sender === "user") {
        return `
          <div class="ai-msg-row ai-outgoing">
            <div class="ai-user-avatar">9B</div>
            <div class="ai-msg-bubble">
              <p>${msg.text}</p>
            </div>
          </div>
        `;
      } else {
        if (msg.type === "welcome" || msg.type === "simple") {
          return `
            <div class="ai-msg-row ai-incoming">
              <div class="ai-avatar-icon">🤖</div>
              <div class="ai-msg-bubble">
                <div class="ai-msg-sender">AI Tutor Pembimbing • Kelas 9B</div>
                <div style="font-size: 13px; line-height: 1.6; color: var(--text-main);">${msg.text}</div>
              </div>
            </div>
          `;
        }

        // Socratic Step-by-Step Response Card
        return `
          <div class="ai-msg-row ai-incoming">
            <div class="ai-avatar-icon">🤖</div>
            <div class="ai-msg-bubble">
              <div class="ai-msg-sender">AI Tutor Pembimbing • Bimbingan Langkah demi Langkah</div>

              <!-- Langkah 1: Analisis Masalah -->
              <div class="socratic-step-card">
                <div class="step-card-header">
                  <span class="step-badge">Langkah 1</span>
                  <strong>Identifikasi & Analisis Masalah</strong>
                </div>
                <div class="step-card-body">
                  ${msg.stepAnalysis}
                </div>
              </div>

              <!-- Langkah 2: Konsep & Formula Kunci -->
              <div class="socratic-step-card">
                <div class="step-card-header">
                  <span class="step-badge">Langkah 2</span>
                  <strong>Konsep / Formula Kunci yang Digunakan</strong>
                </div>
                <div class="step-card-body">
                  <div class="ai-formula-highlight">${msg.stepFormula}</div>
                  <div style="margin-top: 4px;">${msg.stepStrategy}</div>
                </div>
              </div>

              <!-- Langkah 3: Pengerjaan Terbimbing -->
              <div class="socratic-step-card">
                <div class="step-card-header">
                  <span class="step-badge">Langkah 3</span>
                  <strong>Pengerjaan Terbimbing</strong>
                </div>
                <div class="step-card-body">
                  ${msg.stepExecution}
                </div>
              </div>

              <!-- Langkah 4: Giliran Siswa (Tantangan Sokratik) -->
              <div class="socratic-step-card" style="border: 1.5px solid #FDE68A; background: #FFFDF5;">
                <div class="step-card-header" style="background: #FEF3C7;">
                  <span class="step-badge challenge">Langkah 4</span>
                  <strong style="color: #92400E;">🎯 Sekarang Giliranmu Menyelesaikan!</strong>
                </div>
                <div class="step-card-body">
                  <p class="challenge-prompt">${msg.challengePrompt}</p>
                </div>
              </div>

              <!-- Action Buttons -->
              <div class="ai-msg-actions">
                <button class="ai-action-btn hint-btn" data-hint-id="${msg.id}">
                  💡 Butuh Petunjuk Tambahan
                </button>
                <button class="ai-action-btn reveal-btn" data-reveal-id="${msg.id}">
                  🔍 Buka Kunci Jawaban Lengkap
                </button>
              </div>
            </div>
          </div>
        `;
      }
    }).join("");

    // Event listener untuk tombol bantuan sokratik
    area.querySelectorAll(".hint-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const msgId = btn.dataset.hintId;
        const msg = aiTutorChatHistory.find(m => m.id === msgId);
        if (msg && msg.hintText) {
          aiTutorChatHistory.push({
            id: `hint-${Date.now()}`,
            sender: "ai",
            type: "simple",
            text: `💡 <strong>Petunjuk Tambahan untukmu:</strong><br>${msg.hintText}`
          });
          renderAiTutorMessages();
        }
      });
    });

    area.querySelectorAll(".reveal-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const msgId = btn.dataset.revealId;
        const msg = aiTutorChatHistory.find(m => m.id === msgId);
        if (msg && msg.fullSolution) {
          aiTutorChatHistory.push({
            id: `sol-${Date.now()}`,
            sender: "ai",
            type: "simple",
            text: `🔍 <strong>Kunci Jawaban & Pembahasan Lengkap:</strong><br>${msg.fullSolution}`
          });
          renderAiTutorMessages();
        }
      });
    });

    area.scrollTo({ top: area.scrollHeight, behavior: 'smooth' });
  };

  const generateSocraticResponse = (query) => {
    const q = query.toLowerCase();

    // 1. Cek apakah ini jawaban dari tantangan sebelumnya
    if (currentPendingChallenge) {
      const targetAns = currentPendingChallenge.answerKeywords;
      const isMatch = targetAns.some(k => q.includes(k.toLowerCase()));

      if (isMatch) {
        const solvedMsg = {
          id: `eval-${Date.now()}`,
          sender: "ai",
          type: "simple",
          text: `🎉 <strong>Luar Biasa, Jawabanmu Tepat Sekali!</strong><br><br>${currentPendingChallenge.praiseText}<br><br><strong>Kunci Akhir:</strong> ${currentPendingChallenge.fullAnswer}<br><br>Hebat! Dengan menyelesaikan langkah ini sendiri, pemahaman konsepmu menjadi jauh lebih kuat. Ada soal atau materi lain yang ingin kamu diskusikan?`
        };
        currentPendingChallenge = null;
        return solvedMsg;
      }
    }

    // 2. Persamaan Kuadrat (x² - 5x + 6 = 0 / akar / pemfaktoran)
    if (q.includes("persamaan kuadrat") || q.includes("x²") || q.includes("x^2") || q.includes("akar kuadrat") || (q.includes("akar") && q.includes("5x"))) {
      currentPendingChallenge = {
        answerKeywords: ["2", "3", "x=2", "x=3", "dua", "tiga"],
        praiseText: "Kamu berhasil menemukan bahwa pembuat nol dari (x - 2)(x - 3) = 0 adalah x = 2 atau x = 3!",
        fullAnswer: "x₁ = 2 atau x₂ = 3."
      };
      return {
        id: `socr-${Date.now()}`,
        sender: "ai",
        type: "socratic",
        stepAnalysis: `Persamaan kuadrat yang diberikan adalah <strong>x² - 5x + 6 = 0</strong>.<br>Bentuk umum persamaan kuadrat: ax² + bx + c = 0.<br>Maka kita ketahui:<br>• Koefisien a = 1<br>• Koefisien b = -5<br>• Konstanta c = 6`,
        stepFormula: `Metode Pemfaktoran: (x + p)(x + q) = 0`,
        stepStrategy: `Kita harus mencari dua bilangan p dan q yang memenuhi dua syarat sekaligus:<br>1. Hasil kali: p × q = c = 6<br>2. Hasil jumlah: p + q = b = -5`,
        stepExecution: `Mari kita uji pasangan faktor dari 6:<br>• 1 × 6 = 6, tetapi 1 + 6 = 7 (bukan -5)<br>• (-1) × (-6) = 6, tetapi (-1) + (-6) = -7 (bukan -5)<br>• 2 × 3 = 6, tetapi 2 + 3 = 5 (bukan -5)<br>• <strong>(-2) × (-3) = 6</strong>, dan <strong>(-2) + (-3) = -5</strong> ➔ <em>Cocok!</em><br><br>Maka faktor persamaannya menjadi: <strong>(x - 2)(x - 3) = 0</strong>.`,
        challengePrompt: `Agar perkalian (x - 2)(x - 3) menghasilkan 0, maka salah satu faktornya harus bernilai 0.<br>Coba kamu tentukan: <strong>Berapakah nilai x₁ dan x₂ yang memenuhi persamaan tersebut?</strong><br><em>(Ketik jawabanmu di kolom chat di bawah!)</em>`,
        hintText: `Ingat konsep pembuat nol:<br>Jika (x - 2) = 0, maka x = ...?<br>Jika (x - 3) = 0, maka x = ...?`,
        fullSolution: `(x - 2) = 0 ➔ <strong>x₁ = 2</strong><br>(x - 3) = 0 ➔ <strong>x₂ = 3</strong><br>Jadi akar-akar penyelesaiannya adalah <strong>x = 2 atau x = 3</strong>.`
      };
    }

    // 3. Bentuk Akar (√72 + √50 - √18)
    if (q.includes("bentuk akar") || q.includes("72") || q.includes("akar") && (q.includes("50") || q.includes("18"))) {
      currentPendingChallenge = {
        answerKeywords: ["8", "8√2", "8 akar 2", "delapan"],
        praiseText: "Perhitunganmu tepat! (6 + 5 - 3) = 8, sehingga hasilnya adalah 8√2.",
        fullAnswer: "8√2."
      };
      return {
        id: `socr-${Date.now()}`,
        sender: "ai",
        type: "socratic",
        stepAnalysis: `Kita ingin menyederhanakan operasi hitung bentuk akar: <strong>√72 + √50 - √18</strong>.`,
        stepFormula: `Sifat Bentuk Akar: √(a × b) = √a × √b (dengan a bilangan kuadrat sempurna)`,
        stepStrategy: `Bentuk akar hanya bisa dijumlahkan atau dikurangkan jika bilangan di dalam akarnya sama (akar sejenis). Kita harus memecah setiap angka di dalam akar menjadi faktor kuadrat sempurna (4, 9, 16, 25, 36, 49, dst).`,
        stepExecution: `Mari kita sederhanakan satu per satu:<br>• √72 = √(36 × 2) = √36 × √2 = <strong>6√2</strong><br>• √50 = √(25 × 2) = √25 × √2 = <strong>5√2</strong><br>• √18 = √(9 × 2) = √9 × √2 = <strong>3√2</strong><br><br>Sekarang gabungkan suku-sukunya: 6√2 + 5√2 - 3√2 = (6 + 5 - 3)√2.`,
        challengePrompt: `Ketiga suku sekarang sudah sama-sama memiliki akar √2.<br><strong>Sekarang coba kamu hitung: Berapakah hasil akhir dari (6 + 5 - 3)√2 ?</strong>`,
        hintText: `Hitung operasi bilangan bulat di dalam kurung: 6 ditambah 5, lalu dikurangi 3. Kemudian tempelkan √2 di belakangnya.`,
        fullSolution: `6 + 5 - 3 = 8.<br>Maka hasil akhirnya adalah <strong>8√2</strong>.`
      };
    }

    // 4. Kesebangunan Bayangan (Pohon 6m, bayangan 4m, bayangan tiang 10m)
    if (q.includes("bayangan") || q.includes("pohon") || q.includes("sebangun") || q.includes("tiang")) {
      currentPendingChallenge = {
        answerKeywords: ["15", "15m", "15 meter", "lima belas"],
        praiseText: "Luar biasa! 60 dibagi 4 adalah 15 meter, tinggi tiang bendera sudah kamu temukan dengan benar!",
        fullAnswer: "15 meter."
      };
      return {
        id: `socr-${Date.now()}`,
        sender: "ai",
        type: "socratic",
        stepAnalysis: `Kita memiliki dua objek pada waktu yang sama:<br>• Pohon: Tinggi = 6 meter, Bayangan = 4 meter.<br>• Tiang Bendera: Tinggi = t (dicari), Bayangan = 10 meter.`,
        stepFormula: `Perbandingan Kesebangunan: (Tinggi Tiang) / (Tinggi Pohon) = (Bayangan Tiang) / (Bayangan Pohon)`,
        stepStrategy: `Karena sinar matahari datang pada sudut yang sama di waktu yang sama, objek dan bayangannya membentuk dua segitiga siku-siku yang sebangun. Sisi-sisi yang bersesuaian memiliki rasio yang senilai.`,
        stepExecution: `Masukkan angka ke dalam persamaan perbandingan:<br>t / 6 = 10 / 4<br><br>Gunakan perkalian silang untuk mencari nilai t:<br>t = (6 × 10) / 4<br>t = 60 / 4`,
        challengePrompt: `Langkah terakhir sangat mudah!<br><strong>Coba kamu hitung: Berapakah hasil dari 60 ÷ 4 untuk mendapatkan tinggi tiang bendera tersebut?</strong>`,
        hintText: `60 dibagi 2 adalah 30, lalu 30 dibagi 2 lagi adalah ... ?`,
        fullSolution: `t = 60 / 4 = <strong>15 meter</strong>.<br>Jadi tinggi tiang bendera tersebut adalah 15 meter.`
      };
    }

    // 5. IPA: Golongan Darah & Jantung
    if (q.includes("golongan darah") || q.includes("darah") || q.includes("jantung") || q.includes("donor") || q.includes("resipien")) {
      currentPendingChallenge = {
        answerKeywords: ["ab", "semua", "a, b, ab, o", "a b ab o", "resipien universal"],
        praiseText: "Benar sekali! Pasien bergolongan darah AB tidak memiliki antibodi anti-A maupun anti-B, sehingga aman menerima darah dari semua golongan (A, B, AB, dan O).",
        fullAnswer: "Golongan darah A, B, AB, dan O (semua golongan darah)."
      };
      return {
        id: `socr-${Date.now()}`,
        sender: "ai",
        type: "socratic",
        stepAnalysis: `Transfusi darah ditentukan oleh kecocokan antara <strong>Aglutinogen (Antigen)</strong> pada eritrosit donor dengan <strong>Aglutinin (Antibodi)</strong> pada plasma darah resipien.`,
        stepFormula: `Aturan Transfusi Darah Sistem ABO:<br>• Golongan A: Antigen A, Antibodi anti-B<br>• Golongan B: Antigen B, Antibodi anti-A<br>• Golongan AB: Antigen A & B, Tanpa Antibodi<br>• Golongan O: Tanpa Antigen, Antibodi anti-A & anti-B`,
        stepStrategy: `Penggumpalan (aglutinasi) terjadi jika Antigen donor bertemu dengan Antibodi yang sejenis pada resipien (misal Antigen A bertemu Anti-A).<br>Oleh karena itu, Golongan O disebut <em>Donor Universal</em>, sedangkan Golongan AB disebut <em>Resipien Universal</em>.`,
        stepExecution: `Karakteristik penting golongan darah AB:<br>Karena plasma darah golongan AB TIDAK memiliki antibodi anti-A maupun anti-B, maka sel darah merah donor dari golongan apa pun tidak akan digumpalkan di dalam tubuhnya.`,
        challengePrompt: `Berdasarkan prinsip Resipien Universal di atas:<br><strong>Jika seorang pasien bergolongan darah AB membutuhkan transfusi darurat, golongan darah apa sajakah yang aman ia terima?</strong>`,
        hintText: `Ingat julukannya: 'Resipien Universal' (resipien = penerima, universal = umum/seluruh).`,
        fullSolution: `Pasien golongan AB dapat menerima darah dari <strong>golongan A, B, AB, maupun O</strong> (semua golongan darah aman).`
      };
    }

    // 6. Bahasa Inggris: Procedure Text
    if (q.includes("procedure") || q.includes("recipe") || q.includes("inggris") || q.includes("imperative")) {
      currentPendingChallenge = {
        answerKeywords: ["pour", "stir", "tuang", "aduk"],
        praiseText: "Tepat sekali! 'Pour' (tuangkan) dan 'Stir' (aduk) adalah imperative verbs (kata kerja perintah/aksi) yang menjadi ciri utama teks prosedur.",
        fullAnswer: "Pour dan Stir."
      };
      return {
        id: `socr-${Date.now()}`,
        sender: "ai",
        type: "socratic",
        stepAnalysis: `Procedure Text bertujuan untuk menjelaskan bagaimana sesuatu dibuat, digunakan, atau dilakukan melalui serangkaian langkah teratur.`,
        stepFormula: `Generic Structure: Goal/Aim ➔ Materials/Ingredients ➔ Steps/Methods`,
        stepStrategy: `Ciri kebahasaan penting:<br>1. Menggunakan <em>Simple Present Tense</em>.<br>2. Menggunakan <em>Imperative Sentences</em> (kalimat perintah diawali kata kerja bentuk pertama tanpa subjek).<br>3. Menggunakan <em>Temporal Connectives</em> (First, Next, Then, Finally).`,
        stepExecution: `Perhatikan contoh kalimat instruksi dalam resep teh manis berikut:<br><em>'First, boil the water. Then, <strong>pour</strong> the hot water into the cup and <strong>stir</strong> well.'</em>`,
        challengePrompt: `Pada kalimat instruksi di atas, terdapat kata kerja aksi/perintah (imperative verb).<br><strong>Sebutkan kata kerja perintah yang terdapat pada kalimat kedua ('... the hot water into the cup and ... well')!</strong>`,
        hintText: `Ada 2 kata kerja tindakan: satu berarti 'menuangkan', dan satu berarti 'mengaduk'.`,
        fullSolution: `Kata kerja imperatifnya adalah <strong>Pour</strong> (tuangkan) dan <strong>Stir</strong> (aduk).`
      };
    }

    // 7. Bahasa Arab: Jam & Waktu (As-Sa'ah)
    if (q.includes("jam") || q.includes("sa'ah") || q.includes("arab") || q.includes("waktu")) {
      currentPendingChallenge = {
        answerKeywords: ["al-khaamisah", "an-nishf", "wan-nishfu", "lima", "khamisah"],
        praiseText: "Mumtaz! Polanya adalah اَلسَّاعَةُ الْخَامِسَةُ (jam lima) + وَالنِّصْفُ (lebih 30 menit).",
        fullAnswer: "اَلسَّاعَةُ الْخَامِسَةُ وَالنِّصْفُ (As-saa'atul khaamisatu wan-nishfu)."
      };
      return {
        id: `socr-${Date.now()}`,
        sender: "ai",
        type: "socratic",
        stepAnalysis: `Menyatakan jam/waktu dalam bahasa Arab menggunakan pola bilangan bertingkat bentuk feminin (muannats): <strong>فَاعِلَة (Faa'ilah)</strong>.`,
        stepFormula: `Rumus Waktu: اَلسَّاعَةُ + (Angka Jam) + [وَ (lebih) / إِلَّا (kurang)] + [Menit]`,
        stepStrategy: `Kaidah kunci:<br>• Jam 1: Al-Waahidah<br>• Jam 2: Ats-Tsaaniyah<br>• Jam 3: Ats-Tsaalitsah<br>• Jam 4: Ar-Raabi'ah<br>• Jam 5: Al-Khaamisah<br>• Lebih 30 Menit (setengah): وَالنِّصْفُ (wan-nishf)<br>• Lebih 15 Menit (seperempat): وَالرُّبْعُ (war-rub'u)`,
        stepExecution: `Jika ingin menyusun kalimat waktu pukul <strong>05.30</strong> (Jam lima lebih tiga puluh menit):<br>1. Kata jam: اَلسَّاعَةُ (As-saa'ah)<br>2. Jam lima: الْخَامِسَةُ (Al-khaamisah)<br>3. Dan setengah: وَالنِّصْفُ (Wan-nishf)`,
        challengePrompt: `<strong>Coba kamu rangkai ketiga bagian di atas menjadi satu kalimat utuh bahasa Arab untuk menyatakan pukul 05.30!</strong>`,
        hintText: `Gabungkan kata: As-saa'ah + Al-khaamisah + Wan-nishf.`,
        fullSolution: `Pukul 05.30 dalam bahasa Arab adalah: <strong>اَلسَّاعَةُ الْخَامِسَةُ وَالنِّصْفُ</strong> (As-saa'atul khaamisatu wan-nishfu).`
      };
    }

    // 8. Default Smart Fallback Socratic Guide
    return {
      id: `socr-${Date.now()}`,
      sender: "ai",
      type: "socratic",
      stepAnalysis: `Pertanyaanmu: <em>"${query}"</em>.<br>Mari kita bedah topik ini berdasarkan kompetensi materi Kelas 9 SMP.`,
      stepFormula: `Prinsip Dasar Pembelajaran: Pahami Definisi ➔ Temukan Pola / Formula ➔ Terapkan pada Kasus`,
      stepStrategy: `Dalam menyelesaikan masalah pembelajaran, mulailah dengan menentukan data atau konsep inti yang menjadi kunci, kemudian hubungkan dengan hukum atau rumus yang berlaku.`,
      stepExecution: `Langkah awal yang dianjurkan guru:<br>1. Catat konsep utama dan variabel yang diketahui.<br>2. Identifikasi rumus atau kaidah kurikulum yang relevan.<br>3. Uji langkah penyelesaian secara bertahap tanpa terburu-buru mengambil kesimpulan.`,
      challengePrompt: `<strong>Berdasarkan pemahaman awalmu, bagian manakah dari materi ini yang paling ingin kamu bedah lebih lanjut?</strong> Coba ketik dugaan jawaban atau langkah pertamamu!`,
      hintText: `Kamu bisa menanyakan contoh rumus, langkah pengerjaan khusus, atau meminta kunci jawaban lengkap.`,
      fullSolution: `Untuk materi ini, pastikan kamu mempelajari modul lengkap pada menu mata pelajaran terkait atau kerjakan kuis evaluasi berkala untuk latihan intensif!`
    };
  };

  const sendAiTutorMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    // Tambah pesan user
    aiTutorChatHistory.push({
      id: `usr-${Date.now()}`,
      sender: "user",
      text: trimmed
    });
    renderAiTutorMessages();

    // Reset textarea
    const inputEl = document.getElementById("ai-tutor-user-input");
    if (inputEl) {
      inputEl.value = "";
      inputEl.style.height = "auto";
    }

    // Beri jeda seolah AI sedang berpikir menganalisis langkah
    setTimeout(() => {
      const response = generateSocraticResponse(trimmed);
      aiTutorChatHistory.push(response);
      renderAiTutorMessages();
    }, 450);
  };

  const openAiTutorScreen = () => {
    const screen = document.getElementById("ai-tutor-screen");
    if (screen) {
      screen.classList.add("active");
      renderAiTutorMessages();
    }
  };

  const closeAiTutorScreen = () => {
    const screen = document.getElementById("ai-tutor-screen");
    if (screen) {
      screen.classList.remove("active");
    }
  };

  // Event listener tombol AI Tutor
  const btnAiBack = document.getElementById("btn-ai-tutor-back");
  if (btnAiBack) btnAiBack.addEventListener("click", closeAiTutorScreen);

  const btnAiReset = document.getElementById("btn-ai-tutor-reset");
  if (btnAiReset) {
    btnAiReset.addEventListener("click", () => {
      if (confirm("Mulai sesi baru dengan AI Tutor? Riwayat obrolan saat ini akan dibersihkan.")) {
        aiTutorChatHistory = [
          {
            id: `ai-welcome-${Date.now()}`,
            sender: "ai",
            type: "welcome",
            text: `Halo ${appState.user.nama || 'Ahmad Rayhan'}! Sesi baru telah dimulai. 👋<br><br>Aku siap membimbingmu memahami konsep dan memecahkan soal-soal pelajaran langkah demi langkah. Apa yang ingin kamu pelajari hari ini?`
          }
        ];
        currentPendingChallenge = null;
        renderAiTutorMessages();
      }
    });
  }

  const btnAiSend = document.getElementById("btn-ai-tutor-send");
  const aiTextarea = document.getElementById("ai-tutor-user-input");

  if (btnAiSend && aiTextarea) {
    btnAiSend.addEventListener("click", () => {
      sendAiTutorMessage(aiTextarea.value);
    });

    aiTextarea.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        sendAiTutorMessage(aiTextarea.value);
      }
    });

    // Auto-expand textarea
    aiTextarea.addEventListener("input", () => {
      aiTextarea.style.height = "auto";
      aiTextarea.style.height = Math.min(aiTextarea.scrollHeight, 80) + "px";
    });
  }

  // Quick Suggestion Chips di AI Tutor
  document.querySelectorAll(".ai-chip-btn").forEach(chip => {
    chip.addEventListener("click", () => {
      const query = chip.dataset.query;
      sendAiTutorMessage(query);
    });
  });

  // Hubungkan Pill "Tanya AI Tutor" di Beranda langsung ke Layar AI Tutor Sokratik
  document.getElementById("quick-action-ai").addEventListener("click", () => {
    openAiTutorScreen();
  });

  document.getElementById("quick-action-notes").addEventListener("click", () => {
    showInteractiveModal("Catatan Saya 📝", `
      <div style="text-align: center; padding: 32px 16px; color: var(--text-muted); background: var(--bg-card-subtle); border-radius: var(--radius-lg); border: 1.5px dashed var(--border-color);">
        <div style="font-size: 38px; margin-bottom: 8px;">📝</div>
        <h4 style="font-weight: 700; font-size: 14.5px; color: var(--text-main); margin-bottom: 4px;">Catatan Saya Kosong</h4>
        <p style="font-size: 12.5px; line-height: 1.5;">Belum ada catatan belajar tersimpan. Semua catatan sebelumnya telah dibersihkan.</p>
      </div>
    `);
  });

  document.getElementById("quick-action-forum").addEventListener("click", () => {
    showInteractiveModal("Diskusi Kelas 9B 👥", `
      <div style="text-align: center; padding: 32px 16px; color: var(--text-muted); background: var(--bg-card-subtle); border-radius: var(--radius-lg); border: 1.5px dashed var(--border-color);">
        <div style="font-size: 38px; margin-bottom: 8px;">💬</div>
        <h4 style="font-weight: 700; font-size: 14.5px; color: var(--text-main); margin-bottom: 4px;">Diskusi Kelas Kosong</h4>
        <p style="font-size: 12.5px; line-height: 1.5;">Belum ada percakapan di forum Diskusi Kelas 9B. Semua diskusi sebelumnya telah dibersihkan.</p>
      </div>
    `);
  });

  // Render Pengingat Deadline Terdekat di Beranda
  const renderDeadlineReminder = () => {
    const reminderEl = document.getElementById("btn-open-urgent-task");
    if (!reminderEl) return;

    const urgentTask = appState.tasks.find(t => t.status === "belum");

    if (!urgentTask) {
      reminderEl.style.borderLeftColor = "var(--success)";
      reminderEl.style.background = "var(--bg-card)";
      reminderEl.innerHTML = `
        <div class="reminder-left">
          <span class="reminder-icon">🎉</span>
          <div>
            <div class="reminder-title" style="color: var(--success);">Semua Tugas Selesai</div>
            <div class="reminder-sub" style="color: var(--text-muted);">Tidak ada tugas kuis tertunda</div>
          </div>
        </div>
        <button class="reminder-btn" style="color: var(--success); border-color: var(--success);">Cek ADL</button>
      `;
    } else {
      reminderEl.style.borderLeftColor = "#F97316";
      reminderEl.style.background = "#FFF7ED";
      reminderEl.innerHTML = `
        <div class="reminder-left">
          <span class="reminder-icon">⏰</span>
          <div>
            <div class="reminder-title">${urgentTask.judul}</div>
            <div class="reminder-sub">${urgentTask.mapel} • ${urgentTask.tenggatTeks || 'Segera'}</div>
          </div>
        </div>
        <button class="reminder-btn">Kerjakan ⚡</button>
      `;
    }
  };

  // ==========================================================================
  // LOGIKA KUIS INTERAKTIF (LAYAR KHUSUS TERSENDIRI / STANDALONE QUIZ SCREEN)
  // ==========================================================================
  let quizState = {
    activeTask: null,
    questions: initialData.kuisMatematikaKelas9 || [],
    currentIndex: 0,
    userAnswers: {},
    score: 0,
    timerSeconds: 0,
    timerInterval: null,
    isFinished: false
  };

  const closeStandaloneQuiz = () => {
    if (quizState.timerInterval) clearInterval(quizState.timerInterval);
    const screen = document.getElementById("quiz-standalone-screen");
    if (screen) screen.classList.remove("active");
    quizState.isFinished = false;
  };

  const startQuiz = (task = null) => {
    // Tutup modal lain yang mungkin sedang aktif
    document.querySelectorAll(".modal-overlay").forEach(m => m.classList.remove("active"));

    // Jika tidak spesifik memilih tugas, pilih tugas pertama yang belum dikerjakan
    if (!task) {
      const pendingTasks = appState.tasks.filter(t => t.status === "belum");
      if (pendingTasks.length > 0) {
        task = pendingTasks[0];
      }
    }

    quizState.activeTask = task;
    quizState.isFinished = false;
    let questions = [];
    if (task && task.soalKey && initialData[task.soalKey]) {
      questions = initialData[task.soalKey];
    } else if (task && task.mapel === "IPA") {
      questions = initialData.kuisIpaKelas9;
    } else if (task && (task.mapel === "Bahasa Inggris" || task.mapel === "B. Inggris")) {
      questions = initialData.kuisBingKelas9;
    } else if (task && task.mapel === "IPS") {
      questions = initialData.kuisIpsKelas9;
    } else if (task && task.mapel === "PAI") {
      questions = initialData.kuisPaiKelas9;
    } else if (task && (task.mapel === "Seni Budaya" || task.mapel === "Seni budaya")) {
      questions = initialData.kuisSeniBudayaKelas9;
    } else if (task && task.mapel === "Bahasa Arab") {
      questions = initialData.kuisArabKelas9;
    } else if (task && task.mapel === "Bahasa Indonesia") {
      questions = initialData.kuisBindoKelas9;
    } else if (task && task.mapel === "Bahasa Sunda") {
      questions = initialData.kuisSundaKelas9;
    } else {
      questions = initialData.kuisMatematikaKelas9;
    }

    quizState.questions = questions || [];
    quizState.currentIndex = 0;
    quizState.userAnswers = {};
    quizState.score = 0;
    quizState.timerSeconds = 0;

    // Atur Header Layar Kuis
    const mapelTextEl = document.getElementById("quiz-screen-mapel-text");
    const badgeIconEl = document.getElementById("quiz-screen-badge-icon");
    const titleEl = document.getElementById("quiz-screen-title");

    const subjectIconMap = {
      "Matematika": "📐",
      "IPA": "🔬",
      "IPS": "🌍",
      "PAI": "🕌",
      "Seni Budaya": "🎨",
      "Seni budaya": "🎨",
      "Bahasa Arab": "📜",
      "Bahasa Inggris": "🌏",
      "B. Inggris": "🌏",
      "Bahasa Indonesia": "📚",
      "Bahasa Sunda": "🎋"
    };

    let subjectName = "Matematika";
    let subjectIcon = "📐";
    if (task) {
      subjectName = task.mapel;
      subjectIcon = subjectIconMap[task.mapel] || "📚";
    }

    if (mapelTextEl) mapelTextEl.textContent = subjectName;
    if (badgeIconEl) badgeIconEl.textContent = subjectIcon;
    if (titleEl) titleEl.textContent = task ? task.judul : "Kuis Latihan Matematika SMP";

    // Tampilkan kembali bagian progress dan footer jika sebelumnya disembunyikan
    const progressSec = document.getElementById("quiz-progress-section");
    const footerSec = document.getElementById("quiz-screen-footer");
    if (progressSec) progressSec.style.display = "block";
    if (footerSec) footerSec.style.display = "flex";

    if (quizState.timerInterval) clearInterval(quizState.timerInterval);
    const timerDisplay = document.getElementById("quiz-timer-display");
    if (timerDisplay) timerDisplay.textContent = "00:00";

    quizState.timerInterval = setInterval(() => {
      quizState.timerSeconds++;
      if (timerDisplay) {
        const m = String(Math.floor(quizState.timerSeconds / 60)).padStart(2, "0");
        const s = String(quizState.timerSeconds % 60).padStart(2, "0");
        timerDisplay.textContent = `${m}:${s}`;
      }
    }, 1000);

    renderQuizQuestion();

    // Buka Layar Kuis Khusus
    const screen = document.getElementById("quiz-standalone-screen");
    if (screen) screen.classList.add("active");
  };

  const renderQuizQuestion = () => {
    const container = document.getElementById("quiz-content-area");
    if (!container) return;

    const q = quizState.questions[quizState.currentIndex];
    const total = quizState.questions.length;
    const progressPct = ((quizState.currentIndex + 1) / total) * 100;
    const answered = quizState.userAnswers[quizState.currentIndex];
    const correctOpt = q.opsi.find(o => o.label === q.kunci);

    // Update Progress Bar & Meta di Header
    const stepTextEl = document.getElementById("quiz-step-text");
    const topicTextEl = document.getElementById("quiz-topic-text");
    const progressFillEl = document.getElementById("quiz-progress-fill");
    if (stepTextEl) stepTextEl.textContent = `Soal ${quizState.currentIndex + 1} dari ${total}`;
    if (topicTextEl) topicTextEl.textContent = q.topik || (quizState.activeTask ? quizState.activeTask.mapel : 'Materi SMP');
    if (progressFillEl) progressFillEl.style.width = `${progressPct}%`;

    // Render Opsi Jawaban
    let optionsHtml = q.opsi.map(opt => {
      let stateClass = "";
      let badgeHtml = "";
      if (answered) {
        stateClass += " disabled";
        const isThisCorrect = (opt.label === q.kunci);
        const isUserChoice = (answered.selected === opt.label);

        if (isThisCorrect) {
          stateClass += " highlight-correct";
          badgeHtml = `<span class="option-status-pill pill-correct">✓ Jawaban Benar</span>`;
        }
        if (isUserChoice) {
          if (answered.isCorrect) {
            stateClass += " selected-correct";
          } else {
            stateClass += " selected-wrong";
            badgeHtml = `<span class="option-status-pill pill-wrong">✕ Pilihan Anda</span>`;
          }
        }
      }
      return `
        <button class="quiz-option-btn ${stateClass}" data-label="${opt.label}" ${answered ? 'disabled' : ''}>
          <div class="quiz-option-letter">${opt.label}</div>
          <div style="flex: 1; font-weight: ${answered && opt.label === q.kunci ? '700' : 'normal'}; line-height: 1.4;">${opt.teks}</div>
          ${badgeHtml}
        </button>
      `;
    }).join("");

    // Render Kotak Penjelasan & Banner Jawaban jika sudah dijawab
    let explanationHtml = "";
    if (answered) {
      const bannerClass = answered.isCorrect ? "banner-correct" : "banner-wrong";
      const iconText = answered.isCorrect ? "✓" : "✕";
      const titleText = answered.isCorrect ? "Jawaban Anda Benar! (+10 Poin)" : "Jawaban Anda Kurang Tepat!";
      const descText = answered.isCorrect 
        ? `Pilihan <strong>${q.kunci} (${correctOpt.teks})</strong> tepat sekali.` 
        : `Jawaban yang benar adalah: <strong>${q.kunci}. ${correctOpt.teks}</strong>`;

      explanationHtml = `
        <div class="answer-result-banner ${bannerClass}">
          <div class="banner-icon-badge">${iconText}</div>
          <div>
            <div style="font-weight: 800; font-size: 13.5px;">${titleText}</div>
            <div style="font-size: 12px; margin-top: 2px;">${descText}</div>
          </div>
        </div>

        <div class="quiz-explanation-box">
          <div class="quiz-explanation-title">
            <span>💡</span> Pembahasan & Konsep ${quizState.activeTask ? quizState.activeTask.mapel : 'Pelajaran'}:
          </div>
          <div class="quiz-explanation-content">
            ${q.pembahasan.replace(/\n/g, "<br>")}
          </div>
        </div>
      `;
    }

    container.innerHTML = `
      <div style="animation: fadeIn 0.2s ease-out;">
        <div class="quiz-question-card">
          <div class="quiz-topic-tag">${q.topik || (quizState.activeTask ? quizState.activeTask.mapel : 'Kuis SMP')}</div>
          <div class="quiz-question-text">${q.pertanyaan}</div>
        </div>

        <div class="quiz-options-container" id="quiz-options-list">
          ${optionsHtml}
        </div>

        ${explanationHtml}
      </div>
    `;

    // Update Bottom Footer Action Bar
    const footerStatusText = document.getElementById("quiz-footer-status-text");
    const footerStatusIcon = document.querySelector(".footer-status-icon");
    const nextBtn = document.getElementById("btn-quiz-next-action");

    if (!answered) {
      if (footerStatusText) footerStatusText.textContent = "Pilih salah satu jawaban yang benar";
      if (footerStatusIcon) footerStatusIcon.textContent = "💡";
      if (nextBtn) {
        nextBtn.disabled = true;
        nextBtn.className = "quiz-footer-btn";
        nextBtn.innerHTML = `Lanjut ▶`;
      }

      // Pasang listener pada tombol opsi
      container.querySelectorAll(".quiz-option-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          const selectedLabel = btn.dataset.label;
          const isCorrect = selectedLabel === q.kunci;
          quizState.userAnswers[quizState.currentIndex] = {
            selected: selectedLabel,
            isCorrect: isCorrect
          };
          if (isCorrect) {
            quizState.score += 10;
          }
          renderQuizQuestion();

          // Scroll otomatis agar feedback & pembahasan langsung terlihat nyaman
          setTimeout(() => {
            container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
          }, 50);
        });
      });
    } else {
      const isLast = (quizState.currentIndex === total - 1);
      if (footerStatusText) {
        footerStatusText.innerHTML = answered.isCorrect 
          ? `<strong style="color: var(--success);">Benar!</strong> Tekan tombol untuk lanjut` 
          : `<strong style="color: var(--danger);">Kurang tepat.</strong> Pelajari pembahasannya`;
      }
      if (footerStatusIcon) footerStatusIcon.textContent = answered.isCorrect ? "🎉" : "📖";
      if (nextBtn) {
        nextBtn.disabled = false;
        if (isLast) {
          nextBtn.className = "quiz-footer-btn btn-finish";
          nextBtn.innerHTML = `Lihat Hasil 🏆`;
        } else {
          nextBtn.className = "quiz-footer-btn";
          nextBtn.innerHTML = `Soal Berikutnya ▶`;
        }
      }
    }
  };

  // Listener untuk Tombol Lanjut di Footer Bawah
  const footerNextBtn = document.getElementById("btn-quiz-next-action");
  if (footerNextBtn) {
    footerNextBtn.addEventListener("click", () => {
      const total = quizState.questions.length;
      if (quizState.currentIndex < total - 1) {
        quizState.currentIndex++;
        renderQuizQuestion();
        const container = document.getElementById("quiz-content-area");
        if (container) container.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        finishQuiz();
      }
    });
  }

  // Tombol Keluar dari Kuis (App Bar Kiri Atas)
  const exitQuizBtn = document.getElementById("btn-quiz-exit");
  if (exitQuizBtn) {
    exitQuizBtn.addEventListener("click", () => {
      if (quizState.isFinished) {
        closeStandaloneQuiz();
      } else {
        document.getElementById("modal-confirm-exit-quiz").classList.add("active");
      }
    });
  }

  // Konfirmasi Keluar Kuis
  const cancelExitBtn = document.getElementById("btn-cancel-exit-quiz");
  if (cancelExitBtn) {
    cancelExitBtn.addEventListener("click", () => {
      document.getElementById("modal-confirm-exit-quiz").classList.remove("active");
    });
  }

  const confirmExitBtn = document.getElementById("btn-confirm-exit-quiz");
  if (confirmExitBtn) {
    confirmExitBtn.addEventListener("click", () => {
      document.getElementById("modal-confirm-exit-quiz").classList.remove("active");
      closeStandaloneQuiz();
    });
  }

  const finishQuiz = () => {
    if (quizState.timerInterval) clearInterval(quizState.timerInterval);
    quizState.isFinished = true;

    const container = document.getElementById("quiz-content-area");
    if (!container) return;

    // Sembunyikan progress track dan footer saat menampilkan layar hasil
    const progressSec = document.getElementById("quiz-progress-section");
    const footerSec = document.getElementById("quiz-screen-footer");
    if (progressSec) progressSec.style.display = "none";
    if (footerSec) footerSec.style.display = "none";

    const titleEl = document.getElementById("quiz-screen-title");
    if (titleEl) titleEl.textContent = "Hasil Evaluasi Kuis";

    const total = quizState.questions.length;
    let correctCount = 0;
    for (let i = 0; i < total; i++) {
      if (quizState.userAnswers[i] && quizState.userAnswers[i].isCorrect) {
        correctCount++;
      }
    }
    const finalScore = Math.round((correctCount / total) * 100);

    // Jika ini adalah tugas sekolah yang dikerjakan, simpan status selesai & nilai
    let taskCompletedHtml = "";
    if (quizState.activeTask) {
      const taskIndex = appState.tasks.findIndex(t => t.id === quizState.activeTask.id);
      if (taskIndex !== -1) {
        appState.tasks[taskIndex].status = "selesai";
        appState.tasks[taskIndex].nilai = finalScore;
        localStorage.setItem("edusmart_tasks", JSON.stringify(appState.tasks));
      }

      // Kirim notifikasi penyelesaian tugas
      appState.notifications.unshift({
        id: `notif-${Date.now()}`,
        tipe: "tugas",
        judul: `Tugas ${quizState.activeTask.mapel} Selesai!`,
        pesan: `Tugas "${quizState.activeTask.judul}" berhasil dikumpulkan dengan perolehan nilai ${finalScore}/100.`,
        waktu: "Baru saja",
        belumDibaca: true
      });

      renderNotifications();
      renderTasks();
      renderDeadlineReminder();

      taskCompletedHtml = `
        <div style="background: #ECFDF5; border: 1.5px solid #A7F3D0; border-radius: var(--radius-md); padding: 12px 14px; margin-bottom: 14px; text-align: left;">
          <div style="display: flex; align-items: center; gap: 8px; color: var(--success); font-weight: 800; font-size: 13.5px;">
            <span>✓</span> Tugas Berhasil Diselesaikan & Dikumpulkan!
          </div>
          <div style="font-size: 12px; color: var(--text-secondary); margin-top: 4px; line-height: 1.4;">
            Tugas <strong>${quizState.activeTask.judul}</strong> (${quizState.activeTask.mapel}) kini berstatus <em>Telah Selesai</em> pada menu Tugas (ADL).
          </div>
        </div>
      `;
    }

    // Update poin siswa & stats
    const earnedPoints = quizState.activeTask ? (quizState.activeTask.poin || finalScore) : finalScore;
    appState.user.poin += earnedPoints;
    renderHeader();

    // Perbarui & tingkatkan sistem runtunan (streak) belajar
    triggerStreakActivity("Menyelesaikan Kuis");

    // Unlock badge jika skor tinggi
    if (finalScore >= 80) {
      let badge = initialData.lencanaList.find(b => b.nama.includes("Juara Kuis"));
      if (badge) {
        badge.didapat = true;
      } else {
        initialData.lencanaList.push({
          nama: "Juara Kuis Kilat",
          icon: "🏆",
          desc: `Skor ${finalScore} pada kuis evaluasi SMP`,
          didapat: true
        });
      }
      renderBadges();
    }

    const mins = Math.floor(quizState.timerSeconds / 60);
    const secs = quizState.timerSeconds % 60;
    const timeFormatted = `${mins}m ${secs}d`;

    const subjectTitle = quizState.activeTask ? quizState.activeTask.mapel : "Materi SMP";
    let feedbackTeks = "";
    if (finalScore >= 90) {
      feedbackTeks = `Luar biasa! Pemahaman ${subjectTitle} kamu sangat mendalam dan matang! 🌟`;
    } else if (finalScore >= 70) {
      feedbackTeks = `Bagus sekali! Kamu sudah memahami sebagian besar materi ${subjectTitle} dengan sangat baik! 👍`;
    } else {
      feedbackTeks = `Usaha yang bagus! Pelajari kembali pembahasan di bawah untuk memperkuat konsep ${subjectTitle}! 💪`;
    }

    container.innerHTML = `
      <div class="quiz-result-card" style="animation: fadeIn 0.3s ease-out;">
        <div class="quiz-result-score-circle">
          <span class="quiz-result-score-number">${finalScore}</span>
          <span class="quiz-result-score-label">SKOR ANDA</span>
        </div>

        <h3 style="font-size: 18px; font-weight: 800; color: var(--text-main); margin-bottom: 6px;">
          ${finalScore >= 70 ? 'Selamat! Kuis Berhasil Diselesaikan 🎉' : 'Kuis Telah Selesai 📚'}
        </h3>
        <p style="font-size: 13px; color: var(--text-secondary); max-width: 320px; margin: 0 auto 16px; line-height: 1.45;">
          ${feedbackTeks}
        </p>

        ${taskCompletedHtml}

        <div style="background: #FFF7ED; border: 1.5px solid #FFEDD5; border-radius: var(--radius-md); padding: 10px 14px; margin-bottom: 14px; display: flex; align-items: center; justify-content: space-between;">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 20px;">🔥</span>
            <div style="text-align: left;">
              <div style="font-weight: 800; font-size: 13px; color: #EA580C;">Runtunan Belajar (Streak) Terjaga!</div>
              <div style="font-size: 11px; color: var(--text-secondary);">${appState.streak.count} Hari Berturut-turut Aktif</div>
            </div>
          </div>
          <span style="font-size: 11px; font-weight: 800; color: #C2410C; background: #FFEDD5; padding: 3px 8px; border-radius: 99px;">✓ Terverifikasi</span>
        </div>

        <div class="quiz-result-stats">
          <div class="quiz-result-stat-box">
            <div class="quiz-result-stat-val" style="color: var(--success);">${correctCount}</div>
            <div class="quiz-result-stat-lbl">Jawaban Benar</div>
          </div>
          <div class="quiz-result-stat-box">
            <div class="quiz-result-stat-val" style="color: var(--danger);">${total - correctCount}</div>
            <div class="quiz-result-stat-lbl">Jawaban Salah</div>
          </div>
          <div class="quiz-result-stat-box">
            <div class="quiz-result-stat-val" style="color: var(--primary);">${timeFormatted}</div>
            <div class="quiz-result-stat-lbl">Waktu Pengerjaan</div>
          </div>
        </div>

        <div style="background: var(--primary-bg); border-radius: var(--radius-md); padding: 10px 14px; margin-bottom: 16px; display: flex; align-items: center; justify-content: space-between;">
          <span style="font-size: 12.5px; font-weight: 700; color: var(--primary-dark);">Poin Belajar Didapat:</span>
          <span style="font-size: 15px; font-weight: 900; color: var(--primary);">+${earnedPoints} Poin ⭐</span>
        </div>

        <div style="display: flex; flex-direction: column; gap: 8px;">
          <button class="continue-btn" id="btn-review-quiz" style="width: 100%; background: var(--bg-card); color: var(--text-main); border: 1.5px solid var(--border-color);">
            📖 Tinjau Semua Pembahasan Soal
          </button>
          <button class="continue-btn" id="btn-restart-quiz" style="width: 100%;">
            🔄 Ulangi Kuis Ini
          </button>
          <button class="filter-chip" id="btn-close-standalone-quiz" style="width: 100%; padding: 12px; margin-top: 4px; font-weight: 700;">
            🏠 Selesai & Kembali ke Aplikasi
          </button>
        </div>
      </div>
    `;

    document.getElementById("btn-restart-quiz").addEventListener("click", () => {
      startQuiz(quizState.activeTask);
    });

    document.getElementById("btn-review-quiz").addEventListener("click", () => {
      renderQuizReview();
    });

    document.getElementById("btn-close-standalone-quiz").addEventListener("click", () => {
      closeStandaloneQuiz();
    });
  };

  const renderQuizReview = () => {
    const container = document.getElementById("quiz-content-area");
    if (!container) return;

    let reviewItemsHtml = quizState.questions.map((q, idx) => {
      const userAns = quizState.userAnswers[idx];
      const isCorrect = userAns && userAns.isCorrect;
      const correctOpt = q.opsi.find(o => o.label === q.kunci);
      const userOpt = userAns ? q.opsi.find(o => o.label === userAns.selected) : null;
      return `
        <div style="background: var(--bg-card); border: 1.5px solid ${isCorrect ? 'var(--border-color)' : 'var(--danger)'}; border-radius: var(--radius-md); padding: 12px; margin-bottom: 10px; text-align: left;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
            <span style="font-size: 11px; font-weight: 800; color: var(--primary);">SOAL NO. ${q.no} • ${q.topik || 'Materi'}</span>
            <span style="font-size: 11px; font-weight: 800; padding: 2px 8px; border-radius: var(--radius-full); background: ${isCorrect ? '#DCFCE7' : '#FEE2E2'}; color: ${isCorrect ? 'var(--success)' : 'var(--danger)'};">
              ${isCorrect ? '✓ Benar' : '✕ Salah'}
            </span>
          </div>
          <p style="font-size: 13px; font-weight: 700; color: var(--text-main); margin-bottom: 8px;">${q.pertanyaan}</p>
          <div style="font-size: 12px; margin-bottom: 8px; line-height: 1.6;">
            <div><span style="color: var(--text-muted);">Pilihan Anda:</span> <strong style="color: ${isCorrect ? 'var(--success)' : 'var(--danger)'};">${userAns ? `${userAns.selected}. ${userOpt ? userOpt.teks : ''}` : '-'}</strong></div>
            <div><span style="color: var(--text-muted);">Kunci Jawaban yang Benar:</span> <strong style="color: var(--success);">${q.kunci}. ${correctOpt ? correctOpt.teks : ''}</strong></div>
          </div>
          <div style="background: var(--bg-app); border-left: 3px solid var(--primary); padding: 8px 10px; border-radius: 4px; font-size: 11.5px; color: var(--text-secondary); line-height: 1.45;">
            <strong>Pembahasan:</strong><br>${q.pembahasan.replace(/\n/g, "<br>")}
          </div>
        </div>
      `;
    }).join("");

    container.innerHTML = `
      <div style="animation: fadeIn 0.25s ease-out;">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <h4 style="font-size: 15px; font-weight: 800;">Tinjauan ${quizState.questions.length} Pembahasan Soal</h4>
          <button class="filter-chip" id="btn-back-to-results" style="font-size: 11.5px; padding: 5px 12px;">Kembali ke Skor</button>
        </div>
        <div style="max-height: 60vh; overflow-y: auto; padding-right: 2px;">
          ${reviewItemsHtml}
        </div>
        <button class="continue-btn" id="btn-close-review" style="width: 100%; margin-top: 14px;">
          Selesai & Tutup Layar Kuis
        </button>
      </div>
    `;

    document.getElementById("btn-back-to-results").addEventListener("click", () => {
      finishQuiz();
    });

    document.getElementById("btn-close-review").addEventListener("click", () => {
      closeStandaloneQuiz();
    });
  };

  // Initial Boot
  renderHeader();
  renderQuote();
  renderSubjectsGrid();
  renderSchedule();
  renderTasks();
  renderDeadlineReminder();
  renderBadges();
  renderNotifications();
  renderWeeklyStreakWidget();

  // Kontrol Skala & Ukuran Tampilan Smartphone (100%, 88%, 78%)
  const phoneFrame = document.getElementById("smartphone-frame");
  document.querySelectorAll(".scale-toggle-btn[data-scale]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".scale-toggle-btn[data-scale]").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const scale = btn.dataset.scale;
      if (phoneFrame) {
        phoneFrame.style.transform = `scale(${scale})`;
        if (scale === "1") {
          phoneFrame.style.marginBottom = "0px";
        } else if (scale === "0.88") {
          phoneFrame.style.marginBottom = "-95px";
        } else if (scale === "0.78") {
          phoneFrame.style.marginBottom = "-175px";
        }
      }
    });
  });

  // Tombol Layar Penuh (Fullscreen Toggle)
  const fullBtn = document.getElementById("btn-toggle-fullscreen");
  if (fullBtn) {
    fullBtn.addEventListener("click", () => {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
        fullBtn.textContent = "✕ Exit";
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
        fullBtn.textContent = "⛶ Full";
      }
    });
  }

  // Interaksi Dynamic Island Khas Smartphone
  const dynamicIsland = document.getElementById("dynamic-island");
  if (dynamicIsland) {
    dynamicIsland.addEventListener("click", () => {
      dynamicIsland.style.width = "175px";
      dynamicIsland.innerHTML = `<span style="color: #fff; font-size: 10.5px; font-weight: 700; white-space: nowrap; padding: 0 4px;">⚡ Belajar Aktif</span><div class="dynamic-island-camera"></div>`;
      setTimeout(() => {
        dynamicIsland.style.width = "110px";
        dynamicIsland.innerHTML = `<div class="dynamic-island-sensor"></div><div class="dynamic-island-camera"></div>`;
      }, 2500);
    });
  }
});
