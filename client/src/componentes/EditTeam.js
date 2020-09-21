import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Header from './nav/Header';
import TeamForm from './team/TeamForm';
import {ServerApi} from '../utils';

const EditTeam = (props) => {

    const {id} = useParams();
    const [state, setState] = useState({
        id: 0,
        name: '',
        country: '',
        flag_icon: '',
        isLoading: false,
        message: ''
    });

    const {history} = props;
    const {matches, isLoading, message} = state;

    const getTeamData =  () => {
         ServerApi.getTeam(id).then(async resp => {
            if (resp.data.status) {
                await setState({
                    ...state,
                    id: resp.data.data.id,
                    name: resp.data.data.name,
                    country: resp.data.data.country,
                    flag_icon: resp.data.data.flag_icon,
                });
            } else {
                console.log(resp.data.msg);
            }
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        getTeamData(id);
    }, []);

    return (
        <div className="App">
            <Header clicked="matches"/>

            <TeamForm id={state.id} name={state.name} country={state.country} flag_icon={state.flag_icon}/>
        </div>
    )
};

export default EditTeam;