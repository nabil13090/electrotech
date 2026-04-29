# 🚀 Guide de Déploiement sur Hostinger - Build Statique

## 📋 Prérequis

1. Compte Hostinger avec hébergement web
2. Node.js installé localement (pour le build)
3. Accès FTP/File Manager à votre compte Hostinger
4. Domaine configuré (ex: electrotech-marseille.fr)

---

## 📦 ÉTAPE 1 : Préparer le build en local

### 1.1 Installer les dépendances (si nécessaire)
```bash
npm install
```

### 1.2 Générer le build statique
```bash
npm run build:hostinger
```

Cette commande va :
- Nettoyer les anciens builds
- Installer les dépendances si nécessaire
- Générer le build Next.js statique dans le dossier `out`
- Copier les fichiers PHP nécessaires

**Le dossier `out` est maintenant prêt pour le déploiement !**

---

## 📤 ÉTAPE 2 : Déployer sur Hostinger

### Option A : Via File Manager (Recommandé)

1. **Connectez-vous à hPanel Hostinger**
2. **Allez dans "File Manager"**
3. **Ouvrez le dossier `public_html`** (ou le dossier de votre domaine)
4. **Supprimez tous les fichiers existants** (sauf si vous avez d'autres sites)
5. **Uploadez TOUT le contenu du dossier `out`** :
   - Sélectionnez tous les fichiers et dossiers dans `out`
   - Glissez-déposez ou utilisez le bouton "Upload"
   - ⚠️ **IMPORTANT** : Uploadez le CONTENU de `out`, pas le dossier `out` lui-même

### Option B : Via FTP (FileZilla, WinSCP, etc.)

1. **Connectez-vous via FTP** avec vos identifiants Hostinger
2. **Allez dans `public_html`**
3. **Uploadez TOUT le contenu du dossier `out`**

---

## ✅ ÉTAPE 3 : Vérification

1. **Visitez votre site** : `https://votre-domaine.com`
2. **Testez les formulaires** :
   - Formulaire de contact : `/contact`
   - Formulaire de devis : `/devis`
3. **Vérifiez que les pages se chargent correctement**

---

## 🔒 Sécurités mises en place

### Protection XSS
- Tous les champs sont sanitizés avec `htmlspecialchars()`
- Validation stricte des données d'entrée

### Rate Limiting
- **Contact** : Maximum 3 requêtes par minute
- **Devis** : Maximum 2 requêtes par minute
- Protection contre le spam et les abus

### Validation des données
- Validation des emails avec `filter_var()`
- Validation des formats (téléphone, code postal)
- Limitation de la longueur des champs
- Validation des types de fichiers uploadés (images et PDF uniquement)
- Taille maximale des fichiers : 5MB

### Headers de sécurité
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

### Configuration Next.js
- `poweredByHeader: false` - Masque le header X-Powered-By
- `compress: true` - Compression activée
- Build statique optimisé

---

## 📧 Configuration Email (Optionnel)

Les fichiers PHP utilisent la fonction `mail()` de PHP par défaut. Pour une meilleure configuration :

### Option 1 : Utiliser le SMTP Hostinger

Modifiez les fichiers PHP (`send-contact.php` et `send-quote.php`) pour utiliser PHPMailer :

1. **Installez PHPMailer** via Composer sur Hostinger
2. **Configurez les paramètres SMTP Hostinger** :
   ```php
   SMTP_HOST = smtp.hostinger.com
   SMTP_PORT = 587
   SMTP_USER = contact@votre-domaine.com
   SMTP_PASS = votre-mot-de-passe
   ```

### Option 2 : Utiliser un service externe

Vous pouvez utiliser des services comme :
- **SendGrid** (gratuit jusqu'à 100 emails/jour)
- **Mailgun** (gratuit jusqu'à 5000 emails/mois)
- **Resend** (gratuit jusqu'à 100 emails/jour)

---

## 🔍 ÉTAPE 4 : Indexation Google

### 4.1 Vérifier le sitemap

Le sitemap est automatiquement généré par Next.js à :
```
https://votre-domaine.com/sitemap.xml
```

### 4.2 Soumettre à Google Search Console

1. **Allez sur** [Google Search Console](https://search.google.com/search-console)
2. **Ajoutez votre propriété** (votre domaine)
3. **Vérifiez la propriété** :
   - Option 1 : Ajoutez un fichier HTML dans `public/`
   - Option 2 : Ajoutez une balise meta dans `app/layout.tsx`
4. **Soumettez le sitemap** : `https://votre-domaine.com/sitemap.xml`

### 4.3 Mettre à jour robots.txt

Le fichier `public/robots.txt` est déjà créé. Vérifiez qu'il contient :
```
Sitemap: https://votre-domaine.com/sitemap.xml
```

---

## 🛠️ Maintenance et Mises à jour

### Pour mettre à jour le site :

1. **Faites vos modifications** en local
2. **Générez le nouveau build** :
   ```bash
   npm run build:hostinger
   ```
3. **Uploadez le nouveau contenu du dossier `out`** sur Hostinger
4. **C'est tout !** Le site est mis à jour

---

## 🐛 Dépannage

### Erreur 404 sur les pages
- Vérifiez que vous avez bien uploadé TOUT le contenu de `out`
- Vérifiez que les fichiers `.html` sont présents dans `out`

### Formulaires ne fonctionnent pas
- Vérifiez que les fichiers PHP (`send-contact.php` et `send-quote.php`) sont dans `public_html`
- Vérifiez les permissions des fichiers PHP (doivent être exécutables)
- Vérifiez les logs d'erreur PHP dans hPanel

### Emails non envoyés
- En local, les emails sont simulés (mode test)
- En production, vérifiez que la fonction `mail()` PHP est activée sur Hostinger
- Pour une meilleure fiabilité, configurez PHPMailer avec SMTP

### Images ne s'affichent pas
- Vérifiez que le dossier `images` est bien uploadé dans `public_html`
- Vérifiez les chemins des images dans le code

---

## 📁 Structure du dossier `out`

Après le build, le dossier `out` contient :

```
out/
├── index.html (page d'accueil)
├── contact.html
├── devis.html
├── services/
│   ├── installation.html
│   ├── depannage.html
│   └── ...
├── images/ (toutes les images)
├── _next/ (assets Next.js)
├── send-contact.php (formulaire contact)
├── send-quote.php (formulaire devis)
├── robots.txt
├── sitemap.xml
└── ... (autres pages)
```

---

## ✅ Checklist de déploiement

- [ ] Build généré avec succès (`npm run build:hostinger`)
- [ ] Dossier `out` créé et contient tous les fichiers
- [ ] Fichiers PHP présents dans `out`
- [ ] Contenu de `out` uploadé sur Hostinger
- [ ] Site accessible via votre domaine
- [ ] Formulaires de contact et devis testés
- [ ] Sitemap accessible (`/sitemap.xml`)
- [ ] Robots.txt configuré
- [ ] Site soumis à Google Search Console

---

## 🎉 C'est prêt !

Votre site est maintenant déployé sur Hostinger avec toutes les sécurités en place.

**Pour toute question ou problème, consultez :**
- [Documentation Hostinger](https://www.hostinger.fr/tutoriels)
- [Documentation Next.js](https://nextjs.org/docs)

**Bon déploiement ! 🚀**
