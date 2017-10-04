const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')
const Groups = require('../models/modelGroups')

router.get('/', function (req, res) {
    Groups.findAll().then((result) => {
        res.render('group', { dataRow: result })
    })
})

router.post('/', function (req, res) {
    Groups.newData(req.body).then(() => {
        res.redirect('groups')
    })
})

router.get('/edit/:id', function (req, res) {
    Groups.findEdit(req.params.id).then((result) => {
        res.render('editGroup', { dataRow: result })
    })
})

router.post('/edit/:id', function (req, res) {
    Groups.updateData(req.body, req.params.id).then((result) => {
        res.redirect('../../groups')
    })
})

router.get('/delete/:id', function (req, res) {
    Groups.deleteGroup(req.params.id).then((result)=>{
        res.redirect('../../groups')
    })
})

module.exports = router