    // ---------- ANIMASI SCROLL REVEAL ----------
    // Tambahkan class 'reveal' pada elemen yang ingin dianimasikan
    const revealElements = document.querySelectorAll(
        '.section-header, .info-card, .about-text p, .value-item, ' +
        '.vision-card, .team-card, .activity-card, .contact-card, ' +
        '.school-quote, .about-logo-frame, .school-logo-wrap'
    );

    revealElements.forEach(function(el) {
        el.classList.add('reveal');
    });

    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Hanya animasi sekali (tidak diulang saat scroll ke atas)
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(function(el) {
        revealObserver.observe(el);
    });

    // ---------- SMOOTH SCROLL UNTUK SEMUA TAUTAN ANCHOR ----------
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 72; // Kurangi tinggi navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ---------- SIMPAN NAMA PENGURUS (opsional, hanya di session) ----------
    const teamNames = document.querySelectorAll('.team-name');
    teamNames.forEach(function(nameField) {
        // Saat blur (selesai edit), simpan ke localStorage
        nameField.addEventListener('blur', function() {
            const role = this.previousElementSibling.textContent.trim();
            localStorage.setItem('astrophia_' + role, this.textContent.trim());
        });

        // Muat dari localStorage jika ada
        const role = nameField.previousElementSibling.textContent.trim();
        const savedName = localStorage.getItem('astrophia_' + role);
        if (savedName && savedName !== nameField.getAttribute('data-placeholder')) {
            nameField.textContent = savedName;
        }
    });

    // ---------- INISIALISASI ----------
    handleScroll(); // Jalankan sekali saat halaman dimuat

    console.log('🚀 ASTROPHIA Website loaded successfully!');
    console.log('© Keluarga OSIS ASTROPHIA — SMA Pasundan 1 Cianjur | MMXXV');

}); // End DOMContentLoaded
