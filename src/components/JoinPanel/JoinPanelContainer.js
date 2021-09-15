import React from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import JoinPanel from "./JoinPanel";
import {setAuth, setAuthUser} from "../../redux/mainReducer";
import {usersAPI} from "../../api/api";
import {Redirect} from "react-router-dom";
import DialogsContainer from "../Dialogs/DialogsContainer";

class JoinPanelContainer extends React.Component {

    SignIn = (userName) => {
        this.props.setAuthUser(true,userName)


    }

    render() {
        return (
            <>
                {this.props.isAuth ? <DialogsContainer/> : <JoinPanel {...this.props} SignIn={this.SignIn} usersAPI={this.props.usersAPI}/>}


            </>
        )
    }


}

const mapStateToProps = (state) => ({
    isAuth: state.main.isAuth,

})

export default compose(
    connect(mapStateToProps, {setAuth,setAuthUser})
)(JoinPanelContainer);