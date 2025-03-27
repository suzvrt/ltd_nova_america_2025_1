# para rodar em desenvolvimento
## docker build -t frontend .
## docker run -p 3000:3000 -v $(pwd):/usr/src/app frontend -d
FROM node:20
WORKDIR /usr/src/app
COPY package.json .
RUN npm install
# COPY . .
CMD ["npm", "run", "dev"]
