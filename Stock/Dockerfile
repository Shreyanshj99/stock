# stage 1
FROM node:latest as node
WORKDIR /Stock
COPY . .
RUN npm install
RUN npm run build --prod

# stage 2
FROM nginx:alpine
COPY --from=node /Stock/dist/Stock /usr/share/nginx/html
