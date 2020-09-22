import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Header from './nav/Header';
import MatchForm from './form/MatchForm';

const EditMatch = (props) => {

    const {id} = useParams();

    return (
        <div className="App">
            <Header clicked="edit-team"/>

            <MatchForm id={id}/>
        </div>
    )
};

export default EditMatch;