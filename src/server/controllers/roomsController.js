'use strict'

const response = require('../response')
const db = require('../db')

class roomsController {
    async getRooms(req, res) {
        const {userId} = req.query
        const sql = `SELECT * FROM onlinechat.usersonrooms  JOIN onlinechat.rooms
WHERE
usersonrooms.userId = ${userId}  AND
usersonrooms.roomId = rooms.id `
        await db.query(sql, (error, results) => {

            if (error) {
                console.log(error);
                response.status(400, error, res)
            } else {
                response.status(200, results, res)
            }

        })

    }


    async createRoom(req, res) {
        const {roomName = "testroom"} = req.body
        const sql = `INSERT INTO onlinechat.rooms (name) VALUES ('${roomName}');`
        await db.query(sql, (error, results) => {

            if (error) {
                console.log(error);
                response.status(400, error, res)
            } else {
                response.status(200, results, res)
            }

        })

    }

    async addUserOnRoom(req, res) {
        const {userId, roomId} = req.body
        const sql = `INSERT INTO onlinechat.usersonrooms (roomId,userId) VALUES (${roomId},${userId});`
        await db.query(sql, (error, results) => {

            if (error) {
                console.log(error);
                response.status(400, error, res)
            } else {
                response.status(200, results, res)
            }

        })

    }
    async deleteUserOnRoom(req, res) {
        const {userId, roomId} = req.query
        const sql = `DELETE FROM onlinechat.usersonrooms WHERE roomId=${roomId} AND userId=${userId};`
        await db.query(sql, (error, results) => {

            if (error) {
                console.log(error);
                response.status(400, error, res)
            } else {
                response.status(200, results, res)
            }

        })

    }

}

module.exports = new roomsController();