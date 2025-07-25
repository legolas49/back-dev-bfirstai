# Bonnes Pratiques Cross-Platform (Windows ↔ Linux)

## 🚨 Packages à Éviter dans package.json

### Packages Windows-spécifiques à exclure :
```json
❌ NE PAS INCLURE :
"@rollup/rollup-win32-x64-msvc": "^4.45.1"  // Specific Windows
"fsevents": "*"                              // macOS specific  
"@esbuild/win32-x64": "*"                   // Windows specific
```

### ✅ Préférer les packages universels :
```json
✅ UTILISER :
"esbuild": "^0.25.2"        // Cross-platform
"rollup": "^4.45.1"         // Cross-platform  
"vite": "^6.0.0"           // Cross-platform
```

## 🐳 Docker Best Practices

### Base Images recommandées :
- `node:18-alpine` → Plus léger, sécurisé, compatible Linux
- Éviter : `mcr.microsoft.com/windows/*` pour deployment Linux

### Dockerfile multi-stage :
```dockerfile
# ✅ Optimisé pour production Linux
FROM node:18-alpine AS builder
# ... build stage ...

FROM node:18-alpine AS runner  
# ... production stage ...
```

## 🔧 Scripts Cross-Platform

### package.json scripts universels :
```json
{
  "scripts": {
    "clean": "rimraf node_modules dist .svelte-kit",  // ✅ Cross-platform
    "dev": "vite dev",                                // ✅ Cross-platform
    "build": "vite build"                             // ✅ Cross-platform
  }
}
```

### ❌ Éviter les commandes OS-spécifiques :
```json
❌ "clean:win": "rmdir /s node_modules"     // Windows only
❌ "clean:unix": "rm -rf node_modules"      // Unix only
```

## 🚀 Déploiement Kubernetes

### Variables d'environnement :
```yaml
# ✅ Portable paths
env:
  - name: NODE_ENV
    value: "production"
  - name: PORT  
    value: "3000"
    
# ❌ Éviter les paths Windows
❌ MONGO_URI: "C:\\Program Files\\MongoDB\\..."
✅ MONGO_URI: "mongodb://mongo-service:27017/db"
```

## 📁 Structure des Fichiers

### Chemins universels :
```typescript
// ✅ Cross-platform
import { join } from 'path';
const filePath = join(process.cwd(), 'uploads', filename);

// ❌ Windows-specific
const filePath = 'C:\\uploads\\' + filename;
```

## 🧪 Tests Cross-Platform

### Jest/Vitest configuration :
```javascript
// ✅ Platform-agnostic
export default {
  testEnvironment: 'node',
  transform: {},
  moduleFileExtensions: ['ts', 'js', 'json']
}
```

## 🔒 .dockerignore Essentiel

```dockerignore
# Éviter d'inclure les artifacts Windows
*.exe
*.msi  
*.dll
Thumbs.db

# Node modules (rebuilds dans Docker)
node_modules/
package-lock.json  # Rebuilt in container
```

## ⚡ Performance Tips

1. **Utiliser .dockerignore** → Réduction 50-80% taille build
2. **Multi-stage builds** → Images production plus légères  
3. **Alpine Linux** → Base images 5x plus petites
4. **npm ci** au lieu de `npm install` → Builds reproductibles

## 🐛 Debugging Cross-Platform

### Logs utiles :
```bash
# Vérifier la plateforme dans le container
docker run --rm image:tag uname -a

# Vérifier les packages installés
docker run --rm image:tag npm list --depth=0

# Tester les paths
docker run --rm image:tag node -e "console.log(process.platform)"
```

---

✅ **Règle d'or** : Si ça marche sur Alpine Linux, ça marchera partout !
