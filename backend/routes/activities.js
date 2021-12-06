"use strict";

const express = require('express');
const router = express.Router();
const activitiesModel = require('../models/Activities');

router.get('/:parkName', async (req, res) => {
    const { parkName } = req.params
    const activities = await activitiesModel.getAllActivities(parkName);
    res.json(activities).status(200);
});

module.exports = router;