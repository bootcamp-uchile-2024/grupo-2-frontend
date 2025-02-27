# Etapa 1 “construccion”
FROM node:20 AS build

WORKDIR /usr/app/

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# # Etapa 2 “empaquetado”
FROM nginx:alpine

COPY --from=build ./usr/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

EXPOSE 80