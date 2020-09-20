import React, {useEffect, useState} from 'react';
import Form, {getFormData, FieldType} from 'react-metaforms';
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

    const teamForm = [
        {
            'name': 'id',
            'type': 'hidden',
            'value': id,
        },
        {
            'name': 'name',
            'label': 'Team Name',
            'type': 'text',
            'value': name,
        },
        {
            'name': 'country',
            'label': 'Team Country',
            'type': 'select',
            'options': [
                {'value': '', 'label': 'Choose one Country'},
            ],
            'value': country,
        },
        {
            'name': 'flag_icon',
            'label': 'Flag Icon (CDN Link)',
            'type': 'text',
            'value': flag_icon,
        },
        {
            "type": "submit"
        }
    ];

    const [fields, setFields] = useState(teamForm);

    const fromStarter = async () => {
        await ServerApi.getCountry().then(rep => {
            if (rep.data.status) {
                for (let con of rep.data.data) {
                    teamForm[2].options.push({
                        'value': con.country_name,
                        'label': con.country_name
                    });
                }
            }
        }).catch(err => console.log(err));
    };

    const submitForm = (id, name, country, flag_icon) => {
        const param = {
            id,
            name,
            country,
            flag_icon
        };

        console.log(param);
    };

    useEffect(() => {

        console.log('\x1b[41m');
        console.log(id);
        console.log('\x1b[0m');
        fromStarter();
    }, [id]);


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
