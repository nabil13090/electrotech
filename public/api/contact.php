<?php
/**
 * API contact (style electrotechernp) pour hosting PHP.
 * - Supporte JSON (name/email/phone/subject/message)
 * - Supporte aussi FormData legacy (nom/email/telephone/sujet/message)
 */
error_reporting(0);
ini_set('display_errors', 0);

header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(204);
  exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
  http_response_code(405);
  echo json_encode(['error' => 'Méthode non autorisée']);
  exit;
}

session_start();
$ip = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';
$rateLimitKey = "rate_limit_contact_$ip";

if (!isset($_SESSION[$rateLimitKey])) {
  $_SESSION[$rateLimitKey] = ['count' => 0, 'reset' => time() + 60];
}
if ($_SESSION[$rateLimitKey]['reset'] < time()) {
  $_SESSION[$rateLimitKey] = ['count' => 0, 'reset' => time() + 60];
}
if ($_SESSION[$rateLimitKey]['count'] >= 5) {
  http_response_code(429);
  echo json_encode(['error' => 'Trop de requêtes. Veuillez réessayer dans quelques instants.']);
  exit;
}
$_SESSION[$rateLimitKey]['count']++;

// Lire payload JSON si présent
$raw = file_get_contents('php://input');
$json = null;
$contentType = $_SERVER['CONTENT_TYPE'] ?? $_SERVER['HTTP_CONTENT_TYPE'] ?? '';
if (stripos($contentType, 'application/json') !== false && !empty($raw)) {
  $json = json_decode($raw, true);
}

// Extraire champs (JSON prioritaire)
$name = '';
$email = '';
$phone = '';
$subject = '';
$message = '';

if (is_array($json)) {
  $name = trim($json['name'] ?? '');
  $email = $json['email'] ?? '';
  $phone = trim($json['phone'] ?? '');
  $subject = $json['subject'] ?? '';
  $message = trim($json['message'] ?? '');
} else {
  // fallback FormData legacy
  $name = trim($_POST['nom'] ?? '');
  $email = $_POST['email'] ?? '';
  $phone = trim($_POST['telephone'] ?? '');
  $subject = $_POST['sujet'] ?? '';
  $message = trim($_POST['message'] ?? '');
}

// Sanitization/validation
$name = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$phone = htmlspecialchars($phone, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

if (empty($name) || empty($email) || empty($subject) || empty($message)) {
  http_response_code(400);
  echo json_encode(['error' => 'Tous les champs obligatoires doivent être remplis']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['error' => 'Adresse email invalide']);
  exit;
}

if (strlen($name) > 100 || strlen($email) > 150 || strlen($message) > 5000) {
  http_response_code(413);
  echo json_encode(['error' => 'Données trop volumineuses']);
  exit;
}

if (!empty($phone) && !preg_match('/^[0-9+\\s\\-\\(\\)]{10,20}$/', $phone)) {
  http_response_code(400);
  echo json_encode(['error' => 'Format de téléphone invalide']);
  exit;
}

// Map subject (accepte aussi texte libre via legacy)
$subjectMap = [
  'devis' => 'Demande de devis',
  'etude' => 'Étude de faisabilité',
  'info' => "Demande d'information",
  'autre' => 'Autre demande',
];
$subjectText = $subjectMap[$subject] ?? htmlspecialchars(trim($subject), ENT_QUOTES, 'UTF-8');
if (empty($subjectText)) $subjectText = 'Nouvelle demande de contact';

$to = getenv('CONTACT_EMAIL') ?: 'contact@electrotech13.fr';
$from = getenv('SMTP_FROM') ?: $email;

$emailSubject = "Electrotech - Contact - $subjectText";
$emailBody =
  "Nouveau message de contact\n\n" .
  "Nom: $name\n" .
  "Email: $email\n" .
  (!empty($phone) ? "Téléphone: $phone\n" : "") .
  "Sujet: $subjectText\n\n" .
  "Message:\n$message\n\n" .
  "---\n" .
  "IP: $ip\n" .
  "Date: " . date('d/m/Y H:i:s') . "\n";

$headers = "From: $from\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$mailSent = @mail($to, $emailSubject, $emailBody, $headers);

if ($mailSent) {
  echo json_encode(['message' => 'Message envoyé avec succès !']);
} else {
  $host = $_SERVER['HTTP_HOST'] ?? '';
  $isLocal = in_array($host, ['localhost', '127.0.0.1']) ||
    stripos($host, 'localhost') !== false ||
    stripos($host, '.local') !== false;

  if ($isLocal) {
    echo json_encode(['message' => 'Message envoyé avec succès ! (Mode test local)']);
  } else {
    http_response_code(500);
    echo json_encode(['error' => "Erreur lors de l'envoi du message. Veuillez réessayer."]);
  }
}
?>

