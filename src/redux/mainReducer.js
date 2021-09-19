import {roomsAPI, usersAPI} from "../api/api";
import socket from "../api/socket";

const SET_AUTH_TYPE = "SET_AUTH_TYPE"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const SET_USER_NAME = "SET_USER_NAME"
const SET_ROOMS = "SET_ROOMS"
const SET_USERS = "SET_USERS"
const SET_ONLINE_USERS_ON_ROOM = "SET_ONLINE_USERS_ON_ROOM"
const SET_MESSAGES = "SET_MESSAGES"
const SET_SELECTED_ROOM = "SET_SELECTED_ROOM"
const SET_USER_ID = "SET_USER_ID"

let initialState = {
    isAuth: false,
    userName: null,
    userId: null,
    isFetching: false,
    selectedRoom: false,
    users: [],
    onlineUsersOnRoom: [],
    rooms: [],
    messages: []


}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_IS_FETCHING:
            return {
                ...state,
                isFetching: action.isFetching
            }
        case SET_AUTH_TYPE:
            return {
                ...state,
                isAuth: action.data
            };
        case SET_USER_NAME:
            return {
                ...state,
                userName: action.data
            };
        case SET_USER_ID:
            return {
                ...state,

                userId: action.data.userId
            };
        case SET_ROOMS:
            return {
                ...state,
                rooms: action.data
            };
        case SET_USERS:
            return {
                ...state,
                users: action.data
            };
        case SET_MESSAGES:
            return {
                ...state,
                messages: action.data
            };
        case SET_SELECTED_ROOM:
            return {
                ...state,
                selectedRoom: action.data
            };
        case SET_ONLINE_USERS_ON_ROOM:
            return {
                ...state,
                onlineUsersOnRoom: action.data
            };

        default:
            return state;
    }
}

export const setAuth = (data) => {
    return {
        type: SET_AUTH_TYPE,
        data
    }
}
export const _setUserName = (data) => {
    return {
        type: SET_USER_NAME,
        data
    }
}
export const _setUserId = (data) => {
    return {
        type: SET_USER_ID,
        data
    }
}
export const _setRooms = (data) => {
    return {
        type: SET_ROOMS,
        data
    }
}
export const _setUsers = (data) => {
    return {
        type: SET_USERS,
        data
    }
}
export const _setMessages = (data) => {
    return {
        type: SET_MESSAGES,
        data
    }
}


export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}
export const setSelectedRoom = (data) => {
    return {
        type: SET_SELECTED_ROOM,
        data
    }
}
export const _setOnlineUsersOnRoom = (data) => {
    return {
        type: SET_ONLINE_USERS_ON_ROOM,
        data
    }
}

export const setAuthUser = (type, userName) => (dispatch) => {
    dispatch(toggleIsFetching(true));

    usersAPI.loginUser(userName)
        .then((data) => {
            dispatch(setAuth(type));
            dispatch(_setUserId(data))
            dispatch(_setUserName(userName));
            roomsAPI.getRooms(data.userId)
                .then((data) => {
                    switch (data) {
                        case 404:
                            console.log("not rooms")
                            dispatch(_setRooms(null));
                            break

                        default:
                            dispatch(_setRooms(data));
                            break
                    }
                    dispatch(toggleIsFetching(false));

                })


        })
}
export const createRoom = (userId,roomName) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    roomsAPI.createRoom(userId,roomName)
        .then((data) => {
            dispatch(_setRooms(data));
            dispatch(toggleIsFetching(false));
        })
}
export const joinInRoom = (userId,roomId) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    roomsAPI.joinInRoom(userId,roomId)
        .then((data) => {
            switch (data) {
                case 400:
                    console.log("room not find")
                    dispatch(toggleIsFetching(false));
                    break

                default:
                    dispatch(_setRooms(data));
                    dispatch(setSelectedRoom(roomId))
                    dispatch(toggleIsFetching(false));
                    break
            }

        })
}
export const leaveRoom = (userId,roomId) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    roomsAPI.leaveRoom(userId,roomId)
        .then((data) => {
            dispatch(_setRooms(data));
            dispatch(setSelectedRoom(null))
            dispatch(setMessages(null))
            dispatch(toggleIsFetching(false));
        })
}
export const setUsers = (users) => (dispatch) => {

    dispatch(_setUsers(users));

}
export const setMessages = (data) => (dispatch) => {

    dispatch(_setMessages(data));

}
export const logOut = () => (dispatch) => {

    socket.close()
    dispatch(_setMessages([]));
    dispatch(_setRooms([]))
    dispatch(_setOnlineUsersOnRoom([]))
    dispatch(setSelectedRoom(false))


}
export const setOnlineUsersOnRoom = (data) => (dispatch) => {
    dispatch(_setOnlineUsersOnRoom(data));

}
export const getRooms = (userId) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    roomsAPI.getRooms(userId)
        .then((data) => {
            dispatch(_setRooms(data));

            dispatch(toggleIsFetching(false));
        })

}
export const getMessages = (roomId) => (dispatch) => {
    roomsAPI.getMessages(roomId)
        .then((data) => {
            switch (data) {
                case 404:
                    console.log("сообщений нет")
                    dispatch(_setMessages(null));
                    break

                default:
                    dispatch(_setMessages(data));
                    break
            }

        })

}
export const sendMessage = (data) => (dispatch) => {
    const roomId = data.roomId
    console.log(data.roomId)
    roomsAPI.sendMessage(data)
        .then((data) => {
            dispatch(_setMessages(data));
            socket.emit('ROOM:SEND_MESSAGE',roomId)
        })

}


export default mainReducer;