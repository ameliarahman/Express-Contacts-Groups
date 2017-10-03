const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')
const Profile = require('../models/modelProfiles')


router.get('/', function (req, res) {
    Profile.findAll(function (profile, err) {
        if (err) {
            console.log(err)
        } else {
            res.render('profile', { dataRow: profile, message: '' })
        }
    })

})

router.post('/', function (req, res) {
    Profile.newData(function (profile, err) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('profiles')
        }
    }, req.body)

})

router.get('/edit/:id', function (req, res) {
    Profile.findData(function (profile,err) {
        if (err) {
            console.log(err)
        } else {
            res.render('editProfile', { dataRow: profile })
        }
    }, req.params.id)
})



router.post('/edit/:id', function (req, res) {
    Profile.updateData(function (profile,err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('../../profiles')
        }
    }, req.body, req.params.id)
})

router.get('/delete/:id', function (req, res) {
    Profile.deleteData(function (profile, err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('../../profiles')
        }
    }, req.params.id)
})


module.exports = router