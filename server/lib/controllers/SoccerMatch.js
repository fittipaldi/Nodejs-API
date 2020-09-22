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

    getFindOne: async (data) => {
        const item = await SoccerMatch.findOne({
            include: [
                {association: 'team_a_data'},
                {association: 'team_z_data'},
            ],
            order: [
                ['date_time', 'ASC'],
            ],
            where: data
        });

        let itemData = {};
        if (item) {
            itemData = item.get();
            const now = new Date();
            itemData.in_future = ((new Date(itemData.date_time) > now) ? true : false);
            itemData.date_match = dateFormat(itemData.date_time, 'dd/mm/yyyy');
            itemData.date_match_sql = dateFormat(itemData.date_time, 'yyyy-mm-dd');
            itemData.time_match = dateFormat(itemData.date_time, 'HH:MM');
        }

        return itemData;
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
                date_match_sql: dateFormat(itm.date_time, 'yyyy-mm-dd'),
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

        let team_a_ID;
        if (typeof data.team_a_id == 'undefined' || !data.team_a_id) {
            const team_a_name = (typeof data.team_a_name != 'undefined') ? data.team_a_name.trim() : '';
            const team_a_country = (typeof data.team_a_country != 'undefined') ? data.team_a_country.trim() : '';
            const team_a_flag = (typeof data.team_a_flag != 'undefined') ? data.team_a_flag.trim() : '';

            if (!team_a_name) {
                throw 'Missing Team A Name';
            }
            if (!team_a_country) {
                throw 'Missing Team A Country';
            }
            if (!team_a_flag) {
                throw 'Missing Team A Flag';
            }

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
            team_a = team_a.get();
            team_a_ID = team_a.id;
        } else {
            team_a_ID = data.team_a_id;
        }

        let team_z_ID;
        if (typeof data.team_z_id == 'undefined' || !data.team_z_id) {
            const team_z_name = (typeof data.team_z_name != 'undefined') ? data.team_z_name.trim() : '';
            const team_z_country = (typeof data.team_z_country != 'undefined') ? data.team_z_country.trim() : '';
            const team_z_flag = (typeof data.team_z_flag != 'undefined') ? data.team_z_flag.trim() : '';

            if (!team_z_name) {
                throw 'Missing Team Z Name';
            }
            if (!team_z_country) {
                throw 'Missing Team Z Country';
            }
            if (!team_z_flag) {
                throw 'Missing Team Z Flag';
            }

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
            team_z = team_z.get();
            team_z_ID = team_z.id;
        } else {
            team_z_ID = data.team_z_id;
        }

        if (!team_a_ID || !team_z_ID) {
            throw 'The Teams are missing';
        }

        let dateFormat = '';
        if (typeof data.date_time != 'undefined' && data.date_time) {
            const date_time = (typeof data.date_time != 'undefined') ? data.date_time.trim() : '';
            const pattern = /(\d{2})\/(\d{2})\/(\d{4}).(\d{2}):(\d{2})/;
            const dateTime = new Date(date_time.replace(pattern, '$3-$2-$1 $4:$5'));
            dateFormat = dateTime.toISOString().replace(/T/, ' ').replace(/\..+/, '');
        } else {
            if (typeof data.match_date != 'undefined' && data.match_date) {
                dateFormat = data.match_date;
                if (typeof data.match_time != 'undefined' && data.match_time) {
                    dateFormat += ' ' + data.match_time;
                }
            }
        }

        let score_a = 0;
        if (typeof data.score_a != 'undefined' && data.score_a) {
            score_a = parseInt(data.score_a);
        }

        let score_z = 0;
        if (typeof data.score_z != 'undefined' && data.score_z) {
            score_z = parseInt(data.score_z);
        }

        const saved = await new SoccerMatch({
            date_time: dateFormat,
            score_a: score_a,
            score_z: score_z,
            team_a: team_a_ID,
            team_z: team_z_ID
        }).save();

        if (saved) {
            return saved.get();
        }
        return saved;
    },

    editItem: async (id, data) => {

        const match_date = (typeof data.match_date != 'undefined') ? data.match_date.trim() : '';
        const match_time = (typeof data.match_time != 'undefined') ? data.match_time.trim() : '';
        const score_a = (typeof data.score_a != 'undefined') ? parseInt(data.score_a) : 0;
        const score_z = (typeof data.score_z != 'undefined') ? parseInt(data.score_z) : 0;

        let dateFormat = match_date + ' ' + match_time;
        dateFormat = dateFormat.trim();
        if (!dateFormat && !score_a && !score_z) {
            throw 'One field is mandatory.';
        }

        const item = await SoccerMatch.findOne({
            where: {
                id: id
            }
        });

        if (!item) {
            throw 'Match not Found';
        }

        if (dateFormat) {
            item.date_time = dateFormat;
        }
        if (score_a) {
            item.score_a = score_a;
        }
        if (score_z) {
            item.score_z = score_z;
        }
        item.save();

        if (item) {
            item.dataValues;
        }
        return item;
    },

    delItem: async (id) => {
        const item = await SoccerMatch.findOne({
            where: {
                id: id
            }
        });

        if (!item) {
            throw 'Match not Found';
        }
        item.destroy();

        return item;
    }

};

module.exports = SoccerMatchController;