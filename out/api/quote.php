<?php
/**
 * API devis (style sécurisé) pour hosting PHP.
 * Compatible FormData (multipart) avec fichier optionnel.
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
$rateLimitKey = "rate_limit_quote_$ip";

if (!isset($_SESSION[$rateLimitKey])) {
  $_SESSION[$rateLimitKey] = ['count' => 0, 'reset' => time() + 60];
}
if ($_SESSION[$rateLimitKey]['reset'] < time()) {
  $_SESSION[$rateLimitKey] = ['count' => 0, 'reset' => time() + 60];
}
if ($_SESSION[$rateLimitKey]['count'] >= 2) {
  http_response_code(429);
  echo json_encode(['error' => 'Trop de requêtes. Veuillez patienter un moment.']);
  exit;
}
$_SESSION[$rateLimitKey]['count']++;

$to = getenv('CONTACT_EMAIL') ?: 'contact@electrotech13.fr';
$siteName = 'Electrotech - Devis';
$maxFileSize = 5 * 1024 * 1024; // 5MB

$nom = trim($_POST['nom'] ?? '');
$prenom = trim($_POST['prenom'] ?? '');
$email = trim($_POST['email'] ?? '');
$telephone = trim($_POST['telephone'] ?? '');
$adresse = trim($_POST['adresse'] ?? '');
$codePostal = trim($_POST['codePostal'] ?? '');
$ville = trim($_POST['ville'] ?? '');
$typePrestation = trim($_POST['typePrestation'] ?? '');
$description = trim($_POST['description'] ?? '');
$budget = trim($_POST['budget'] ?? '');
$urgence = trim($_POST['urgence'] ?? '');

if (
  empty($nom) || empty($prenom) || empty($email) || empty($telephone) ||
  empty($adresse) || empty($codePostal) || empty($ville) || empty($typePrestation) || empty($description)
) {
  http_response_code(400);
  echo json_encode(['error' => 'Veuillez remplir tous les champs obligatoires.']);
  exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
  http_response_code(400);
  echo json_encode(['error' => 'Adresse email invalide.']);
  exit;
}

if (strlen($nom) < 2 || strlen($nom) > 100 || strlen($prenom) < 2 || strlen($prenom) > 100) {
  http_response_code(400);
  echo json_encode(['error' => 'Nom/prénom invalides.']);
  exit;
}

if (!preg_match('/^[0-9+\\s\\-\\(\\)]{10,20}$/', $telephone)) {
  http_response_code(400);
  echo json_encode(['error' => 'Format de téléphone invalide.']);
  exit;
}

if (!preg_match('/^\\d{5}$/', $codePostal)) {
  http_response_code(400);
  echo json_encode(['error' => 'Le code postal doit contenir 5 chiffres.']);
  exit;
}

if (strlen($description) < 10 || strlen($description) > 5000) {
  http_response_code(400);
  echo json_encode(['error' => 'La description doit contenir entre 10 et 5000 caractères.']);
  exit;
}

$allowedPrestations = ['installation', 'depannage', 'climatisation', 'alarme', 'panneaux-solaires', 'borne-recharge', 'autre'];
if (!in_array($typePrestation, $allowedPrestations, true)) {
  http_response_code(400);
  echo json_encode(['error' => 'Type de prestation invalide.']);
  exit;
}

// Sanitization
$nom = htmlspecialchars($nom, ENT_QUOTES, 'UTF-8');
$prenom = htmlspecialchars($prenom, ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$telephone = htmlspecialchars($telephone, ENT_QUOTES, 'UTF-8');
$adresse = htmlspecialchars($adresse, ENT_QUOTES, 'UTF-8');
$codePostal = htmlspecialchars($codePostal, ENT_QUOTES, 'UTF-8');
$ville = htmlspecialchars($ville, ENT_QUOTES, 'UTF-8');
$typePrestation = htmlspecialchars($typePrestation, ENT_QUOTES, 'UTF-8');
$description = htmlspecialchars($description, ENT_QUOTES, 'UTF-8');
$budget = !empty($budget) ? htmlspecialchars($budget, ENT_QUOTES, 'UTF-8') : 'Non spécifié';
$urgence = !empty($urgence) ? htmlspecialchars($urgence, ENT_QUOTES, 'UTF-8') : 'Non spécifiée';

// Gestion du fichier
$fileAttached = false;
$filePath = null;
if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
  $file = $_FILES['file'];

  if (($file['size'] ?? 0) > $maxFileSize) {
    http_response_code(400);
    echo json_encode(['error' => 'Le fichier est trop volumineux (max 5MB).']);
    exit;
  }

  $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
  $fileType = mime_content_type($file['tmp_name']);
  if (!in_array($fileType, $allowedTypes, true)) {
    http_response_code(400);
    echo json_encode(['error' => 'Type de fichier non autorisé.']);
    exit;
  }

  $uploadDir = sys_get_temp_dir();
  $fileName = uniqid('quote_', true) . '_' . basename($file['name']);
  $filePath = $uploadDir . DIRECTORY_SEPARATOR . $fileName;

  if (move_uploaded_file($file['tmp_name'], $filePath)) {
    $fileAttached = true;
  }
}

$prestationMap = [
  'installation' => 'Installation Électrique',
  'depannage' => 'Dépannage & Rénovation',
  'climatisation' => 'Climatisation',
  'alarme' => 'Alarme & Vidéosurveillance',
  'panneaux-solaires' => 'Panneaux Solaires',
  'borne-recharge' => 'Borne de Recharge',
  'autre' => 'Autre',
];
$prestationText = $prestationMap[$typePrestation] ?? $typePrestation;

$from = getenv('SMTP_FROM') ?: $email;

$emailSubject = $siteName . ' - ' . $prestationText;
$emailBodyText =
  "Nouvelle demande de devis\n\n" .
  "Nom: $nom $prenom\n" .
  "Email: $email\n" .
  "Téléphone: $telephone\n" .
  "Adresse: $adresse, $codePostal $ville\n\n" .
  "Type de prestation: $prestationText\n" .
  "Budget: $budget\n" .
  "Urgence: $urgence\n\n" .
  "Description:\n$description\n\n" .
  "---\n" .
  "IP: $ip\n" .
  "Date: " . date('d/m/Y H:i:s') . "\n";

$boundary = uniqid('boundary_');
$headers = "MIME-Version: 1.0\r\n";
$headers .= "From: $from\r\n";
$headers .= "Reply-To: $email\r\n";

$emailBody = $emailBodyText;

if ($fileAttached && $filePath && file_exists($filePath)) {
  $headers .= "Content-Type: multipart/mixed; boundary=\"$boundary\"\r\n";

  $body = "--$boundary\r\n";
  $body .= "Content-Type: text/plain; charset=UTF-8\r\n";
  $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
  $body .= $emailBodyText . "\r\n\r\n";

  $body .= "--$boundary\r\n";
  $body .= "Content-Type: " . mime_content_type($filePath) . "; name=\"" . basename($filePath) . "\"\r\n";
  $body .= "Content-Transfer-Encoding: base64\r\n";
  $body .= "Content-Disposition: attachment; filename=\"" . basename($filePath) . "\"\r\n\r\n";
  $body .= chunk_split(base64_encode(file_get_contents($filePath))) . "\r\n";
  $body .= "--$boundary--";

  $emailBody = $body;
} else {
  $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
}

$mailSent = @mail($to, $emailSubject, $emailBody, $headers);

if ($fileAttached && $filePath && file_exists($filePath)) {
  @unlink($filePath);
}

if ($mailSent) {
  echo json_encode(['message' => 'Demande de devis envoyée avec succès !']);
} else {
  $host = $_SERVER['HTTP_HOST'] ?? '';
  $isLocal = in_array($host, ['localhost', '127.0.0.1']) ||
    stripos($host, 'localhost') !== false ||
    stripos($host, '.local') !== false;

  if ($isLocal) {
    echo json_encode(['message' => 'Demande de devis envoyée avec succès ! (Mode test local)']);
  } else {
    http_response_code(500);
    echo json_encode(['error' => "Erreur lors de l'envoi de la demande. Veuillez réessayer ou nous contacter directement."]);
  }
}
?>

