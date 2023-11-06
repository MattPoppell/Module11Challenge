const router = require('express').Router();
const noteRoutes = require('./noteRoutes.js');

router.use('/api', noteRoutes);

module.exports = router;