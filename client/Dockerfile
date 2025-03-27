FROM node:latest

RUN mkdir -p /app

COPY . /app

WORKDIR /app

RUN npm install

EXPOSE 5173

CMD ["npm", "start"]