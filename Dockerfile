# # # Dockerfile

# FROM oven/bun:1 as base
# WORKDIR /usr/src/app

# # install dependencies into temp folder
# # this will cache them and speed up future builds
# FROM base AS install
# RUN mkdir -p /temp/dev
# COPY package.json bun.lockb /temp/dev/
# RUN cd /temp/dev && bun install --frozen-lockfile

# # install with --production (exclude devDependencies)
# RUN mkdir -p /temp/prod
# COPY package.json bun.lockb /temp/prod/
# RUN cd /temp/prod && bun install --production

# # copy node_modules from temp folder
# # then copy all (non-ignored) project files into the image
# FROM install AS prerelease
# COPY --from=install /temp/dev/node_modules node_modules
# COPY . .

# # copy production dependencies and source code into final image
# FROM base AS release
# COPY --from=install /temp/prod/node_modules node_modules
# COPY --from=prerelease /usr/src/app/src ./src
# COPY --from=prerelease /usr/src/app/package.json .
# COPY . .


# # run the app
# USER bun
# EXPOSE 3000/tcp
# CMD ["bun", "run", "dev"]


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

# RUN bun install

# COPY . .

# EXPOSE 3000

# CMD [ "npm", "run", "dev" ]

# NODE ONLY DOCKER

FROM node:18-alpine

WORKDIR /home/bun/app

COPY ./package.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]