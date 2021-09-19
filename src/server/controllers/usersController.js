'use strict'

const response = require('../response')
const db = require('../db')

class usersController {

    async getUsersOnRoom(req, res) {
        const {roomId} = req.query
        const sql = `SELECT * FROM usersonrooms 
                    WHERE
                    usersonrooms.roomId = ${roomId} `
        await db.query(sql, (error, results) => {

            if (error) {
                console.log(error);
                response.status(400, error, res)
            } else {
                response.status(200, results, res)
            }

        })

    }

    async login(req, res) {
        const {userName} = req.body
        const sql = `SELECT * FROM users WHERE name = '${userName}';`
        await db.query(sql, (error, rows, fields) => {
            if (error || rows.length < 1) {
                console.log(error);
                const sql = `INSERT INTO users (name) VALUES ('${userName}');`
                db.query(sql, (error, results) => {
                    if (error) {
                        console.log(error);
                        response.status(400, error, res)
                    } else {

                        response.status(200, {
                            userId: results.values.insertId
                        }, res)


                    }
                })
            } else {
                rows.map(rw => {
                    response.status(200, {
                        userId: rw.id
                    }, res)

                })
            }


        })

    }
}

module.exports = new usersController();