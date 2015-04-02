#!/bin/bash
PROJECT_DIR=$(dirname $0)/../
test -d $PROJECT_DIR || exit 0
cd $PROJECT_DIR

echo "Updation system"
apt-get update
apt-get install git-core curl build-essential openssl libssl-dev
echo "Installing Compass"
apt-get install ruby-full rubygems1.8
gem install sass --no-document
gem install compass --no-document
ruby -v
echo "Installing Bower"
apt-get install nodejs-legacy
apt-get install npm
npm install
