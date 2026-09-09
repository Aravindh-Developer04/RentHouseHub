<?php

$origin = $_SERVER["HTTP_ORIGIN"] ?? "";

$allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174",
    "https://renthousehub.rf.gd",
    "https://rent-house-hub-git-main-aravindh-developer5.vercel.app"
];

if ($origin !== "" && in_array($origin, $allowedOrigins, true)) {
    header("Access-Control-Allow-Origin: " . $origin);
} else {
    header("Access-Control-Allow-Origin: *");
}

header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit;
}

require_once __DIR__ . "/../config/database.php";

try {

    $sql = "
        SELECT
            p.id,
            p.owner_id,
            p.title,
            p.type,
            p.price,
            p.bedrooms,
            p.bathrooms,
            p.area,
            p.location,
            p.description,
            p.created_at,
            (
                SELECT pi.image
                FROM property_images pi
                WHERE pi.property_id = p.id
                ORDER BY pi.id ASC
                LIMIT 1
            ) AS image
        FROM properties p
        ORDER BY p.id DESC
    ";

    $result = $conn->query($sql);

    if (!$result) {
        throw new Exception($conn->error);
    }

    $properties = [];

    while ($row = $result->fetch_assoc()) {
        $properties[] = $row;
    }

    echo json_encode([
        "success" => true,
        "properties" => $properties
    ]);

} catch (Exception $e) {

    http_response_code(500);

    echo json_encode([
        "success" => false,
        "message" => "Failed to fetch properties",
        "error" => $e->getMessage()
    ]);
}

?>
