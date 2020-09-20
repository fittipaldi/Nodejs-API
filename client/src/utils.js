import React from 'react'
import axios from 'axios';

const API_HOST = process.env.REACT_APP_API_HOST;
const API_TOKEN = process.env.REACT_APP_API_TOKEN;

export class ServerApi extends React.Component {

    static getServerHost() {
        return API_HOST;
    }

    static getToken() {
        return API_TOKEN;
    }

    static async getCountry() {
        const list = await axios({
            method: 'get',
            url: this.getServerHost() + '/country/all',
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            }
        });
        return list;
    }

    static async getMatches() {
        const list = await axios({
            method: 'get',
            url: this.getServerHost() + '/soccer-match/all',
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            }
        });
        return list;
    }

    static async ___Add() {
        const dataParam = {
            name: 'Team 1',
            country: 'UK',
            flag: 'flag.jpg',
        };

        axios({
            method: 'post',
            url: this.getServerHost() + '/soccer-team/add',
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            },
            data: dataParam
        }).then((response) => {
            console.log(response);
        }).catch((err) => {
            console.log(err);
        });

    }

}