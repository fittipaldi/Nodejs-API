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

    static async getMatches(team_id) {
        const list = await axios({
            method: 'get',
            url: this.getServerHost() + '/soccer-match/teams/' + team_id,
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            }
        });
        return list;
    }

    static async getTeam(id) {
        const item = await axios({
            method: 'get',
            url: this.getServerHost() + '/soccer-team/item/' + id,
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            }
        });
        return item;
    }

    static async getMatch(id) {
        const item = await axios({
            method: 'get',
            url: this.getServerHost() + '/soccer-match/item/' + id,
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            }
        });
        return item;
    }

    static async getTeamCountry(country) {
        const items = await axios({
            method: 'get',
            url: this.getServerHost() + '/soccer-team/country/' + country,
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            }
        });
        return items;
    }

    static async detTeam(id) {
        const item = await axios({
            method: 'delete',
            url: this.getServerHost() + '/soccer-team/del',
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            },
            data: {id}
        });
        return item;
    }

    static async delMatch(id) {
        const item = await axios({
            method: 'delete',
            url: this.getServerHost() + '/soccer-match/del',
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            },
            data: {id}
        });
        return item;
    }

    static async getTeams() {
        const list = await axios({
            method: 'get',
            url: this.getServerHost() + '/soccer-team/all',
            headers: {
                'Authorization': 'Bearer ' + this.getToken()
            }
        });
        return list;
    }

    static async setMatch(dataParam) {
        let saved;
        if (typeof dataParam.id != 'undefined' && dataParam.id > 0) {
            saved = await axios({
                method: 'put',
                url: this.getServerHost() + '/soccer-match/edit',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                },
                data: dataParam
            });
        } else {
            saved = await axios({
                method: 'post',
                url: this.getServerHost() + '/soccer-match/add',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                },
                data: dataParam
            });
        }

        return saved;
    }

    static async setTeam(dataParam) {
        let saved;
        if (typeof dataParam.id != 'undefined' && dataParam.id > 0) {
            saved = await axios({
                method: 'put',
                url: this.getServerHost() + '/soccer-team/edit',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                },
                data: dataParam
            });
        } else {
            saved = await axios({
                method: 'post',
                url: this.getServerHost() + '/soccer-team/add',
                headers: {
                    'Authorization': 'Bearer ' + this.getToken()
                },
                data: dataParam
            });
        }

        return saved;
    }

}