###################
# PREBUILD
###################

FROM node:20.14.0-alpine as prebuild

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .

USER node

###################
# BUILD
###################

FROM node:20.14.0-alpine as build

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./

# We need dev dependencies before `npm run build` for production.
COPY --chown=node:node --from=prebuild /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm run build

ENV NODE_ENV production

RUN npm ci --omit=dev && npm cache clean --force

USER node

###################
# PRODUCTION
###################

FROM node:20.14.0-alpine as production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD [ "node", "dist/main.js" ]
