const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    // res.json({ dashboard: { title: 'Dashboard', description: 'cant access this' } });
    res.send(req.user);
    // User.findbyOne({_id: req.user});
});

module.exports = router;