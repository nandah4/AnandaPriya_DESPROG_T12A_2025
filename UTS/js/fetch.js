// // fetching data cabang dari get_data.php
// const loadCabang = (cabang = "Malang") => {
//   fetch("../data/get_data.php")
//     .then((res) => {
//       if (!res.ok) throw new Error(`jaringan buruk banget wok (${res.status})`);
//       return res.json();
//     })
//     .then((data) => {
//       let html = "";

//       if (!data) {
//         $("#cabang-layout").html("<p>Data cabang tidak tersedia.</p>");
//         return;
//       }

//       data.cities[cabang].forEach((element) => {
//         html += `
//         <div class="card-cabang" data-location="${element.location}">
//               <div class="image-card-cabang">
//                 <img
//                   src="${element.image}"
//                   alt="Foto ${element.location}"
//                 />
//                 <div class="card-layer-cabang">
//                 </div>
//               </div>
//               <p class="title-cabang">📍 ${element.location}</p>
//             </div>
//         `;
//       });

//       $("#cabang-layout").html(html);
//     })
//     .catch((err) => {
//       $("#cabang-layout").html("<p>Gagal memuat data cabang.</p>");
//     });
// };

// // get seats per cabang
// const loadSeats = (city = "Malang", cabang) => {
//   fetch("../data/get_data.php")
//     .then((res) => {
//       if (!res) {
//         throw new Error("Jaringan buruk wok");
//       }
//       return res.json();
//     })
//     .then((data) => {
//       let html = "";

//       const branches = data.cities[city];
//       const branch = branches.find((e) => e.location === cabang);

//       if (!branch) {
//         $("#seats-layout").html(
//           "<p>Cabang tidak ditemukan. Pilih Cabang Lebih Dulu 😄</p>"
//         );
//         return;
//       }


//       for (let i = 0; i < branch.totalSeats; i++) {
//         html += `
//           <div id="btn-seats" class="seats-pcs" data-no-seats="${i + 1}">
//             <p class="seat-name">${i + 1}</p>
//           </div>
//      `;
//       }

//       $("#seats-layout").html(html);
//     });
// };
