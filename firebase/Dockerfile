FROM node:16-alpine

WORKDIR /volcano

COPY . /volcano

RUN apk --no-cache add openjdk11-jre bash

RUN npm install -g firebase-tools

EXPOSE 7711
EXPOSE 9099
EXPOSE 9089
EXPOSE 4400
EXPOSE 4500

CMD ["npm", "run", "develop"] 