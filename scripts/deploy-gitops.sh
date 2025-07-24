#!/bin/bash

# Script de déploiement GitOps pour surveillance automatique GHCR

echo "🚀 Déploiement GitOps pour surveillance automatique d'images"

# Vérifier que le secret GitHub existe
if ! kubectl get secret github-write-secret -n backoffice-dev &>/dev/null; then
    echo "❌ Secret github-write-secret non trouvé"
    echo "💡 Exécutez d'abord: scripts/create-github-secret.sh"
    exit 1
fi

# Déployer l'application GitOps
echo "📋 Déploiement de l'application GitOps..."
kubectl apply -f kubevela/image-gitops.yaml

# Attendre que l'application soit prête
echo "⏳ Attente du démarrage de l'application GitOps..."
kubectl wait --for=condition=Ready --timeout=300s application/backoffice-dev-image-gitops -n backoffice-dev

# Vérifier le statut
echo "📊 Statut des applications KubeVela:"
vela ls -n backoffice-dev

echo ""
echo "✅ GitOps configuré avec succès !"
echo ""
echo "🔄 Fonctionnement:"
echo "1. GitHub Actions pousse une image avec tag main-<sha>-<timestamp>"
echo "2. KubeVela surveille GHCR toutes les 2 minutes"
echo "3. Quand une nouvelle image est détectée:"
echo "   - KubeVela met à jour kubevela/backoffice-dev.yaml"
echo "   - Commit automatique dans GitHub"
echo "   - Redéploiement automatique de l'application"
echo ""
echo "🎯 Plus besoin de kubectl rollout restart !"
