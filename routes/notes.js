
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
//const express = require('express');
//const app = express();
//const { handleNoteDelete, getAndRenderNotes} = require("../public/assets/js/index");
//const {db} = require("../db/db.json");




    //API Routes 
//route to notes.html
    router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

    //route to read the `db.json` file and return all saved notes as JSON.
    router.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
    });





    // Setup the /api/notes post route
    router.post("api/notes", function(req, res) {
        let newNote = req.body;
        let noteList = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));
        let notelength = (noteList.length).toString();

    //new note with a specific id and send to JSON 
    newNote.id = notelength;
    //push the new note to  db.json
    noteList.push(newNote);

    //write the updated data to db.json
    fs.writeFileSync("../db/db.json", JSON.stringify(noteList));
    res.json(noteList);
    });

    // Deletes a note with specific id
    router.delete("api/notes/:id", function(req, res) {
        let noteList = JSON.parse(fs.readFileSync("../db/db.json", "utf8"));
        let noteId = (req.params.id).toString();
    
        //filter notes not with  matching id and saved them as a new array
        //the matching array will be deleted
        noteList = noteList.filter(selected =>{
            return selected.id != noteId;
        })
    
        //write the updated data to db.json 
        fs.writeFileSync("../db/db.json", JSON.stringify(noteList));
        res.json(noteList);
    });

    //Routes to display the note and index html page with the note created.

    router.get('/notes', function(req,res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });

  //route to  `db.json` file and return all saved notes as JSON.
    router.get("/api/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../db/db.json"));
    });
    
    
    // Display index.html when all other routes are accessed
    router.get('*', function(req,res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

      
    



module.exports = router;
