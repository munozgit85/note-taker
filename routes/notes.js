
const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const jsonNotes = require('../db/db.json');




// route to get all notes and display 
router.get('/api/notes', (req, res) => {
    res.json(jsonNotes);
});


//function to create note and send to json 
function createNewNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];
    
    if (notesArray.length === 0)
        notesArray.push(0);

    body.id = notesArray[0];
    notesArray[0]++;

    notesArray.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify(notesArray, null, 2)
    );
    return newNote;
}
//function to post notes to notes file
router.post('/api/notes', (req, res) => {
    const newNote = createNewNote(req.body, jsonNotes);
    res.json(newNote);
});

//function to delete note
function deleteNote(id, notesArray) {
    for (let i = 0; i < notesArray.length; i++) {
        let note = notesArray[i];

        if (note.id == id) {
            notesArray.splice(i, 1);
            fs.writeFileSync(
                path.join(__dirname, '../db/db.json'),
                JSON.stringify(notesArray, null, 2)
            );

            break;
        }
    }
}

router.delete('/api/notes/:id', (req, res) => {

    deleteNote(req.params.id, jsonNotes);
   res.json(true);
});

//route notes to notes html 
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});


//route to index.html
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});



module.exports = router;