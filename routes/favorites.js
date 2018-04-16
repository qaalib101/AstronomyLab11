/**
 * Created by si8822fb on 4/10/2018.
 */
var express = require('express');
var router = express.Router();

/* GET favorites page */
router.get('/', function(req, res, next){
    res.render('favorites', { favorites: req.session.favorites });
});

/* POST to add a new favorite to user's favorites */
router.post('/add', function(req, res, next){

    // If a favorites array does not exist in this session, create it
    if (!req.session.favorites) {
        req.session.favorites = [];
    }

    // Is this image already a favorite? Filter the favorites array for images with this date
    var favorite_on_date = req.session.favorites.filter(function(fav) {
        return fav.date == req.body.date
    });

    // If no favorite found with this date, then add to the session's favorites array
    if (favorite_on_date.length == 0) {
        req.session.favorites.push(req.body);
    }

    // Redirect to the favorites page.
    res.redirect('/favorites');
});
router.post('/deleteAll', function(req, res, next){
    //delete all
    console.log(req.session.favorites);
    if(req.session.favorites){
        req.session.favorites = []
    }
    res.redirect('/');
});
router.post('/delete', function(req, res, next){
    // get index and delete the favorite from the array
    var index = req.session.favorites.indexOf(req.body.date);
    console.log(index);
    req.session.favorites.splice(index, 1);
    res.redirect('/favorites');
});
module.exports = router;