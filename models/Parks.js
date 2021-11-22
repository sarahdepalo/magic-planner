'use strict';
const db = require('./conn');


class Parks {
    static async getAllParks() {
        try {
            const response = await db.any(`
               SELECT * FROM parks; 
            `)
            return response;
        } catch(error) {
            console.error("ERROR: ", error)
            return error;
        }
     }
}

module.exports = Parks