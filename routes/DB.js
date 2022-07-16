const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose')
const Posts = require('../models/postModel.js');
require('dotenv').config()
// db
const connectionURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lvu1w.mongodb.net/Cluster0?retryWrites=true&w=majority`;
mongoose.connect(connectionURI)

// to enable patch & delete requests
const methodOverride = require("method-override");
router.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

//styling
router.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req,res) => {
    Posts.find((err, data) => {
        res.render('data', {
            posts: data
        })
    })

});

// get raw json
router.get('/data' , (req,res) => {
    Posts.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }
    })
})

// get raw json by id
router.get('/data/:id' , (req,res) => {
    const { id } = req.params
    Posts.findById(id)
        .then((post) => res.status(200).json(post))
        .catch((err) => res.status(500).send(`We couldn't find the specified id , Error: ${err}`))
})


// post form
router.post('/data' , (req, res) => {
    const newPost = new Posts({
        user: req.body.user,
        content: req.body.content
    })
    newPost.save();
    res.redirect('/DB')
})

// update form
router.patch('/data/update', (req,res) => {
    const { id } = req.body
    Posts
        .findByIdAndUpdate(id, req.body, { new : true})
        .then(() => console.log('Patched'))
    res.redirect('/DB')
})


// delete form
router.delete('/data/delete' , (req,res) => {
    const { id } = req.body
    Posts
        .deleteMany({_id: id})
        .then((data) => {
            res.redirect('/DB')
        })
        .then(() => console.log('Deleted !'))
})

module.exports = router;