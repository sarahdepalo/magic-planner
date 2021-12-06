"use strict";

const express = require('express');
const router = express.Router();
const ParksModel = require('../models/Parks');
const PlanModel = require('../models/Plan');

router.get('/', async (req, res) => {
    const parks = await ParksModel.getAllParks();
    res.json(parks).status(200);
});

router.post('/add', async (req, res) => {
    const { userId, parkId } = req.body;
    console.log(userId, parkId);
    const newPlan = await PlanModel.addPark(userId, parkId);
    res.json(newPlan).status(200);
})

module.exports = router;