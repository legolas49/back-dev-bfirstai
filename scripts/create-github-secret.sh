# Script pour créer le secret GitHub pour GitOps

# Ce script crée un secret Kubernetes pour permettre à KubeVela GitOps
# d'écrire dans le repository GitHub pour les mises à jour automatiques d'images

echo "🔐 Création du secret GitHub pour GitOps..."

# Créer le secret avec un token GitHub ayant les permissions write
# ATTENTION: Remplacer GITHUB_TOKEN par un token avec permissions:
# - repo (accès complet au repository)
# - write:packages (pour lire GHCR)

kubectl create secret generic github-write-secret \
  --from-literal=username=legolas49 \
  --from-literal=password=$GITHUB_TOKEN \
  --namespace=backoffice-dev \
  --dry-run=client -o yaml | kubectl apply -f -

echo "✅ Secret github-write-secret créé dans le namespace backoffice-dev"

# Afficher les secrets
kubectl get secrets -n backoffice-dev | grep github

echo ""
echo "📝 Instructions:"
echo "1. Créer un Personal Access Token GitHub avec ces permissions:"
echo "   - repo (Full control of private repositories)"
echo "   - write:packages (Upload packages to GitHub Package Registry)"
echo ""
echo "2. Exporter le token: export GITHUB_TOKEN=ghp_your_token_here"
echo "3. Relancer ce script avec le vrai token"
