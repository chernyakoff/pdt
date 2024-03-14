#!/bin/bash
API_URL=http://idelivery-admin IMG_URL=http://idelivery-client DIST_DIR=/home/mike/Work/Php/idelivery/admin/modules/pdt/spa quasar build;
API_URL=http://idelivery-client IMG_URL=http://idelivery-client DIST_DIR=/home/mike/Work/Php/idelivery/client/modules/pdt/spa quasar build;
