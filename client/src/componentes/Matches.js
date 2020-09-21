import React, {useEffect, useState} from 'react';
import {ServerApi} from '../utils';
import Header from './nav/Header';

const Matches = (props) => {

    const [state, setState] = useState({
        items: [],
        isLoading: false,
        message: ''
    });

    const {history} = props;
    const {items, isLoading, message} = state;

    const handleLoadMatches = async () => {
        try {
            await setState({...state, isLoading: true, items: []});
            ServerApi.getMatches().then(async (resp) => {
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
        handleLoadMatches();
    }, []);

    return (
        <div className="App">
            <Header clicked="matches"/>

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
                ))}
            </div>
        </div>
    )
};

export default Matches;