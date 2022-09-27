const path = require('path');
const express = require('express');
const notesRoutes = require('./routes/notes');
const app = express();






const PORT = process.env.PORT || 3001;




app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use('/', notesRoutes);




app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });