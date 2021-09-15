import React, {useState} from "react";
import s from './Dialogs.module.css'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Icon from "@material-ui/core/Icon";

import {length} from "redux-form-validators";
import {Field, reduxForm} from "redux-form";
import socket from "../../api/socket";


class MessageForm extends React.Component {

    renderTextField = ({input, label, type, meta: {touched, error, warning}}) => (
        <div>
            <div>
                <TextField {...input} placeholder={label} type={type} fullWidth/>
                {/* ошибка для поля*/}
                {touched && ((error && <div>{error}</div>))}
            </div>
        </div>
    );

    render() {
        const {handleSubmit} = this.props;
        return (
            <form onSubmit={handleSubmit}>
                <div>
                    <div className={s.sender}>
                        <Field name={"Message"} label={"Введите сообщение"} component={this.renderTextField}
                               validate={length({max: 500, msg: "Максимум 500 символов"})}/>
                    </div>
                    <div className={s.btnSend}>
                        <Button type="submit">Отправить</Button>
                    </div>


                </div>
            </form>
        )
    }


}

const MessageReduxForm = reduxForm({form: 'message'})(MessageForm)


const Dialogs = (props) => {

    const joinRoom = () => {
        socket.emit('ROOM:JOIN', {
            userName: props.userName,
            roomId: 0
        })
    }

    socket.on('ROOM:JOINED', users => {
        console.log("новый пользователь",users)
    })

    window.socket = socket;

    return (

        <div className={s.gridContainer}>
            <div className={s.head}>
                <AppBar>
                    <Toolbar>
                        <Typography component="h1" variant="h6" color="inherit" noWrap>
                            Real Chat
                        </Typography>
                        <div className={s.logOut}>
                            <Button

                                variant="contained"
                                color="secondary"
                                onClick={props.LogOut}
                            >
                                Logout
                            </Button>
                        </div>

                    </Toolbar>

                </AppBar>

            </div>
            <div className={s.dialogList}>
                <div>
                    {props.rooms ? props.rooms.map(r => {
                        <div></div>
                    }) : null}
                </div>
                <div className={s.createChat}>
                    <Button variant="contained" color="primary" onClick={() => {
                        props.createRoom(props.userName)
                        //joinRoom()
                    }}>
                        Создать чат
                    </Button>
                </div>
            </div>
            <div className={s.messages}>
                <div>
                    messages
                </div>

            </div>
            <div className={s.send}>

                <MessageReduxForm {...props} />
            </div>

        </div>


    )
}
export default Dialogs;
