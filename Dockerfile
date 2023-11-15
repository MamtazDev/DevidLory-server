FROM node:slim

WORKDIR /app

COPY .  /app

RUN npm install

EXPOSE 3000 

ENV NAME devidlory

CMD node server.js