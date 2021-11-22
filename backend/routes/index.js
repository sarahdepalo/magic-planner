'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Magic Planner API')
});

module.exports = router;