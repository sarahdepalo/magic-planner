"use strict";

const express = require('express');
const router = express.Router();
const activitiesModel = require('../models/Activities');

router.get('/:parkName', async (req, res) => {
    const { parkName } = req.params
    const activities = await activitiesModel.getAllActivities(parkName);
    res.json(activities).status(200);
});

router.post('/add', async (req, res) => {
    const { userId, array } = req.body;
    const activities = await activitiesModel.addActivities(userId, array);
    res.json(activities).status(200);
})

module.exports = router;