const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')
const Address = require('../models/modelAddresses')
const Contact = require('../models/modelContacts')

router.get('/', function (req, res) {
    Address.findAll().then((result) => {
        Address.getDataContact(result).then((hasilContact) => {
            Contact.findAll().then((resultContact) => {
                res.render('address', { dataRow: hasilContact, dataRowContact: resultContact })
            })
        })
    })
})

router.post('/', function (req, res) {
    Address.newData(req.body).then((result) => {
        res.redirect('../../addresses')
    })
})

router.get('/edit/:id', function (req, res) {
    Address.findEdit(req.params.id).then((result) => {
        Contact.findAll().then((resultContact) => {
            res.render('editAddress', { dataRow: result, dataRowContact: resultContact })
        })
    })
})

router.post('/edit/:id', function (req, res) {
    Address.updateData(req.body, req.params.id).then((result) => {
        res.redirect('../../addresses')
    })
})

router.get('/delete/:id', function (req, res) {
    Address.deleteAddress(req.params.id).then(() => {
        res.redirect('../../addresses')
    })
})


module.exports = router