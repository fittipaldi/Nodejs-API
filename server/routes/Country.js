const router = require('express').Router();
const Country = require('../lib/models').Country;
const passport = require('passport');
const bearerAuth = passport.authenticate('bearer', {session: false});

router.get('/all', bearerAuth, async (req, res) => {
    try {
        const countries = await Country.findAll();
        return res.json({
            status: true,
            msg: 'Success',
            data: countries
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