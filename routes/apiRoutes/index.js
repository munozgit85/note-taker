const router = require('express').Router();
const indexRoutes = require('../apiRoutes/indexRoutes');

router.use(indexRoutes);

module.exports = router;

router.use(require('./notesRoutes'));