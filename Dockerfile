FROM node:20.5-alpine3.17

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .
