# Estágio 1: Build
FROM node:18-slim AS build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Estágio 2: Produção com Nginx
FROM nginx:stable-alpine
# MUDANÇA AQUI: de /app/dist para /app/build
COPY --from=build-stage /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]