'use strict';
const db = require('./conn');


class Dining {
    static async getAllDining(park_id) {
        try {
            const response = await db.any(`
               SELECT * FROM dining
               WHERE park_id = ${park_id}; 
            `)
            return response;
        } catch(error) {
            console.error("ERROR: ", error)
            return error;
        }
     }
}

module.exports = Dining;