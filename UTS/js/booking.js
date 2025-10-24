// ================================
// 🤡 CONSTANT ATTRIBUTE
// ================================

const BOOKING_HISTORY = "booking-history";
const API_DATA = "../data/get_data.php";
const API_BOOKING = "../services/booking_service.php";
const IS_CONFIRM = "confirm-by-cashier";

// ================================
// 🤡 INI STATE MANAGEMENT BRO
// ================================

const appState = {
  selectedDate: null,
  selectedCabang: null,
  selectedSeat: null,
};

// ================================
// 🤡 LOCAL STORAGE STUFF
// ================================

const storageManager = {
  // get data bookings from local
  getBookings() {
    const data = localStorage.getItem(BOOKING_HISTORY);
    return data ? JSON.parse(data) : [];
  },

  // save data to local
  saveBooking(data) {
    if (!data) return;

    const bookings = this.getBookings();
    bookings.push(data);
    localStorage.setItem(BOOKING_HISTORY, JSON.stringify(bookings));
  },

  // remove a data from local
  removeBooking(index) {
    const bookings = this.getBookings();

    if (index < 0 || index > bookings.length) return;

    bookings.splice(index, 1);
    localStorage.setItem(BOOKING_HISTORY, JSON.stringify(bookings));
  },

  // check seet did booked
  isBookedSeat(cabang, seatNo, tanggal) {
    const bookings = this.getBookings();

    if (!bookings || bookings.length === 0) return false;

    const currentDate = new Date(tanggal).toISOString().split("T")[0];

    return bookings.some((b) => {
      const bookingDate = new Date(b.tanggal).toISOString().split("T")[0];

      return (
        bookingDate === currentDate && b.cabang === cabang && b.seat == seatNo
      );
    });
  },
};

