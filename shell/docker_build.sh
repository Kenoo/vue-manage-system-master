#!/bin/bash

echo "start to build";
cd /home;
cp -r -f ./app-vue/* ./app/;
cd ./app;
echo "pnpm install.";
pnpm install;
echo "pnpm build.";
pnpm build;
cd /home/app-vue;
cp -r /home/app/dist/ /home/app-vue/dist$1;