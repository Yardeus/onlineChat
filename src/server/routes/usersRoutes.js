'use strict'

module.exports = (server) => {
    const usersController = require('../controllers/usersController')

    server.route('/users').post(usersController.login)
    server.route('/users').get(usersController.getUsersOnRoom)

}