<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json");

require_once __DIR__ . "/../config/database.php";

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    exit;
}

$property_id = $_POST["property_id"] ?? "";

if ($property_id === "") {
    echo json_encode([
        "success" => false,
        "message" => "Property ID is required"
    ]);
    exit;
}

if (!isset($_FILES["images"])) {
    echo json_encode([
        "success" => false,
        "message" => "No images selected"
    ]);
    exit;
}

$uploadDir = __DIR__ . "/../uploads/properties/";

if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0777, true);
}

$allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
];

$maxSize = 5 * 1024 * 1024; // 5 MB

$uploadedImages = [];

try {

    foreach ($_FILES["images"]["tmp_name"] as $key => $tmpName) {

        if ($_FILES["images"]["error"][$key] !== UPLOAD_ERR_OK) {
            continue;
        }

        $fileType = mime_content_type($tmpName);
        $fileSize = $_FILES["images"]["size"][$key];

        if (!in_array($fileType, $allowedTypes)) {
            continue;
        }

        if ($fileSize > $maxSize) {
            continue;
        }

        $extension = match ($fileType) {
            "image/jpeg" => "jpg",
            "image/png" => "png",
            "image/webp" => "webp",
            default => "jpg"
        };

        $fileName = uniqid("property_", true) . "." . $extension;

        $destination = $uploadDir . $fileName;

        if (move_uploaded_file($tmpName, $destination)) {

            $imagePath = "uploads/properties/" . $fileName;

            $stmt = $conn->prepare(
                "INSERT INTO property_images (property_id, image)
                 VALUES (?, ?)"
            );

            $stmt->execute([
                $property_id,
                $imagePath
            ]);

            $uploadedImages[] = $imagePath;
        }
    }

    if (count($uploadedImages) === 0) {
        echo json_encode([
            "success" => false,
            "message" => "No valid images uploaded"
        ]);
        exit;
    }

    echo json_encode([
        "success" => true,
        "message" => "Images uploaded successfully",
        "images" => $uploadedImages
    ]);

} catch (PDOException $e) {

    echo json_encode([
        "success" => false,
        "message" => "Database error: " . $e->getMessage()
    ]);
}
