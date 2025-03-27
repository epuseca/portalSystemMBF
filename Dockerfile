FROM node:20

WORKDIR /portal/backend

COPY package*.json ./

# Cài đặt dependencies trong container
RUN npm install

RUN npm install @babel/core @babel/cli @babel/preset-env @babel/node --save-dev

# Sao chép mã nguồn
COPY . .

RUN npm run build-src

CMD ["npm", "run", "build"]

# docker build --tag node-docker .
# docker run -p 3000:3000 -d node-docker