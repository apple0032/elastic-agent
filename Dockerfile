FROM node:latest
WORKDIR /opt
COPY ./package.json /opt
RUN npm install

COPY . /opt

EXPOSE 3000
CMD node index.js
