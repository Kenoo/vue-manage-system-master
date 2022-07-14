#!/bin/bash
docker rm -f build-app$1
docker run --name build-app$1 -v "$(PWD)":/home/app-vue app-vue:v3  /bin/sh /home/app-vue/shell/docker_build.sh $1