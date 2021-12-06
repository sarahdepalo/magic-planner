"use strict";

const db = require("./conn");

class Plan {
    static async addPark(userId, parkId) {
        try {
            const response = await db.any(`
               INSERT INTO plan
               (user_id, park_id)
               VALUES
               ('${userId}', ${parkId})
               returning id;
            `)
            return response;
        } catch(error) {
            console.error("ERROR: ", error)
            return error;
        }
     }
}

module.exports = Plan