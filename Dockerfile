

# BUN ONLY DOCKER

# FROM oven/bun:1.0 as base

# WORKDIR /home/bun/app

# COPY ./package.json bun.lockb ./

# RUN bun install

# COPY . .

# EXPOSE 3000

# CMD [ "bun", "run", "dev" ]


# BUN & NODE ONLY DOCKER

# FROM node:18-alpine

# RUN apk --no-cache add ca-certificates wget

# RUN wget https://raw.githubusercontent.com/athalonis/docker-alpine-rpi-glibc-builder/master/glibc-2.26-r1.apk
# RUN apk add --allow-untrusted --force-overwrite glibc-2.26-r1.apk
# RUN rm glibc-2.26-r1.apk

# RUN npm install -g bun

# WORKDIR /home/bun/app

# COPY ./package.json bun.lockb ./

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD [ "npm", "run", "dev" ]

# NODE ONLY DOCKER

# FROM node:18-alpine

# WORKDIR /home/bun/app

# COPY ./package.json ./

# RUN npm install

# COPY . .

# EXPOSE 3000

# CMD [ "npm", "run", "dev" ]


