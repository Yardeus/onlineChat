'use strict'

module.exports = (server) => {
    const roomsController = require('../controllers/roomsController')
    server.route('/rooms').get(roomsController.getRooms)
    server.route('/rooms').post(roomsController.createRoom)
    server.route('/rooms').delete(roomsController.deleteUserOnRoom)
    server.route('/rooms/user').post(roomsController.addUserOnRoom)


}