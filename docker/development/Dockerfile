# Etapa 1 “construccion”
FROM node:20 

WORKDIR /usr/src/app


COPY package*.json ./
COPY .env.dev .env

RUN npm install

COPY . .

CMD npm run dev