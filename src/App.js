import './App.css';
import React from 'react'
import JoinPanelContainer from "./components/JoinPanel/JoinPanelContainer";
import {Route} from "react-router-dom";




function App() {



    return (
    <div className="App">
        <Route exact path='/' render={() => <JoinPanelContainer />}/>


    </div>
  );
}

export default App;
