"use strict";

const express = require('express');
const router = express.Router();
const activitiesModel = require('../models/Activities');

router.get('/:park_id', async (req, res) => {
    const { park_id } = req.params
    const activities = await activitiesModel.getAllActivities(park_id);
    res.json(activities).status(200);
});

module.exports = router;