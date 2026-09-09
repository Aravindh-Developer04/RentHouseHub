<?php

$origin = $_SERVER["HTTP_ORIGIN"] ?? "";

$allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "https://renthousehub.rf.gd"
];

if ($origin !== "" && in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: " . $origin);
} else {
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

require_once __DIR__ . "/../config/database.php";

$data = json_decode(file_get_contents("php://input"), true);

$name = trim($data["name"] ?? "");
$email = trim($data["email"] ?? "");
$phone = trim($data["phone"] ?? "");
$password = $data["password"] ?? "";

if ($name === "" || $email === "" || $password === "") {
    echo json_encode([
        "success" => false,
        "message" => "All required fields are required"
    ]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode([
        "success" => false,
        "message" => "Invalid email"
    ]);
    exit;
}

if (strlen($password) < 6) {
    echo json_encode([
        "success" => false,
        "message" => "Password must be at least 6 characters"
    ]);
    exit;
}

try {

    // Check existing email
    $check = $conn->prepare(
        "SELECT id FROM users WHERE email = ?"
    );

    $check->bind_param("s", $email);
    $check->execute();

    $result = $check->get_result();

    if ($result->num_rows > 0) {
        echo json_encode([
            "success" => false,
            "message" => "Email already registered"
        ]);
        exit;
    }

    // Hash password
    $hashedPassword = password_hash(
        $password,
        PASSWORD_DEFAULT
    );

    $role = "owner";

    // Insert user
    $stmt = $conn->prepare(
        "INSERT INTO users (name, email, password, role)
         VALUES (?, ?, ?, ?)"
    );

    $stmt->bind_param(
        "ssss",
        $name,
        $email,
        $hashedPassword,
        $role
    );

    if ($stmt->execute()) {

        echo json_encode([
            "success" => true,
            "message" => "Account created successfully"
        ]);

    } else {

        echo json_encode([
            "success" => false,
            "message" => "Registration failed"
        ]);
    }

    $stmt->close();
    $check->close();

} catch (Exception $e) {

    echo json_encode([
        "success" => false,
        "message" => "Registration failed: " . $e->getMessage()
    ]);
}

?>