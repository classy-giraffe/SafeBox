FROM node:current-alpine
WORKDIR /bot
COPY ./src /bot/
RUN npm install
CMD npm start