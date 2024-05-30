FROM node:alpine3.19

WORKDIR /api
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "node", "index.js" ]
