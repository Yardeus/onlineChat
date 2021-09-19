import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import JoinPanel from "./JoinPanel";
import {getMessages, setAuth, setAuthUser, setMessages, setOnlineUsersOnRoom} from "../../redux/mainReducer";
import DialogsContainer from "../Dialogs/DialogsContainer";
import socket from "../../api/socket";

class JoinPanelContainer extends React.Component {

    SignIn = (userName) => {
        socket.connect()
        this.props.setAuthUser(true,userName)
    }

    render() {
        return (
            <>
                {this.props.isAuth ? <DialogsContainer /> :<JoinPanel {...this.props} SignIn={this.SignIn} usersAPI={this.props.usersAPI}/>}
            </>
        )
    }


}

const mapStateToProps = (state) => ({
    isAuth: state.main.isAuth,
})

export default compose(
    connect(mapStateToProps, {setAuth,setAuthUser,setOnlineUsersOnRoom,setMessages,getMessages})
)(JoinPanelContainer);