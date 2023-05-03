FROM node:10-alpine

RUN mkdir -p /home/app/

RUN apt-get install build-essential

WORKDIR /home/app

COPY ./package*.json ./

RUN npm install 

COPY . .

EXPOSE 8080

RUN npm run build

CMD [ "npm", "run", "start" ]