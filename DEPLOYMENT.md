# Guide de Déploiement - Electrotech Marseille

## 🚀 Déploiement sur Vercel (Recommandé)

### Étape 1 : Préparation
1. Créez un compte sur [Vercel](https://vercel.com)
2. Connectez votre compte GitHub/GitLab/Bitbucket

### Étape 2 : Import du projet
1. Cliquez sur "New Project"
2. Importez votre dépôt Git
3. Vercel détectera automatiquement Next.js

### Étape 3 : Configuration
1. **Variables d'environnement** : Ajoutez dans les paramètres du projet :
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=votre-email@gmail.com
   SMTP_PASS=votre-mot-de-passe-app
   SMTP_FROM=noreply@electrotech-marseille.fr
   CONTACT_EMAIL=contact@electrotech-marseille.fr
   SITE_URL=https://electrotech-marseille.fr
   ```

2. **Build Settings** : Vercel détecte automatiquement :
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

### Étape 4 : Déploiement
1. Cliquez sur "Deploy"
2. Attendez la fin du build (2-3 minutes)
3. Votre site est en ligne !

### Étape 5 : Domaine personnalisé
1. Allez dans "Settings" > "Domains"
2. Ajoutez votre domaine `electrotech-marseille.fr`
3. Suivez les instructions DNS
4. SSL est automatiquement activé

---

## 🌐 Déploiement sur Netlify

### Étape 1 : Préparation
1. Créez un compte sur [Netlify](https://netlify.com)
2. Connectez votre dépôt Git

### Étape 2 : Configuration
1. **Build settings** :
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Variables d'environnement** : Ajoutez dans "Site settings" > "Environment variables"

### Étape 3 : Déploiement
1. Netlify détectera automatiquement Next.js
2. Le déploiement se fera automatiquement

---

## 📧 Configuration Email (Production)

### Option 1 : Resend (Recommandé - Gratuit jusqu'à 100 emails/jour)
1. Créez un compte sur [Resend](https://resend.com)
2. Vérifiez votre domaine
3. Obtenez votre API key
4. Configurez :
   ```env
   SMTP_HOST=smtp.resend.com
   SMTP_PORT=587
   SMTP_USER=resend
   SMTP_PASS=re_xxxxxxxxxxxxx
   ```

### Option 2 : SendGrid
1. Créez un compte sur [SendGrid](https://sendgrid.com)
2. Générez une API key
3. Configurez :
   ```env
   SMTP_HOST=smtp.sendgrid.net
   SMTP_PORT=587
   SMTP_USER=apikey
   SMTP_PASS=votre-api-key
   ```

### Option 3 : Mailgun
1. Créez un compte sur [Mailgun](https://mailgun.com)
2. Vérifiez votre domaine
3. Configurez :
   ```env
   SMTP_HOST=smtp.mailgun.org
   SMTP_PORT=587
   SMTP_USER=postmaster@votre-domaine.com
   SMTP_PASS=votre-password
   ```

---

## ✅ Checklist de déploiement

- [ ] Variables d'environnement configurées
- [ ] Service email configuré et testé
- [ ] Domaine personnalisé configuré
- [ ] SSL activé (automatique sur Vercel/Netlify)
- [ ] Test des formulaires de contact et devis
- [ ] Vérification du SEO (meta tags, sitemap)
- [ ] Test sur mobile et desktop
- [ ] Performance vérifiée (Lighthouse)

---

## 🔧 Maintenance

### Mises à jour
- Les mises à jour sont automatiques si vous utilisez Git
- Push sur la branche principale = nouveau déploiement

### Monitoring
- Vercel : Dashboard intégré avec analytics
- Netlify : Analytics disponibles dans le dashboard

### Backups
- Le code est sauvegardé dans votre dépôt Git
- Les variables d'environnement sont stockées par la plateforme

---

## 🆘 Support

En cas de problème :
1. Vérifiez les logs de déploiement
2. Vérifiez les variables d'environnement
3. Testez les formulaires en local d'abord
4. Consultez la documentation de votre plateforme
