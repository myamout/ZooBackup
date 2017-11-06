# ZooBackup

# Install Steps
1. Assuming you have node installed on your system: `npm install -g yarn`
2. Run the command `yarn`
3. Run the script `./installdbs.sh` to install Elasticsearch
   *If you are running Mac OS then just use Homebrew to install Elasticsearch and MongoDB*
   *To install MongoDB on Ubuntu see the install page at: https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/*
4. Run the command `yarn build` to bundle all of the React files
5. Run the script `./startdbs.sh` to start up all of the databases
6. Run the command `yarn server` to start the server: go to `localhost:8080`
7. When done running the server run the script `./stopdbs.sh`

# Notes
+ App is using Node + Express for the server and React on the frontend
+ MongoDB is used to store user account info and backup animal data
+ Elasticsearch is used to execute quick queries on the data
