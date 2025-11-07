<?php

if (isset($_FILES['file'])) {
    $errors = array();
    $file_name = $_FILES['file']['name'];
    $file_size = $_FILES['file']['size'];
    $file_tmp = $_FILES['file']['tmp_name'];
    $file_type = $_FILES['file']['type'];
    // Mengambil ekstensi dengan cara yang lebih aman
    $tmp = explode('.', $_FILES['file']['name']);
    $file_ext = strtolower(end($tmp));

    $extensions = array("pdf", "doc", "docx", "txt");

    if (in_array($file_ext, $extensions) === false) {
        $errors[] = "Ekstensi file yang diizinkan adalah PDF, DOC, DOCX, atau TXT.";
    }

    if ($file_size > 2097152) { // 2 MB
        $errors[] = "Ukuran file tidak boleh lebih dari 2 MB";
    }

    if (empty($errors) == true) {
        move_uploaded_file($file_tmp, "documents/" . $file_name);
        echo "File berhasil diunggah.";
    } else {
        echo implode("<br>", $errors);
    }
}


// if (empty($_FILES['files']['name'][0])) {
//     echo "Tidak ada file yang diunggah.";
//     exit;
// }

// $errors = array();

// $totalFiles = count($_FILES['files']['name']);

// for ($i = 0; $i < $totalFiles; $i++) {

//     $file_name = $_FILES['files']['name'][$i];
//     $file_size = $_FILES['files']['size'][$i];
//     $file_tmp = $_FILES['files']['tmp_name'][$i];
//     $file_type = $_FILES['files']['type'][$i];

//     $file_ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));

//     $extensions = array("jpg", "jpeg", "png", "gif");

//     if (!in_array($file_ext, $extensions)) {
//         $errors[] = "Ekstensi file yang diizinkan adalah .jpg, .jpeg, .png, atau .gif";
//     }

//     if ($file_size > 2097152) { // 2 MB
//         $errors[] = "Ukuran file tidak boleh lebih dari 2 MB";
//     }

//     if (empty($errors) == true) {
//         move_uploaded_file($file_tmp, "documents/" . $file_name);
//         echo "File $file_name berhasil diunggah.<br>";
//     } else {
//         echo implode("<br>", $errors);
//     }
// }
