'use strict';
const db = require('./conn');


class Activities {
    static async getAllActivities(parkName) {
        try {
            const response = await db.any(`
               SELECT * FROM activities
               INNER JOIN parks ON activities.park_id = parks.id
               WHERE park_name = '${parkName}'; 
            `)
            return response;
        } catch(error) {
            console.error("ERROR: ", error)
            return error;
        }
     }
}

module.exports = Activities;