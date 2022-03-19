const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req,res) => {
    res.sendFile('fetch.html', {root: 'public'})
});




module.exports = router;