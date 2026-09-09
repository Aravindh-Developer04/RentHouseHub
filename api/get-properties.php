<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

require_once __DIR__ . "/../config/database.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

try {

    $stmt = $conn->query(
        "SELECT
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
        ORDER BY p.id DESC"
    );

    $properties = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode([
        "success" => true,
        "properties" => $properties
    ]);

} catch (PDOException $e) {

    echo json_encode([
        "success" => false,
        "message" => "Failed to fetch properties: " . $e->getMessage()
    ]);
}