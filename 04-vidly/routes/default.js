const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    //res.send('hello world');
    res.render('index', { title: 'my express app', message: 'hello world'});
});

module.exports = router;