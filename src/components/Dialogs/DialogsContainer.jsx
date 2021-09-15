import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import Dialogs from "./Dialogs";
import {createRoom, setAuth, signIn} from "../../redux/mainReducer";
import {usersAPI} from "../../api/api";
import {Redirect} from "react-router-dom";

class DialogsContainer extends React.Component {

    LogOut = (userName) => {
        this.props.setAuth(false)
        //this.props.usersAPI.loginUser(userName)
        return <Redirect to={'/'}/>
    }


    render() {
        return (
               <Dialogs {...this.props} LogOut={this.LogOut} createRoom={this.props.createRoom}/>
        )
    }


}

const mapStateToProps = (state) => ({
    isAuth: state.main.isAuth,
    userName: state.main.userName,
    rooms: state.main.rooms

})

export default compose(
    connect(mapStateToProps, {setAuth,createRoom})
)(DialogsContainer);