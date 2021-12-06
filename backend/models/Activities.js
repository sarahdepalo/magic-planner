'use strict';
const db = require('./conn');


class Activities {
    static async getAllActivities(parkName) {
        try {
            const response = await db.any(`
               SELECT activities.id, activity_name, activity_type, activity_height, activity_hours, activity_image, activity_description FROM activities
               inner JOIN parks as parks ON parks.id = activities.park_id
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