const STORY = {
    startDate: "2026-02-14T00:00:00",

    heroTitle: "Two Souls, One Story.",
    heroSubtitle: "Happy anniversary, love. Di tengah dunia yang kadang terlalu loud dan draining, makasih udah jadi safe space paling tenang buat aku—tempat di mana aku nggak perlu over-explain apa pun.",

    notes: [
        {
            tag: "🍏 × 🫐",
            text: "Sama kamu, silence nggak pernah terasa awkward. Justru di momen-momen sepi kayak gitu semuanya kerasa paling real."
        },
        {
            tag: "🫐",
            text: "Aku selalu kagum sama cara kamu nangkep detail kecil. Dari mood aku, bahkan pas aku sendiri belum sadar lagi capek."
        },
        {
            tag: "🍏",
            text: "Social battery aku mungkin gampang habis buat banyak hal, tapi ngabisin waktu sama kamu gak pernah kerasa draining."
        },
        {
            tag: "🍏 × 🫐",
            text: "14 Februari kemarin bukan cuma soal tanggal, tapi titik awal di mana aku ngejalanin hubungan sama orang paling manis yang pernah aku kenal."
        },
        {
            tag: "🫐",
            text: "Makasih udah selalu jadi pendengar yang jernih dan nerima versi paling apa adanya dari aku, tanpa tuntutan apa-apa."
        }
    ],

    milestones: [
        {
            date: "14 FEB 2026",
            title: "Day One — Valentine's Chapter",
            description: "Awal mula semuanya. Dua jalan yang beda akhirnya mutusin buat jalan searah.",
            tone: "both"
        },
        {
            date: "MID 2026",
            title: "Finding Our Pace",
            description: "Belajar baca ritme masing-masing—kapan butuh waktu sendiri buat mikir, dan kapan cukup ditemenin tanpa banyak tanya.",
            tone: "sage"
        },
        {
            date: "LATE 2026",
            title: "Late-Night, Deep Talks",
            description: "Obrolan-obrolan panjang yang pelan-pelan ngebuka sisi paling jujur dari kita berdua.",
            tone: "midnight"
        },
        {
            date: "ANNIVERSARY",
            title: "One Full Chapter",
            description: "Ngerayain sejauh ini kita melangkah, dan siap nulis halaman-halaman berikutnya dengan tenang.",
            tone: "both"
        }
    ],

    letterTitle: "Buka Surat Anniversary",
    letterParagraphs: [
        "Happy anniversary, bawel. Nggak kerasa udah sejauh ini sejak 14 Februari 2026 kemarin.",
        "Aku sadar aku bukan tipe orang yang selalu romantis atau vokal tiap saat. Tapi sama kamu, aku nemu bentuk nyaman yang beda—yang gak berisik, gak maksa, tapi selalu ada.",
        "Makasih udah jadi tempat pulang paling teduh, udah ngertiin isi kepala aku yang kadang terlalu ramai, dan tetap jalan bareng sejauh ini.",
        "Here's to more quiet mornings, late-night talks, and growing at our own pace. Happy anniversary, my first & last love."
    ],
    letterSignature: "— Always in your corner, 🍏."
};

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("heroTitle").textContent = STORY.heroTitle;
    document.getElementById("heroSubtitle").textContent = STORY.heroSubtitle;
    document.getElementById("letterTitle").textContent = STORY.letterTitle;

    const startObj = new Date(STORY.startDate);

    // 1. Live Timer
    const updateTimer = () => {
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
    };

    updateTimer();
    setInterval(updateTimer, 1000);

    // 2. Frequency Slider
    const slider = document.getElementById("soulSlider");
    const readout = document.getElementById("balanceReadout");
    const reflection = document.getElementById("balanceReflection");

    const setReflection = (blueVal) => {
        const greenVal = 100 - blueVal;
        readout.textContent = `${greenVal}% 🍏 • ${blueVal}% 🫐`;

        document.documentElement.style.setProperty("--sage-opacity", (0.2 + (greenVal / 100) * 0.75).toFixed(2));
        document.documentElement.style.setProperty("--midnight-opacity", (0.25 + (blueVal / 100) * 0.85).toFixed(2));

        if (blueVal >= 45 && blueVal <= 55) {
            reflection.textContent = "Sweet spot — dua isi kepala yang sama-sama suka mikir jauh, akhirnya ketemu di titik paling tenang tanpa perlu pura-pura.";
        } else if (greenVal > 55) {
            reflection.textContent = "Sage mode 🍏 — low-key, observant, dan fokus ngejaga biar langkah kita tetap steady apa pun yang lagi terjadi di luar.";
        } else {
            reflection.textContent = "Midnight mode 🫐 — deep talks, keteduhan, dan ruang paling jujur buat ngebahas hal-hal yang jarang dimengerti orang lain.";
        }
    };

    setReflection(50);
    slider.addEventListener("input", (e) => setReflection(Number(e.target.value)));

    // 3. Unspoken Notes Deck
    let noteIdx = 0;
    const noteBox = document.getElementById("noteBox");
    const noteTag = document.getElementById("noteTag");
    const noteContent = document.getElementById("noteContent");
    const noteCounter = document.getElementById("noteCounter");
    const shuffleBtn = document.getElementById("shuffleNoteBtn");

    const showNote = (index) => {
        const item = STORY.notes[index];
        noteTag.textContent = item.tag;
        noteContent.textContent = item.text;
        noteCounter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(STORY.notes.length).padStart(2, "0")}`;
    };

    showNote(0);

    shuffleBtn.addEventListener("click", () => {
        noteBox.classList.add("switching");
        setTimeout(() => {
            noteIdx = (noteIdx + 1) % STORY.notes.length;
            showNote(noteIdx);
            noteBox.classList.remove("switching");
        }, 200);
    });

    // 4. Timeline
    const timelineContainer = document.getElementById("timelineContainer");
    const toneBadges = { sage: "🍏", midnight: "🫐", both: "🍏 × 🫐" };

    STORY.milestones.forEach((m) => {
        const el = document.createElement("article");
        el.className = `card-surface milestone ${m.tone}`;
        el.innerHTML = `
            <div class="milestone-top">
                <span class="milestone-date">${m.date}</span>
                <span>${toneBadges[m.tone] || "🍏 × 🫐"}</span>
            </div>
            <h3 class="milestone-title">${m.title}</h3>
            <p class="milestone-desc">${m.description}</p>
        `;
        timelineContainer.appendChild(el);
    });

    // 5. Letter Drawer + Easter Egg Animations
    const letterContent = document.getElementById("letterContent");
    STORY.letterParagraphs.forEach((pText) => {
        const p = document.createElement("p");
        p.textContent = pText;
        letterContent.appendChild(p);
    });
    const sig = document.createElement("div");
    sig.className = "letter-sign";
    sig.textContent = STORY.letterSignature;
    letterContent.appendChild(sig);

    const fxLayer = document.getElementById("fxLayer");

    const spawnFallingFruits = () => {
        if (!fxLayer) return;
        const items = ["🍏", "🫐"];
        for (let i = 0; i < 24; i++) {
            const el = document.createElement("span");
            el.className = "falling-fruit";
            el.textContent = items[i % 2];

            const leftPos = Math.random() * 96;
            const size = (Math.random() * 0.65 + 1.1).toFixed(2);
            const duration = (Math.random() * 1.8 + 2.8).toFixed(2);
            const delay = (Math.random() * 1.4).toFixed(2);
            const sway = `${Math.round((Math.random() - 0.5) * 70)}px`;
            const spin = `${Math.round((Math.random() - 0.5) * 320)}deg`;

            el.style.left = `${leftPos}vw`;
            el.style.fontSize = `${size}rem`;
            el.style.setProperty("--fall-duration", `${duration}s`);
            el.style.setProperty("--fall-delay", `${delay}s`);
            el.style.setProperty("--sway", sway);
            el.style.setProperty("--spin", spin);

            fxLayer.appendChild(el);
            setTimeout(() => el.remove(), (parseFloat(duration) + parseFloat(delay)) * 1000 + 200);
        }
    };

    const triggerCatChase = () => {
        if (!fxLayer) return;
        const group = document.createElement("div");
        group.className = "chase-group";
        group.innerHTML = `
            <span class="chase-fish">🐟</span>
            <span class="chase-cat">🐈‍⬛</span>
        `;
        fxLayer.appendChild(group);
        setTimeout(() => group.remove(), 4400);
    };

    spawnFallingFruits();

    const letterBox = document.getElementById("letterBox");
    const letterTrigger = document.getElementById("letterTrigger");
    letterTrigger.addEventListener("click", () => {
        const isOpen = letterBox.classList.toggle("open");
        letterTrigger.setAttribute("aria-expanded", String(isOpen));
        if (isOpen) {
            triggerCatChase();
        }
    });

    // 6. Cursor Spotlight
    document.querySelectorAll(".card-surface").forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--x", `${e.clientX - rect.left}px`);
            card.style.setProperty("--y", `${e.clientY - rect.top}px`);
        });
    });

    // 7. Ambient Dust Particles
    const canvas = document.getElementById("ambientCanvas");
    const ctx = canvas.getContext("2d");
    let particles = [];

    const resizeCanvas = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    const colors = ["rgba(156, 202, 180, 0.22)", "rgba(139, 178, 222, 0.24)"];
    for (let i = 0; i < 28; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 1.6 + 0.6,
            vx: (Math.random() - 0.5) * 0.16,
            vy: (Math.random() - 0.5) * 0.16,
            color: colors[i % 2]
        });
    }

    const animateParticles = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        });
        requestAnimationFrame(animateParticles);
    };
    animateParticles();

    // 8. Minimalist Night Sky (Kompas + Hover Detail Bintang)
    const skyCanvas = document.getElementById("nightSkyCanvas");
    if (skyCanvas) {
        const sCtx = skyCanvas.getContext("2d");
        const skyLocationLabel = document.getElementById("skyLocationLabel");
        const skyCaption = document.getElementById("skyCaption");
        const skyTooltip = document.getElementById("skyTooltip");
        const skyTabs = document.querySelectorAll(".sky-tab");

        const CITIES = {
            balikpapan: {
                label: "Balikpapan • 1.24° S, 116.85° E (WITA)",
                caption: "Langit Balikpapan malam 14 Feb 2026 — Orion tepat di atas kepala, ditemani Sirius yang paling terang di sisi tenggara.",
                shiftX: -18,
                shiftY: -6,
                accent: "156, 202, 180"
            },
            baturaja: {
                label: "Baturaja • 4.13° S, 104.17° E (WIB)",
                caption: "Langit Baturaja malam 14 Feb 2026 — gugus bintang yang sama persis, cuma bergeser 12.7° ke timur karena jarak 1.445 km di antara kita.",
                shiftX: 22,
                shiftY: 10,
                accent: "139, 178, 222"
            }
        };

        let activeCity = "balikpapan";
        let currentShiftX = CITIES.balikpapan.shiftX;
        let currentShiftY = CITIES.balikpapan.shiftY;

        const CONSTELLATIONS = [
            {
                name: "ORION",
                labelPos: [0.46, 0.21],
                stars: [
                    { name: "Betelgeuse", mag: "0.42m", desc: "Supergiant merah di bahu Orion; cahaya hangat di langit Februari.", x: 0.43, y: 0.27, r: 2.5, tint: "#ffd7b5" },
                    { name: "Bellatrix",  mag: "1.64m", desc: "Bintang biru-putih di bahu barat Orion.", x: 0.53, y: 0.29, r: 2.0 },
                    { name: "Alnitak",    mag: "1.77m", desc: "Sabuk Orion sisi timur (~1.260 tahun cahaya).", x: 0.46, y: 0.41, r: 1.8 },
                    { name: "Alnilam",    mag: "1.69m", desc: "Bintang tengah Sabuk Orion, penunjuk arah ekuator langit.", x: 0.48, y: 0.40, r: 1.9 },
                    { name: "Mintaka",    mag: "2.23m", desc: "Sabuk Orion sisi barat, tepat di garis ekuator langit.", x: 0.50, y: 0.39, r: 1.8 },
                    { name: "Saiph",      mag: "2.09m", desc: "Bintang sudut tenggara rasi Orion.", x: 0.44, y: 0.53, r: 1.9 },
                    { name: "Rigel",      mag: "0.13m", desc: "Supergiant biru paling terang di Orion.", x: 0.54, y: 0.52, r: 2.6, tint: "#cfe4ff" }
                ],
                lines: [[0, 1], [0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6], [5, 6]]
            },
            {
                name: "CANIS MAJOR",
                labelPos: [0.69, 0.52],
                stars: [
                    { name: "Sirius",  mag: "-1.46m", desc: "Bintang paling terang di langit malam, cuma 8,6 tahun cahaya dari Bumi.", x: 0.66, y: 0.48, r: 3.3, glow: true, tint: "#e3f0ff" },
                    { name: "Mirzam",  mag: "1.98m",  desc: "Sang 'pembawa pesan' yang terbit sesaat sebelum Sirius.", x: 0.61, y: 0.51, r: 1.7 },
                    { name: "Wezen",   mag: "1.83m",  desc: "Supergiant kuning-putih di pusat rasi Canis Major.", x: 0.69, y: 0.62, r: 1.8 },
                    { name: "Adhara",  mag: "1.50m",  desc: "Salah satu sumber sinar ultraviolet paling terang di langit.", x: 0.65, y: 0.66, r: 1.9 },
                    { name: "Aludra",  mag: "2.45m",  desc: "Supergiant biru di ujung ekor Canis Major.", x: 0.73, y: 0.65, r: 1.6 }
                ],
                lines: [[0, 1], [0, 2], [2, 3], [2, 4]]
            },
            {
                name: "CARINA",
                labelPos: [0.63, 0.80],
                stars: [
                    { name: "Canopus", mag: "-0.74m", desc: "Bintang paling terang kedua di langit malam, terlihat jelas di langit selatan.", x: 0.61, y: 0.77, r: 2.9, glow: true, tint: "#fff7e8" },
                    { name: "Avior",   mag: "1.86m",  desc: "Bintang ganda jingga-biru di rasi Carina.", x: 0.72, y: 0.82, r: 1.7 }
                ],
                lines: [[0, 1]]
            },
            {
                name: "TAURUS",
                labelPos: [0.22, 0.24],
                stars: [
                    { name: "Aldebaran", mag: "0.86m", desc: "Raksasa jingga yang dijuluki 'Mata Banteng' di rasi Taurus.", x: 0.29, y: 0.31, r: 2.3, tint: "#ffd2a8" },
                    { name: "Pleiades",  mag: "1.60m", desc: "Gugus bintang terbuka M45 yang selalu tampak bertengger di barat laut.", x: 0.19, y: 0.34, r: 2.1, tint: "#cce3ff" }
                ],
                lines: [[0, 1]]
            }
        ];

        const bgStars = Array.from({ length: 85 }, () => ({
            x: Math.random(),
            y: Math.random(),
            r: Math.random() * 1.1 + 0.35,
            phase: Math.random() * Math.PI * 2,
            speed: Math.random() * 0.018 + 0.008
        }));

        const setupSkyCanvas = () => {
            const rect = skyCanvas.parentElement.getBoundingClientRect();
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            skyCanvas.width = rect.width * dpr;
            skyCanvas.height = rect.height * dpr;
            sCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        setupSkyCanvas();
        window.addEventListener("resize", setupSkyCanvas);

        skyTabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                skyTabs.forEach((t) => t.classList.remove("active"));
                tab.classList.add("active");
                activeCity = tab.dataset.city;
                skyLocationLabel.textContent = CITIES[activeCity].label;
                skyCaption.textContent = CITIES[activeCity].caption;
            });
        });

        let pointer = { x: null, y: null };
        let lastHoveredName = null;

        const updatePointer = (clientX, clientY) => {
            const rect = skyCanvas.getBoundingClientRect();
            pointer.x = clientX - rect.left;
            pointer.y = clientY - rect.top;
        };

        skyCanvas.addEventListener("mousemove", (e) => updatePointer(e.clientX, e.clientY));
        skyCanvas.addEventListener("mouseleave", () => {
            pointer.x = null;
            pointer.y = null;
        });
        skyCanvas.addEventListener("touchstart", (e) => {
            if (e.touches.length > 0) {
                updatePointer(e.touches[0].clientX, e.touches[0].clientY);
            }
        }, { passive: true });

        let frame = 0;
        const renderSky = () => {
            frame++;
            const w = skyCanvas.parentElement.clientWidth;
            const h = skyCanvas.parentElement.clientHeight;
            const target = CITIES[activeCity];

            currentShiftX += (target.shiftX - currentShiftX) * 0.07;
            currentShiftY += (target.shiftY - currentShiftY) * 0.07;

            sCtx.clearRect(0, 0, w, h);

            const cx = w * 0.5;
            const cy = h * 0.48;
            const radius = Math.min(w, h) * 0.41;

            sCtx.strokeStyle = `rgba(${target.accent}, 0.1)`;
            sCtx.lineWidth = 1;
            sCtx.beginPath();
            sCtx.arc(cx, cy, radius, 0, Math.PI * 2);
            sCtx.stroke();

            const cardinals = [
                { label: "N", angle: -Math.PI / 2 },
                { label: "E", angle: 0 },
                { label: "S", angle: Math.PI / 2 },
                { label: "W", angle: Math.PI }
            ];

            sCtx.font = "9px 'JetBrains Mono', monospace";
            sCtx.textAlign = "center";
            sCtx.textBaseline = "middle";

            cardinals.forEach((dir) => {
                const cos = Math.cos(dir.angle);
                const sin = Math.sin(dir.angle);

                sCtx.strokeStyle = `rgba(${target.accent}, 0.24)`;
                sCtx.beginPath();
                sCtx.moveTo(cx + cos * (radius - 4), cy + sin * (radius - 4));
                sCtx.lineTo(cx + cos * (radius + 4), cy + sin * (radius + 4));
                sCtx.stroke();

                sCtx.fillStyle = `rgba(${target.accent}, 0.48)`;
                sCtx.fillText(dir.label, cx + cos * (radius + 14), cy + sin * (radius + 14));
            });

            sCtx.textAlign = "left";
            sCtx.textBaseline = "alphabetic";

            bgStars.forEach((s) => {
                const alpha = 0.25 + 0.35 * Math.sin(frame * s.speed + s.phase);
                const sx = (s.x * w + currentShiftX * 0.45 + w) % w;
                const sy = (s.y * h + currentShiftY * 0.45 + h) % h;
                sCtx.fillStyle = `rgba(230, 235, 242, ${alpha.toFixed(2)})`;
                sCtx.beginPath();
                sCtx.arc(sx, sy, s.r, 0, Math.PI * 2);
                sCtx.fill();
            });

            let hoveredStar = null;
            let minDist = 16;

            CONSTELLATIONS.forEach((c) => {
                c.stars.forEach((st) => {
                    const px = st.x * w + currentShiftX;
                    const py = st.y * h + currentShiftY;
                    if (pointer.x !== null && pointer.y !== null) {
                        const dist = Math.hypot(pointer.x - px, pointer.y - py);
                        if (dist < minDist) {
                            minDist = dist;
                            hoveredStar = { ...st, constellation: c.name, px, py };
                        }
                    }
                });
            });

            CONSTELLATIONS.forEach((c) => {
                sCtx.strokeStyle = `rgba(${target.accent}, 0.26)`;
                sCtx.lineWidth = 1;
                c.lines.forEach(([a, b]) => {
                    const sa = c.stars[a];
                    const sb = c.stars[b];
                    sCtx.beginPath();
                    sCtx.moveTo(sa.x * w + currentShiftX, sa.y * h + currentShiftY);
                    sCtx.lineTo(sb.x * w + currentShiftX, sb.y * h + currentShiftY);
                    sCtx.stroke();
                });

                c.stars.forEach((st) => {
                    const px = st.x * w + currentShiftX;
                    const py = st.y * h + currentShiftY;
                    const isHovered = hoveredStar && hoveredStar.name === st.name;

                    if (st.glow || isHovered) {
                        const glowRadius = isHovered ? st.r * 6 : st.r * 4.5;
                        const grad = sCtx.createRadialGradient(px, py, 0, px, py, glowRadius);
                        grad.addColorStop(0, isHovered ? `rgba(${target.accent}, 0.55)` : "rgba(227, 240, 255, 0.45)");
                        grad.addColorStop(1, "rgba(227, 240, 255, 0)");
                        sCtx.fillStyle = grad;
                        sCtx.beginPath();
                        sCtx.arc(px, py, glowRadius, 0, Math.PI * 2);
                        sCtx.fill();
                    }

                    if (isHovered) {
                        sCtx.strokeStyle = `rgba(${target.accent}, 0.85)`;
                        sCtx.lineWidth = 1.2;
                        sCtx.beginPath();
                        sCtx.arc(px, py, st.r + 5, 0, Math.PI * 2);
                        sCtx.stroke();
                    }

                    sCtx.fillStyle = st.tint || "#eef3fa";
                    sCtx.beginPath();
                    sCtx.arc(px, py, isHovered ? st.r + 0.8 : st.r, 0, Math.PI * 2);
                    sCtx.fill();

                    if (st.name === "Sirius" || st.name === "Canopus" || st.name === "Betelgeuse" || st.name === "Rigel" || isHovered) {
                        sCtx.font = "10px 'JetBrains Mono', monospace";
                        sCtx.fillStyle = isHovered ? "#ffffff" : "rgba(230, 235, 242, 0.52)";
                        sCtx.fillText(st.name, px + 7, py + 3);
                    }
                });

                sCtx.font = "9px 'JetBrains Mono', monospace";
                sCtx.fillStyle = `rgba(${target.accent}, 0.52)`;
                sCtx.fillText(c.name, c.labelPos[0] * w + currentShiftX, c.labelPos[1] * h + currentShiftY);
            });

            if (hoveredStar && skyTooltip) {
                skyCanvas.style.cursor = "pointer";
                if (lastHoveredName !== hoveredStar.name) {
                    lastHoveredName = hoveredStar.name;
                    skyTooltip.innerHTML = `
                        <div class="sky-tip-head">
                            <span class="sky-tip-name">${hoveredStar.name}</span>
                            <span class="sky-tip-mag">${hoveredStar.constellation} &bull; ${hoveredStar.mag}</span>
                        </div>
                        <p class="sky-tip-desc">${hoveredStar.desc}</p>
                    `;
                }
                const clampedX = Math.max(115, Math.min(w - 115, hoveredStar.px));
                const clampedY = Math.max(72, hoveredStar.py);
                skyTooltip.style.left = `${clampedX}px`;
                skyTooltip.style.top = `${clampedY}px`;
                skyTooltip.classList.add("visible");
            } else if (skyTooltip) {
                skyCanvas.style.cursor = "default";
                lastHoveredName = null;
                skyTooltip.classList.remove("visible");
            }

            requestAnimationFrame(renderSky);
        };
        renderSky();
    }

    // 9. Scroll Reveal + Fallback Anti-Blank
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.08 }
        );
        revealEls.forEach((el) => observer.observe(el));
    }
    // Jaring pengaman: pastikan semua bagian tetap muncul setelah 700ms
    setTimeout(() => {
        revealEls.forEach((el) => el.classList.add("visible"));
    }, 700);
});