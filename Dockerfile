# Multi-stage build pour optimiser la taille de l'image
FROM node:18-alpine AS builder

# Métadonnées
LABEL org.opencontainers.image.source="https://github.com/legolas49/back-dev-bfirstai"
LABEL org.opencontainers.image.description="BFirst AI Backoffice - Développement"
LABEL org.opencontainers.image.licenses="MIT"

# Répertoire de travail
WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances
RUN npm ci --only=production && npm cache clean --force

# Copier le code source
COPY . .

# Build de l'application
RUN npm run build

# Stage de production
FROM node:18-alpine AS runner

# Créer un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs
RUN adduser -S svelte -u 1001

# Répertoire de travail
WORKDIR /app

# Copier les dépendances de production
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY --from=builder /app/package.json ./

# Changer le propriétaire des fichiers
RUN chown -R svelte:nodejs /app

# Passer à l'utilisateur non-root
USER svelte

# Port d'exposition
EXPOSE 3000

# Variables d'environnement par défaut
ENV NODE_ENV=production
ENV PORT=3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node healthcheck.js

# Commande de démarrage
CMD ["node", "build/index.js"]
