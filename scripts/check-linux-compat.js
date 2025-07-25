#!/usr/bin/env node

/**
 * Script de vérification cross-platform pour déploiement Linux
 * Vérifie que l'application est prête pour Docker/Kubernetes
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 Vérification compatibilité Linux/Docker...\n');

// 1. Vérifier package.json
console.log('📦 Vérification package.json:');
const packageJsonPath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Packages Windows-specific à éviter
  const windowsPackages = [
    '@rollup/rollup-win32-x64-msvc',
    'fsevents',
    '@esbuild/win32-x64'
  ];
  
  let hasWindowsPackages = false;
  ['dependencies', 'devDependencies'].forEach(depType => {
    if (packageJson[depType]) {
      windowsPackages.forEach(pkg => {
        if (packageJson[depType][pkg]) {
          console.log(`  ❌ ${pkg} trouvé dans ${depType} (problématique pour Linux)`);
          hasWindowsPackages = true;
        }
      });
    }
  });
  
  if (!hasWindowsPackages) {
    console.log('  ✅ Aucun package Windows-specific détecté');
  }
} else {
  console.log('  ❌ package.json non trouvé');
}

// 2. Vérifier Dockerfile
console.log('\n🐳 Vérification Dockerfile:');
const dockerfilePath = path.join(process.cwd(), 'Dockerfile');
if (fs.existsSync(dockerfilePath)) {
  const dockerfileContent = fs.readFileSync(dockerfilePath, 'utf8');
  
  if (dockerfileContent.includes('node:18-alpine')) {
    console.log('  ✅ Base image Alpine (recommandée)');
  } else if (dockerfileContent.includes('alpine')) {
    console.log('  ✅ Image Alpine utilisée');
  } else {
    console.log('  ⚠️  Image non-Alpine (considérer node:18-alpine)');
  }
  
  if (dockerfileContent.includes('npm ci')) {
    console.log('  ✅ npm ci utilisé (builds reproductibles)');
  } else {
    console.log('  ⚠️  npm install utilisé (préférer npm ci)');
  }
} else {
  console.log('  ❌ Dockerfile non trouvé');
}

// 3. Vérifier .dockerignore
console.log('\n🚫 Vérification .dockerignore:');
const dockerignorePath = path.join(process.cwd(), '.dockerignore');
if (fs.existsSync(dockerignorePath)) {
  const dockerignoreContent = fs.readFileSync(dockerignorePath, 'utf8');
  
  const essentialIgnores = ['node_modules', '.git', 'Dockerfile', '*.md'];
  let hasEssentials = true;
  
  essentialIgnores.forEach(ignore => {
    if (dockerignoreContent.includes(ignore)) {
      console.log(`  ✅ ${ignore} ignoré`);
    } else {
      console.log(`  ⚠️  ${ignore} non ignoré`);
      hasEssentials = false;
    }
  });
  
  if (hasEssentials) {
    console.log('  ✅ .dockerignore bien configuré');
  }
} else {
  console.log('  ❌ .dockerignore non trouvé');
}

// 4. Vérifier la structure des chemins
console.log('\n📁 Vérification chemins cross-platform:');
const srcPath = path.join(process.cwd(), 'src');
if (fs.existsSync(srcPath)) {
  console.log('  ✅ Répertoire src/ trouvé');
  
  // Vérifier les imports TypeScript
  const findTsFiles = (dir) => {
    const files = [];
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files.push(...findTsFiles(fullPath));
      } else if (item.endsWith('.ts') || item.endsWith('.svelte')) {
        files.push(fullPath);
      }
    });
    
    return files;
  };
  
  const tsFiles = findTsFiles(srcPath);
  let hasWindowsPaths = false;
  
  tsFiles.slice(0, 5).forEach(file => { // Vérifier les 5 premiers fichiers
    try {
      const content = fs.readFileSync(file, 'utf8');
      if (content.includes('C:\\') || content.includes('\\\\')) {
        console.log(`  ⚠️  Chemin Windows détecté dans ${path.relative(process.cwd(), file)}`);
        hasWindowsPaths = true;
      }
    } catch (e) {
      // Ignore les erreurs de lecture
    }
  });
  
  if (!hasWindowsPaths) {
    console.log('  ✅ Aucun chemin Windows hardcodé détecté');
  }
} else {
  console.log('  ❌ Répertoire src/ non trouvé');
}

// 5. Recommandations finales
console.log('\n🚀 Recommandations pour déploiement:');
console.log('  • Utiliser npm ci au lieu de npm install');
console.log('  • Préférer les images Alpine pour Docker');
console.log('  • Éviter les packages natifs Windows');
console.log('  • Utiliser des chemins relatifs avec path.join()');
console.log('  • Tester le build dans un container Linux');

console.log('\n✅ Vérification terminée!');
