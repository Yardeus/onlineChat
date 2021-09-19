'use strict'

module.exports = (server) => {
    const messagesController = require('../controllers/messagesController')
    server.route('/messages').get(messagesController.getMessages)
    server.route('/messages').post(messagesController.sendMessage)
}