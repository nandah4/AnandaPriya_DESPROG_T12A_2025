<html>

<head>
    <h2> Keranjang Belanja </h2>
</head>

<body>
    <?php
    $beliNovel = $_COOKIE['beliNovel'];
    $beliBuku = $_COOKIE['beliBuku'];

    echo "Jumlah Novel: " . $beliNovel . "<br>";
    echo "Jumlah Buku: " . $beliBuku;
    ?>
</body>

</html>