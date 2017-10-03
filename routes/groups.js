const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')
const Groups = require('../models/modelGroups')

router.get('/', function (req, res) {
    Groups.findAll(function (group, err) {
        if (err) {
            console.log(err);
        } else {
            res.render('group', { dataRow: group})
        }
    })

})

router.post('/', function (req, res) {
    Groups.newData(function (groups, err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('groups')
        }
    }, req.body)

})

router.get('/edit/:id', function (req, res) {    
    Groups.findEdit(function (group, err) {        
        if (err) {
            console.log(err);
        } else {
            res.render('editGroup', { dataRow: group})
        }
    }, req.params.id)
})

router.post('/edit/:id', function (req, res) {
    Groups.updateData(function (group, err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('../../groups')
        }
    }, req.body, req.params.id)
})

router.get('/delete/:id', function (req, res) {
    Groups.deleteGroup(function (group, err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('../../groups')
        }
    },req.params.id)
})

module.exports = router