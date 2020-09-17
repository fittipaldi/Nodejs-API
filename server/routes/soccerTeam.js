const router = require('express').Router();
const SoccerTeam = require('../lib/models').SoccerTeam;
const passport = require('passport');
const bearerAuth = passport.authenticate('bearer', {session: false});

/**
 * Route to send correct email template based on business unit.
 * @async
 * @function
 * @param   {Object} req Request object.
 * @param   {Object} res Response object.
 * @returns {Object} Response object.
 */
router.get('/all', bearerAuth, async (req, res) => {
    try {
        const teams = await SoccerTeam.findAll();
        return res.json({
            status: true,
            msg: 'Success',
            data: teams
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            msg: err.message,
            data: null
        });
    }
});

router.post('/add', async (req, res) => {
    try {

        console.log('\x1b[41m');
        console.log(req);
        console.log('\x1b[0m');

        const teams = await SoccerTeam.findAll();
        return res.json({
            status: true,
            msg: 'Success',
            data: teams
        });
    } catch (err) {
        return res.status(500).json({
            status: false,
            msg: err.message,
            data: null
        });
    }
});

module.exports = router;