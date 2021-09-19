import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Dialogs from "./Dialogs";
import {
    createRoom,
    getMessages,
    getRooms, joinInRoom, leaveRoom, logOut,
    sendMessage,
    setAuth, setOnlineUsersOnRoom,
    setSelectedRoom,
    setUsers
} from "../../redux/mainReducer";
import {Redirect} from "react-router-dom";
import Preloader from "../common/preloader";
class DialogsContainer extends React.Component {

    LogOut = () => {
        this.props.setAuth(false)
        this.props.logOut()
    }



    render() {
        return (
            <>
                {this.props.isAuth ? this.props.isFetching ? <Preloader/> : <Dialogs {...this.props} LogOut={this.LogOut}/> : <Redirect to={'/'}/> }
            </>


        )
    }


}

const mapStateToProps = (state) => ({
    isAuth: state.main.isAuth,
    userName: state.main.userName,
    userId: state.main.userId,
    rooms: state.main.rooms,
    messages: state.main.messages,
    isFetching: state.main.isFetching,
    selectedRoom: state.main.selectedRoom,
    onlineUsersOnRoom: state.main.onlineUsersOnRoom,
    users: state.main.users

})

export default compose(
    connect(mapStateToProps, {setAuth,createRoom,setUsers,getRooms,getMessages,sendMessage,setSelectedRoom,setOnlineUsersOnRoom,joinInRoom,leaveRoom,logOut})
)(DialogsContainer);