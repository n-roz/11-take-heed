// from the module zookeeper project
const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const generateUniqueId = require('generate-unique-id');
// const allNotes = require("./db/db.json"); 
const notes = require("./db/db.json");

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

// function createNewNote(body, notesArray) {
//   const newNote = body;
//   if (!Array.isArray(notesArray)) {
//     notesArray = [];

//     if (notesArray.length === 0)
//       notesArray.push(0);

//     body.id = notesArray[0];
//     notesArray[0]++;

//     notesArray.push(newNote);
//     fs.writeFileSync(
//       path.join(__dirname, './db/db.json'),
//       JSON.stringify(notesArray, null, 2)
//     );
//     return newNote;
//   }
// };
app.get('/api/notes', (req, res) => {
  let savedNotes = fs.readFileSync('./db/db.json', 'utf8')
  res.json(JSON.parse(savedNotes))
})

app.post('/api/notes', (req, res) => {
  const newNote = {
      ...req.body,
      id: generateUniqueId(),
  }
  let savedNotes = fs.readFileSync('./db/db.json', 'utf8')
  let notesData = JSON.parse(savedNotes)
  notesData.push(newNote)
  fs.writeFile('./db/db.json', JSON.stringify(notesData), (err, text) => {
      if (err) {
          console.log(err)
          return
      }
  })
  res.json(savedNotes)
})

// routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET /notes should return the notes.html file
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, './public/notes.html'));
});

// GET * should return the index.html file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// GET /api/notes should read the db.json file and return all saved notes as JSON
// app.get('/api/notes', (req, res) => {
//   // res.json(allNotes.slice(1));
//   res.sendFile(path.join(__dirname, '/db/db.json'));
//   // res.json(notes);
// });

// POST /api/notes should receive a new note to save on the request body, add it to the db.json file, and then return the new note to the client. 
// You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
// app.post('/api/notes', (req, res) => {
//   req.body.id = generateUniqueId();
//   const newNote = createNewNote(req.body, notes); //allnotes
//   res.json(newNote);
// });

// DELETE /api/notes/:id should receive a query parameter containing the id of a note to delete. 
// In order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, 
// and then rewrite the notes to the db.json file.
// function deleteNote(id, notesArray) {
//   for (let i = 0; i < notesArray.length; i++) {
//     let note = notesArray[i];

//     if (note.id == id) {
//       notesArray.splice(i, 1);
//       fs.writeFileSync(
//         path.join(__dirname, './db/db.json'),
//         JSON.stringify(notesArray, null, 2)
//       );

//       break;
//     }
//   }
// };

// app.delete('/api/notes/:id', (req, res) => {
//   deleteNote(req.params.id, notes); //allnotes
//   res.json(true);
// });

app.delete('api/notes/:id', (req, res) => {
  const targetNote = req.params.id 
  deleteNote(targetNote, notes);
  res.redirect('');
});

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});