FROM node:16

WORKDIR /app

COPY package*.json ./

RUN pnpm install

COPY . .

EXPOSE 3000

CMD [ "pnpm", "run", "start:prod" ]