import React, {useEffect, useState} from 'react';
import {ServerApi} from '../utils';
import Header from './nav/Header';
import {useParams} from "react-router-dom";

const Matches = (props) => {

    const [state, setState] = useState({
        items: [],
        isLoading: false,
        message: ''
    });

    const {team_id} = useParams();
    const {items, isLoading, message} = state;

    const handleLoadMatches = async (team_id) => {
        try {
            await setState({...state, isLoading: true, items: []});
            ServerApi.getMatches(team_id).then(async (resp) => {
                if (resp.data.status) {
                    await setState({...state, isLoading: false, message: '', items: resp.data.data});
                } else {
                    await setState({...state, isLoading: false, message: resp.msg, items: []});
                }
            }).catch(async (err) => {
                const msg = (typeof err.message != 'undefined') ? err.message : err;
                await setState({...state, isLoading: false, message: msg, items: []});
                console.log(err);
            });
        } catch (err) {
            const msg = (typeof err.message != 'undefined') ? err.message : err;
            await setState({...state, isLoading: false, message: msg, items: []});
        }
    };

    useEffect(() => {
        handleLoadMatches(team_id);
    }, []);

    return (
        <div className="App">
            <Header clicked="matches"/>
            {(items.length > 0) ?
                <div className="list-match">
                    {Object.keys(items).map(i => (
                        <div className="box-match" key={i}>
                            <div className="team-left">
                                <h3>{items[i].team_a_data.name}</h3>
                                <img className="team-flag" src={items[i].team_a_data.flag_icon}></img>
                            </div>
                            <div className="mid-match">
                                <span>10/09/2020 21:00</span>
                                <span>X</span>
                            </div>
                            <div className="team-right">
                                <h3>{items[i].team_z_data.name}</h3>
                                <img className="team-flag" src={items[i].team_z_data.flag_icon}></img>
                            </div>
                        </div>
                    ))
                    }
                </div>
                :
                <h2>No Match</h2>
            }
        </div>
    )
};

export default Matches;