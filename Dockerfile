FROM node:16

ENV MONGODB_CONNECTION_PROTOCOL mongodb+srv
ENV MONGODB_DB_NAME gha-demo1
ENV MONGODB_CLUSTER_ADDRESS cluster_address_example
ENV MONGODB_USERNAME user_name_example
ENV MONGODB_PASSWORD password_example

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

CMD ["npm", "start"]