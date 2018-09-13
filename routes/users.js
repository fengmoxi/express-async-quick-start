const express = require('express');
const router = express.Router();

const {asyncMiddleware} = require('../bin/asyncMiddleware');

/* GET users listing. */
router.get('/', asyncMiddleware(async (req, res, next) => {
    res.send('respond with a resource');
}));

module.exports = router;
