<?php
session_start();
if (isset($_SESSION['status']) && $_SESSION['status'] == 'login') {
    echo "Selamat datang " . $_SESSION['username'];
    echo "<br><a href='sessionLogout.php'>Logout</a>";
} else {
    echo "Anda belum login, silahkan <a href='sessionLoginForm.html'>Login</a>";
}
