import axios from "axios";
import React from "react";


const instance = axios.create({
//настройки
    baseURL: 'http://localhost:4444/',

});

export const usersAPI = {
    loginUser(userName){
        return instance.post(`users`, {userName})
            .then(response => response.data)
            .catch(error => error.response.status)
    }
}
export const roomsAPI = {
    createRoom(userName){
        return instance.post(`rooms`, {userName})
            .then(response => response.data.values)
            .catch(error => error.response.status)
    },
    getRoom(userName){
        return instance.get(`rooms?userName=${userName}`)
            .then(response => response.data)
            .catch(error => error.response.status)
    },
    sendMessage(roomId,userName){
        return instance.post(`messages`, {roomId,userName})
            .then(response => response.data)
            .catch(error => error.response.status)
    },
    getMessage(roomId,userName){
        return instance.get(`messages?userName=${userName}&roomId=${roomId}`)
            .then(response => response.data)
            .catch(error => error.response.status)
    }
}

