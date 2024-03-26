
# NODE ONLY DOCKER

FROM node:18-alpine

WORKDIR /home/bun/app

COPY ./package.json ./

RUN npm install

COPY . .


ENV PORT 3000

EXPOSE $PORT


CMD [ "npm", "run", "build:prod" ]


