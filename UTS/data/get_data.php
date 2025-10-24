<?php
header("Content-Type: application/json");

$cabang = [
"Malang" => [
  [
    "image" => "../assets/images/cw-jakarta.jpg",
    "location" => "Simpang Ijen",
    "totalSeats" => 34,
  ],
  [
    "image" => "../assets/images/cw-tlogomas.jpg",
    "location" => "Tlogomas",
    "totalSeats" => 38,
  ],
  [
    "image" => "../assets/images/cw-brits.jpg",
    "location" => "Kendal Sari",
    "totalSeats" => 30,
  ],
]
  
];

echo json_encode(["cities" => $cabang]); 
exit;

?>