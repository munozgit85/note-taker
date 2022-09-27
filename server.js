const fs = require('fs');
const path = require('path');
const express = require('express');



const PORT = process.env.PORT || 3001;
const app = express();
const notesRoutes = require('./routes/notes');




app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));
app.use('/api', notesRoutes);




app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });