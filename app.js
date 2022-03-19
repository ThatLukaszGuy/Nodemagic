const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

//actual app
//run after npm 
//peerjs --port 3001

//url encoding 
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
//static files
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')
app.set('views', './views')


//targeting routes
const chatAppRoutes = require('./routes/chat');
const videoAppRoutes = require('./routes/video')
const basicRoutes = require('./routes/basic');
const timeRoute = require('./routes/time');
const fetchRoute = require('./routes/fetch');
const dbRoute = require('./routes/DB');
const fccRoute = require('./routes/fcc');


//middleware
app.use('/chatapp', chatAppRoutes);
app.use('/basic', basicRoutes);
app.use('/time', timeRoute);
app.use('/fetching', fetchRoute);
app.use('/DB', dbRoute);
app.use('/fcc',fccRoute)
app.use('/video', videoAppRoutes)

app.get('/:room', (req, res) => {
    res.render('room', { roomId: req.params.room })
})
// CORS
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}))

//exporting app
module.exports = app;