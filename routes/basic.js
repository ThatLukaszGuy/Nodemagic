const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req,res) => {
    res.render('base')
});




module.exports = router;