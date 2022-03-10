const express = require('express');
const i18next = require('../i18n');
const router = express.Router();

/* GET home page. */
router.post('/changeLanguage', async function(req, res, next) {
    await i18next.changeLanguage(req.body.lang,  (err, t) => {
        if(err) res.json({'result': 'failed'});
        else res.json({'result': 'success'});
    });
});

module.exports = router;
