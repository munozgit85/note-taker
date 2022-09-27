
const router = require('express').Router();
//const fs = require('fs');
const path = require('path');
//const express = require('express');
//const app = express();
//const { handleNoteDelete,renderActiveNote, getAndRenderNotes} = require("../public/assets/js/index");
//const {db} = require("../db/db.json");


//fs.readFile("db/db.json", (err, data) => {

  // if (err) throw err;

   //let notes = JSON.parse(data);


    //API Routes 
    router.get("api/notes", function(req, res) {
        // Read the db.json file and return all saved notes as JSON.
        let notes = renderActiveNote(req.body, notes);
        res.json(notes);
    });

    // Setup the /api/notes post route
    router.post("api/notes", function(req, res) {
        // Receives a new note, adds it to db.json, then returns the new note
        let newNote =  getAndRenderNotes(req.body, newNote);
        res.json(newNote);
        notes.push(newNote);
       // dbjsonADD();
        return console.log("Added new note: "+newNote.title);
    });

    // Retrieves a note with specific id
    router.get("api/notes/:id", function(req,res) {
        // display json for the notes array indices of the provided id
        res.json(notes[req.params.id]);
    });

    // Deletes a note with specific id
    router.delete("api/notes/:id", function(req, res) {
        notes.splice(req.params.id, 1);
        const delNote = handleNoteDelete(req.params.id, delNote);
        res.json(delNote);
        //dbjsonADD();
        console.log("Deleted note with id "+req.params.id);
    });

    router.get('/notes', function(req,res) {
        res.sendFile(path.join(__dirname, "../public/notes.html"));
    });
    
    // Display index.html when all other routes are accessed
    router.get('*', function(req,res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

      
    
    //updates the json file whenever a note is added or deleted
    //function dbjsonADD() {
     //   fs.writeFile("db/db.json",JSON.stringify(notes,'\t'),err => {
         //   if (err) throw err;
         //   return true;
      //  });
 //   };


module.exports = router;
