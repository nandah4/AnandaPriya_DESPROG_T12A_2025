<?php

$koneksi = pg_connect("host=localhost port=5432 dbname=db_prakweb user=postgres password=pw2304");

if (!$koneksi) {
die("Koneksi database gagal: " . pg_last_error());
}