FROM node:current-alpine
WORKDIR /bot
COPY . /bot/
RUN npm install -g npm
RUN npm install
CMD [ "npm", "start" ]