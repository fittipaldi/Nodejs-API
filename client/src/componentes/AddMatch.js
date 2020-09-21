import React, {useEffect, useState} from 'react';
import Header from './nav/Header';
import MatchForm from './form/MatchForm';

const AddMatch = (props) => {

    const [state, setState] = useState({
        matches: [],
        isLoading: false,
        message: ''
    });

    const {history} = props;
    const {matches, isLoading, message} = state;

    return (
        <div className="App">
            <Header clicked="add-match"/>

            <MatchForm/>
        </div>
    )
};

export default AddMatch;