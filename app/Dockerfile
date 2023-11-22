FROM node:14

WORKDIR /app

COPY ./myapp/package*.json .

RUN npm install

COPY ./myapp .

EXPOSE 3000

CMD [ "nodemon", "app.js" ]
