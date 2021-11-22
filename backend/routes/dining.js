"use strict";

const express = require('express');
const router = express.Router();
const diningModel = require('../models/Dining');

router.get('/:park_id', async (req, res) => {
    const { park_id } = req.params
    const dining = await diningModel.getAllDining(park_id);
    res.json(dining).status(200);
});

module.exports = router;