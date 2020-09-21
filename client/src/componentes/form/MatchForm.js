import React, {useEffect, useState} from 'react';
import Form, {getFormData, required, setFieldValue} from 'react-metaforms';
import {ServerApi} from '../../utils';

const MatchForm = (props) => {

    const [state, setState] = useState({
        team_country: ''
    });

    const {team_country} = state;

    let id = 0;

    if (typeof props.id != 'undefined') {
        id = parseInt(props.id);
    }

    const matchForm = [
        {
            name: 'id',
            type: 'hidden',
            value: id,
        },
        {
            name: 'match_date',
            label: 'Match Date',
            type: 'text',
            placeholder: 'DD/MM/YYYY',
            value: '',
            validation: [
                required('Fill the Match Date'),
            ]
        },
        {
            name: 'match_time',
            label: 'Match Time',
            type: 'text',
            placeholder: 'HH:MM',
            value: '',
            validation: [
                required('Fill the Match Time'),
            ]
        },
        {
            name: 'country',
            label: 'Teams Country',
            type: 'select',
            options: [
                {value: '', label: 'Choose one Country'},
            ],
            value: '',
            validation: [
                required('Choose a Team Country'),
            ]
        },
        {
            name: 'team_a',
            label: 'Team A',
            type: 'select',
            options: [
                {value: '', label: 'Choose one Team'},
            ],
            value: '',
            validation: [
                required('Choose a Team Team'),
            ]
        },
        {
            name: 'team_z',
            label: 'Team Z',
            type: 'select',
            options: [
                {value: '', label: 'Choose one Team'},
            ],
            value: '',
            validation: [
                required('Choose a Team Team'),
            ]
        },
        {
            type: 'submit',
        }
    ];

    const [fields, setFields] = useState(matchForm);

    const fromStarter = () => {
        ServerApi.getCountry().then(resp => {
            if (resp.data.status) {
                for (let con of resp.data.data) {
                    matchForm[3].options.push({
                        'value': con.country_name,
                        'label': con.country_name
                    });
                }
            } else {
                alert(resp.data.msg);
            }
        }).catch(err => alert(err));
    };

    const submitForm = (id, name, country, flag_icon) => {
        // const param = {
        //     id,
        //     name,
        //     country,
        //     flag: flag_icon
        // };

        // ServerApi.setTeam(param).then(resp => {
        //     if (resp.data.status) {
        //         window.location.href = '/';
        //     } else {
        //         console.log(resp.data.msg);
        //     }
        // }).catch(err => console.log(err));
    };

    const getTeamCountry = async (country) => {
        if (country != team_country) {
            await setState({...state, team_country: country});
            ServerApi.getTeamCountry(country).then(resp => {
                if (resp.data.status) {
                    for (let con of resp.data.data) {
                        let opt = {
                            value: con.country_name,
                            label: con.country_name
                        };
                        matchForm[4].options.push(opt);
                        matchForm[5].options.push(opt);
                    }
                } else {
                    alert(resp.data.msg);
                }
            }).catch(err => alert(err));
        }
    };

    useEffect(() => {
        fromStarter();
    }, []);

    return (
        <Form
            id="form"
            fields={fields}
            onFieldsChange={(dataForm) => {
                if (dataForm[3].value) {
                    getTeamCountry(dataForm[3].value);
                }
                setFields(dataForm);
            }}
            onSubmit={(values) => {
                const {id, name, country, flag_icon} = getFormData(values);
                submitForm(id, name, country, flag_icon);
            }}
        />
    );
};

export default MatchForm;
