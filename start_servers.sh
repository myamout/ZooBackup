#!/bin/bash
mkdir -p ./data
# Specifying where our elastic search config is
export ES_PATH_CONF="./elasticsearch/"
elasticsearch &
# Data dir in the current dir rather than in the root dir
mongod --dbpath="./data" &