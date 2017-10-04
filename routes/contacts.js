const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')
const Contact = require('../models/modelContacts')
const Group = require('../models/modelGroups')

router.get('/', function (req, res) {
    Contact.findAll().then((result) => {
        Group.findAll().then((resultGroup) => {
            res.render('contact', { dataRow: result, dataRowGroup: resultGroup })
        })

    })
})

router.post('/', function (req, res) {
    Contact.newData(req.body).then((result) => {
        res.redirect('contacts')
    })
})

router.get('/edit/:id', function (req, res) {
    Contact.findEdit(req.params.id).then((result) => {
        res.render('editContact', { dataRow: result })

    })
})

router.post('/edit/:id', function (req, res) {
    Contact.updateData(req.body, req.params.id).then((result) => {
        res.redirect('../../contacts')
    })
})

router.get('/delete/:id', function (req, res) {
    Contact.delete(req.params.id).then((result) => {
        res.redirect('../../contacts')
    })
})

router.get('/addresses/:id', function (req, res) {
    Contact.findAddress(function (address, err) {
        if (err) {
            console.log(err);
        } else {
            res.render('addressContact', { dataRow: address })
        }
    }, req.params.id)

})

router.post('/addresses/:id', function (req, res) {

    Contact.saveAddress(function (contact, err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('../../contacts')
        }
    }, req.body)
})
module.exports = router