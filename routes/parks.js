"use strict";

const express = require('express');
const router = express.Router();
const ParksModel = require('../models/Parks');

router.get('/', async (req, res) => {
    const parks = await ParksModel.getAllParks();
    res.json(parks).status(200);
});

module.exports = router;