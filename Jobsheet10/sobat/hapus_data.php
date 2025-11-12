<?php
session_start();
include 'koneksi.php';
include 'csrf.php';

$id = $_POST['id'];
$query = "DELETE FROM anggota WHERE id=:id";
$sql = $db1->prepare($query);
$sql->execute([':id' => $id]);

echo json_encode(['success' => 'Sukses']);
$db1 = null;
