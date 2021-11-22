'use strict';
const db = require('./conn');


class Activities {
    static async getAllActivities(park_id) {
        try {
            const response = await db.any(`
               SELECT * FROM activities
               WHERE park_id = ${park_id}; 
            `)
            return response;
        } catch(error) {
            console.error("ERROR: ", error)
            return error;
        }
     }
}

module.exports = Activities;