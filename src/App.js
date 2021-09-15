import './App.css';
import React from 'react'
import JoinPanelContainer from "./components/JoinPanel/JoinPanelContainer";
import {Route} from "react-router-dom";
import DialogsContainer from "./components/Dialogs/DialogsContainer";




function App() {

    return (
    <div className="App">
        <Route exact path='/' render={() => <JoinPanelContainer />}/>
        <Route path='/dialogs' render={() => <DialogsContainer />}/>

    </div>
  );
}

export default App;
