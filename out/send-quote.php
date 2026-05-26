<?php
// Fichier sécurisé pour l'envoi de demandes de devis
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
$max_requests = 2; // Maximum 2 requêtes par minute (plus restrictif pour les devis)

if (!isset($_SESSION['last_quote_time'])) {
    $_SESSION['last_quote_time'] = $current_time;
    $_SESSION['quote_count'] = 1;
} else {
    if ($current_time - $_SESSION['last_quote_time'] < $rate_limit_window) {
        $_SESSION['quote_count']++;
        if ($_SESSION['quote_count'] > $max_requests) {
            http_response_code(429);
            echo json_encode(['success' => false, 'message' => 'Trop de requêtes. Veuillez patienter un moment.']);
            exit;
        }
    } else {
        $_SESSION['last_quote_time'] = $current_time;
        $_SESSION['quote_count'] = 1;
    }
}

// Configuration
$to_email = 'contact@electrotech13.fr';
$site_name = 'Electrotech - Électricien Marseille';
$max_file_size = 5 * 1024 * 1024; // 5MB

// Récupérer les données du formulaire
$nom = isset($_POST['nom']) ? trim($_POST['nom']) : '';
$prenom = isset($_POST['prenom']) ? trim($_POST['prenom']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$telephone = isset($_POST['telephone']) ? trim($_POST['telephone']) : '';
$adresse = isset($_POST['adresse']) ? trim($_POST['adresse']) : '';
$codePostal = isset($_POST['codePostal']) ? trim($_POST['codePostal']) : '';
$ville = isset($_POST['ville']) ? trim($_POST['ville']) : '';
$typePrestation = isset($_POST['typePrestation']) ? trim($_POST['typePrestation']) : '';
$description = isset($_POST['description']) ? trim($_POST['description']) : '';
$budget = isset($_POST['budget']) ? trim($_POST['budget']) : '';
$urgence = isset($_POST['urgence']) ? trim($_POST['urgence']) : '';

// Validation des champs obligatoires
if (empty($nom) || empty($prenom) || empty($email) || empty($telephone) || 
    empty($adresse) || empty($codePostal) || empty($ville) || empty($typePrestation) || empty($description)) {
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

// Validation des longueurs
if (strlen($nom) < 2 || strlen($nom) > 100) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Le nom doit contenir entre 2 et 100 caractères.']);
    exit;
}

if (strlen($prenom) < 2 || strlen($prenom) > 100) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Le prénom doit contenir entre 2 et 100 caractères.']);
    exit;
}

if (!preg_match('/^[0-9+\s\-\(\)]{10,20}$/', $telephone)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Format de téléphone invalide.']);
    exit;
}

if (!preg_match('/^\d{5}$/', $codePostal)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Le code postal doit contenir 5 chiffres.']);
    exit;
}

if (strlen($description) < 10 || strlen($description) > 5000) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'La description doit contenir entre 10 et 5000 caractères.']);
    exit;
}

// Validation du type de prestation
$allowed_prestations = ['installation', 'depannage', 'climatisation', 'alarme', 'panneaux-solaires', 'borne-recharge', 'autre'];
if (!in_array($typePrestation, $allowed_prestations)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Type de prestation invalide.']);
    exit;
}

// Protection XSS - Sanitization
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

// Gestion du fichier uploadé (optionnel)
$file_attached = false;
$file_path = null;
if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $file = $_FILES['file'];
    
    // Vérifier la taille
    if ($file['size'] > $max_file_size) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Le fichier est trop volumineux (max 5MB).']);
        exit;
    }
    
    // Vérifier le type MIME
    $allowed_types = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf'];
    $file_type = mime_content_type($file['tmp_name']);
    if (!in_array($file_type, $allowed_types)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Type de fichier non autorisé.']);
        exit;
    }
    
    // Déplacer le fichier dans un dossier temporaire sécurisé
    $upload_dir = sys_get_temp_dir();
    $file_name = uniqid('quote_', true) . '_' . basename($file['name']);
    $file_path = $upload_dir . '/' . $file_name;
    
    if (move_uploaded_file($file['tmp_name'], $file_path)) {
        $file_attached = true;
    }
}

// Mapper les types de prestation
$prestation_map = [
    'installation' => 'Installation Électrique',
    'depannage' => 'Dépannage & Rénovation',
    'climatisation' => 'Climatisation',
    'alarme' => 'Alarme & Vidéosurveillance',
    'panneaux-solaires' => 'Panneaux Solaires',
    'borne-recharge' => 'Borne de Recharge',
    'autre' => 'Autre'
];

