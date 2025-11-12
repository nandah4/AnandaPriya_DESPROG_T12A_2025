<?php
define('HOST', 'localhost');
define('USER', 'postgres');
define('PASS', 'pw2304');
define('DB1', 'db_prakweb');

try {
    $db1 = new PDO("pgsql:host=" . HOST . ";dbname=" . DB1, USER, PASS);
    $db1->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    die("Koneksi gagal: " . $e->getMessage());
}
