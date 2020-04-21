FROM node:13.11.0
WORKDIR /usr/src/app

# // remove following two lines if node modules installed locally
COPY package.json .     
RUN npm install --quiet

copy . .
CMD ["npm","run","dev"]