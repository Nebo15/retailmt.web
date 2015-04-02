#!/bin/bash
PROJECT_DIR=$(dirname $0)/../
test -d $PROJECT_DIR || exit 0
cd $PROJECT_DIR

npm install
./node_modules/bower/bin/bower update
./node_modules/grunt-cli/bin/grunt build --target=prod
