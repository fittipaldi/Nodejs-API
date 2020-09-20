import React, {useEffect, useState} from 'react';
import {ServerApi} from '../utils';
import Header from './nav/Header';

const Match = (props) => {

    const [state, setState] = useState({
        matches: [],
        isLoading: false,
        message: ''
    });

    const {history} = props;
    const {matches, isLoading, message} = state;

    const handleLoadMatches = async () => {
        try {
            await setState({...state, isLoading: true, matches: []});
            ServerApi.getMatches().then(async (resp) => {
                if (resp.data.status) {
                    await setState({...state, isLoading: false, message: '', matches: resp.data.data});
                } else {
                    await setState({...state, isLoading: false, message: resp.msg, matches: []});
                }
            }).catch(async (err) => {
                const msg = (typeof err.message != 'undefined') ? err.message : err;
                await setState({...state, isLoading: false, message: msg, matches: []});
                console.log(err);
            });
        } catch (err) {
            const msg = (typeof err.message != 'undefined') ? err.message : err;
            await setState({...state, isLoading: false, message: msg, matches: []});
        }
    };

    useEffect(() => {
        handleLoadMatches();
    }, []);

    return (
        <div className="App">
            <Header clicked="matches"/>

            <div className="list-match">
                {Object.keys(matches).map(i => (
                    <div className="box-match">
                        <div className="team-left">
                            <h3>{matches[i].team_a_data.name}</h3>
                            <img className="team-flag" src={matches[i].team_a_data.flag_icon}></img>
                        </div>
                        <div className="mid-match">
                            <span>10/09/2020 21:00</span>
                            <span>X</span>
                        </div>
                        <div className="team-right">
                            <h3>{matches[i].team_z_data.name}</h3>
                            <img className="team-flag" src={matches[i].team_z_data.flag_icon}></img>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Match;



