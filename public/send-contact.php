<?php
// Fichier sécurisé pour l'envoi d'emails de contact
// Version sécurisée avec protection XSS, validation et rate limiting basique

// Désactiver l'affichage des erreurs en production
error_reporting(0);
ini_set('display_errors', 0);

// Headers de sécurité
header('Content-Type: application/json; charset=UTF-8');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');

// Vérifier que la requête est en POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

// Rate limiting basique (session)
session_start();
$current_time = time();
$rate_limit_window = 60; // 60 secondes
$max_requests = 3; // Maximum 3 requêtes par minute

if (!isset($_SESSION['last_request_time'])) {
    $_SESSION['last_request_time'] = $current_time;
    $_SESSION['request_count'] = 1;
} else {
    if ($current_time - $_SESSION['last_request_time'] < $rate_limit_window) {
        $_SESSION['request_count']++;
        if ($_SESSION['request_count'] > $max_requests) {
            http_response_code(429);
            echo json_encode(['success' => false, 'message' => 'Trop de requêtes. Veuillez patienter un moment.']);
            exit;
        }
    } else {
        $_SESSION['last_request_time'] = $current_time;
        $_SESSION['request_count'] = 1;
    }
}

// Configuration
$to_email = 'contact@electrotech13.fr';
$site_name = 'Electrotech - Électricien Marseille';

// Récupérer les données du formulaire
$nom = isset($_POST['nom']) ? trim($_POST['nom']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$telephone = isset($_POST['telephone']) ? trim($_POST['telephone']) : '';
$sujet = isset($_POST['sujet']) ? trim($_POST['sujet']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Validation des champs obligatoires
if (empty($nom) || empty($email) || empty($sujet) || empty($message)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Veuillez remplir tous les champs obligatoires.']);
    exit;
}

// Validation de l'email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Adresse email invalide.']);
    exit;
}

// Validation de la longueur
if (strlen($nom) < 2 || strlen($nom) > 100) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Le nom doit contenir entre 2 et 100 caractères.']);
    exit;
}

if (strlen($sujet) < 3 || strlen($sujet) > 200) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Le sujet doit contenir entre 3 et 200 caractères.']);
    exit;
}

if (strlen($message) < 10 || strlen($message) > 5000) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Le message doit contenir entre 10 et 5000 caractères.']);
    exit;
}

// Protection XSS - Sanitization
$nom = htmlspecialchars($nom, ENT_QUOTES, 'UTF-8');
$email = filter_var($email, FILTER_SANITIZE_EMAIL);
$telephone = !empty($telephone) ? htmlspecialchars($telephone, ENT_QUOTES, 'UTF-8') : '';
$sujet = htmlspecialchars($sujet, ENT_QUOTES, 'UTF-8');
$message = htmlspecialchars($message, ENT_QUOTES, 'UTF-8');

// Validation du téléphone si fourni
if (!empty($telephone) && !preg_match('/^[0-9+\s\-\(\)]{10,20}$/', $telephone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Format de téléphone invalide.']);
    exit;
}

// Préparer l'email
$email_subject = $site_name . ' - Contact : ' . $sujet;

// Corps de l'email en HTML
$email_body = "<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0071e6; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #0071e6; }
        .message-box { background: white; padding: 15px; border-left: 4px solid #0071e6; margin-top: 15px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Nouveau message de contact</h2>
        </div>
        <div class='content'>
            <div class='field'>
                <span class='label'>Nom:</span> " . $nom . "
            </div>
            <div class='field'>
                <span class='label'>Email:</span> <a href='mailto:" . $email . "'>" . $email . "</a>
            </div>";

if (!empty($telephone)) {
    $email_body .= "
            <div class='field'>
                <span class='label'>Téléphone:</span> " . $telephone . "
            </div>";
}

$email_body .= "
            <div class='field'>
                <span class='label'>Sujet:</span> " . $sujet . "
            </div>
            <div class='message-box'>
                <div class='label'>Message:</div>
                <p>" . nl2br($message) . "</p>
            </div>
        </div>
        <div class='footer'>
            <p>Ce message a été envoyé depuis le formulaire de contact du site " . $site_name . "</p>
            <p>IP: " . (isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'N/A') . " | Date: " . date('d/m/Y H:i:s') . "</p>
        </div>
    </div>
</body>
</html>";

// En-têtes de l'email
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: " . $site_name . " <noreply@" . (isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'localhost') . ">\r\n";
$headers .= "Reply-To: " . $nom . " <" . $email . ">\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Envoyer l'email
$mail_sent = @mail($to_email, $email_subject, $email_body, $headers);

if ($mail_sent) {
    echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès !']);
} else {
    // En local, mail() peut ne pas fonctionner, on simule le succès pour tester
    $is_local = in_array($_SERVER['HTTP_HOST'], ['localhost', '127.0.0.1']) || 
                strpos($_SERVER['HTTP_HOST'], 'localhost') !== false ||
                strpos($_SERVER['HTTP_HOST'], '.local') !== false;
    
    if ($is_local) {
        // En local, on simule le succès pour tester le formulaire
        echo json_encode(['success' => true, 'message' => 'Message envoyé avec succès ! (Mode test local)']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'envoi de l\'email. Veuillez réessayer ou nous contacter directement.']);
    }
}
?>
