<?php
// Tắt cảnh báo lỗi hiển thị ra màn hình HTML để không làm hỏng dữ liệu JSON trả về cho JS
error_reporting(E_ALL);
ini_set('display_errors', 0); 

$host = 'localhost';
$dbname = 'webthethao'; // Tên database bạn vừa tạo trên phpMyAdmin
$username = 'root';     // Tên đăng nhập mặc định của XAMPP
$password = '';         // Mật khẩu mặc định của XAMPP là để trống

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    // Thiết lập chế độ báo lỗi của PDO
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    // Thiết lập trả về dữ liệu dạng mảng kết hợp (Associative Array)
    $conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    // Trả về lỗi dạng JSON nếu kết nối thất bại
    header('Content-Type: application/json');
    echo json_encode(["status" => "error", "message" => "Lỗi kết nối CSDL: " . $e->getMessage()]);
    exit();
}
?>