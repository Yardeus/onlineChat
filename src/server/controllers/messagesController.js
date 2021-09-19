'use strict'


const response = require('../response')
const db = require('../db')

class messagesController {

    async getMessages(req, res) {
        const {roomId} = req.query
        const sql = `SELECT * FROM onlinechat.rooms JOIN onlinechat.usersonrooms JOIN onlinechat.messages JOIN onlinechat.users
    WHERE
    usersonrooms.roomId = messages.roomId AND
    rooms.id = ${roomId} AND
    users.id = usersonrooms.userId AND
    usersonrooms.roomId = rooms.id AND
    users.id = messages.userId
    ORDER BY messages.datetime;`
        await db.query(sql, (error, results) => {

            if (error) {
                console.log(error);
                response.status(400, error, res)
            } else {
                response.status(200, results, res)
            }

        })

    }

    async sendMessage(req, res) {
        const {message,userId,roomId} = req.body
        const sql = `INSERT INTO onlinechat.messages (text, userId, datetime, roomId) VALUES ('${message}', ${userId}, NOW(), ${roomId});`
        await db.query(sql, (error, results) => {

            if (error) {
                console.log(error);
                response.status(400, error, res)
            } else {
                const sql = `SELECT * FROM onlinechat.rooms JOIN onlinechat.usersonrooms JOIN onlinechat.messages JOIN onlinechat.users
    WHERE
    usersonrooms.roomId = messages.roomId AND
    rooms.id = ${roomId} AND
    users.id = usersonrooms.userId AND
    usersonrooms.roomId = rooms.id AND
    users.id = messages.userId
    ORDER BY messages.datetime;`
                 db.query(sql, (error, results) => {

                    if (error) {
                        console.log(error);
                        response.status(400, error, res)
                    } else {
                        response.status(200, results, res)
                    }

                })
            }

        })

    }
}

module.exports = new messagesController();