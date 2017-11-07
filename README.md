# ZooBackup

# Useful Links
- "http://docs.searchkit.co/stable/"
- "https://reactjs.org/"
- "http://usewing.ml/"
- "https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html"

# Install Steps For Project Dependencies
1. Install Node if you don't have it installed yet
2. Install the Yarn package manager using: `npm install -g yarn`
3. To install all the dependencies run: `yarn`
4. Download MongoDB and Elasticsearch (see below). Note that if you're using Mac OS you can just use
    Homebrew, however I'm not sure how it'll go so let me know :)

# Install and Setup MongoDB
1. Go to "https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/" and follow the steps
2. Start MongoDB using `sudo -i service mongodb start`
3. Start Mongo shell by using `mongo`
4. Run the command `use zoo` to create the Zoo database
5. Run the commands `db.createCollection('users')` and `db.createCollection('animals')`
    to create the needed collections. (Make sure these are what they are called, this is what the Server code calls and connects to)
6. Insert an admin account into the database so you can login in by running the command:
    `db.users.insert({ username: '<username>', password: '<password>', permissions: '<permission>' })`
7. Turn off Mongo using `sudo -i service mongodb stop`. Make sure to exit the mongo shell first with `Crtl + D`

# Install and Setup Elasticsearch
1. Run the script `sudo ./installdbs.sh` to install Elasticsearch
2. Start Elastic by running: `sudo -i service elasticsearch start`
3. Create the animals index and mapping by using the command:
    `curl -XPUT 'localhost:9200/animals?pretty' -H 'Content-Type: application/json -d'
    { "settings": {
    "number_of_shards": 1
        },
        "mappings": {
            "animal": {
            "properties": {
                "name": { "type": "text"},
                "identification": { "type": "integer" },
                "age": { "type": "integer" },
                "species": { "type": "text" },
                "food": { "type": "text" },
                "health": { "type": "text" },
                "sex": { "type": "text" }
            }
            }
        }
    }'
4. (curl command doesn't play nice with Markdown just copy all of the json and you'll be good).
    Stop the Elastic Cluster using: `sudo -i service elasticsearch stop`

# Compling the React Code
- Project uses React on the front end. Don't worry because I've already done most of the heavy lifting, we just need
    to focus on making all of the components nice and pretty (add.jsx, edit.jsx, home.jsx, and view.jsx). If you browse through the components it should be pretty easy to pick up, can also read my comments or ask me questions.
1. Bundle the React code and transpile the JavaScript to Es5 by running `yarn build` (You'll need to run this after you
    make any changes to the front end code, changes to server code is okay)

# Starting Everything
1. Run the script: `sudo ./startdbs.sh` and go to "localhost:8080"
2. If you want to just run the server on its own run: `yarn server`
3. To stop MongoDB and Elastic run the script: `sudo ./stopdbs.sh`

# What Needs To Be Done
- Styling the four main views for the user
- Styling the SearchKit components to make the view.jsx look nice. See "http://docs.searchkit.co/stable/" for docs.
- Editing and deleting an animal still need to be implemented on the front and back end. See crud.js for an example of
    using this with Mongo and Elastic. Note that Editing and deletling an animal need to also be reflected in the Elastic cluster. See the addAnimal function in crud.js for an example of this.
- Adding deletion of animals (this can be done on the edit page)
- Edit forms in edit.jsx to prevent someone from editing an animals identification number

# Notes
- I did all of this on Ubuntu, anyone on Mac OS doesn't need to add sudo I believe, it's been a while.
- If Elasticsearch is giving you a CORS error on the front end let me know and I can help you real quick.
- If you have any questions about anything let me know!
