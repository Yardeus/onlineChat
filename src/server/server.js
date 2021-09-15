const response = require('./response')

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

/*const usersRoutes = require('./routes/usersRoutes')
const roomsRoutes = require('./routes/roomsRoutes')
usersRoutes(server)
roomsRoutes(server)*/

const rooms = new Map()
let countRooms = 0;

server.post('/rooms', (req, res) => {
    const {roomId, userName} = req.body;

    while (rooms.has(countRooms)) {
        countRooms++;
    }

    rooms.set(
        countRooms,
        new Map([
            ['roomId', countRooms],
            ['users', new Map()],
            ['messages', []],
        ])
    )


    console.log([rooms.values()])
    //res.json([rooms.keys()])
    response.status(202, [rooms.values()], res)

})

server.post('/users', (req, res) => {
    const {roomId, userName} = req.body;

    /* if (!rooms.has(roomId)) {
         rooms.set(
             roomId,
             new Map([
                 ['users', new Map()],
                 ['messages', []],
             ])
         )
     }*/
    response.status(201, userName, res)

})


io.on('connection', (socket) => {
    socket.on('ROOM:JOIN',({roomId, userName})=>{
        socket.join(roomId)
        rooms.get(roomId).get('users').set(socket.id, userName)
        const users = [...rooms.get(roomId).get('users').values()]
        socket.broadcast.to(roomId).emit('ROOM:JOINED', users)

        console.log(users)
    })

    console.log('user connected ', socket.id)
})

http.listen(PORT, (err) => {
    if (err) {
        throw Error(err);
    }
    console.log(`server started on ${PORT} port`)
});
