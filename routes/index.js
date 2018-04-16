var express = require('express');
var router = express.Router();
var apodService = require('../services/apod');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.redirect('fetchpicture');
});


/* Fetch a picture from NASA's Astronomy Picture of the Day service */
router.get('/fetchpicture', function(req, res, next){


    apodService(function(err, apod_data){

        if (err) {
            res.render('apod_error', { message: err.message, title: 'Error' });
        } else {
            res.render('index', {apod: apod_data, title: `APOD for ${apod_data.date}`});
        }

    }, req.query.picturetype);

});

module.exports = router;