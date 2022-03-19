const express = require('express');
const router = express.Router();
const path = require('path');
const mongoose = require('mongoose')
const dns = require('dns')
const urlparser = require('url')



require('dotenv').config()
// db
const connectionURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.lvu1w.mongodb.net/Cluster0?retryWrites=true&w=majority`;
mongoose.connect(connectionURI)

//styles
router.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req,res) => {
    res.sendFile('fcc.html', {root: 'public'})
});

//header parser
router.get('/header-parser', (req,res) => {
    //getting ip
    const ip = req.ip
    //getting software
    const software = req.header('user-agent');
    //getting language
    const lang = req.headers["accept-language"]
    res.json({"ipaddress": ip ,"software": software ,"language": lang})

});

// URL shortener
const Url = require('../models/urlModel.js');

router.get('/url-shortener' , (req, res) => {
    res.render('url')
})

router.post('/url-shortener/api/shorturl', (req,res) => {
    const bodyUrl = req.body.url;

    const thing = dns.lookup(urlparser.parse(bodyUrl).hostname, (error, address) => {
    if(!address) {
      res.json({ error: "Invalid URL"})
    } else {
      const URL = new Url({ url: bodyUrl })

      URL.save((err, data) => {
        res.json({
          original_url : data.url,
          short_url : data.id
          
        })
      })
    }
  })
})

router.get('/url-shortener/api/shorturl/:id', (req,res) => {
    const id = req.params.id;
    Url.findById(id, (err, data) => {
      if(!data) {
        res.json({error: "Invalid URL"})
      } else {
  
        res.redirect(data.url)
      }
    })
})
//exercise tracker

router.get('/tracker' , (req, res) => {
  res.sendFile('tracker.html', {root: 'public'})
})

//schemas
const User = require('../models/userModel.js');
const Exercise = require('../models/exerciseModel.js');

//post routes
router.post('/api/users',(req,res) => {
  //create user

  const newUser = new User({
    username: req.body.username
  })
  newUser.save((err, data) => {
    if(err || !data) {
      res.send("an error has ocurred")
    } else {
      res.json(data)
    }
  })
})

router.post('/api/users/:id/exercises', (req,res) => {
  const id = req.params.id;
  const {description, duration,date} = req.body;

  User.findById(id ,(err ,userData) => {
    if(err || !userData) {
      res.send('couldnt find user')
    } else {
      const newExercise = new Exercise({
          userId: id,
          description,
          duration,
          date: new Date(date),
      });
      newExercise.save((err, data) => {
        if(err||!data) {
          res.send('an error saving this')
        } else {
          const {description, duration,date, _id} = data;
          res.json({
            username: userData.username,
            description,
            duration,
            date: date.toDateString(),
            _id: userData.id
          })
        }
      })
    }
  })
})


//get routes
router.get('/api/users/:id/logs',(req,res) => {
  const { from, to , limit } = req.query;
  const {id} = req.params;
    User.findById(id ,(err ,userData) => {
      if(err || !userData) {
        res.send('couldnt find user')
      } else {
          let dateObj = {}
          if(from){
            dateObj['$gte'] = new Date(from)
          }

          if(to) {
            dateObj['$lte'] = new Date(to)
          }
        
          let filter = {
            userId: id
          }
          if (from || to) {
            filter.date = dateObj
          }
          let nonNullLimit = (limit !== null && limit !== undefined) ? limit : 500;
        
          Exercise.find(filter).limit(nonNullLimit).exec((err,data) => {
            if(err || !data) {
              res.json([])
            } else {
              const count = data.length;
              const rawLog = data;
              const { username, _id} = userData;
              const log = rawLog.map((l) => ({
                description: l.description,
                duration: l.duration,
                date: l.date.toDateString()
              }))
              res.json({username, count, _id, log})
            }
          })

        
      }
    })
})

router.get('/api/users', (req,res) => {
  User.find({}, (err,data) => {
    if(!data) {
      res.send('no data found')
    } else {
      res.json(data)
    }
  })
})





//file metadata microservice
const multer = require('multer')
const upload  = multer({ dest: "uploads/"})

router.get('/meta' , (req, res) => {
    res.sendFile('meta.html', {root: 'public'})
})


router.post('/meta/api/fileanalyse',upload.single('upfile'),(req,res) => {
    res.json({
      "name": req.file.originalname,
      "type": req.file.mimetype,
      "size": req.file.size
    })
  })

module.exports = router;