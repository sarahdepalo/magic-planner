"use strict";

const express = require('express');
const router = express.Router();
const diningModel = require('../models/Dining');

router.get('/:parkName', async (req, res) => {
    const { parkName } = req.params
    const dining = await diningModel.getAllDining(parkName);
    res.json(dining).status(200);
});

module.exports = router;