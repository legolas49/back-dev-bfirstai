#!/usr/bin/env node

/**
 * Script pour forcer l'utilisation de rollup portable (cross-platform)
 * et éviter les problèmes avec les packages natifs Windows
 */

const fs = require('fs');
const path = require('path');

console.log('🔧 Configuration rollup cross-platform...');

// Chemin vers package.json
const packageJsonPath = path.join(process.cwd(), 'package.json');

if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Supprimer les packages rollup Windows-specific
  const problematicPackages = [
    '@rollup/rollup-win32-x64-msvc',
    '@rollup/rollup-darwin-x64',
    '@rollup/rollup-linux-x64-gnu',
    '@rollup/rollup-linux-x64-musl'
  ];
  
  let modified = false;
  
  ['dependencies', 'devDependencies', 'optionalDependencies'].forEach(depType => {
    if (packageJson[depType]) {
      problematicPackages.forEach(pkg => {
        if (packageJson[depType][pkg]) {
          console.log(`❌ Suppression de ${pkg} from ${depType}`);
          delete packageJson[depType][pkg];
          modified = true;
        }
      });
    }
  });
  
  // Ajouter une configuration pour forcer rollup portable
  if (!packageJson.resolutions) {
    packageJson.resolutions = {};
  }
  
  // Force l'utilisation de rollup pur JavaScript (portable)
  packageJson.resolutions['rollup'] = '^4.45.1';
  
  if (modified) {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
    console.log('✅ package.json mis à jour pour être cross-platform');
  } else {
    console.log('✅ package.json déjà propre');
  }
} else {
  console.log('❌ package.json non trouvé');
}

console.log('🚀 Configuration terminée');
