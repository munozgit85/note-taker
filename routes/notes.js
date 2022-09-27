
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
//const express = require('express');
//const app = express();
//const { handleNoteDelete, getAndRenderNotes} = require("../public/assets/js/index");
//const {db} = require("../db/db.json");



//API routes to the notes.html 
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

//route to read the `db.json` file and return all saved notes as JSON.
router.get("api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./db/db.json"));
});

//route to index.html
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Retrieves a note with specific id
router.get("/notes/:id", function(req,res) {
    // display json for the notes array indices of the provided id
    res.json(notes[req.params.id]);
});

router.get("api/notes", function(req, res) {
    // Read the db.json file and return all saved notes as JSON.
    res.json(notes);
});

// post a new note to db.json, then write to the hml 
router.post("/api/notes", (req, res) => {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let notelength = (noteList.length).toString();

    //new note with unique id based on length 
    newNote.id = notelength;
    //push new note to  db.json
    noteList.push(newNote);

    //write the note to  db.json
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
})

//delete note based on  id.
router.delete("/api/notes/:id", (req, res) => {
    let noteList = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteId = (req.params.id).toString();

    //filter all notes that does not have matching id and saved them as a new array
    //the matching array will be deleted
    noteList = noteList.filter(selected =>{
        return selected.id != noteId;
    })

    //write new note to  db.json and display
    fs.writeFileSync("./db/db.json", JSON.stringify(noteList));
    res.json(noteList);
});




module.exports = router;
