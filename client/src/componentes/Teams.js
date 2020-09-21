import React, {useEffect, useState} from 'react';
import {ServerApi} from '../utils';
import Header from './nav/Header';

const Teams = (props) => {

    const [state, setState] = useState({
        items: [],
        isLoading: false,
        message: ''
    });

    const {items, isLoading, message} = state;

    const handleLoadMatches = async () => {
        try {
            await setState({...state, isLoading: true, items: []});
            ServerApi.getTeams().then(async (resp) => {
                if (resp.data.status) {
                    await setState({...state, isLoading: false, message: '', items: resp.data.data});
                } else {
                    await setState({...state, isLoading: false, message: resp.msg, items: []});
                    alert(resp.msg);
                }
            }).catch(async (err) => {
                const msg = (typeof err.message != 'undefined') ? err.message : err;
                await setState({...state, isLoading: false, message: msg, items: []});
                alert(msg);
            });
        } catch (err) {
            const msg = (typeof err.message != 'undefined') ? err.message : err;
            await setState({...state, isLoading: false, message: msg, items: []});
            alert(msg);
        }
    };

    const deleteTeam = (id) => {
        if (window.confirm('Are you sure?')) {
            ServerApi.detTeam(id).then(async (resp) => {
                if (resp.data.status) {
                    window.location.reload();
                } else {
                    alert(resp.msg);
                }
            }).catch(async (err) => {
                const msg = (typeof err.message != 'undefined') ? err.message : err;
                await setState({...state, isLoading: false, message: msg});
                alert(msg);
            });
        }
    };

    useEffect(() => {
        handleLoadMatches();
    }, []);

    return (
        <div className="App">
            <Header clicked="list-team"/>
            <div className="list-team">

                {Object.keys(items).map(i => (
                    <div className="box-team" key={i}>
                        <div className="team-flag-icon">
                            <img src={items[i].flag_icon}></img>
                        </div>
                        <div className="team-name">
                            <a href={'/matches/' + items[i].id}>{items[i].name} - {items[i].country}</a>
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