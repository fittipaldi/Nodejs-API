import React, {useEffect, useState} from 'react';
import Form, {getFormData, required, setFieldValue} from 'react-metaforms';
import {ServerApi} from '../../utils';

const TeamForm = (props) => {

    let id = 0;
    let name = '';
    let country = '';
    let flag_icon = '';

    if (typeof props.id != 'undefined') {
        id = parseInt(props.id);
    }
    if (typeof props.name != 'undefined') {
        name = props.name;
    }
    if (typeof props.country != 'undefined') {
        country = props.country;
    }
    if (typeof props.flag_icon != 'undefined') {
        flag_icon = props.flag_icon;
    }

    const {history} = props;

    const teamForm = [
        {
            name: 'id',
            type: 'hidden',
            value: id,
        },
        {
            name: 'name',
            label: 'Team Name',
            type: 'text',
            value: name,
            validation: [
                required('Fill the Team Name'),
            ]
        },
        {
            name: 'country',
            label: 'Team Country',
            type: 'select',
            options: [
                {value: '', label: 'Choose one Country'},
            ],
            value: country,
            validation: [
                required('Choose a Team Country'),
            ]
        },
        {
            name: 'flag_icon',
            label: 'Flag Icon (CDN Link)',
            type: 'text',
            value: flag_icon,
            validation: [
                required('Fill the Team Flag Icon'),
            ]
        },
        {
            type: 'submit',
        }
    ];

    const [fields, setFields] = useState(teamForm);

    const fromStarter = () => {
        ServerApi.getCountry().then(resp => {
            if (resp.data.status) {
                for (let con of resp.data.data) {
                    teamForm[2].options.push({
                        'value': con.country_name,
                        'label': con.country_name
                    });
                }
            } else {
                console.log(resp.data.msg);
            }
        }).catch(err => console.log(err));
    };

    const submitForm = (id, name, country, flag_icon) => {
        const param = {
            id,
            name,
            country,
            flag: flag_icon
        };

        ServerApi.setTeam(param).then(resp => {
            if (resp.data.status) {
                history.push('/teams');
            } else {
                console.log(resp.data.msg);
            }
        }).catch(err => console.log(err));
    };

    useEffect(() => {
        fromStarter();
    }, []);

    return (
        <Form
            id="team-form"
            fields={fields}
            onFieldsChange={setFields}
            onSubmit={(values) => {
                const {id, name, country, flag_icon} = getFormData(values);
                submitForm(id, name, country, flag_icon);
            }}
        />
    );
};

export default TeamForm;
