var express = require("express");
var path = require("path");
var dbJson = ("db/db.json")


// Sets up the Express App
// =============================================================
// app.use(express.urlencoded({ extended: true }));app.use(express.json());app.use(express.static('public'));
var app = express();
var PORT = 3350;

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });
  
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });

//   still need get * to return to index.html file


// this should read the db.json file
app.get("/api/notes", function(req, res) {
    return res.json(characters);
  });

//  this should recieve a new note and save on the request body, 
// add it to the dbjson file
// and then return the new note to the client

app.post("/api/characters", function(req, res) {});

app.delete("", function (req,res) {});