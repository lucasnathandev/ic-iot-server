FROM node:18-alpine
WORKDIR /usr/src/api

COPY . .
COPY ./.env ./.env

RUN npm install --quiet --no-optional --no-fund --loglevel=error
RUN npm install -D @swc/core

EXPOSE 8000
CMD ["npm", "run", "start:dev"]