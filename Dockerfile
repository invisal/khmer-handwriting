FROM node:10.15.1

# install dependencies
RUN apt-get update -y && \
    apt-get install -y \
    curl \
    build-essential \
    vim \
    libfile-which-perl \
    net-tools

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json .

RUN chmod -R 777 /usr/src/app

RUN npm install

ADD . .

RUN npm run build

EXPOSE 3000

CMD ["npm","run", "prod"]
