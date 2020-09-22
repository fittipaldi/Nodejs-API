import React, {useEffect, useState} from 'react';
import Header from './nav/Header';
import MatchForm from './form/MatchForm';

const AddMatch = (props) => {

    return (
        <div className="App">
            <Header clicked="add-match"/>

            <MatchForm/>
        </div>
    )
};

export default AddMatch;