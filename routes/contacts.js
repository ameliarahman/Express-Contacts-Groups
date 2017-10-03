const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')
const Contact = require('../models/modelContacts')

router.get('/', function (req, res) {
    Contact.findAll(function (contact, group, err) {
        if (err) {
            console.log(err);
        } else {
            // console.log({ dataRow: contact});
            res.render('contact', { dataRow: contact, dataGroup: group })
        }
    })

})

router.post('/', function (req, res) {
    Contact.newData(function (contact, err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('contacts')
        }
    }, req.body)

})

router.get('/edit/:id', function (req, res) {    
    Contact.findEdit(function (contact, err) {        
        if (err) {
            console.log('coba', err);
        } else {
            res.render('editContact', { dataRow: contact })
        }
    }, req.params.id)
})

router.post('/edit/:id', function (req, res) {
    Contact.updateData(function (contact, err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('../../contacts')
        }
    }, req.body, req.params.id)
})

router.get('/delete/:id', function (req, res) {
    Contact.delete(function (contact, err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('../../contacts')
        }
    },req.params.id)
})

router.get('/addresses/:id', function (req, res) {
    Contact.findAddress(function (address, err) {
        if (err) {
            console.log(err);
        } else {
            res.render('addressContact', { dataRow: address })
        }
    },req.params.id)

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