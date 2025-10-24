<?php
header("Content-Type: application/json");

// ambil data dari frontend
$tanggal = $_POST["tanggal"] ?? null;
$cabang = $_POST["cabang"] ?? null;
$seat = $_POST["seat"] ?? null;
$menu = $_POST["menu"] ?? null;
$catatan = $_POST["catatan"] ?? null;

if (!$tanggal || !$cabang || !$seat || !$menu) {
  echo json_encode([
    "success" => false,
    "message" => "Tanggal, cabang, seat, dan menu wajib diisi."
  ]);
  exit;
}

// validasi dummy
// if ($cabang === "Simpang Ijen" && strpos($tanggal, "2025-10-15") !== false) {
//   echo json_encode([
//     "success" => false,
//     "message" => "Cabang Simpang Ijen penuh di tanggal ini!"
//   ]);
//   exit;
// }

// jika lolos validasi kirim ini
echo json_encode([
  "success" => true,
  "data" => [
    "tanggal" => $tanggal,
    "cabang" => $cabang,
    "seat" => $seat,
    "menu"=>$menu,
    "catatan"=>$catatan,
    "booking_id" => uniqid("BK_")
  ]
]);
exit;
?>