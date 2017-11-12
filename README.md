# ZooBackup

# Useful Links
- "https://reactjs.org/"
- "https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html"

# Install Steps For Project Dependencies
1. Install Node if you don't have it installed yet
2. Install the Yarn package manager using: `npm install -g yarn`
3. To install all the dependencies run: `yarn` IMPORTANT: install all dependencies before trying to seed the databases
4. Download MongoDB and Elasticsearch (see below). Note that if you're using Mac OS you can just use
    Homebrew, however I'm not sure how it'll go so let me know :) Note that after install you'll need to seed the databases so peek the setup part of the instructions once you have them installed. Homebrew: "https://brew.sh/"
5. If you have already have setup Mongodb and Elasticsearch, turn them on and run the seed commands -> they'll take care of everything

# Install and Setup MongoDB
1. Go to "https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/" and follow the steps
2. Start MongoDB using `sudo -i service mongodb start` (David has told me that mongod is what you'll need to run)
3. Seed the database by running the command `yarn seed-mongo`. This will add a users collection with an admin and normal user to test 
    permissions. Note that permission level 1 is the highest, 2 is for a normal keeper
4. Stop MongoDB by using `sudo -i service mongodb stop`

# Install and Setup Elasticsearch - If you are using Homebrew on MacOS see below
- Note that before you begin you need to make sure you have at least Java 8 installed, you can check this by `java -version`. If you have 
    `1.8...` then you're good to go
1. Download Elasticsearch debian by running `wget --no-check-certificate            
    https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.2.0.deb`
2. Install Elasticsearch debain by running: `dpkg -i elasticsearch-5.2.0.deb`
3. Start Elasticsearch by running: `sudo -i service elasticsearch start`
4. Seed Elasticsearch cluster node by running: `yarn seed-elastic`
5. Stop Elasticsearch by running: `sudo -i service elasticsearch stop`

# Install and Setup Elasticsearch - MacOS
1. Run the command `brew install elasticsearch`
2. Run Elasticsearch by running: `brew services start elasticsearch`
3. Stop Elasticsearch by running: `brew services stop elasticsearch`

# Quick Elasticsearch Primer
- Elasticsearch uses nodes to store documents, multiple nodes form a cluster. We'll only need one node for this project
- Inside of each node are indices -> each index can hold multiple documents of different types. We just have one type 'animal'
- `localhost:9200` will take you to the running cluster
- `http://localhost:9200/animals/_search?q=*&pretty` will show you all of the documents inside of the animals index
- `http://localhost:9200/animals/animal/_search?q=*&pretty` will only show you the documents of type 'animal' in the animals index
- Each document is tagged with an id field. We use this to keep track of the animals to make edits and deletes really easy.
- When inserting a new animal the id field is automatically assigned in sequencial order -> first animal gets 1 etc
- The REST functionality for the animals index is already implemented inside of `routes.js`, go through it was we'll have to replicate it   for the inventory stuffs
- Reading through the Elasticsearch documentation linked above will explain more


# Compling the React Code
- Project uses React on the front end. Don't worry because I've already done most of the heavy lifting, we just need
    to focus on making all of the components nice and pretty (add.jsx, edit.jsx, home.jsx, and view.jsx). If you browse through the components it should be pretty easy to pick up, can also read my comments or ask me questions.
1. Bundle the React code and transpile the JavaScript to Es5 by running `yarn build` (You'll need to run this after you
    make any changes to the front end code, changes to server code is okay)
2. Like i said before I've already done the heavy lifting with React. The components the user will interact with are inside of the 
    animalFunctions folder. `src/components/animalFunctions`
3. Note -> When it's time to style the nav bar you need to apply the styles inside of the component `header.jsx`
4. I've commented the `add-animal.jsx` component to give a quick primer on React, though I do reccommend to browse the docs. I've only  
    commented this component to save time because all of the core ones we'll be using are essentially the same

# Starting Everything
1. Turn on the databases (the script "startdbs.sh" will take care of this, make sure to run `chmod +x startdbs.sh` first)
2. Build the frontend code: `yarn build`
3. Start the server: `yarn server`
4. Turn off the databases (the script "stopdbs.sh will take care of this)

# What The Project Currently Supports
- Add an animal
- Edit an animal
- Delete an animal
- User permissions on Add and Delete (only an Admin can add or delete an animal)
- User authentication

# What Needs To Be Done
- I left the app unstyled -> Styling the application needs to be done
- Form validation -> Tips: React makes it easy to make sure the user entered something into all the fields (Check the animal state object 
    to make sure something is there before performing the post request). However you'll need to validate that the name the user has provided hasn't been taken! Each animal gets a unique name
- Give the user feedback on the frontend if something fails or succeeds. I already have the server returning a json object to the frontend
    `{success: <true/false>}` depends on pass or fail, you just need to use this. I reccommend create a new variable in the state and use conditional rendering to display a message to the user.
- Extra step to make sure user actually wants to add, edit, delete. This could be an alert or modal popup. Just move the submit button 
    onto the alert or modal render.
- Displaying the animals in a table
- Inventory pages -> Inventory is just a carbon copy of animals so once we finish that it'll be easy to port over

# Notes
- I did all of this on Ubuntu, anyone on Mac OS doesn't need to add sudo I believe, it's been a while.
- If Elasticsearch is giving you a CORS error on the front end let me know and I can help you real quick.
- If you have any questions about anything let me know!
