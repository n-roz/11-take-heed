// from the module zookeeper project
const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();

const { notes } = require("./db/db.json");

const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// // So the steps you want to make sure that youre doing is first Getting the notes from the db.json using a read() function
// // 1:35
// // then turn those results into a array
// // 1:36
// // then we add our newNote to the array and take what is called updatedNotes and write then back into the db.json
// // 1:37
// // in the post route you can ignore the store part, thats only if you are using them from a separate file that put all of these functions into a class
// // 1:38
// // So I would really focus on restructuring your createNewNote function a little to follow that pattern, but you have the right idea since you are able to access the body with your const newNote!

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    fs.writeFileSync(
    path.join(__dirname, './db/db.json'),
    JSON.stringify(notesArray, null, 2)
);
        return note;
    };

// routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('/api/notes', (req, res) => { 
res.json(note);
});

app.post('/api/notes', (req, res) => {
    const note = createNewNote(req.body, notes);
    res.json(note);
});

// this one needs work
// app.delete('/api/notes/:id', (req, res) => {
//     const deleteNote =
//     res.json(true);
// });



// //         if (notesArray.length === 0)
// //             notesArray.push(0);

// //         body.id = notesArray[0];
// //         notesArray[0]++;

// //         notesArray.push(newNote);
// //         fs.writeFileSync (
// //             path.join(__dirname, './db/db.json'),
// //             JSON.stringify(notesArray, null, 2)
// //         );
// //         return newNote;
// //     }
// // }

// // new createnewnote function
// read() {
//     return readFileAsync('db/db.json', 'utf8');
//   }

//   write(note) {
//     return writeFileAsync('db/db.json', JSON.stringify(note));
//   }

//   getNotes() {
//     return this.read().then((notes) => {
//       let parsedNotes;

//       // If notes isn't an array or can't be turned into one, send back a new empty array
//       try {
//         parsedNotes = [].concat(JSON.parse(notes));
//       } catch (err) {
//         parsedNotes = [];
//       }

//       return parsedNotes;
//     });
//   }

//   addNote(note) {
//     const { title, text } = note;

//     if (!title || !text) {
//       throw new Error("Note 'title' and 'text' cannot be blank");
//     }

//     // Add a unique id to the note using uuid package
//     const newNote = { title, text, id: uuidv1() };

//     // Get all notes, add the new note, write all the updated notes, return the newNote
//     return this.getNotes()
//       .then((notes) => [...notes, newNote])
//       .then((updatedNotes) => this.write(updatedNotes))
//       .then(() => newNote);
//   }
//   // end newnote function

// //   router.post('/notes', (req, res) => {
// //     store
// //       .addNote(req.body)
// //       .then((note) => res.json(note))
// //       .catch((err) => res.status(500).json(err));
// //   });

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});