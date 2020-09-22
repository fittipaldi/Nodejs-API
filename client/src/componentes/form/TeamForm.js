import React, {useEffect, useState} from 'react';
import {ServerApi} from '../../utils';

const TeamForm = (props) => {

    const [state, setState] = useState({
        id: 0,
        name: '',
        country: '',
        flag_icon: '',

        country_options: [],
    });

    const {id, name, country, flag_icon, country_options} = state;

    const handlerInputChange = (event) => {
        switch (event.target.name) {
            case 'name':
                setState({...state, name: event.target.value});
                break;
            case 'country':
                setState({...state, country: event.target.value});
                break;
            case 'flag_icon':
                setState({...state, flag_icon: event.target.value});
                break;
        }
    };

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

                if (typeof props.id != 'undefined' && props.id) {
                    await getTeamData(props.id, opts);
                } else {
                    await setState({...state, country_options: opts});
                }
            } else {
                alert(resp.data.msg);
            }
        }).catch(err => alert(err));
    };

    const submitForm = () => {
        const param = {
            id,
            name,
            country,
            flag: flag_icon
        };

        if (!name) {
            alert('Missing Team name');
            return;
        }

        if (!country) {
            alert('Missing Team country');
            return;
        }

        if (!flag_icon) {
            alert('Missing Team flag');
            return;
        }

        ServerApi.setTeam(param).then(resp => {
            if (resp.data.status) {
                window.location.href = '/';
            } else {
                alert(resp.data.msg);
            }
        }).catch(err => alert(err));
    };

    const getTeamData = async (team_id, opts) => {
        await ServerApi.getTeam(team_id).then(async resp => {
            if (resp.data.status) {
                await setState({
                    ...state,
                    id: resp.data.data.id,
                    name: resp.data.data.name,
                    country: resp.data.data.country,
                    flag_icon: resp.data.data.flag_icon,
                    country_options: opts,
                });
            } else {
                alert(resp.data.msg);
            }
        }).catch(err => alert(err));
    };

    useEffect(() => {
        fromStarter();
    }, []);

    return (
        <form id="form" method="post">
            <input type="hidden" name="id" value={id}/>
            <div>
                <label htmlFor="name">Team Name</label>
                <input id="name" type="text" name="name" value={name} onChange={handlerInputChange}/>
            </div>
            <div>
                <label htmlFor="country">Team Country</label>
                <select id="country" name="country" onChange={handlerInputChange}>
                    <option value="">Choose one Country</option>
                    {Object.keys(country_options).map(i => (
                        <>
                            {(country_options[i].value == country) ?
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
            <div>
                <label htmlFor="flag_icon">Flag Icon (CDN Link)</label>
                <input id="flag_icon" type="text" name="flag_icon" value={flag_icon} onChange={handlerInputChange}/>
            </div>
            <button type="button" onClick={submitForm}>Submit</button>
        </form>
    );

};

export default TeamForm;