#!/bin/bash
quasar build;
ssh idelivery rm -R /home/web/idelivery-web/admin/modules/pdt/spa;
scp -r ./dist/spa idelivery:/home/web/idelivery-web/admin/modules/pdt;


