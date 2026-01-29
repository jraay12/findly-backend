FROM node:24

WORKDIR /usr/src/app

COPY package*.json ./

ENV NODE_ENV=development

RUN npm install
RUN npm install -g ts-node nodemon

COPY . .

RUN npx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "npx prisma migrate dev --name init && npm run dev"]
