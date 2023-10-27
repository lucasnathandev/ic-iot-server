FROM node:18-alpine
WORKDIR /usr/src/api

COPY . .
COPY ./.env.production ./.env

RUN npm install --quiet --no-optional --no-fund --loglevel=error
RUN npm install -D @swc/core
RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start:prod"]