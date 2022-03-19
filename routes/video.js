const express = require('express');
const router = express.Router();
const path = require('path');
const { v4: uuidV4 } = require('uuid');

router.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req,res) => {
    res.redirect(`/${uuidV4()}`)

});



module.exports = router;