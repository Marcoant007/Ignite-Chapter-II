FROM node

WORKDIR /usr/app

COPY package.json ./

RUN npm install
RUN npm install --save-dev nodemon

COPY . .

EXPOSE 3333

CMD [ "npx", "nodemon", "src/server.js" ]
