#!/bin/sh
CMD="DEV=1 quasar build";
MONITORDIR="/home/mike/Work/Node/pdt/src"
eval ${CMD}
inotifywait ./src -m -r -e close_write,create,delete,move --format '%e%w%f' "${MONITORDIR}" | while read NEWFILE
do
  clear && eval ${CMD}
done
