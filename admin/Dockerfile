# back/Dockerfile
FROM node:18-alpine as build

# Créer un répertoire de travail
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier tout le reste du projet
COPY . .

# Builder l'application Vue.js
RUN npm run build

# Utiliser une image Apache pour servir l'application
FROM httpd:alpine

# Activer le module de réécriture Apache
RUN sed -i 's/#LoadModule rewrite_module/LoadModule rewrite_module/' /usr/local/apache2/conf/httpd.conf

# Copier les fichiers build dans Apache
COPY --from=build /app/dist /usr/local/apache2/htdocs/

# Copier le fichier .htaccess
COPY public/.htaccess /usr/local/apache2/htdocs/.htaccess

# Exposer le port
EXPOSE 80

# Démarrer Apache
CMD ["httpd-foreground"]
