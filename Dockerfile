# Node.js 20 Alpine : plusieurs dépendances (cross-env, react-dropzone, sass…) exigent Node >= 20
FROM node:20-alpine AS builder

WORKDIR /app

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer les dépendances avec legacy-peer-deps pour éviter les conflits
# Réessaie en cas de coupure réseau (ECONNRESET) au lieu d'échouer
RUN npm config set fetch-retries 5 \
 && npm config set fetch-retry-mintimeout 20000 \
 && npm config set fetch-retry-maxtimeout 120000 \
 && npm install --legacy-peer-deps --no-audit --no-fund

# Copier tout le code source
COPY . .

# Nettoyer le cache Next.js avant build
RUN rm -rf .next || true

# Set NODE_OPTIONS pour compatibilité OpenSSL
ENV NODE_OPTIONS=--openssl-legacy-provider

# Build du projet Next.js
RUN npm run build

# Étape de production
FROM node:20-alpine AS runner

WORKDIR /app

# Configuration de l'environnement
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_OPTIONS=--openssl-legacy-provider

# Copier les fichiers nécessaires depuis le builder
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package*.json ./
# Indispensable au démarrage : sans ce fichier, Next ignore les langues (/en, /ar), redirections et en-têtes
COPY --from=builder /app/next.config.js ./next.config.js
COPY --from=builder /app/node_modules ./node_modules

# Ajouter un utilisateur non-root pour la sécurité
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
USER nextjs

# Exposer le port
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]