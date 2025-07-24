# Back DEV BFirst AI

> **Environnement :** Développement uniquement  
> **Registry :** GitHub Container Registry (GHCR)  
> **Image :** `ghcr.io/legolas49/back-dev-bfirstai`  
> **Déploiement :** `backoffice-dev.bfirst-ai.com`

---

## 🎯 Vue d'ensemble

Ce repository contient le code du backoffice BFirst AI pour l'**environnement de développement uniquement**.

### Stratégie DEV-first

1. ✅ Validation complète en DEV
2. 📋 Tests et ajustements en DEV
3. 🚀 Duplication vers production une fois validé

---

## 🏗️ Architecture

### Stack Technique

- **Frontend :** SvelteKit
- **Backend :** Node.js/Express
- **Base de données :** MongoDB
- **Containerisation :** Docker
- **Registry :** GitHub Container Registry (GHCR)
- **Orchestration :** Kubernetes + KubeVela

### Environnement DEV

- **Namespace :** `backoffice-dev`
- **URL :** https://backoffice-dev.bfirst-ai.com
- **Image :** `ghcr.io/legolas49/back-dev-bfirstai:latest`
- **MongoDB :** `mongodb://mongodb.mongodb.svc.cluster.local:27017/backoffice_dev`

---

## 🚀 Déploiement

### GitHub Actions

Le workflow CI/CD se déclenche automatiquement :

1. **Push vers `main`** → Build + Push vers GHCR
2. **Image disponible** → Déploiement automatique via KubeVela
3. **Application accessible** → https://backoffice-dev.bfirst-ai.com

### Manuel

```bash
# Build local
docker build -t ghcr.io/legolas49/back-dev-bfirstai:latest .

# Push vers GHCR (nécessite authentification)
docker push ghcr.io/legolas49/back-dev-bfirstai:latest

# Déploiement Kubernetes
wsl ssh root@164.68.123.218 "vela up -f kubevela/backoffice-dev.yaml --env backoffice-dev"
```
