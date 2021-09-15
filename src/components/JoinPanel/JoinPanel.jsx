import React, {useState} from "react";
import socket from "../../api/socket";

import s from './JoinPanel.module.css'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
import {Redirect} from "react-router-dom";

const instance = axios.create({
//настройки
    baseURL: 'http://localhost:4444/',

});

const JoinPanel = (props) => {


    const [roomId, setRoomId] = useState('');
    const [userName, setUserName] = useState('');


    const join = () => {
        if (!userName) {
            return alert('Enter a name')
        }


        props.SignIn(userName);
        //socket()
    }
    //if (props.isAuth) return <Redirect to={'/dialogs'}/>

    return (
        <div className={s.main}>
            <div className={s.panel}>
                <h1>Enter your name</h1>
                <div className={s.input}>
                    <TextField
                        id="filled-input"
                        label="Name"
                        autoComplete="current-password"
                        variant="filled"
                        value={userName}
                        onChange={(e) => {
                            setUserName(e.target.value)
                        }}
                    />
                </div>
                <div className={s.btn}>
                    <Button variant="contained" color="primary" onClick={() => {
                        join()
                    }}>
                        Connect
                    </Button>

                </div>
            </div>

        </div>
    )
}
export default JoinPanel;
