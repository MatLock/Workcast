FROM node:12.14.1-alpine3.10

ENV NPM_CONFIG_LOGLEVEL warn

# Create app directory
RUN mkdir -p /usr/src/dockerApp
WORKDIR /usr/src/dockerApp

# Install app dependencies
COPY . /usr/src/dockerApp/

RUN npm install

EXPOSE 3000
CMD [ "npm", "start" ]