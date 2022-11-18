const PORT = process.env.PORT || 3001;
const express = require('express');
const app = express();

// const notes = require('./db/db');


app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });