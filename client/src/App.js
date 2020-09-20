import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Match from './componentes/Match';
import NotFound from './componentes/NotFound';
import AddTeam from './componentes/AddTeam';

function App(props) {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Match}/>
                <Route exact path="/add-team" component={AddTeam}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        </Router>
    );
}

export default App;
