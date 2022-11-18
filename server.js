const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

const allNotes = require('./db/db.json');
// parse incoming string or array data
app.use(express.urlencoded({extended: true}));
// parse incoming JSON data
app.use(express.json());

function createNewNote(body, notesArray) {
    const newNote = body;
    if (!Array.isArray(notesArray))
        notesArray = [];

        if (notesArray.length === 0)
            notesArray.push(0);

        body.id = notesArray[0];
        notesArray[0]++;

        notesArray.push(newNote);
        fs.writeFileSync (
            path.join(__dirname, './db/db.json'),
            JSON.stringify(notesArray)
        );
        return newNote;
    }






app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });