/* 
   ========================================================
   CẤU HÌNH THÔNG TIN THIỆP CƯỚI (USER THAY ĐỔI Ở ĐÂY)
   ========================================================
*/

const CONFIG = {
    // 1. TÊN VÀ TIÊU ĐỀ
    title: "An & Hải Wedding",
    groomName: "An", // Tên chú rể hiển thị trên ảnh đầu tiên
    brideName: "Hải",    // Tên cô dâu hiển thị trên ảnh đầu tiên

    // 2. THÔNG TIN SỰ KIỆN CHÍNH
    eventTitle: "LỄ THÀNH HÔN ĐƯỢC TỔ CHỨC VÀO LÚC",
    eventTime: "15 GIỜ 30 PHÚT",
    eventDayOfWeek: "CHỦ NHẬT",
    eventMonth: "THÁNG 3",
    eventDate: "28",
    eventYear: "NĂM 2026",
    eventLunarDate: "(Tức ngày 11 tháng 02 năm Bính Ngọ)",
    eventVenue: "Tư gia nhà trai",
    eventAddress: "Địa chỉ: Số 18, Phố Mới, Hát Môn, Hà Nội",
    mapLink: "https://maps.app.goo.gl/VN4kSZgy2ec9fYZd7?g_st=ifm", // Thay bằng link thật

    // 3. ẢNH (Bỏ file ảnh của bạn vào thư mục images/ và điền đúng tên file vào đây)
    images: {
        hero: "images/an11.jpg", // Tên file ảnh bìa lớn đầu tiên (VD: hero.jpg)
        eventMiddle: "images/an22.jpg", // Ảnh ngang lớn giữa trang (trên phần Lịch)
        memory1: "images/an33.jpg", // Ảnh vuông to đầu tiên
        memory2: "images/an34.jpg", // Ảnh nhỏ bên trái
        memory3: "images/an35.jpg", // Ảnh nhỏ bên phải
        memory4: "images/an36.jpg", // Ảnh cưới dọc bên trái dưới
        memory5: "images/an37.jpg",  // Ảnh cưới dọc bên phải dưới
        memory6: "images/an38.jpg",  // Ảnh cưới dọc bên phải dưới
        memory7: "images/an39.jpg",  // Ảnh cưới dọc bên phải dưới
        memory8: "images/an40.jpg",  // Ảnh cưới dọc bên phải dưới
        memory9: "images/an41.jpg",  // Ảnh cưới dọc bên phải dưới
        memory10: "images/an42.jpg",  // Ảnh cưới dọc bên phải dưới
        memory11: "images/an43.jpg",  // Ảnh cưới dọc bên phải dưới
        memory12: "images/an44.jpg",  // Ảnh cưới dọc bên phải dưới
        memory13: "images/an45.jpg",  // Ảnh cưới dọc bên phải dưới
        memory14: "images/an46.jpg",  // Ảnh cưới dọc bên phải dưới
        memory15: "images/an47.jpg",  // Ảnh cưới dọc bên phải dưới
        footer: "images/footer.jpg" // Ảnh lớn phần Thank You ở cuối trang
    },

    // 4. LỊCH (CALENDAR)
    calendarMonth: "March",
    calendarDays: 31,     // Số ngày trong tháng
    calendarStartDay: 7,  // Ngày mùng 1 bắt đầu vào thứ mấy (1: Mon, 2: Tue, ..., 7: Sun) (Tháng 3 2025 mùng 1 là T7 -> 6)
    weddingDay: 28,        // Ngày cưới để khoanh trái tim

    // 5. OUR MEMORIES
    memoriesTitle: "Our memories",
    memoriesDesc: "This album captures the most beautiful moments of our special day—filled with love, joy, and unforgettable memories. From our heartfelt vows to the first dance, every photo tells a story of our journey together. Surrounded by family and friends, we celebrated a love that will last a lifetime.",

    // 6. THÔNG ĐIỆP RSVP (ĐIỀN FORM)
    rsvpMessage: "Hãy xác nhận sự có mặt của bạn để chúng mình chuẩn bị đón tiếp một cách chu đáo nhất. Trân trọng!",
    // URL MockAPI hoặc Google Sheets API để lưu trữ lời chúc (nếu để trống web sẽ tự động xài localStorage tạm thời)
    rsvpApiUrl: "https://69b7bb3dffbcd0286095fb01.mockapi.io/rsvps",

    // 7. LOI CAM ON (THANK YOU FOOTER)
    thankYouText: "Cảm ơn bạn đã dành tình cảm cho chúng mình! Sự hiện diện của bạn chính là món quà ý nghĩa nhất, và chúng mình vô cùng trân quý khi được cùng bạn chia sẻ niềm hạnh phúc trong ngày trọng đại này.",

    // 8. TÀI KHOẢN NGÂN HÀNG (MÚC QUÀ)
    banking: {
        groom: {
            bank: "Vietcombank",
            account: "020100050202",
            qrImg: "images/qr2.jpg"
        },
        bride: {
            bank: "MB Bank",
            account: "0977109988",
            qrImg: "images/qr1.jpg"
        }
    },

    // 9. THỜI GIAN ĐẾM NGƯỢC
    weddingDateTime: "2026-03-28T15:30:00",

    // 10. NHẠC NỀN (Để link file mp3)
    // Ví dụ: Nhạc tải trên mạng về để trong cùng thư mục với các file HTML, CSS và đặt tên là "music.mp3"
    music: {
        link: "images/music.mp3" // Thay bằng tên file nhạc mp3 hoặc link Youtube bài hát bạn thích
    }
};
