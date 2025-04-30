# build stage
FROM node:16.17.0 as build
WORKDIR /taskapp
COPY . .
RUN npm install
RUN npm run build

# production stage
FROM nginx:alpine
COPY --from=build /taskapp/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]