const router = require('express').Router();
const SoccerTeam = require('../lib/models').SoccerTeam;
const passport = require('passport');
const bearerAuth = passport.authenticate('bearer', {session: false});

router.get('/all', bearerAuth, async (req, res) => {
    try {
        const teams = await SoccerTeam.findAll();
        return res.json({
            status: true,
            msg: 'Success',
            data: teams
        });
    } catch (err) {
        const msg = (typeof err.message != 'undefined') ? err.message : err;
        return res.status(500).json({
            status: false,
            msg: msg,
            data: null
        });
    }
});

router.post('/add', bearerAuth, async (req, res) => {
    try {
        const name = (typeof req.body.name != 'undefined') ? req.body.name.trim() : '';
        const country = (typeof req.body.country != 'undefined') ? req.body.country.trim() : '';
        const flag = (typeof req.body.flag != 'undefined') ? req.body.flag.trim() : '';

        if (!name) {
            throw 'Missing Team Name';
        }
        if (!name) {
            throw 'Missing Team Country';
        }
        if (!flag) {
            throw 'Missing Team Flag';
        }
        const savedTeam = await new SoccerTeam({
            name: name,
            country: country,
            flag_icon: flag
        }).save();

        return res.json({
            status: true,
            msg: 'Success',
            data: savedTeam.dataValues
        });
    } catch (err) {
        const msg = (typeof err.message != 'undefined') ? err.message : err;
        return res.status(500).json({
            status: false,
            msg: msg,
            data: null
        });
    }
});

router.delete('/del', bearerAuth, async (req, res) => {
    try {
        const team_id = (typeof req.body.team_id != 'undefined') ? parseInt(req.body.team_id.trim()) : 0;

        if (!team_id) {
            throw 'Missing Team ID';
        }

        const team = await SoccerTeam.findOne({
            where: {
                id: team_id
            }
        });

        if (!team) {
            throw 'Team not Found';
        }
        team.destroy();

        return res.json({
            status: true,
            msg: 'Success',
            data: team
        });
    } catch (err) {
        const msg = (typeof err.message != 'undefined') ? err.message : err;
        return res.status(500).json({
            status: false,
            msg: msg,
            data: null
        });
    }
});

module.exports = router;