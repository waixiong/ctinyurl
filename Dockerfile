# web build
FROM node:14-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./web/package.json ./
COPY ./web/package-lock.json ./
RUN npm ci --silent
RUN sudo npm install react-scripts@4.0.3 -g --silent
COPY ./web/ ./
RUN npm run build

# non production Dockerfile
FROM node:14-alpine

WORKDIR /usr/src/app

RUN apk update && apk upgrade && apk add --no-cache bash git

COPY package*.json ./

RUN npm install

COPY . .
RUN npm run build
COPY --from=build /app/build /usr/src/app/dist/web

CMD ["npm", "run", "start:prod"]