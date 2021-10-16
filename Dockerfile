# non production Dockerfile
FROM node:14-alpine

WORKDIR /usr/src/app

RUN apk update && apk upgrade && apk add --no-cache bash git

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start:prod"]