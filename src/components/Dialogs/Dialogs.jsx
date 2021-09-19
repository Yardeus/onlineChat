import React from "react";
import s from './Dialogs.module.css'
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import moment from "moment";
import {length} from "redux-form-validators";
import {Field, reduxForm} from "redux-form";
import socket from "../../api/socket";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Icon from "@material-ui/core/Icon";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AddBoxOutlinedIcon from '@material-ui/icons/AddBoxOutlined';

import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from "@material-ui/core/Tooltip";


class MessageForm extends React.Component {

    renderTextField = ({input, label, type, meta: {touched, error, warning}}) => (
        <div>
            <div>
                <TextField id="filled-textarea" className={s.chatForm} {...input} label={label} rows={2}  type={type} multiline variant="outlined" fullWidth/>
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
                        <Field name={"message"} label={"Enter a message"}  component={this.renderTextField}
                               validate={length({max: 500, msg: "Максимум 500 символов"})}/>
                    </div>
                    <div className={s.btnSend} align="right">
                        <Button type="submit" variant="contained" color="primary"
                                endIcon={<Icon>send</Icon>}>Send</Button>
                    </div>


                </div>
            </form>
        )
    }


}

const MessageReduxForm = reduxForm({form: 'message'})(MessageForm)

const HeadMessages = (props) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClickAnchor = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseAnchor = () => {
        setAnchorEl(null);
    };
    const handleLeaveRoom = () => {
        debugger
        props.leaveRoom(props.userId, props.selectedRoom)
        setAnchorEl(null);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(props.selectedRoom)
            .then(() => {

                // good
            })
            .catch(err => {
                console.log('Something wrong', err);
            });
        setAnchorEl(null);
    };
    return (
        <div className={s.headMessages}>
            <div className={s.title}>

                {props.rooms ? props.rooms.map(r => r.roomId === props.selectedRoom ? <b>{r.name}</b> : null) : null}

            </div>

            <div className={s.menu}>
                <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={handleClickAnchor}
                >
                    <MoreVertIcon/>
                </IconButton>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleCloseAnchor}
                >
                    <MenuItem onClick={copyToClipboard}>Copy link</MenuItem>
                    <MenuItem onClick={handleLeaveRoom}>Leave room</MenuItem>
                </Menu>
            </div>
        </div>
    )
}


const Dialogs = (props) => {

    const [open, setOpen] = React.useState(false);
    const [roomName, setRoomName] = React.useState(null);
    const [code, setCode] = React.useState(null);
    const [openInsertCode, setOpenInsertCode] = React.useState(false);

    const handleClickOpenInsertCode = () => {
        setOpenInsertCode(true);
    };

    const handleCloseInsertCode = () => {
        setOpenInsertCode(false);
    };
    const handleJoinInRoom = () => {
        setOpenInsertCode(false);
        props.joinInRoom(props.userId, code)
    };

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleCreate = () => {
        setOpen(false);
        console.log(roomName)
        props.createRoom(props.userId, roomName)
    };
    const joinRoom = (roomId) => {
        socket.emit('ROOM:JOIN', {
            userName: props.userName,
            roomId
        })
        props.getMessages(roomId)
    }
    const leaveRoom = (roomId) => {
        socket.emit('ROOM:LEAVE', {
            userName: props.userName,
            roomId
        })
    }
    const messagesRef = React.useRef(null);

    React.useEffect(() => {

        messagesRef.current.scrollTo(0, 99999);
    }, [props.messages]);


    const onSubmit = (formData) => {
        if (formData.message) {
            let data = {
                message: formData.message,
                userId: props.userId,
                roomId: props.selectedRoom
            }
            props.sendMessage(data)
        }
    }

    return (
        <div className={s.gridContainer}>
            <div className={s.head}>
                <div className={s.logOut}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={props.LogOut}
                    >
                        Logout
                    </Button>
                </div>
            </div>
            <div className={s.dialogList}>
                <b>Select room</b>
                <div className={s.rooms}>
                    {props.rooms ? <div>{props.rooms.map(r => <div
                        className={props.selectedRoom === r.roomId ? s.selectedRoom : s.room} onClick={() => {
                        leaveRoom(props.selectedRoom)
                        props.setSelectedRoom(r.roomId)
                        props.getMessages(r.roomId)
                        joinRoom(r.roomId)

                    }}>{r.name}</div>)}</div> : <div className={s.warning}>Create or join a room by code</div>}
                </div>
                <div className={s.roomsBtns}>
                    <div className={s.createChat}>
                        <Button variant="contained" color="primary" onClick={handleClickOpen}>
                            Create room
                        </Button>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Create room</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Enter the desired name for the room.
                                </DialogContentText>
                                <TextField
                                    onChange={(e) => {
                                        setRoomName(e.target.value)
                                    }}
                                    autoFocus
                                    margin="dense"
                                    id="roomName"
                                    label="Room Name"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleCreate}>Create</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                    <div className={s.inviteToRoom}>
                        <Tooltip title="Join by code" placement="right">
                            <IconButton color="primary" onClick={handleClickOpenInsertCode}>
                                <AddBoxOutlinedIcon size="large"/>
                            </IconButton>
                        </Tooltip>
                        <Dialog open={openInsertCode} onClose={handleCloseInsertCode}
                                aria-labelledby="form-dialog-title">
                            <DialogTitle id="form-dialog-title">Join room</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    Enter the code of the room you want to join.
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    label="Room Code"
                                    type="text"
                                    fullWidth
                                    onChange={(e => setCode(e.target.value))}
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleCloseInsertCode} color="primary">
                                    Cancel
                                </Button>
                                <Button onClick={handleJoinInRoom} color="primary">
                                    Enter
                                </Button>
                            </DialogActions>
                        </Dialog>

                    </div>

                </div>

            </div>
            <div className={s.chatMessages}>
                <HeadMessages {...props}/>
                <div className={s.messages} ref={messagesRef}>
                    {props.messages ? props.messages.map(m => <div
                        className={props.userId === m.userId ? s.myMessage : s.message}>
                        <p>{m.text}</p>
                        <div>
                            <span>{m.name}</span>
                            <span>{moment(m.datetime, 'hh:mm:ss a').add(1, 'h').format('LT')}</span>
                        </div>
                    </div>) : <div className={s.noMessages}>
                        <p>Enter a message to start the dialog</p>
                    </div>}
                </div>


                <div className={s.send}>

                    <MessageReduxForm {...props} onSubmit={onSubmit}/>
                </div>
            </div>
            <div className={s.chatUsers}>
                <b>Users online ({props.onlineUsersOnRoom.length}):</b>
                <ul>
                    {props.onlineUsersOnRoom.map((name) => <li>{name}</li>)}

                </ul>
            </div>

        </div>


    )
}
export default Dialogs;
