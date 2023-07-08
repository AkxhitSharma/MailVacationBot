const express= require('express')
const mailbot = require('../controllers/observer/observer');
const { authentication } = require('../controllers/authentication/auth');
const { authorize } = require('../controllers/middleware/auth');
const router = express.Router();


router.get('/auth',authentication)
router.get('/status', (req, res) => res.send('ok'));
router.use('/mailObserver',authorize, mailbot)

module.exports = router;