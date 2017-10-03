const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')
const Address = require('../models/modelAddresses')

router.get('/', function (req, res) {
    Address.findAll(function (address, err) {
        if (err) {
            console.log(err)
        } else {
            res.render('address', { dataRow: address })
        }
    })

})

router.post('/', function (req, res) {
    Address.newData(function (address, err) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('../../addresses')
        }
    }, req.body)
})

router.get('/edit/:id', function (req, res) {
    Address.findEdit(function (address, err) {
        if (err) {
            console.log(err)
        } else {
            res.render('editAddress', { dataRow: address })
        }
    }, req.params.id)
})

router.post('/edit/:id', function (req, res) {
    Address.updateData(function (address, err) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('../../addresses')
        }
    }, req.body, req.params.id)
})

router.get('/delete/:id', function (req, res) {
    Address.deleteAddress(function (address, err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('../../addresses')
        }
    }, req.params.id)
})


module.exports = router