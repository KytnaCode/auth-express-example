FROM node:lts-alpine3.18 as build
LABEL authors="kytnacode"

WORKDIR /app

COPY . .

RUN npm install --global pnpm

RUN pnpm install
RUN pnpm clean
RUN pnpm build

ENV NODE_ENV=prod
ENV PORT=3000

CMD ["pnpm", "start"]