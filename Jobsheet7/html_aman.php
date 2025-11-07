<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>HTML Aman</title>
</head>

<body>
    <h2>Contoh Input Aman dengan htmlspecialchars()</h2>

    <form method="post" action="">
        <label for="input">Masukkan teks:</label>
        <input type="text" name="input" id="input">

        <label for="email">Masukkan Email:</label>
        <input type="email" name="email" id="email">
        <input type="submit" value="Kirim">
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $input = $_POST['input'];
        $input = htmlspecialchars($input, ENT_QUOTES, 'UTF-8');

        $email = $_POST['email'];

        echo "<h3>Hasil output:</h3>";

        if (filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo "<p>$email</p>";
        } else {
            echo "<p>BAHAYA</p>";
        }

        echo "<p>$input</p>";
    }
    ?>
</body>

</html>