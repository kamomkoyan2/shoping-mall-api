FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "start:dev"]