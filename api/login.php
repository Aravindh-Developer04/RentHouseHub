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

$email = trim($data["email"] ?? "");
$password = $data["password"] ?? "";

if ($email === "" || $password === "") {
    echo json_encode([
        "success" => false,
        "message" => "Email and password are required"
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

try {

    $stmt = $conn->prepare(
        "SELECT id, name, email, password, role
         FROM users
         WHERE email = ?"
    );

    $stmt->bind_param("s", $email);
    $stmt->execute();

    $result = $stmt->get_result();
    $user = $result->fetch_assoc();

    if (!$user) {
        echo json_encode([
            "success" => false,
            "message" => "Email or password is incorrect"
        ]);
        exit;
    }

    if (!password_verify($password, $user["password"])) {
        echo json_encode([
            "success" => false,
            "message" => "Email or password is incorrect"
        ]);
        exit;
    }

    unset($user["password"]);

    echo json_encode([
        "success" => true,
        "message" => "Login successful",
        "user" => [
            "id" => $user["id"],
            "name" => $user["name"],
            "email" => $user["email"],
            "role" => $user["role"]
        ]
    ]);

    $stmt->close();

} catch (Exception $e) {

    echo json_encode([
        "success" => false,
        "message" => "Login failed: " . $e->getMessage()
    ]);
}

?>