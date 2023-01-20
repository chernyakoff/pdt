#!/bin/bash
quasar build;
cat > ./dist/spa/.gitignore << EOF
*
!.gitgnore
EOF
scp -r ./dist/spa idelivery:/home/web/idelivery-web/admin/modules/pdt

