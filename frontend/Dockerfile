# Usa la versión de Node que coincide con tu entorno local (v20.x)
FROM node:20-alpine AS build

LABEL maintainer="camimillan2003@gmail.com" \
      version="1.0" \
      description="Sistema de gestión inmobiliaria"

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine

# 1. Elimina la configuración por defecto
RUN rm -rf /etc/nginx/conf.d/default.conf

# 2. Copia los archivos construidos (observa que usamos dist/assets)
COPY --from=build /app/dist /usr/share/nginx/html

# 3. Copia tu configuración personalizada
COPY nginx.conf /etc/nginx/conf.d/

# 4. Verificación adicional (opcional)
RUN ls -la /usr/share/nginx/html && \
      ls -la /usr/share/nginx/html/assets

EXPOSE 80