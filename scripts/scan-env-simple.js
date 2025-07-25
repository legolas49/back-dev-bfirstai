#!/usr/bin/env node

/**
 * 🔍 Auto-découverte des variables d'environnement - Version simple
 */

import { readFileSync, writeFileSync } from 'fs';
import { glob } from 'glob';

console.log('🔍 Scanning for environment variables...');

const envVars = new Set();

// Scanner tous les fichiers TypeScript/JavaScript/Svelte
const files = glob.sync('src/**/*.{ts,js,svelte}');

for (const file of files) {
  try {
    const content = readFileSync(file, 'utf8');
    
    // Pattern pour process.env.VARIABLE_NAME
    const matches = content.match(/process\.env\.([A-Z_][A-Z0-9_]*)/g);
    if (matches) {
      matches.forEach(match => {
        const varName = match.replace('process.env.', '');
        if (varName !== 'NODE_ENV') {
          envVars.add(varName);
        }
      });
    }
    
    // Pattern pour $env/static/private imports
    const importMatch = content.match(/import\s*{\s*([^}]+)\s*}\s*from\s*['"]\$env\/static\/private['"]/);
    if (importMatch) {
      const vars = importMatch[1].split(',').map(v => v.trim().replace(/\s+as\s+\w+/, ''));
      vars.forEach(varName => {
        if (varName && varName !== 'NODE_ENV') {
          envVars.add(varName);
        }
      });
    }
    
  } catch (error) {
    // Ignorer les erreurs de lecture
  }
}

// Variables critiques avec valeurs par défaut pour back-dev-bfirstai
const criticalVars = {
  'MONGO_URI': 'mongodb://localhost:27017/back-dev-bfirstai',
  'PUBLIC_API_URL': 'https://backoffice-dev.bfirst-ai.com',
  'JWT_SECRET': 'default-jwt-secret-please-change',
  'APP_NAME': 'BFirst AI Backoffice DEV'
};

const sortedVars = Array.from(envVars).sort();

console.log(`\n✅ Found ${sortedVars.length} environment variables:`);
sortedVars.forEach((varName, index) => {
  const isCritical = criticalVars[varName] ? ' 🔑' : '';
  console.log(`${(index + 1).toString().padStart(2)}. ${varName}${isCritical}`);
});

// Générer le script pour GitHub Actions
const buildArgsScript = sortedVars.map(varName => {
  if (criticalVars[varName]) {
    return `          BUILD_ARGS="\${BUILD_ARGS}${varName}=\${{ secrets.${varName} || '${criticalVars[varName]}' }}\\n"`;
  } else {
    return `          BUILD_ARGS="\${BUILD_ARGS}${varName}=\${{ secrets.${varName} }}\\n"`;
  }
}).join('\n');

// Générer les ARG et ENV pour Dockerfile  
const dockerfileArgs = sortedVars.map(varName => {
  if (criticalVars[varName]) {
    return `ARG ${varName}="${criticalVars[varName]}"`;
  } else {
    return `ARG ${varName}`;
  }
}).join('\n');

const dockerfileEnvs = sortedVars.map(varName => `ENV ${varName}=$${varName}`).join('\n');

// Sauvegarder les résultats
const output = {
  variables: sortedVars,
  count: sortedVars.length,
  generated: {
    githubActionsScript: buildArgsScript,
    dockerfileArgs,
    dockerfileEnvs
  },
  generatedAt: new Date().toISOString()
};

writeFileSync('env-vars-auto.json', JSON.stringify(output, null, 2));

console.log(`\n📄 Saved to env-vars-auto.json`);
console.log(`\n🚀 You can now copy-paste the generated code!`);
