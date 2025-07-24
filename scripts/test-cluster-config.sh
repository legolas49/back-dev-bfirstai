#!/bin/bash

echo "🔍 Test de la configuration Kubernetes pour backoffice-dev"
echo "=================================================="

# Vérifier la connexion au cluster
echo "1️⃣ Test de connexion au cluster..."
kubectl cluster-info

# Vérifier les namespaces
echo "2️⃣ Namespaces disponibles..."
kubectl get namespaces | grep -E "(NAME|backoffice-dev|default)"

# Vérifier KubeVela
echo "3️⃣ Vérification de KubeVela..."
which vela
vela version 2>/dev/null || echo "⚠️ KubeVela CLI non trouvé"

# Vérifier les ingress controllers
echo "4️⃣ Ingress controllers..."
kubectl get pods -n ingress-nginx 2>/dev/null | head -3 || echo "⚠️ Namespace ingress-nginx non trouvé"

# Vérifier cert-manager
echo "5️⃣ Cert-manager..."
kubectl get pods -n cert-manager 2>/dev/null | head -3 || echo "⚠️ Namespace cert-manager non trouvé"

# Test de résolution DNS
echo "6️⃣ Test DNS pour backoffice-dev.bfirst-ai.com..."
nslookup backoffice-dev.bfirst-ai.com || echo "⚠️ DNS non résolu"

echo "=================================================="
echo "✅ Test terminé. Voir les résultats ci-dessus."
