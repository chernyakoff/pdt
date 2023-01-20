#!/bin/bash
DEV=1 quasar build;
cat > /home/mike/Work/Php/idelivery/admin/modules/pdt/spa/.gitignore << EOF
*
!.gitgnore
EOF
