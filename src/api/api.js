import axios from "axios";


const instance = axios.create({
//настройки
    baseURL: 'http://localhost:4444/',

});

export const usersAPI = {
    loginUser(userName) {
        return instance.post(`users`, {userName})
            .then(response => response.data.values)
            .catch(error => error.response.status)
    }
}
export const roomsAPI = {
    createRoom(userId,roomName) {
        return instance.post(`rooms`, {roomName})
            .then((response) => {
                let roomId = response.data.values.insertId
                return instance.post(`rooms/user`, {roomId, userId})
                    .then(response => {
                        return instance.get(`rooms?userId=${userId}`)
                            .then(response => response.data.values)
                            .catch(error => error.response.status)
                    })
                    .catch(error => error.response.status)
            })
            .catch(error => error.response.status)
    },
    getRooms(userId) {
        return instance.get(`rooms?userId=${userId}`)
            .then(response => response.data.values)
            .catch(error => error.response.status)
    },
    joinInRoom(userId,roomId) {
        return instance.post(`rooms/user`, {roomId, userId})
            .then(response => {
                return instance.get(`rooms?userId=${userId}`)
                    .then(response => response.data.values)
                    .catch(error => error.response.status)
            })
            .catch(error => error.response.status)
    },
    leaveRoom(userId,roomId) {
        return instance.delete(`rooms?roomId=${roomId}&userId=${userId}`)
            .then(response => {
                debugger
                return instance.get(`rooms?userId=${userId}`)
                    .then(response => response.data.values)
                    .catch(error => error.response.status)
            })
    },
    sendMessage({roomId,userId,message}) {
        return instance.post(`messages`, {roomId,userId,message})
            .then(()=>{
                return instance.get(`/messages?roomId=${roomId}`)
                    .then(response => response.data.values)
                    .catch(error => error.response.status)
            })
            .catch(error => error.response.status)
    },
    getMessages(roomId, userName) {
        return instance.get(`/messages?roomId=${roomId}`)
            .then(response => response.data.values)
            .catch(error => error.response.status)
    }
}

