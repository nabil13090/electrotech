# Electrotech Marseille - Site Web

Site vitrine moderne pour Electrotech, électricien professionnel à Marseille depuis 1984.

## 🚀 Technologies

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** (animations)
- **React Hook Form** + **Zod** (formulaires)
- **Nodemailer** (envoi d'emails)

## 📋 Prérequis

- Node.js 18+ 
- npm ou yarn

## 🛠️ Installation

1. **Cloner le projet** (ou télécharger les fichiers)

2. **Installer les dépendances** :
```bash
npm install
```

3. **Configurer les variables d'environnement** :
```bash
cp .env.example .env
```

Puis éditez le fichier `.env` avec vos informations :
- Configuration SMTP pour l'envoi d'emails
- Email de contact

4. **Lancer le serveur de développement** :
```bash
npm run dev
```

Le site sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📧 Configuration Email

Pour que les formulaires fonctionnent, vous devez configurer l'envoi d'emails. Plusieurs options :

### Option 1 : Gmail (pour le développement)
1. Activez l'authentification à deux facteurs
2. Générez un mot de passe d'application
3. Utilisez ce mot de passe dans `SMTP_PASS`

### Option 2 : Services professionnels (recommandé pour production)
- **SendGrid** : Service d'email transactionnel
- **Mailgun** : API d'email
- **AWS SES** : Amazon Simple Email Service
- **Resend** : Service moderne d'email

Exemple avec Resend :
```env
SMTP_HOST=smtp.resend.com
SMTP_PORT=587
SMTP_USER=resend
SMTP_PASS=re_xxxxxxxxxxxxx
```

## 🏗️ Structure du projet

```
electrotech/
├── app/                    # Pages Next.js (App Router)
│   ├── api/               # Routes API
│   ├── devis/             # Page devis
│   ├── services/          # Page services
│   ├── a-propos/          # Page à propos
│   ├── contact/           # Page contact
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Page d'accueil
│   ├── globals.css        # Styles globaux
│   ├── sitemap.ts         # Sitemap
│   └── robots.ts          # Robots.txt
├── components/            # Composants React
│   ├── layout/            # Header, Footer
│   ├── sections/         # Sections de la page d'accueil
│   └── forms/            # Formulaires
├── public/               # Fichiers statiques
└── package.json
```

## 📄 Pages disponibles

- **/** : Page d'accueil
- **/services** : Liste des services
- **/a-propos** : À propos de l'entreprise
- **/devis** : Formulaire de demande de devis
- **/contact** : Formulaire de contact

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans `tailwind.config.ts`. Modifiez les valeurs `primary` et `secondary` pour changer le thème.

### Contenu
- Modifiez les textes directement dans les composants
- Les informations de contact sont dans `components/layout/Footer.tsx` et `app/contact/page.tsx`

## 🚀 Déploiement

### Hostinger (Build Statique - Recommandé)

Le projet est configuré pour un déploiement statique sur Hostinger :

1. **Générez le build** :
   ```bash
   npm run build:hostinger
   ```

2. **Uploadez le contenu du dossier `out`** sur Hostinger via File Manager ou FTP

3. **C'est tout !** Le site est en ligne.

📖 **Guide complet** : Voir [DEPLOIEMENT_HOSTINGER.md](./DEPLOIEMENT_HOSTINGER.md)

### Vercel
1. Créez un compte sur [Vercel](https://vercel.com)
2. Importez votre projet GitHub
3. Configurez les variables d'environnement dans les paramètres
4. Déployez !

### Netlify
1. Créez un compte sur [Netlify](https://netlify.com)
2. Connectez votre dépôt Git
3. Configurez les variables d'environnement
4. Déployez !

### Autres plateformes
Le site peut être déployé sur n'importe quelle plateforme supportant Next.js :
- AWS Amplify
- Railway
- DigitalOcean App Platform
- etc.

## 📱 Fonctionnalités

- ✅ Design moderne et responsive
- ✅ Animations fluides avec Framer Motion
- ✅ Formulaire de devis avec validation
- ✅ Formulaire de contact
- ✅ SEO optimisé (meta tags, sitemap, robots.txt)
- ✅ Performance optimisée
- ✅ Accessibilité

## 🔒 Sécurité

- Validation des formulaires côté client et serveur
- Protection contre les injections
- Variables d'environnement pour les données sensibles

## 📞 Support

Pour toute question ou problème, contactez l'équipe de développement.

## 📝 Licence

Propriétaire - Electrotech Marseille

---

**Créé avec ❤️ pour Electrotech Marseille**
# electrotech
