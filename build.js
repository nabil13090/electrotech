#!/usr/bin/env node

/**
 * Script de build simple pour générer le dossier 'out' prêt pour Hostinger
 * Usage: node build.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Démarrage du build pour Hostinger...\n');

try {
  // 1. Nettoyer les anciens builds
  console.log('📦 Nettoyage des anciens builds...');
  const outDir = path.join(process.cwd(), 'out');
  if (fs.existsSync(outDir)) {
    fs.rmSync(outDir, { recursive: true, force: true });
    console.log('✅ Dossier "out" nettoyé\n');
  }

  // 2. Installer les dépendances si nécessaire
  if (!fs.existsSync(path.join(process.cwd(), 'node_modules'))) {
    console.log('📥 Installation des dépendances...');
    execSync('npm install', { stdio: 'inherit' });
    console.log('✅ Dépendances installées\n');
  }

  // 3. Build Next.js
  console.log('🔨 Build Next.js en cours...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build terminé\n');

  // 4. Vérifier que le dossier 'out' existe
  if (!fs.existsSync(outDir)) {
    throw new Error('Le dossier "out" n\'a pas été créé. Vérifiez votre configuration Next.js.');
  }

  // 5. Vérifier que les fichiers PHP sont présents
  const phpFiles = ['send-contact.php', 'send-quote.php'];
  const publicDir = path.join(process.cwd(), 'public');
  
  console.log('📋 Vérification des fichiers PHP...');
  phpFiles.forEach(file => {
    const sourcePath = path.join(publicDir, file);
    const destPath = path.join(outDir, file);
    
    if (fs.existsSync(sourcePath)) {
      fs.copyFileSync(sourcePath, destPath);
      console.log(`✅ ${file} copié vers out/`);
    } else {
      console.warn(`⚠️  ${file} non trouvé dans public/`);
    }
  });

  // 6. Copier le fichier .htaccess si présent
  const htaccessPath = path.join(publicDir, '.htaccess');
  const htaccessDest = path.join(outDir, '.htaccess');
  if (fs.existsSync(htaccessPath)) {
    fs.copyFileSync(htaccessPath, htaccessDest);
    console.log('✅ .htaccess copié vers out/');
  } else {
    console.warn('⚠️  .htaccess non trouvé dans public/');
  }

  console.log('\n✨ Build terminé avec succès !');
  console.log('\n📁 Le dossier "out" est prêt pour le déploiement sur Hostinger.');
  console.log('📤 Vous pouvez maintenant uploader le contenu du dossier "out" sur votre serveur Hostinger.\n');

} catch (error) {
  console.error('\n❌ Erreur lors du build:', error.message);
  process.exit(1);
}
