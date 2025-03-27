FROM node:latest

RUN mkdir -p /server

WORKDIR /server

COPY . /server

RUN npm install

EXPOSE 8081

CMD ["npm", "start"]