$prestation_text = isset($prestation_map[$typePrestation]) ? $prestation_map[$typePrestation] : $typePrestation;

// Préparer l'email
$email_subject = $site_name . ' - Demande de devis : ' . $prestation_text;

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
        .section { background: white; padding: 15px; border-left: 4px solid #0071e6; margin-top: 15px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>Nouvelle demande de devis</h2>
        </div>
        <div class='content'>
            <div class='section'>
                <h3 style='color: #0071e6; margin-top: 0;'>Informations client</h3>
                <div class='field'>
                    <span class='label'>Nom:</span> " . $nom . " " . $prenom . "
                </div>
                <div class='field'>
                    <span class='label'>Email:</span> <a href='mailto:" . $email . "'>" . $email . "</a>
                </div>
                <div class='field'>
                    <span class='label'>Téléphone:</span> " . $telephone . "
                </div>
                <div class='field'>
                    <span class='label'>Adresse:</span> " . $adresse . ", " . $codePostal . " " . $ville . "
                </div>
            </div>
            <div class='section'>
                <h3 style='color: #0071e6; margin-top: 0;'>Détails de la demande</h3>
                <div class='field'>
                    <span class='label'>Type de prestation:</span> " . $prestation_text . "
                </div>
                <div class='field'>
                    <span class='label'>Budget:</span> " . $budget . "
                </div>
                <div class='field'>
                    <span class='label'>Urgence:</span> " . $urgence . "
                </div>
                <div class='field'>
                    <span class='label'>Description:</span>
                    <p>" . nl2br($description) . "</p>
                </div>
            </div>
        </div>
        <div class='footer'>
            <p>Ce message a été envoyé depuis le formulaire de devis du site " . $site_name . "</p>
            <p>IP: " . (isset($_SERVER['REMOTE_ADDR']) ? $_SERVER['REMOTE_ADDR'] : 'N/A') . " | Date: " . date('d/m/Y H:i:s') . "</p>
        </div>
    </div>
</body>
</html>";

// En-têtes de l'email
$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: " . $site_name . " <noreply@" . (isset($_SERVER['HTTP_HOST']) ? $_SERVER['HTTP_HOST'] : 'localhost') . ">\r\n";
$headers .= "Reply-To: " . $prenom . " " . $nom . " <" . $email . ">\r\n";
$headers .= "X-Mailer: PHP/" . phpversion() . "\r\n";

// Préparer les pièces jointes si fichier présent
$boundary = uniqid('boundary_');
if ($file_attached && file_exists($file_path)) {
    $headers .= "Content-Type: multipart/mixed; boundary=\"" . $boundary . "\"\r\n";
    
    $email_body_with_attachment = "--" . $boundary . "\r\n";
    $email_body_with_attachment .= "Content-Type: text/html; charset=UTF-8\r\n";
    $email_body_with_attachment .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $email_body_with_attachment .= $email_body . "\r\n\r\n";
    $email_body_with_attachment .= "--" . $boundary . "\r\n";
    $email_body_with_attachment .= "Content-Type: " . mime_content_type($file_path) . "; name=\"" . basename($file_path) . "\"\r\n";
    $email_body_with_attachment .= "Content-Transfer-Encoding: base64\r\n";
    $email_body_with_attachment .= "Content-Disposition: attachment; filename=\"" . basename($file_path) . "\"\r\n\r\n";
    $email_body_with_attachment .= chunk_split(base64_encode(file_get_contents($file_path))) . "\r\n";
    $email_body_with_attachment .= "--" . $boundary . "--";
    
    $email_body = $email_body_with_attachment;
}

// Envoyer l'email
$mail_sent = @mail($to_email, $email_subject, $email_body, $headers);

// Nettoyer le fichier temporaire
if ($file_attached && file_exists($file_path)) {
    @unlink($file_path);
}

if ($mail_sent) {
    echo json_encode(['success' => true, 'message' => 'Demande de devis envoyée avec succès !']);
} else {
    // En local, mail() peut ne pas fonctionner, on simule le succès pour tester
    $is_local = in_array($_SERVER['HTTP_HOST'], ['localhost', '127.0.0.1']) || 
                strpos($_SERVER['HTTP_HOST'], 'localhost') !== false ||
                strpos($_SERVER['HTTP_HOST'], '.local') !== false;
    
    if ($is_local) {
        // En local, on simule le succès pour tester le formulaire
        echo json_encode(['success' => true, 'message' => 'Demande de devis envoyée avec succès ! (Mode test local)']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'envoi de la demande. Veuillez réessayer ou nous contacter directement.']);
    }
}
?>
