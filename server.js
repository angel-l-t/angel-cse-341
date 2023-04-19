// Importing express module
const express = require('express');

// Creating app instance from express
const app = express();

// Setting port variable
app.set("port", process.env.PORT || 3000);

// Bringing getData function to root
app.get("/", getData);

// function to send data to browser
function getData(req, res) {
  // log to console to know if it works
  console.log('getting data');

  // Writing data to response, and calling end point
  res.write('Alan Daniel');
  res.end();
}

// App lisneting to browser
app.listen(app.get("port"), () => console.log(`Server is listening on port ${app.get("port")}`));