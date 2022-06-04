FROM node:current-alpine
WORKDIR /bot
COPY . /bot/
RUN npm install
CMD npm start