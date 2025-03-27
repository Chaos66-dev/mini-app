FROM node:latest

RUN mkdir -p /server

WORKDIR /server

COPY . /server

RUN npm install

EXPOSE 8081

CMD ["sh", "-c", "npx knex migrate:rollback --all && npx knex migrate:latest && npx knex seed:run && npm run dev"]