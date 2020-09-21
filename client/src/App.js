import React, {useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import './App.css';
import Teams from './componentes/Teams';
import Matches from './componentes/Matches';
import NotFound from './componentes/NotFound';
import AddTeam from './componentes/AddTeam';
import EditTeam from './componentes/EditTeam';

function App(props) {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Teams}/>
                <Route exact path="/teams" component={Teams}/>
                <Route exact path="/matches/:team_id" component={Matches}/>
                <Route exact path="/add-team" component={AddTeam}/>
                <Route exact path="/edit-team/:id" component={EditTeam}/>
                <Route path="*" component={NotFound}/>
            </Switch>
        </Router>
    );
}

export default App;
