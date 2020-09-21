const router = require('express').Router();
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

router.get('/item/:id', bearerAuth, async (req, res) => {
    try {
        const id = req.params.id;
        const team = await SoccerTeamController.getFindOne({id});

        if (!team) {
            return res.json({
                status: false,
                msg: 'Team Not Found',
                data: null
            });
        }

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
        const id = (typeof req.body.id != 'undefined') ? parseInt(req.body.id) : 0;
        if (!id) {
            throw 'Missing Team ID';
        }

        const savedTeam = await SoccerTeamController.editItem(id, req.body);

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
        const id = (typeof req.body.id != 'undefined') ? parseInt(req.body.id) : 0;
        if (!id) {
            throw 'Missing Team ID';
        }

        const team = await SoccerTeamController.delItem(id);

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