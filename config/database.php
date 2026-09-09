<?php

$host = "sql205.infinityfree.com";
$port = 3306;
$dbname = "if0_42871743_renthouse";
$username = "if0_42871743";
$password = "kHfOOaRcnWSL";

$conn = new mysqli($host, $username, $password, $dbname, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}