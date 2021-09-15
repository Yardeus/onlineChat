import {roomsAPI, usersAPI} from "../api/api";
import {Redirect} from "react-router-dom";
import React from "react";

const SET_AUTH_TYPE = "SET_AUTH_TYPE"
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING"
const SET_USER_NAME = "SET_USER_NAME"
const SET_ROOMS = "SET_ROOMS"

let initialState = {
    isAuth: false,
    userName: null,
    rooms: []



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
        case SET_ROOMS:
            return {
                ...state,
                rooms: action.data
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
export const _setRooms = (data) => {
    return {
        type: SET_ROOMS,
        data
    }
}


export const toggleIsFetching = (isFetching) => {
    return {
        type: TOGGLE_IS_FETCHING,
        isFetching
    }
}

export const setAuthUser = (type,userName) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    dispatch(setAuth(type));
    usersAPI.loginUser(userName)
        .then(() => {
            dispatch(_setUserName(userName));
            dispatch(toggleIsFetching(false));

        })
}
export const createRoom = (userName) => (dispatch) => {
    dispatch(toggleIsFetching(true));
    roomsAPI.createRoom(userName)
        .then((data) => {
            dispatch(_setRooms(data));
            dispatch(toggleIsFetching(false));
        })
}


export default mainReducer;