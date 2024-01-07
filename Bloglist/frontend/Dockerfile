FROM node:16 as start-stage
WORKDIR /usr/src/app
COPY . .
FROM start-stage as build-stage
RUN npm ci
RUN npm run build
FROM nginx:1.20-alpine
COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html