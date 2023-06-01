# pull official base image
FROM node:20-alpine as build

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH


# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install


# add app
COPY . ./
RUN npm run build
# start app
FROM nginx:latest

WORKDIR /app
COPY --from=build /app/build/ .


COPY ./nginx/certs /etc/nginx/certs
COPY ./nginx/mime.conf /etc/nginx/

#COPY frontend /app

COPY ./nginx/nginx.conf /etc/nginx/