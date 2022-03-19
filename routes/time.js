const express = require('express');
const router = express.Router();
const path = require('path');


router.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req,res) => {
    res.sendFile('time.html', {root: 'public'})
});

router.get('/:date?', (req ,res) => {
  
  //check if string is empty
  const checkEmpty = () => {
    if (!isNaN(date)) {
      inputDate = new Date(parseInt(date));
    } else {
      inputDate = new Date(date);
    }
  }
  
  
  //get
  const date = req.params.date;

  let inputDate;

  if (!date) {
    inputDate = new Date();
  } else {
    checkEmpty();
  }

  if (inputDate.toString() === 'Invalid Date') {
    res.json({ error: inputDate.toString()})
  } else {
    res.json({ unix: inputDate.getTime(),utc: inputDate.toUTCString() })
    console.log(inputDate.getTime(), inputDate.toUTCString())
  }

})

module.exports = router;