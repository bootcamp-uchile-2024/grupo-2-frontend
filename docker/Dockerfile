FROM node:lts-alpine3.20 as build
WORKDIR /usr/app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:alpine AS package
COPY --from=build /usr/app/dist /usr/share/nginx/html

WORKDIR /usr/share/nginx/html
EXPOSE 80