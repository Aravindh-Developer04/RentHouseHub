
<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require_once __DIR__ . "/../config/database.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

$owner_id   = $data["owner_id"] ?? "";
$title      = trim($data["title"] ?? "");
$type       = trim($data["type"] ?? "");
$price      = $data["price"] ?? "";
$bedrooms   = $data["bedrooms"] ?? "";
$bathrooms  = $data["bathrooms"] ?? "";
$area       = $data["area"] ?? "";
$location   = trim($data["location"] ?? "");
$description = trim($data["description"] ?? "");

if (
    $owner_id === "" ||
    $title === "" ||
    $type === "" ||
    $price === "" ||
    $bedrooms === "" ||
    $bathrooms === "" ||
    $area === "" ||
    $location === "" ||
    $description === ""
) {
    echo json_encode([
        "success" => false,
        "message" => "All fields are required"
    ]);
    exit;
}

try {

    $stmt = $conn->prepare(
        "INSERT INTO properties
        (
            owner_id,
            title,
            type,
            price,
            bedrooms,
            bathrooms,
            area,
            location,
            description
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );

    $stmt->execute([
        $owner_id,
        $title,
        $type,
        $price,
        $bedrooms,
        $bathrooms,
        $area,
        $location,
        $description
    ]);

    echo json_encode([
        "success" => true,
        "message" => "Property added successfully",
        "property_id" => $conn->lastInsertId()
    ]);

} catch (PDOException $e) {

    echo json_encode([
        "success" => false,
        "message" => "Failed to add property: " . $e->getMessage()
    ]);
}
