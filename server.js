// dependencies
// =============================================================
const express = require("express");
const path = require("path");
const fs = require("fs");
let dbJson = require("./db/db.json");
// const { report } = require("process");
// const { fstat } = require("fs");
const id = require("uniqid")



// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3350;
app.use(express.static("public"))

// set up the Express ap to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());




// Routes
// =============================================================

//   still need get * to return to index.html file

app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
});


// this should read the db.json file
app.get("/api/notes", function (req, res) {
  console.log(dbJson)
  res.json(dbJson);

});



app.post("/api/notes", function (req, res) {

  //create a unique id for each note, checkout uuid or random id npm package
  const newNote = req.body
  newNote.id = id("")
  console.log(newNote)
  // const randomId = id()
  // id: randomId,
  // title: req.body.title,
  // text:req.body.text


  // fs.readFile("./db/db.json", (err, data) => {

    // const addNotes = JSON.parse(data);

    dbJson.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(dbJson), err => {
      if (err) throw err;
      res.json(dbJson);

    // })
  })
  console.log("New note: " + newNote);

});


app.delete("/api/notes/:id", function (req, res) {
  var id = req.params.id
  console.log(id)

  var results = dbJson.filter(note => note.id !== id)
  console.log(results)
  dbJson = results 

  fs.writeFile("./db/db.json", JSON.stringify(dbJson), err => {
    if (err) throw err;
 
    res.sendStatus(200);

  })
});
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});



// // dependencies
// // =============================================================
// const express = require("express");
// const path = require("path");
// const fs = require("fs");
// const dbJson = require("./db/db.json");
// const { report } = require("process");
// const { fstat } = require("fs");
// const id = require("uniqid")



// // Sets up the Express App
// // =============================================================
// var app = express();
// var PORT = 3350;
// app.use(express.static("public"))

// // set up the Express ap to handle data parsing
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // Notes Data


// // Routes
// // =============================================================


// app.get("/notes", function (req, res) {
//   res.sendFile(path.join(__dirname, "public/notes.html"));
// });


// // this should read the db.json file
// app.get("/api/notes", function (req, res) {
//   console.log(dbJson)
//   res.json(dbJson);
// });



// app.post("/api/notes", function (req, res) {

//   //create a unique id for each note, checkout uuid or random id npm package
//   // const randomId = id()
//   const newNote = req.body
//     newNote.id = id("")
//   console.log(newNote)
//     // id: randomId,
//     // title: req.body.title,
//     // text:req.body.text


// fs.readFile("./db/db.json", (err,data) => {

//   const addNotes = JSON.parse(data);

//   addNotes.push(newNote);

//   fs.writeFile("./db/db.json",JSON.stringify(addNotes), err => {
//     if (err) throw err;
//     res.json(dbJson);

//   })
// })
//   console.log("New note: " + newNote);

// });

// app.delete("/api/notes/:id", function (req, res) { 
//   var chosen = req.params.id
//   console.log(chosen)

// });

// app.get("*", function (req, res) {
//   res.sendFile(path.join(__dirname, "public/index.html"));
// });


// app.listen(PORT, function () {
//   console.log("App listening on PORT " + PORT);
// });
