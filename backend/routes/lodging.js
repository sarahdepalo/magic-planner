"use strict";

const express = require('express');
const router = express.Router();
const lodgingModel = require('../models/Lodging');

router.get('/:park_id', async (req, res) => {
    const { park_id } = req.params
    const lodging = await lodgingModel.getAllLodging(park_id);
    res.json(lodging).status(200);
});

module.exports = router;