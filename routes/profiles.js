const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')
const Profile = require('../models/modelProfiles')
const Contact = require('../models/modelContacts')

router.get('/', function (req, res) {
    Profile.findAll().then((result) => {
        Profile.getDataContact(result).then((hasil) => {
            Contact.findAll().then((resultContact) => {
                res.render('profile', { dataRow: hasil, dataRowContact: resultContact, message: '' })
            })

        })

    })

})

router.post('/', function (req, res) {
    Profile.newData(req.body).then((result) => {
        if (result == '') {
            Profile.findAll().then((result) => {
                Profile.getDataContact(result).then((hasil) => {
                    Contact.findAll().then((resultContact) => {
                        res.render('profile', { dataRow: hasil, dataRowContact: resultContact, message: 'Cannot add multiple contact' })
                    })

                })

            })
        } else {
            res.redirect('profiles')
        }

    })


})

router.get('/edit/:id', function (req, res) {
    Profile.findData(req.params.id).then((result) => {
        Contact.findAll().then((resultContact) => {
            res.render('editProfile', { dataRow: result, dataRowContact: resultContact, message: '' })
        })
    })
})

router.post('/edit/:id', function (req, res) {
    Profile.updateData(req.body, req.params.id).then((result) => {
        if (result == '') {
            Profile.findData(req.params.id).then((result) => {
                Contact.findAll().then((resultContact) => {
                    res.render('editProfile', { dataRow: result, dataRowContact: resultContact, message: 'Cannot add multiple contact' })
                })
            })
        } else {
            res.redirect('../../profiles')
        }
    })

})

router.get('/delete/:id', function (req, res) {
    Profile.deleteData(req.params.id).then((result) => {
        res.redirect('../../profiles')
    })
})


module.exports = router