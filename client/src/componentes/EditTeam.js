import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Header from './nav/Header';
import TeamForm from './form/TeamForm';
import {ServerApi} from '../utils';

const EditTeam = (props) => {

    const {id} = useParams();

    return (
        <div className="App">
            <Header clicked="edit-team"/>

            <TeamForm id={id}/>
        </div>
    )
};

export default EditTeam;