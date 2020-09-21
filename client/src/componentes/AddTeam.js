import React, {useEffect, useState} from 'react';
import Header from './nav/Header';
import TeamForm from "./team/TeamForm";

const AddTeam = (props) => {

    const [state, setState] = useState({
        matches: [],
        isLoading: false,
        message: ''
    });

    const {history} = props;
    const {matches, isLoading, message} = state;

    return (
        <div className="App">
            <Header clicked="matches"/>

            <TeamForm/>
        </div>
    )
};

export default AddTeam;