import React, {useEffect, useState} from 'react';
import {ServerApi} from '../../utils';

const MatchForm = (props) => {

    const [state, setState] = useState({
        id: 0,
        match_date: '',
        match_time: '',
        team_a_id: 0,
        team_z_id: 0,
        score_a: 0,
        score_z: 0,

        team_country: '',
        country_options: [],
        team_country_options: [],
    });

    const {id, match_date, match_time, team_a_id, team_z_id, score_a, score_z, team_country, country_options, team_country_options} = state;

    const fromStarter = async () => {
        await setState({...state, country_options: []});
        await ServerApi.getCountry().then(async resp => {
            if (resp.data.status) {
                let opts = [];
                for (let con of resp.data.data) {
                    opts.push({
                        value: con.country_name,
                        label: con.country_name
                    });
                }
                await setState({...state, country_options: opts});
            } else {
                alert(resp.data.msg);
            }
        }).catch(err => alert(err));
    };

    const submitForm = () => {
        const param = {
            id,
            match_date,
            match_time,
            team_a_id,
            team_z_id,
            score_a,
            score_z,
        };

        if (!match_date) {
            alert('Missing Date');
            return;
        }

        if (!match_time) {
            alert('Missing Time');
            return;
        }

        if (!team_a_id) {
            alert('Missing Team A');
            return;
        }

        if (!team_z_id) {
            alert('Missing Team Z');
            return;
        }

        if (team_a_id == team_z_id) {
            alert('Missing Team Z');
            return;
        }

        ServerApi.setMatch(param).then(resp => {
            if (resp.data.status) {
                window.location.href = '/';
            } else {
                alert(resp.data.msg);
            }
        }).catch(err => alert(err));
    };

    const handlerInputChange = (event) => {
        switch (event.target.name) {
            case 'match_date':
                setState({...state, match_date: event.target.value});
                break;
            case 'match_time':
                setState({...state, match_time: event.target.value});
                break;
            case 'team_a_id':
                setState({...state, team_a_id: event.target.value});
                break;
            case 'team_z_id':
                setState({...state, team_z_id: event.target.value});
                break;
            case 'score_a':
                setState({...state, score_a: event.target.value});
                break;
            case 'score_z':
                setState({...state, score_z: event.target.value});
                break;
            case 'country':
                setState({...state, team_country: event.target.value});
                getTeamCountry(event.target.value);
                break;
        }
    };

    const getTeamCountry = async (country) => {
        await setState({...state, team_country: country});
        ServerApi.getTeamCountry(country).then(async resp => {
            if (resp.data.status) {
                let opts = [];
                for (let tm of resp.data.data) {
                    opts.push({
                        value: tm.id,
                        label: tm.name
                    });
                }
                setState({...state, team_country_options: opts});
            } else {
                alert(resp.data.msg);
            }
        }).catch(err => alert(err));
    };

    const getMatch = async (match_id) => {
        ServerApi.getMatch(match_id).then(async resp => {
            if (resp.data.status) {
                await setState({
                    ...state,
                    id: resp.data.data.id,
                    score_a: resp.data.data.score_a,
                    score_z: resp.data.data.score_z,
                    team_a_id: resp.data.data.team_a,
                    team_z_id: resp.data.data.team_z,
                    match_date: resp.data.data.date_match_sql,
                    match_time: resp.data.data.time_match,
                });
            } else {
                alert(resp.data.msg);
            }
        }).catch(err => alert(err));
    };

    useEffect(() => {
        if (typeof props.id != 'undefined' && props.id) {
            getMatch(props.id);
        } else {
            fromStarter();
        }
    }, []);

    return (
        <form id="form" method="post">
            <input type="hidden" name="id" value={id}/>
            <div>
                <label htmlFor="match_date">Match Date</label>
                <input id="match_date" type="date" name="match_date" placeholder="DD/MM/YYYY" value={match_date}
                       onChange={handlerInputChange}/>
            </div>
            <div>
                <label htmlFor="match_time">Match Time</label>
                <input id="match_time" type="time" name="match_time" placeholder="HH:MM" value={match_time}
                       onChange={handlerInputChange}/>
            </div>
            <div>
                <label htmlFor="team_a_id">Team A Score</label>
                <input id="score_a" type="integer" name="score_a" value={score_a} onChange={handlerInputChange}/>
            </div>
            <div>
                <label htmlFor="team_z_id">Team Z Score</label>
                <input id="score_z" type="integer" name="score_z" value={score_z} onChange={handlerInputChange}/>
            </div>
            {(!props.id) &&
            <div>
                <label htmlFor="country">Teams Country</label>
                <select id="country" name="country" onChange={handlerInputChange}>
                    <option value="">Choose one Country</option>
                    {Object.keys(country_options).map(i => (
                        <>
                            {(country_options[i].value == team_country) ?
                                <option key={i}
                                        value={country_options[i].value} selected>{country_options[i].label}</option>
                                :
                                <option key={i}
                                        value={country_options[i].value}>{country_options[i].label}</option>

                            }
                        </>
                    ))}
                </select>
            </div>
            }
            {(!props.id) &&
            <div>
                <label htmlFor="team_a_id">Team A</label>
                <select id="team_a_id" name="team_a_id" onChange={handlerInputChange}>
                    <option value="">Choose one Team</option>
                    {Object.keys(team_country_options).map(i => (
                        <option key={'ta-' + i}
                                value={team_country_options[i].value}>{team_country_options[i].label}</option>

                    ))}
                </select>
            </div>
            }
            {(!props.id) &&
            <div>
                <label htmlFor="team_z_id">Team Z</label>
                <select id="team_z_id" name="team_z_id" onChange={handlerInputChange}>
                    <option value="">Choose one Team</option>
                    {Object.keys(team_country_options).map(i => (
                        <option key={'tz-' + i}
                                value={team_country_options[i].value}>{team_country_options[i].label}</option>

                    ))}
                </select>
            </div>
            }
            <button type="button" onClick={submitForm}>Submit</button>
        </form>


    );
};

export default MatchForm;
