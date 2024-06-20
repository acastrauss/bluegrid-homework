FROM node:lts

WORKDIR /

COPY package*.json tsconfig.json ./ 

RUN npm install

COPY . .

RUN npm run tsc

EXPOSE 3000
CMD ["npm", "run", "start:prod"]