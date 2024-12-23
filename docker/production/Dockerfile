# Etapa 1: Construcción
FROM node:20 AS build

WORKDIR /usr/app/

# Copiar los archivos necesarios desde el contexto de construcción
COPY ../../package*.json ./

RUN npm install

COPY ../../ ./
COPY ../../.env.prod .env

RUN npm run build

# Etapa 2: Empaquetado
FROM nginx:alpine

COPY --from=build /usr/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

EXPOSE 80