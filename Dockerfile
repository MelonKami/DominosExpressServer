FROM node:20.15.0

COPY package.json package.json
COPY package-lock.json package-lock.json
 
RUN npm install
 
COPY . .

CMD ["node", "/index.js"]