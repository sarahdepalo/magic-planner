'use strict';
const db = require('./conn');


class Dining {
    static async getAllDining(parkName) {
        try {
            const response = await db.any(`
            SELECT dining.id, dining_name, dining_type, dining_price, dining_image FROM dining 
            INNER JOIN parks ON parks.id = dining.park_id 
            WHERE park_name = '${parkName}';
            `)
            return response;
        } catch(error) {
            console.error("ERROR: ", error)
            return error;
        }
     }
}

module.exports = Dining;