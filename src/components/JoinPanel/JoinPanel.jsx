import React, {useState} from "react";
import s from './JoinPanel.module.css'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import socket from "../../api/socket";


const JoinPanel = (props) => {

    const [userName, setUserName] = useState('');
    const join = () => {
        if (!userName) {
            return alert('Enter a name')
        }
        props.SignIn(userName);
    }


    React.useEffect(() => {

        socket.on('ROOM:SET_USERS', users => {
            props.setOnlineUsersOnRoom(users)
            console.log("новые пользователи онлайн", users)
        })
        socket.on('ROOM:SEND_MESSAGE', (roomId) => {
            props.getMessages(roomId)
            console.log("новые сообщения")
        })


    }, [])


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
