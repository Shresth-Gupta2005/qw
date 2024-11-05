const mongoose = require("mongoose");
require('dotenv').config();
//define the mongoDb connection
// const mongoUrl = process.env.MONGODB_URL_LOCAL
const mongoUrl = process.env.MONGODB_URL //replace "hotels" with your database name

//set up mongoose connection
mongoose.connect(mongoUrl);

//db is the bridge between the node.js and the database
const db = mongoose.connection;

//event listeners
db.on("connected", () => {
  console.log("Connected to MongoDB");
});
db.on("error", () => {
  console.log("Error in connecting to MongoDB");
});
db.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

// link to start and stop mongodb server - https://www.geeksforgeeks.org/how-to-start-and-stop-mongodb-server/
// On Windows, MongoDB is typically installed as a Windows service. You can manage it through the Services interface.


// Step 1: Starting the server
// Open the Run dialog (press Windows key + R).

// Type services.msc and press Enter. The Services window will open.

// Locate the service named "MongoDB" or similar (check your documentation if unsure).

// Right-click on the service and select "Start".
// Stopping the server:

// Follow steps 1 and 2 mentioned above.

// Right-click on the "MongoDB" service and select "Stop".



//export database connection for importion
module.exports = db;