$(document).ready(function () {
  // ================================
  // 🤡 UI RENDERING
  // ================================

  // to assign html from navbar to html main
  $("#navbar-container").load("../components/navbar-book.html");

  // fetching data cabang dari get_data.php
  const loadCabang = (cabang = "Malang") => {
    fetch(API_DATA)
      .then((res) => {
        if (!res.ok)
          throw new Error(`jaringan buruk banget wok (${res.status})`);
        return res.json();
      })
      .then((data) => {
        let html = "";

        if (!data) {
          $("#cabang-layout").html("<p>Data cabang tidak tersedia.</p>");

          return;
        }

        data.cities[cabang].forEach((element) => {
          html += `
        <div class="card-cabang" data-location="${element.location}">
              <div class="image-card-cabang">
                <img
                  src="${element.image}"
                  alt="Foto ${element.location}"
                />
                <div class="card-layer-cabang">
                </div>
              </div>
              <p class="title-cabang">📍 ${element.location}</p>
            </div>
        `;
        });

        $("#cabang-layout").html(html);
      })
      .catch((err) => {
        $("#cabang-layout").html("<p>Gagal memuat data cabang.</p>");
      });
  };

  // get seats per cabang
  const loadSeats = (city = "Malang", cabang) => {
    fetch(API_DATA)
      .then((res) => {
        if (!res) {
          throw new Error("Jaringan buruk wok");
        }
        return res.json();
      })
      .then((data) => {
        let html = "";

        const branches = data.cities[city];
        const branch = branches.find((e) => e.location === cabang);

        if (!branch) {
          $("#seats-layout").html(
            "<div class ='container-seat-default'><img src='../assets/images/unhappy.svg' alt='unhappy image'/><p>Cabang tidak ditemukan. Pilih Cabang Lebih Dulu 😄</p></div>"
          );
          return;
        }

        if (branch) {
          $("#info-available-seat").html(
            '<p class="headline-section">Informasi Kursi dan Meja</p> <div class="wrapper-layout-seat-card"><div class="layout-seat-info">  <div class="seat-booked"></div> <p>Meja dan Kursi Ditempati.</p> </div> <div class="layout-seat-info"> <div class="seat-available"></div> <p>Meja dan Kursi Tersedia.</p> </div></div> <div class="layout-seat-info"><div class="seat-picked"></div><p>Kamu sedang memilih Meja dan Kursi ini.</p> </div>'
          );
        }

        for (let i = 0; i < branch.totalSeats; i++) {
          const seatNo = i + 1;

          // cek wok apakah kursi ini sudah dibooking di cabang & tanggal yang sama
          const isBooked = storageManager.isBookedSeat(
            appState.selectedCabang,
            seatNo,
            appState.selectedDate
          );

          html += `
      <div 
        id="btn-seats" 
        class="seats-pcs ${isBooked ? "booked" : ""}" 
        data-no-seats="${seatNo}">
        <p class="seat-name ${isBooked ? "booked" : ""}">${seatNo}</p>
      </div>
    `;
        }

        $("#seats-layout").html(html);
      });
  };

  // fungsi to generate days and dates
  const generateDates = (totalDays = 7) => {
    let days = [];
    const today = new Date();

    for (let i = 0; i < totalDays; i++) {
      let dates = new Date();
      dates.setDate(today.getDate() + i);

      const dayName = dates.toLocaleString("id-ID", { weekday: "long" });
      const fullDate = dates.toLocaleString("id-ID", {
        day: "numeric",
        year: "numeric",
        month: "long",
      });

      days.push(`
        <div class="date-picker-card" data-date="${dates.toISOString()}">
          <p class="card-day-content">${dayName}</p>
          <p class="card-date-content">${fullDate}</p>
        </div>
    `);
    }

    $("#date-picker").html(days.join(""));
  };

  // Render data ke halaman history
  const loadHistory = () => {
    let htmlElement = "";
    const dataBookings = storageManager.getBookings();

    if (!dataBookings || dataBookings.length === 0) {
      htmlElement = `<li class="container-not-found">
      <div class="image-not-found"><img src='../assets/images/404-transparent.svg' /> </div>
      Belum ada data Booking.
      </li>`;
    } else {
      for (let i = 0; i < dataBookings.length; i++) {
        const booking = dataBookings[i];
        const dateNew = new Date(booking.tanggal);
        const dateFix = dateNew.toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          timeZone: "Asia/Jakarta",
        });
        htmlElement += `
        <li>
          <div class="pcs-history-card">
            <div class="header-history-card">
              <p>${booking.booking_id || "BK_UNKNOWN"} - ${
          booking.cabang || "UNKNOWN"
        }</p>
              <p>${dateFix || "20 Agustus 2025"}</p>
            </div>

            <div class="main-history-card">
              <div class="message-history">
                <h4>Pesanan: ${booking.menu || "Cafe Workspace Malang"}</h4>
                <p>
                  Catatan: ${booking.catatan || ""}
                </p>
                <p>Kursi & Meja: ${booking.seat || "Meja 1"}</p>
              </div>
              <div id="rounded-trash" class="rounded-trash" data-no-icon="${i}">
                <svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" transform="rotate(0 0 0)">
<path d="M14.7223 12.7585C14.7426 12.3448 14.4237 11.9929 14.01 11.9726C13.5963 11.9522 13.2444 12.2711 13.2241 12.6848L12.9999 17.2415C12.9796 17.6552 13.2985 18.0071 13.7122 18.0274C14.1259 18.0478 14.4778 17.7289 14.4981 17.3152L14.7223 12.7585Z" fill="#ff0000"/>
<path d="M9.98802 11.9726C9.5743 11.9929 9.25542 12.3448 9.27577 12.7585L9.49993 17.3152C9.52028 17.7289 9.87216 18.0478 10.2859 18.0274C10.6996 18.0071 11.0185 17.6552 10.9981 17.2415L10.774 12.6848C10.7536 12.2711 10.4017 11.9522 9.98802 11.9726Z" fill="#ff0000"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.249 2C9.00638 2 7.99902 3.00736 7.99902 4.25V5H5.5C4.25736 5 3.25 6.00736 3.25 7.25C3.25 8.28958 3.95503 9.16449 4.91303 9.42267L5.54076 19.8848C5.61205 21.0729 6.59642 22 7.78672 22H16.2113C17.4016 22 18.386 21.0729 18.4573 19.8848L19.085 9.42267C20.043 9.16449 20.748 8.28958 20.748 7.25C20.748 6.00736 19.7407 5 18.498 5H15.999V4.25C15.999 3.00736 14.9917 2 13.749 2H10.249ZM14.499 5V4.25C14.499 3.83579 14.1632 3.5 13.749 3.5H10.249C9.83481 3.5 9.49902 3.83579 9.49902 4.25V5H14.499ZM5.5 6.5C5.08579 6.5 4.75 6.83579 4.75 7.25C4.75 7.66421 5.08579 8 5.5 8H18.498C18.9123 8 19.248 7.66421 19.248 7.25C19.248 6.83579 18.9123 6.5 18.498 6.5H5.5ZM6.42037 9.5H17.5777L16.96 19.7949C16.9362 20.191 16.6081 20.5 16.2113 20.5H7.78672C7.38995 20.5 7.06183 20.191 7.03807 19.7949L6.42037 9.5Z" fill="#ff0000"/>
</svg>
              </div>
            </div>
          </div>
        </li>
      `;
      }
    }

    $("#main-history ul").html(htmlElement);
  };

  generateDates(14);
  loadCabang();
  loadSeats();

  // ================================
  // 🤡 EVENT
  // ================================

  // handle event TANGGAL card when diklik aktif
  $(document).on("click", ".date-picker-card", function () {
    $(".date-picker-card").removeClass("active");
    $(this).addClass("active");
    appState.selectedDate = $(this).data("date");

    if (appState.selectedDate) {
      loadSeats("Malang", appState.selectedCabang);
    }
  });

  // handle event klik CABANG set selectedCabang
  $(document).on("click", ".card-cabang", function () {
    appState.selectedCabang = $(this).data("location");
    loadSeats("Malang", $(this).data("location"));
    $(".card-layer-cabang").html("");

    // tambahkan ikon ke yang diklik wok
    $(this).find(".card-layer-cabang").html("<span>✅</span>");
  });

  // btn click seats set selectedSeats
  $(document).on("click", "#btn-seats", function () {
    const seatNo = $(this).data("no-seats");

    const isBooked = storageManager.isBookedSeat(
      appState.selectedCabang,
      seatNo,
      appState.selectedDate
    );

    if (isBooked) {
      alert("SUDAH DIPESAN");
      return;
    }

    appState.selectedSeat = seatNo;
    $(".seats-pcs").removeClass("active");
    $(this).addClass("active");

    // handle seats facility
    let html = "";

    if (appState.selectedSeat % 2 == 0) {
      html = `
    <ul>
      <li>🪑 Kapasitas 4 Orang.</li>
      <li>⚡️ 4 Slot Colokan Listrik.</li>
      <li>🏠 Outdoor.</li>
    </ul>`;
    } else {
      html = `
    <ul>
      <li>🪑 Kapasitas 2 Orang.</li>
      <li>⚡️ Tidak Ada Colokan Listrik.</li>
      <li>🏠 Indoor.</li>
    </ul>`;
    }

    $("#facility-cards").html(html);
  });

  // btn delete item on history page
  $(document).on("click", "#rounded-trash", function () {
    let index = $(this).data("no-icon");

    $(this)
      .closest("li")
      .fadeOut(500, function () {
        storageManager.removeBooking(index);
        loadHistory();
        loadSeats("Malang", appState.selectedCabang);
      });
  });

  // btn active modal
  $(document).on("click", "#btn-history", function () {
    // load modal HTML then populate history after it's inserted into DOM
    $("#modal-history-booking").load("../components/modal.html", function () {
      loadHistory();
    });
  });

  // btn inactive modal
  $(document).on("click", "#btn-close", function () {
    $("#modal-history-booking").empty();
  });

  // event submit data
  $(document).on("click", "#btn-submit", function (e) {
    e.preventDefault();
    console.log("AAAA")

    const menu = $("#menu-pesanan").val();
    const catatan = $("#menu-catatan").val();

    $.ajax({
      url: "../services/booking_service.php",
      method: "POST",
      data: {
        tanggal: appState.selectedDate,
        cabang: appState.selectedCabang,
        seat: appState.selectedSeat,
        menu: menu,
        catatan: catatan,
      },
      success: function (res) {
        if (res.success) {
          storageManager.saveBooking(res.data);
          loadSeats("Malang", appState.selectedCabang);

          $("#menu-pesanan").val("");
          $("#menu-catatan").val("");
          alert("Booking berhasil!");
        } else {
          alert(res.message || "Booking gagal!");
        }
      },
      error: function () {
        alert("Terjadi kesalahan jaringan, coba lagi nanti.");
      },
    });
  });
});
