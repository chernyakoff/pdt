#!/bin/bash
rm -R ./dist/spa;
API_URL=https://webadmin.yacurier.ru IMG_URL=https://webclient.yacurier.ru DIST_DIR=./dist/spa quasar build;
ssh idelivery rm -R /home/web/idelivery-web/admin/modules/pdt/spa;
scp -r ./dist/spa idelivery:/home/web/idelivery-web/admin/modules/pdt;

rm -R ./dist/spa;
API_URL=https://webclient.yacurier.ru IMG_URL=https://webclient.yacurier.ru DIST_DIR=./dist/spa quasar build;
ssh idelivery rm -R /home/web/idelivery-web/client/modules/pdt/spa;
scp -r ./dist/spa idelivery:/home/web/idelivery-web/client/modules/pdt;
