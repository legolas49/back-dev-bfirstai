# 🔧 STRATÉGIE BUILD CROSS-PLATFORM

## ⚠️ PROBLÈME IDENTIFIÉ
- Le package `@rollup/rollup-win32-x64-msvc` est spécifique à Windows
- Il cause des erreurs sur les environnements Linux (comme notre cluster Kubernetes)
- npm a un bug connu avec les dépendances optionnelles (#4828)

## 🎯 SOLUTION ADOPTÉE

### 🖥️ Développement Local (Windows)
```bash
npm run build        # Build alternatif (évite rollup Windows)
npm run dev          # Développement normal
```

### 🐧 Production (Linux/Kubernetes)
```bash
npm run build:prod   # Build Vite normal (GitHub Actions CI/CD)
```

## 📋 CONFIGURATION

### vite.config.ts
- Configuration cross-platform avec detection de `process.platform`
- Exclusion automatique des packages Windows sur Linux
- Build rollup normal fonctionne sur Alpine Linux

### GitHub Actions (.github/workflows/)
- Utilise `npm run build:prod` pour le vrai build Vite
- Environnement Linux propre sans dépendances Windows
- Image Docker Alpine compatible

### Scripts package.json
- `build`: Script local Windows (évite rollup)
- `build:prod`: Script production Linux (Vite complet)
- `prepare`: Désactivé temporairement pour compatibilité

## 🚀 WORKFLOW RECOMMANDÉ

1. **Développement**: 
   - Coder sous Windows avec `npm run dev`
   - Tester avec `npm run build` (alternatif)

2. **Déploiement**:
   - Push vers GitHub
   - CI/CD utilise `npm run build:prod` 
   - Build Linux natif sans problèmes Windows

3. **Résultat**:
   - Site: https://backoffice-dev.bfirst-ai.com
   - Build optimisé pour production Linux

## 🔍 VÉRIFICATION

```bash
# Local (Windows) - OK
npm run build

# CI/CD (Linux) - OK
npm run build:prod

# Test compatibilité
node scripts/check-linux-compat.js
```

Cette approche garantit:
- ✅ Développement fluide sous Windows
- ✅ Déploiement optimal sous Linux  
- ✅ Aucune dépendance Windows en production
- ✅ Pipeline CI/CD fonctionnel
