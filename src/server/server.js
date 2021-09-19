const PORT = 4444;
const bodyParser = require('body-parser');
const server = require("express")();
const http = require('http').createServer(server);
const options = {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        headers: "Content-Type"
    }
}
const io = require('socket.io')(http, options);
server.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();

})
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json())
const usersRoutes = require('./routes/usersRoutes')
const roomsRoutes = require('./routes/roomsRoutes')
usersRoutes(server)
roomsRoutes(server)
const messagesRoutes = require('./routes/messagesRoutes')
messagesRoutes(server)
const rooms = new Map()


io.on('connection', (socket) => {

    socket.on('ROOM:JOIN', ({roomId, userName}) => {
        if (!rooms.has(roomId)) {
            rooms.set(
                roomId,
                new Map([
                    ['users', new Map()],
                    ['messages', []],
                ]),
            );
        }
        if (!rooms.get(roomId).get('users').has(socket.id)) {
            socket.join(roomId);
        }
        rooms.get(roomId).get('users').set(socket.id, userName)
        const users = [...rooms.get(roomId).get('users').values()]
        io.in(roomId).emit('ROOM:SET_USERS', users)

    })

    socket.on('ROOM:LEAVE', ({roomId}) => {
        socket.leave(roomId);
        rooms.forEach((value, roomId) => {
            if (value.get('users').delete(socket.id)) {
                const users = [...value.get('users').values()];
                io.in(roomId).emit('ROOM:SET_USERS', users);
            }
        });

    })

    socket.on('ROOM:SEND_MESSAGE', (roomId) => {
        io.in(roomId).emit('ROOM:SEND_MESSAGE',roomId);
    });

    socket.on('disconnect', () => {
        rooms.forEach((value, roomId) => {
            if (value.get('users').delete(socket.id)) {
                const users = [...value.get('users').values()];
                io.in(roomId).emit('ROOM:SET_USERS', users);
            }
        });

    })

    console.log('user connected ', socket.id)
})


http.listen(PORT, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log(`server started on ${PORT} port`)
});
