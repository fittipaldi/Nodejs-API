const router = require('express').Router();
const SoccerTeam = require('../lib/models').SoccerTeam;
const SoccerTeamController = require('../lib/controllers/SoccerTeam');
const passport = require('passport');
const bearerAuth = passport.authenticate('bearer', {session: false});

router.get('/all', bearerAuth, async (req, res) => {
    try {
        const teams = await SoccerTeamController.getAll();
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

        const savedTeam = await SoccerTeamController.setItem(req.body);

        return res.json({
            status: true,
            msg: 'Success',
            data: savedTeam
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

router.put('/edit', bearerAuth, async (req, res) => {
    try {

        const team_id = (typeof req.body.team_id != 'undefined') ? parseInt(req.body.team_id.trim()) : 0;
        if (!team_id) {
            throw 'Missing Team ID';
        }

        const savedTeam = await SoccerTeamController.editItem(team_id, req.body);

        return res.json({
            status: true,
            msg: 'Success',
            data: savedTeam
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

        const team = await SoccerTeamController.delItem(team_id);

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