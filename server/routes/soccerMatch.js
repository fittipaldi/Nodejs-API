const router = require('express').Router();
const SoccerMatchController = require('../lib/controllers/SoccerMatch');
const passport = require('passport');
const bearerAuth = passport.authenticate('bearer', {session: false});

router.get('/all', bearerAuth, async (req, res) => {
    try {
        const teams = await SoccerMatchController.getAll();
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

router.get('/teams/:team_id', bearerAuth, async (req, res) => {
    const team_id = req.params.team_id;
    try {
        const teams = await SoccerMatchController.getAllByTeam(team_id);
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
        const savedTeam = await SoccerMatchController.setItem(req.body);

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
        const match_id = (typeof req.body.match_id != 'undefined') ? parseInt(req.body.match_id.trim()) : 0;
        if (!match_id) {
            throw 'Missing Match ID';
        }

        const savedTeam = await SoccerMatchController.editItem(match_id, req.body);

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
        const match_id = (typeof req.body.match_id != 'undefined') ? parseInt(req.body.match_id.trim()) : 0;
        if (!match_id) {
            throw 'Missing Match ID';
        }

        const match = await SoccerMatchController.delItem(match_id);

        return res.json({
            status: true,
            msg: 'Success',
            data: match
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