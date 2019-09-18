# Welcome to Slash!

Hi! I am preparing this **Repo** because I would like all of you to getting start project quickly. You can have a choice to choose for and extend based on your need. I prepared with 3 different types.  
- **master** branch is the raw folder structure that can use to build web with template engine *numjuck* and build simple api. 

# Getting started

## Install

```
$ cd base
$ cp env.sample .env
$ npm i
```

## Development

```
# start with nodemon
$ npm start 
# start without nodemon
$ npm run start:dev
```

# Build

Build with *Docker* and *Elastic Beanstalk*.

## Docker

```

## build docker images
docker build -t name:tag .  
## list docker images
docker images
## run docker image
docker run -p port:port image-name-or-id
## run docker image with daemon mode
docker run -p port:port -d image-name-or-id

***** example *****

## build docker images
docker build -t base:v0.1 .
## list docker images
docker images
## run docker image
docker run -p 3000:3000 base:v0.1
## run docker image with daemon mode
docker run -p 3000:3000 -d base:v0.1

```

## Elastic Beanstalk

```
# Build docker tag against ECR
docker build -t 443536660676.dkr.ecr.eu-central-1.amazonaws.com/aksor:v0.0.1 .
# run docker in local
eb local run
# login ECR, you can view command in ERC 
$(aws ecr get-login --no-include-email --region eu-central-1)
# push docker image to eb
docker push 443536660676.dkr.ecr.eu-central-1.amazonaws.com/aksor:v0.0.1
# deploy to eb with label
eb deploy -l "v0.0.1"
# remote ssh to eb instance
eb ssh
```

## Docker extra commands

In this section, you can find the useful commands for docker that can help you solve some problem when you get full of storage space and cache issue.

```
# delete docker image with text, you can replace text to specific name.
docker rmi $(docker images | grep text | tr -s ' ' | cut -d ' ' -f 3)
#build docker no cache
docker build --no-cache -t base:v0.1 .
```

# Noted

you can note down all the problem and answer during developing. so we can then tell to another developer. 


# Version Release Notes

below is the change of **Version**

### v0.0.1
- canvas
