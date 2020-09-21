const {Op} = require('sequelize');
const SoccerTeam = require('../models').SoccerTeam;
const SoccerMatch = require('../models').SoccerMatch;
SoccerMatch.belongsTo(SoccerTeam, {foreignKey: 'team_a', targetKey: 'id', as: 'team_a_data'});
SoccerMatch.belongsTo(SoccerTeam, {foreignKey: 'team_z', targetKey: 'id', as: 'team_z_data'});
const SoccerTeamController = require('../controllers/SoccerTeam');
const dateFormat = require('dateformat');
const {getMatchesByTeam} = require('../db/queries');

const SoccerMatchController = {

    getAll: async () => {
        const all = await SoccerMatch.findAll({
            include: [
                {association: 'team_a_data'},
                {association: 'team_z_data'},
            ],
            order: [
                ['date_time', 'ASC'],
            ],
            where: {}
        });
        return all;
    },

    getAllByTeam: async (team_id, limit, offset) => {
        const list = await getMatchesByTeam(team_id, limit, offset);
        const now = new Date();

        const all = [];
        for (let itm of list) {
            let obj = {
                id: itm.id,
                date_time: itm.date_time,
                in_future: ((new Date(itm.date_time) > now) ? true : false),
                date_match: dateFormat(itm.date_time, 'dd/mm/yyyy'),
                time_match: dateFormat(itm.date_time, 'HH:MM'),
                team_a: itm.team_a,
                score_a: itm.score_a,
                team_z: itm.team_z,
                score_z: itm.score_z,
                status: itm.status,
                updated_at: itm.updated_at,
                team_a_data: {
                    id: itm.team_a_data_id,
                    name: itm.team_a_data_name,
                    country: itm.team_a_data_country,
                    flag_icon: itm.team_a_data_flag_icon,
                    status: itm.team_a_data_status,
                    updated_at: itm.team_a_data_updated_at,
                },
                team_z_data: {
                    id: itm.team_z_data_id,
                    name: itm.team_z_data_name,
                    country: itm.team_z_data_country,
                    flag_icon: itm.team_z_data_flag_icon,
                    status: itm.team_z_data_status,
                    updated_at: itm.team_z_data_updated_at,
                },
            }
            all.push(obj);
        }

        return all;
    },

    _ORAM_getAllByTeam: async (team_id) => {
        const all1 = await SoccerMatch.findAll({
            include: [
                {
                    association: 'team_a_data',
                    where: {
                        id: {[Op.eq]: team_id}
                    }
                },
                {association: 'team_z_data',},
            ],
            order: [
                ['date_time', 'ASC'],
            ],
            where: {}
        });
        const all2 = await SoccerMatch.findAll({
            include: [
                {association: 'team_a_data',},
                {
                    association: 'team_z_data',
                    where: {
                        id: {[Op.eq]: team_id}
                    }
                },
            ],
            order: [
                ['date_time', 'ASC'],
            ],
            where: {}
        });

        const all = all1.concat(all2);
        const now = new Date();
        for (let itm of all) {
            itm.dataValues.in_future = (new Date(itm.date_time) > now) ? true : false;
            itm.dataValues.date_match = dateFormat(itm.date_time, 'dd/mm/yyyy');
            itm.dataValues.time_match = dateFormat(itm.date_time, 'HH:MM');
        }

        return all;
    },

    setItem: async (data) => {

        const team_a_name = (typeof data.team_a_name != 'undefined') ? data.team_a_name.trim() : '';
        const team_a_country = (typeof data.team_a_country != 'undefined') ? data.team_a_country.trim() : '';
        const team_a_flag = (typeof data.team_a_flag != 'undefined') ? data.team_a_flag.trim() : '';
        const team_a_param = {};
        if (team_a_name) {
            team_a_param.name = team_a_name;
        }
        if (team_a_country) {
            team_a_param.country = team_a_country;
        }
        let team_a = await SoccerTeamController.getFindOne(team_a_param);
        if (!team_a) {
            team_a_param.name = team_a_name;
            team_a_param.country = team_a_country;
            team_a_param.flag_icon = team_a_flag;
            team_a = await SoccerTeamController.setItem(team_a_param);
        }

        const team_z_name = (typeof data.team_z_name != 'undefined') ? data.team_z_name.trim() : '';
        const team_z_country = (typeof data.team_z_country != 'undefined') ? data.team_z_country.trim() : '';
        const team_z_flag = (typeof data.team_z_flag != 'undefined') ? data.team_z_flag.trim() : '';
        const team_z_param = {};
        if (team_z_name) {
            team_z_param.name = team_z_name;
        }
        if (team_z_country) {
            team_z_param.country = team_z_country;
        }
        let team_z = await SoccerTeamController.getFindOne(team_z_param);
        if (!team_z) {
            team_z_param.name = team_z_name;
            team_z_param.country = team_z_country;
            team_z_param.flag_icon = team_z_flag;
            team_z = await SoccerTeamController.setItem(team_z_param);
        }

        if (!team_a || !team_z) {
            throw 'The Teams are missing';
        }
        team_a = team_a.get();
        team_z = team_z.get();

        const date_time = (typeof data.date_time != 'undefined') ? data.date_time.trim() : '';
        const pattern = /(\d{2})\/(\d{2})\/(\d{4}).(\d{2}):(\d{2})/;
        const dateTime = new Date(date_time.replace(pattern, '$3-$2-$1 $4:$5'));
        const dateFormat = dateTime.toISOString().replace(/T/, ' ').replace(/\..+/, '');

        const saved = await new SoccerMatch({
            date_time: dateFormat,
            team_a: team_a.id,
            team_z: team_z.id
        }).save();

        if (saved) {
            return saved.get();
        }
        return saved;
    },

    editItem: async (id, data) => {

        const name = (typeof data.name != 'undefined') ? data.name.trim() : '';
        const country = (typeof data.country != 'undefined') ? data.country.trim() : '';
        const flag = (typeof data.flag != 'undefined') ? data.flag.trim() : '';

        if (!name && !country && !flag) {
            throw 'At leas one field is mandatory.';
        }

        const item = await SoccerTeam.findOne({
            where: {
                id: id
            }
        });

        if (!item) {
            throw 'Team not Found';
        }

        if (name) {
            item.name = name;
        }
        if (country) {
            item.country = country;
        }
        if (flag) {
            item.flag_icon = flag;
        }
        item.save();

        if (item) {
            item.dataValues;
        }
        return item;
    },

    delItem: async (id) => {
        const item = await SoccerTeam.findOne({
            where: {
                id: id
            }
        });

        if (!item) {
            throw 'Team not Found';
        }
        item.destroy();

        return item;
    }

};

module.exports = SoccerMatchController;