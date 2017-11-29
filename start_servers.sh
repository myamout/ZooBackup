#!/bin/bash
mkdir -p ./data
# Starting elastic search with this project's spec
elasticsearch -Dconfig=`pwd`"/elasticsearch" &
# Data dir in the current dir rather than in the root dir
mongod --dbpath="./data" &