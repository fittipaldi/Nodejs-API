const SoccerTeam = require('../models').SoccerTeam;

const SoccerTeamController = {

    getAll: async () => {
        const all = await SoccerTeam.findAll();
        return all;
    },

    getFindAll: async (data) => {
        const all = await SoccerTeam.findAll({
            where: data
        });
        return all;
    },

    getFindOne: async (data) => {
        const item = await SoccerTeam.findOne({
            where: data
        });
        return item.get();
    },

    setItem: async (data) => {

        const name = (typeof data.name != 'undefined') ? data.name.trim() : '';
        const country = (typeof data.country != 'undefined') ? data.country.trim() : '';
        const flag = (typeof data.flag != 'undefined') ? data.flag.trim() : '';

        if (!name) {
            throw 'Missing Team Name';
        }
        if (!country) {
            throw 'Missing Team Country';
        }
        if (!flag) {
            throw 'Missing Team Flag';
        }
        const saved = await new SoccerTeam({
            name: name,
            country: country,
            flag_icon: flag
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
            item.get();
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

module.exports = SoccerTeamController;