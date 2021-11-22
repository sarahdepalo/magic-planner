'use strict';
const db = require('./conn');


class Lodging {
    static async getAllLodging(park_id) {
        try {
            const response = await db.any(`
               SELECT * FROM lodging
               WHERE park_id = ${park_id}; 
            `)
            return response;
        } catch(error) {
            console.error("ERROR: ", error)
            return error;
        }
     }
}

module.exports = Lodging;