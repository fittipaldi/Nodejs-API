import React, {useEffect, useState} from 'react';
import {ServerApi} from '../utils';
import Header from './nav/Header';

const Teams = (props) => {

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
            ServerApi.getTeams().then(async (resp) => {
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

    const deleteTeam = (id) => {
        ServerApi.detTeam(id).then(async (resp) => {
            if (resp.data.status) {
                history.push('/teams');
            } else {
                await setState({...state, isLoading: false, message: resp.msg});
            }
        }).catch(async (err) => {
            const msg = (typeof err.message != 'undefined') ? err.message : err;
            await setState({...state, isLoading: false, message: msg});
            console.log(err);
        });

    };

    useEffect(() => {
        handleLoadMatches();
    }, []);

    return (
        <div className="App">
            <Header clicked="matches"/>
            <div className="list-team">

                {Object.keys(items).map(i => (
                    <div className="box-team" key={i}>
                        <div className="team-flag-icon">
                            <img src={items[i].flag_icon}></img>
                        </div>
                        <div className="team-name">
                            {items[i].name} - {items[i].country}
                        </div>
                        <div className="team-actions">
                            <a className="link-edit" href={'/edit-team/' + items[i].id}>Edit</a>
                            <a className="link-delete" onClick={() => {
                                deleteTeam(items[i].id)
                            }}>Delete</a>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    )
};

export default Teams;