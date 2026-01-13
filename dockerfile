FROM node:24

WORKDIR /usr/src/app

COPY package*.json ./

ENV NODE_ENV=development

RUN npm install
RUN npm install -g ts-node nodemon

COPY . .

RUN npx prisma generate

EXPOSE 2000

CMD [ "npm", "run", "dev" ]