const express = require('express');
const router = express.Router();
const path = require('path');

router.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req,res) => {
    res.render('join')
});

router.get('/chat', (req,res) => {
    res.render('chat')
});



module.exports = router;