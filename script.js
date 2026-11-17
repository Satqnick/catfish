// =========================================================
// KONFIGURASI UTAMA (Edit teks & momen sesuai cerita kalian)
// =========================================================
const CONFIG = {
    // Tanggal jadian: 14 Februari 2026 (Valentine's Day)
    startDate: "2026-02-14T00:00:00",

    heroTitle: "Two Tones, One Story.",
    heroSubtitle: "Dimulai tepat di hari Valentine, 14 Februari 2026. Dua warna berbeda yang menyatu menjadi ruang paling tenang.",

    // Kartu Catatan Interaktif (Bisa diacak/diganti saat diklik)
    littleNotes: [
        {
            tag: "🍏 × 🫐",
            text: "Kita punya ritme yang berbeda, tapi entah kenapa selalu ketemu di titik tengah yang paling pas."
        },
        {
            tag: "🫐",
            text: "Cara kamu menenangkan suasana selalu bikin hari yang rumit terasa jauh lebih ringan."
        },
        {
            tag: "🍏",
            text: "Di antara banyak hal yang berubah, memastikan kamu tetap aman dan nyaman selalu jadi prioritas."
        },
        {
            tag: "🍏 × 🫐",
            text: "14 Februari bukan cuma soal tanggal di kalender, tapi titik awal dari semua cerita yang kita bangun pelan-pelan."
        },
        {
            tag: "🫐",
            text: "Terima kasih sudah selalu menjadi pendengar yang jernih dan tempat cerita tanpa perlu berpura-pura."
        }
    ],

    // Jejak Perjalanan (accent: "me" = 🍏 | "her" = 🫐 | "both" = 🍏 × 🫐)
    milestones: [
        {
            date: "14 FEB 2026",
            title: "Hari Pertama — Valentine's Chapter",
            description: "Resmi melangkah bersama. Awal dari perjalanan hijau dan biru.",
            accent: "both"
        },
        {
            date: "MEI 2026",
            title: "Saling Memahami Ritme",
            description: "Belajar bahwa ketenangan tidak butuh banyak kata—cukup kehadiran yang konsisten.",
            accent: "me"
        },
        {
            date: "AGU 2026",
            title: "Keteduhan di Tengah Kesibukan",
            description: "Obrolan-obrolan larut dan tawa kecil yang selalu berhasil meredakan penat.",
            accent: "her"
        },
        {
            date: "NOV 2026",
            title: "Sembilan Bulan Berjalan",
            description: "Semakin mengenal sudut pandang masing-masing dan bertumbuh ke arah yang sama.",
            accent: "both"
        }
    ],

    // Surat Personal
    letterHeading: "Untuk Kamu, di Babak Ini",
    letterParagraphs: [
        "Sejak 14 Februari 2026 kemarin, banyak hal sederhana yang rasanya berubah jadi jauh lebih bermakna karena ada kamu di dalamnya.",
        "Kalau 🍏 adalah hijau yang berusaha menjaga pijakan tetap teguh, maka 🫐 adalah biru yang selalu memberi keteduhan di setiap langkahnya.",
        "Terima kasih sudah berjalan sejauh ini bersama. Tidak perlu terburu-buru—mari terus bertumbuh dengan tenang, satu hari demi satu hari."
    ],
    letterSignature: "— Always in your corner, 🍏"
};

