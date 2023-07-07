const express= require('express')
const mailbot = require('../controllers/observer/observer')
const router = express.Router();

router.get('/status', (req, res) => res.send('ok'));
router.use('/mailObserver', mailbot)

module.exports = router;