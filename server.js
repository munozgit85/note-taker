const fs = require('fs');
const path = require('path');
const express = require('express');
const { notes } = require('./db/db');


const PORT = process.env.PORT || 3001;
const app = express();
const noteRoutes = require('./routes/noteRoutes');
const htmlRoutes = require('./routes/htmlRoutes');


app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', noteRoutes);
app.use('/', htmlRoutes);


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });