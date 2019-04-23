FROM node:latest

MAINTAINER Facundo Martin Gordillo <facundomgordillo@gmail.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY [".", "/usr/src/app/"]

EXPOSE 3000

RUN yarn --pure-lockfile

CMD ["npm", "start"]