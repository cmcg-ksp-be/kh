document.addEventListener('DOMContentLoaded', () => {
    // 1. ÁNH XẠ DỮ LIỆU TỪ CONFIG LÊN HTML
    if (typeof CONFIG === 'undefined') {
        console.error("Không tìm thấy file config.js hoặc CONFIG object.");
        return;
    }

    // Tên và thông tin cơ bản
    document.title = CONFIG.title;
    document.querySelectorAll('.data-title').forEach(el => el.textContent = CONFIG.title);
    document.querySelectorAll('.data-groomName').forEach(el => el.textContent = CONFIG.groomName);
    document.querySelectorAll('.data-brideName').forEach(el => el.textContent = CONFIG.brideName);
    document.querySelectorAll('.data-eventTitle').forEach(el => el.textContent = CONFIG.eventTitle);
    document.querySelectorAll('.data-eventTime').forEach(el => el.textContent = CONFIG.eventTime);
    document.querySelectorAll('.data-eventDayOfWeek').forEach(el => el.textContent = CONFIG.eventDayOfWeek);
    document.querySelectorAll('.data-eventMonth').forEach(el => el.textContent = CONFIG.eventMonth);
    document.querySelectorAll('.data-eventDate').forEach(el => el.textContent = CONFIG.eventDate);
    document.querySelectorAll('.data-eventYear').forEach(el => el.textContent = CONFIG.eventYear);
    document.querySelectorAll('.data-eventLunarDate').forEach(el => el.textContent = CONFIG.eventLunarDate);
    document.querySelectorAll('.data-eventVenue').forEach(el => el.textContent = CONFIG.eventVenue);
    document.querySelectorAll('.data-eventAddress').forEach(el => el.textContent = CONFIG.eventAddress);

    // Link bản đồ
    const mapLinkEl = document.getElementById('event-map-link');
    if (mapLinkEl) {
        mapLinkEl.href = CONFIG.mapLink;
    }

    // Hình ảnh hero (load ngay lập tức do nằm ở phần đầu trang)
    document.getElementById('hero-img').style.backgroundImage = `url('${CONFIG.images.hero}')`;

    // Hình ảnh giữa trang - Load lazy bằng IntersectionObserver
    const eventMiddleImg = document.getElementById('event-middle-img');
    if (eventMiddleImg) {
        const bgObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.backgroundImage = `url('${CONFIG.images.eventMiddle}')`;
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '300px' }); // Load trước 300px trước khi scroll tới
        bgObserver.observe(eventMiddleImg);
    }

    // Nền hình cảm ơn (Footer)
    const footerImg = document.getElementById('footer-img');
    if (footerImg) footerImg.src = CONFIG.images.footer;

    // Memories & Lời cảm ơn
    document.querySelectorAll('.data-memoriesTitle').forEach(el => el.textContent = CONFIG.memoriesTitle);
    document.querySelectorAll('.data-memoriesDesc').forEach(el => el.textContent = CONFIG.memoriesDesc);
    document.querySelectorAll('.data-thankYouText').forEach(el => el.textContent = CONFIG.thankYouText);

    // Thông tin ngân hàng - Ban đầu để hình hộp quà, click mở popup QR
    const GIFT_ICON = "https://cdn-icons-png.flaticon.com/512/4213/4213958.png";

    document.querySelectorAll('.data-groomQr').forEach(el => {
        el.src = GIFT_ICON;
        el.style.cursor = "pointer";
        el.classList.add('reveal-qr');
        el.addEventListener('click', function () {
            if (fullScreenImg && imageModal) {
                fullScreenImg.src = CONFIG.banking.groom.qrImg;
                imageModal.classList.add('show-modal');
            }
        });
    });
    document.querySelectorAll('.data-groomBank').forEach(el => el.textContent = CONFIG.banking.groom.bank);
    document.querySelectorAll('.data-groomAccount').forEach(el => el.textContent = CONFIG.banking.groom.account);

    document.querySelectorAll('.data-brideQr').forEach(el => {
        el.src = GIFT_ICON;
        el.style.cursor = "pointer";
        el.classList.add('reveal-qr');
        el.addEventListener('click', function () {
            if (fullScreenImg && imageModal) {
                fullScreenImg.src = CONFIG.banking.bride.qrImg;
                imageModal.classList.add('show-modal');
            }
        });
    });
    document.querySelectorAll('.data-brideBank').forEach(el => el.textContent = CONFIG.banking.bride.bank);
    document.querySelectorAll('.data-brideAccount').forEach(el => el.textContent = CONFIG.banking.bride.account);

    // RSVP
    document.querySelectorAll('.data-rsvpMessage').forEach(el => el.textContent = CONFIG.rsvpMessage);

    // 2. RENDER LỊCH (CALENDAR)
    document.querySelectorAll('.data-calendarMonth').forEach(el => el.textContent = CONFIG.calendarMonth);
    const calendarContainer = document.getElementById('calendar-days-container');

    if (calendarContainer) {
        let calendarHTML = '';

        // Tính số ô trống đầu tháng (tự động điền theo calendarStartDay)
        let emptyDays = CONFIG.calendarStartDay - 1;
        if (emptyDays < 0) emptyDays = 0;

        for (let i = 0; i < emptyDays; i++) {
            calendarHTML += `<span></span>`;
        }

        // Vòng lặp điền các ngày trong tháng
        for (let i = 1; i <= CONFIG.calendarDays; i++) {
            if (i === CONFIG.weddingDay) {
                calendarHTML += `<span class="wedding-day">${i}</span>`;
            } else {
                calendarHTML += `<span>${i}</span>`;
            }
        }
        calendarContainer.innerHTML = calendarHTML;
    }

    // 3. CHỨC NĂNG ĐẾM NGƯỢC (Countdown Timer)
    const countDownDate = new Date(CONFIG.weddingDateTime).getTime();

    const countdownInterval = setInterval(function () {
        const now = new Date().getTime();
        const distance = countDownDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if (document.getElementById("days")) {
            document.getElementById("days").textContent = days < 10 ? '0' + days : days;
            document.getElementById("hours").textContent = hours < 10 ? '0' + hours : hours;
            document.getElementById("minutes").textContent = minutes < 10 ? '0' + minutes : minutes;
            document.getElementById("seconds").textContent = seconds < 10 ? '0' + seconds : seconds;
        }

        // Dừng khi qua ngày báo hỷ
        if (distance < 0) {
            clearInterval(countdownInterval);
            if (document.getElementById("days")) {
                document.getElementById("days").textContent = "00";
                document.getElementById("hours").textContent = "00";
                document.getElementById("minutes").textContent = "00";
                document.getElementById("seconds").textContent = "00";
            }
        }
    }, 1000);

    // 4. ANIMATION KHI CUỘN TRANG (Scroll Animations)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            } else {
                entry.target.classList.remove('show');
            }
        });
    }, observerOptions);

    // Theo dõi tất cả các phần tử có class animation
    const animatedElements = document.querySelectorAll('.blur-in-scroll, .flip-up-scroll, .zoom-out-scroll');
    animatedElements.forEach(el => observer.observe(el));

    // Observer cho slideshow entrance
    const slideshowEl = document.getElementById('memories-slideshow');
    if (slideshowEl) {
        const slideshowObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-slideshow');
                }
            });
        }, { threshold: 0.2 });
        slideshowObserver.observe(slideshowEl);
    }

    // Gửi form RSVP và hiển thị lời chúc qua API (Node.js Server)
    const rsvpForm = document.getElementById('rsvp-form');
    let rsvpDisplayCount = 5;
    
    // Nút Xem Thêm
    const loadMoreBtn = document.getElementById('load-more-rsvp-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            rsvpDisplayCount += 5;
            renderRSVPs();
        });
    }

    if (rsvpForm) {
        rsvpForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = rsvpForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Đang gửi...';
            }
            
            const nameEl = document.getElementById('rsvp-name');
            const messageEl = document.getElementById('rsvp-message');
            const attendanceEl = document.getElementById('rsvp-attendance');
            const guestsEl = document.getElementById('rsvp-guests');
            const guestOfEl = document.getElementById('rsvp-guest-of');

            const rsvpData = {
                name: nameEl ? nameEl.value : '',
                message: messageEl ? messageEl.value : '',
                attendance: attendanceEl ? attendanceEl.value : '',
                guests: guestsEl ? guestsEl.value : '',
                guestOf: guestOfEl ? guestOfEl.value : '',
                timestamp: new Date().toISOString()
            };

            try {
                if (CONFIG.rsvpApiUrl) {
                    // Gửi dữ liệu lên API đám mây (MockAPI/Sheets)
                    const response = await fetch(CONFIG.rsvpApiUrl, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(rsvpData)
                    });
                    
                    if (response.ok) {
                        alert('Cảm ơn bạn đã xác nhận sự có mặt!');
                        rsvpForm.reset();
                        
                        rsvpDisplayCount = 5;
                        await renderRSVPs();
                    } else {
                        alert('Đã xảy ra lỗi khi gửi lời nhắn. Vui lòng thử lại sau.');
                    }
                } else {
                    // Chạy tạm thời dưới dạng LocalStorage nếu chưa cấu hình Link API
                    const savedRSVPs = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
                    savedRSVPs.unshift(rsvpData);
                    localStorage.setItem('weddingRSVPs', JSON.stringify(savedRSVPs));

                    alert('Cảm ơn bạn đã xác nhận sự có mặt! (Lưu tạm Offline)');
                    rsvpForm.reset();
                    rsvpDisplayCount = 5;
                    await renderRSVPs();
                }
            } catch (error) {
                console.error('Error submitting RSVP:', error);
                alert('Không thể kết nối. Vui lòng kiểm tra lại link API rsvpApiUrl rsvpApiUrl trong config.js');
            } finally {
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'GỬI LỜI NHẮN';
                }
            }
        });

        async function renderRSVPs() {
            const container = document.getElementById('rsvp-messages-container');
            if (!container) return;
            
            try {
                let savedRSVPs = [];
                
                if (CONFIG.rsvpApiUrl) {
                    // Lấy danh sách từ API
                    const response = await fetch(CONFIG.rsvpApiUrl);
                    if (!response.ok) throw new Error('Network response was not ok');
                    
                    savedRSVPs = await response.json();
                    
                    // MockAPI thường nối vào cuối mảng, ta cần đảo ngược để lấy lời chúc mới nhất lên đầu
                    if (Array.isArray(savedRSVPs)) {
                        savedRSVPs.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
                    }
                } else {
                    // Lấy từ LocalStorage tạm thời
                    savedRSVPs = JSON.parse(localStorage.getItem('weddingRSVPs') || '[]');
                }
                
                if (savedRSVPs.length === 0) {
                    container.innerHTML = '<p class="text-muted text-center" style="font-size: 1.1rem;">Chưa có lời nhắn nào. Hãy là người đầu tiên!</p>';
                    if (loadMoreBtn) loadMoreBtn.style.display = 'none';
                    return;
                }

                if (loadMoreBtn) {
                    if (savedRSVPs.length > rsvpDisplayCount) {
                        loadMoreBtn.style.display = 'inline-block';
                    } else {
                        loadMoreBtn.style.display = 'none';
                    }
                }

                const rsvpsToShow = savedRSVPs.slice(0, rsvpDisplayCount);

                container.innerHTML = rsvpsToShow.map(rsvp => {
                    const date = new Date(rsvp.timestamp).toLocaleDateString('vi-VN');
                    let tagsHTML = '';
                    
                    if (rsvp.attendance === 'yes') {
                        tagsHTML += '<span style="display:inline-block; padding: 4px 10px; border-radius: 20px; background: #e6f4ea; color: #1e8e3e; font-size: 0.85rem; margin-right: 8px;"><i class="fa-solid fa-check"></i> Sẽ tham dự</span>';
                    } else if (rsvp.attendance === 'no') {
                        tagsHTML += '<span style="display:inline-block; padding: 4px 10px; border-radius: 20px; background: #fce8e6; color: #d93025; font-size: 0.85rem; margin-right: 8px;"><i class="fa-solid fa-xmark"></i> Không thể tham dự</span>';
                    }
                    
                    if (rsvp.guests && rsvp.guests !== '') {
                        const guestText = rsvp.guests === 'other' ? 'Gia đình' : rsvp.guests + ' người';
                        tagsHTML += `<span style="display:inline-block; padding: 4px 10px; border-radius: 20px; background: #e8f0fe; color: #1a73e8; font-size: 0.85rem; margin-right: 8px;"><i class="fa-solid fa-user-group"></i> ${guestText}</span>`;
                    }

                    return `
                        <div style="background: rgba(255, 255, 255, 0.9); border-radius: 12px; padding: 15px; margin-bottom: 15px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); border-left: 4px solid var(--primary-blue);">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                                <strong style="color: var(--primary-blue); font-size: 1.1rem; flex: 1;">${rsvp.name}</strong>
                                <span style="font-size: 0.85rem; color: #888;">${date}</span>
                            </div>
                            ${rsvp.message ? `<p style="font-size: 1rem; color: #444; margin-bottom: 12px; line-height: 1.5; font-style: italic;">"${rsvp.message}"</p>` : ''}
                            <div>${tagsHTML}</div>
                        </div>
                    `;
                }).join('');
            } catch (error) {
                console.error("Lỗi khi tải RSVP:", error);
                container.innerHTML = '<p class="text-danger text-center">Không thể tải lời chúc, vui lòng thử lại sau.</p>';
            }
        }

        // Khởi tạo hiển thị danh sách
        renderRSVPs();
    }

    // ============================================================
    // 4.5. BACKGROUND MUSIC (LOCAL / MP3 LINK)
    // ============================================================
    if (CONFIG.music && CONFIG.music.link) {
        const musicBtn = document.getElementById('music-btn');
        const bgMusic = document.getElementById('bg-music');
        const audioSource = bgMusic.querySelector('source');

        if (musicBtn && bgMusic && audioSource) {
            audioSource.src = CONFIG.music.link;
            bgMusic.load();
            musicBtn.style.display = 'flex'; // Hiện nút nghe nhạc lên

            let isPlaying = false;

            const toggleMusic = () => {
                if (isPlaying) {
                    bgMusic.pause();
                    musicBtn.classList.remove('playing');
                } else {
                    bgMusic.play().catch(e => console.log("Trình duyệt chặn autoplay", e));
                    musicBtn.classList.add('playing');
                }
                isPlaying = !isPlaying;
            };

            musicBtn.addEventListener('click', toggleMusic);

            // Tự động phát nhạc khi người dùng nhấp/chạm vào màn hình lần đầu tiên
            document.body.addEventListener('click', function firstInteraction(e) {
                if (!musicBtn.contains(e.target) && !isPlaying) {
                    toggleMusic();
                }
                document.body.removeEventListener('click', firstInteraction, true);
            }, { once: true, capture: true });
        }
    }

    // ============================================================
    // 5. OUR MEMORIES SLIDESHOW
    // ============================================================

    // Thêm các ảnh từ thư mục (có thể thay đổi số lượng). Fix fallbacks nếu config ko có array
    const memoryImages = (CONFIG.images.memories && CONFIG.images.memories.length)
        ? CONFIG.images.memories
        : [
            CONFIG.images.memory1,
            CONFIG.images.memory2,
            CONFIG.images.memory3,
            CONFIG.images.memory4,
            CONFIG.images.memory5,
            CONFIG.images.memory6,
            CONFIG.images.memory7,
            CONFIG.images.memory8,
            CONFIG.images.memory9,
            CONFIG.images.memory11,
            CONFIG.images.memory12,
            CONFIG.images.memory13,
            CONFIG.images.memory14,
            CONFIG.images.memory15,
        ].filter(Boolean);

    const slideshowTrack = document.getElementById('slideshow-track');
    const dotsContainer = document.getElementById('slideshow-dots');
    let memCurrentIndex = 0;
    let autoPlayTimer = null;

    // Xây dựng các slide
    if (slideshowTrack && memoryImages.length) {
        memoryImages.forEach((src, i) => {
            const item = document.createElement('div');
            item.className = 'slide-item';
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Memory ${i + 1}`;
            img.loading = i === 0 ? 'eager' : 'lazy';
            img.addEventListener('click', () => {
                currentImgIndex = i;
                updateFullscreenSlideshow();
                if (imageModal) imageModal.classList.add('show-modal');
            });
            item.appendChild(img);
            slideshowTrack.appendChild(item);
        });



        // Tạo dots
        if (dotsContainer) {
            memoryImages.forEach((_, i) => {
                const dot = document.createElement('button');
                dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
                dot.setAttribute('aria-label', `Slide ${i + 1}`);
                dot.addEventListener('click', () => goToMemSlide(i));
                dotsContainer.appendChild(dot);
            });
        }

        function updateMemSlideshow() {
            // Di chuyển track
            slideshowTrack.style.transform = `translateX(-${memCurrentIndex * 100}%)`;

            // Cập nhật dots
            const dots = dotsContainer ? dotsContainer.querySelectorAll('.slide-dot') : [];
            dots.forEach((d, i) => d.classList.toggle('active', i === memCurrentIndex));


        }

        function goToMemSlide(index) {
            memCurrentIndex = (index + memoryImages.length) % memoryImages.length;
            updateMemSlideshow();
            resetAutoPlay();
        }

        function nextMemSlide() { goToMemSlide(memCurrentIndex + 1); }
        function prevMemSlide() { goToMemSlide(memCurrentIndex - 1); }

        function startAutoPlay() {
            autoPlayTimer = setInterval(nextMemSlide, 4000);
        }
        function resetAutoPlay() {
            clearInterval(autoPlayTimer);
            startAutoPlay();
        }

        // Nút prev / next trong slideshow
        const prevBtn = document.getElementById('mem-prev-btn');
        const nextBtn = document.getElementById('mem-next-btn');
        if (prevBtn) prevBtn.addEventListener('click', prevMemSlide);
        if (nextBtn) nextBtn.addEventListener('click', nextMemSlide);

        // Touch / swipe
        let touchStartX = 0;
        if (slideshowEl) {
            slideshowEl.addEventListener('touchstart', e => {
                touchStartX = e.changedTouches[0].clientX;
            }, { passive: true });
            slideshowEl.addEventListener('touchend', e => {
                const diff = touchStartX - e.changedTouches[0].clientX;
                if (Math.abs(diff) > 40) {
                    diff > 0 ? nextMemSlide() : prevMemSlide();
                }
            }, { passive: true });
            // Pause / resume auto-play khi hover
            slideshowEl.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
            slideshowEl.addEventListener('mouseleave', startAutoPlay);
        }

        // Khởi tạo
        updateMemSlideshow();
        startAutoPlay();
    }

    // ============================================================
    // 6. FULLSCREEN IMAGE MODAL (mở khi click slide)
    // ============================================================
    const imageModal = document.getElementById('image-modal');
    const fullScreenImg = document.getElementById('full-screen-img');
    let currentImgIndex = 0;

    function updateFullscreenSlideshow() {
        if (fullScreenImg && memoryImages.length) {
            fullScreenImg.src = memoryImages[currentImgIndex];
        }
    }

    window.nextSlide = function () {
        currentImgIndex = (currentImgIndex + 1) % memoryImages.length;
        updateFullscreenSlideshow();
    };

    window.prevSlide = function () {
        currentImgIndex = (currentImgIndex - 1 + memoryImages.length) % memoryImages.length;
        updateFullscreenSlideshow();
    };

    window.closeImageModal = function (event) {
        if (!event ||
            event.target.id === 'image-modal' ||
            event.target.classList.contains('image-modal-content') ||
            event.target.classList.contains('close-modal')) {
            if (imageModal) imageModal.classList.remove('show-modal');
        }
    };

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (!imageModal || !imageModal.classList.contains('show-modal')) return;
        if (e.key === 'ArrowRight') nextSlide();
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'Escape') closeImageModal();
    });

    // ============================================================
    // 7. GIFT MODAL
    // ============================================================
    const giftModal = document.getElementById('gift-modal');
    window.openGiftModal = function () {
        if (giftModal) giftModal.classList.add('show-modal');
    };
    window.closeGiftModal = function () {
        if (giftModal) giftModal.classList.remove('show-modal');
    };

    // Đóng khi click ra ngoài modal
    window.onclick = function (event) {
        if (event.target == giftModal) {
            giftModal.classList.remove('show-modal');
        }
    };
});