// =========================================================
// LOGIKA INTERAKTIF
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("heroTitle").textContent = CONFIG.heroTitle;
    document.getElementById("heroSubtitle").textContent = CONFIG.heroSubtitle;
    document.getElementById("letterHeading").textContent = CONFIG.letterHeading;

    const startObj = new Date(CONFIG.startDate);

    // 1. Live Counter & Countdown ke 14 Feb berikutnya
    const updateCounter = () => {
        const now = new Date();
        let years = now.getFullYear() - startObj.getFullYear();
        let months = now.getMonth() - startObj.getMonth();
        let days = now.getDate() - startObj.getDate();
        let hours = now.getHours() - startObj.getHours();
        let minutes = now.getMinutes() - startObj.getMinutes();
        let seconds = now.getSeconds() - startObj.getSeconds();

        if (seconds < 0) { seconds += 60; minutes--; }
        if (minutes < 0) { minutes += 60; hours--; }
        if (hours < 0) { hours += 24; days--; }
        if (days < 0) {
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
            months--;
        }
        if (months < 0) { months += 12; years--; }

        document.getElementById("years").textContent = Math.max(0, years);
        document.getElementById("months").textContent = Math.max(0, months);
        document.getElementById("days").textContent = Math.max(0, days);
        document.getElementById("hours").textContent = String(Math.max(0, hours)).padStart(2, "0");
        document.getElementById("minutes").textContent = String(Math.max(0, minutes)).padStart(2, "0");
        document.getElementById("seconds").textContent = String(Math.max(0, seconds)).padStart(2, "0");

        // Hitung sisa hari ke 14 Februari berikutnya
        let nextAnniv = new Date(now.getFullYear(), 1, 14); // Bulan 1 = Februari
        if (now >= nextAnniv) {
            nextAnniv = new Date(now.getFullYear() + 1, 1, 14);
        }
        const diffDays = Math.ceil((nextAnniv - now) / (1000 * 60 * 60 * 24));
        document.getElementById("nextMilestoneCaption").textContent =
            `${diffDays} hari menuju 14 Feb ${nextAnniv.getFullYear()}`;
    };

    updateCounter();
    setInterval(updateCounter, 1000);

    // 2. Interactive Tone Resonance Slider (🍏 <-> 🫐)
    const slider = document.getElementById("toneSlider");
    const ratioLabel = document.getElementById("mixerRatio");
    const statusLabel = document.getElementById("mixerStatus");

    slider.addEventListener("input", (e) => {
        const bluePct = Number(e.target.value);
        const greenPct = 100 - bluePct;

        ratioLabel.textContent = `${greenPct}% 🍏 / ${bluePct}% 🫐`;

        // Ubah intensitas cahaya latar belakang secara halus
        document.documentElement.style.setProperty("--green-opacity", (0.2 + (greenPct / 100) * 0.75).toFixed(2));
        document.documentElement.style.setProperty("--blue-opacity", (0.2 + (bluePct / 100) * 0.75).toFixed(2));

        if (bluePct >= 45 && bluePct <= 55) {
            statusLabel.textContent = "Seimbang — ketenangan hijau dan teduhnya biru menyatu utuh.";
        } else if (greenPct > 55) {
            statusLabel.textContent = "Dominan 🍏 — fokus pada pijakan yang tenang dan menjaga arah.";
        } else {
            statusLabel.textContent = "Dominan 🫐 — fokus pada keteduhan, kedalaman, dan ruang cerita.";
        }
    });

    // 3. Interactive Little Notes Deck
    let currentNoteIdx = 0;
    const noteDisplay = document.getElementById("noteDisplay");
    const noteBadge = document.getElementById("noteBadge");
    const noteText = document.getElementById("noteText");
    const noteIndex = document.getElementById("noteIndex");
    const nextNoteBtn = document.getElementById("nextNoteBtn");

    const renderNote = (idx) => {
        const note = CONFIG.littleNotes[idx];
        noteBadge.textContent = note.tag;
        noteText.textContent = note.text;
        noteIndex.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(CONFIG.littleNotes.length).padStart(2, "0")}`;
    };

    renderNote(0);

    nextNoteBtn.addEventListener("click", () => {
        noteDisplay.classList.add("fade-out");
        setTimeout(() => {
            currentNoteIdx = (currentNoteIdx + 1) % CONFIG.littleNotes.length;
            renderNote(currentNoteIdx);
            noteDisplay.classList.remove("fade-out");
        }, 220);
    });

    // 4. Render Timeline Milestones
    const timelineContainer = document.getElementById("timelineContainer");
    const accentEmoji = { me: "🍏", her: "🫐", both: "🍏 × 🫐" };

    CONFIG.milestones.forEach((item) => {
        const article = document.createElement("article");
        article.className = `card-surface milestone ${item.accent}`;
        article.innerHTML = `
            <div class="milestone-top">
                <span class="milestone-date">${item.date}</span>
                <span class="milestone-icon">${accentEmoji[item.accent] || "🍏 × 🫐"}</span>
            </div>
            <h3 class="milestone-title">${item.title}</h3>
            <p class="milestone-desc">${item.description}</p>
        `;
        timelineContainer.appendChild(article);
    });

    // 5. Render Surat Personal & Accordion Toggle
    const letterBody = document.getElementById("letterBody");
    CONFIG.letterParagraphs.forEach((text) => {
        const p = document.createElement("p");
        p.textContent = text;
        letterBody.appendChild(p);
    });
    const sign = document.createElement("div");
    sign.className = "letter-sign";
    sign.textContent = CONFIG.letterSignature;
    letterBody.appendChild(sign);

    const letterCard = document.getElementById("letterCard");
    const letterToggle = document.getElementById("letterToggle");
    letterToggle.addEventListener("click", () => {
        const isOpen = letterCard.classList.toggle("open");
        letterToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // 6. Subtle Cursor Spotlight pada semua kartu
    document.querySelectorAll(".card-surface").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--x", `${e.clientX - rect.left}px`);
            card.style.setProperty("--y", `${e.clientY - rect.top}px`);
        });
    });

    // 7. Scroll Reveal
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
});