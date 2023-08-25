<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $fname = $_POST["fname"];
  $lname = $_POST["lname"];
  $email = $_POST["email"];
  $phone = $_POST["phone"];

  
  $response = array("message" => "Дані успішно оброблено та збережено.");
  echo json_encode($response);
} else {
  
  http_response_code(400); 
  echo json_encode(array("message" => "Невірний тип запиту."));
}
?>
