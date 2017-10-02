const express = require('express')
const app = express()
const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'))

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', function (req, res) {

    res.render('index')
})

// CRUD Contact
app.get('/contacts', function (req, res) {
    db.all("select c.name, c.id, c.email, c.telp_number,c.company, g.name_of_group from contacts c left join contacts_groups cg on c.id = cg.idContact left join groups g on g.id = cg.idGroup", function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            db.all("SELECT * from groups", function (err, rowscontact) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('contact', { dataRow: rows, dataGroup: rowscontact })
                }
            })
        }
    })
})


app.post('/contacts', function (req, res) {
    db.run(`INSERT into contacts(name, company, telp_number, email) VALUES ('${req.body.name}','${req.body.company}','${req.body.telp}','${req.body.email}')`, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('contacts')
        }
    })
})

app.get('/contacts/edit/:id', function (req, res) {
    db.all(`SELECT * from contacts where id = '${req.param('id')}'`, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.render('editContact', { dataRow: rows })
        }
    })
})

app.post('/contacts/edit/:id', function (req, res) {
    db.run(`UPDATE contacts SET name ='${req.body.name}', company = '${req.body.company}', telp_number = '${req.body.telp}', email = '${req.body.email}' where id = '${req.param('id')}'`, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('../../contacts')
        }
    })
})

app.get('/contacts/delete/:id', function (req, res) {
    db.run(`DELETE from contacts where id = '${req.param('id')}'`, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('../../contacts')
        }
    })
})
app.get('/contacts/addresses/:id', function (req, res) {
    db.all(`SELECT c.name, c.id, a.city, a.street, a.zipcode from contacts c left join addresses a  on c.id = a.idContact where c.id = '${req.param('id')}'`, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.render('addressContact', { dataRow: rows })
        }
    })
})
app.post('/contacts/addresses/:id', function (req, res) {
    db.run(`INSERT into addresses(street, city, zipcode, idContact) VALUES ('${req.body.street}','${req.body.city}', '${req.body.zipcode}','${req.body.id}' )`, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('../../contacts')
        }
    })
})

//CRUD GROUP

app.get('/groups', function (req, res) {
    db.all("SELECT * from groups", function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.render('group', { dataRow: rows })
        }
    })
})

app.post('/groups', function (req, res) {
    db.run(`INSERT into groups(name_of_group) VALUES ('${req.body.name_of_group}')`, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('groups')
        }
    })
})

app.get('/groups/edit/:id', function (req, res) {
    db.all(`SELECT * from groups where id = '${req.param('id')}'`, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.render('editGroup', { dataRow: rows })
        }
    })
})

app.post('/groups/edit/:id', function (req, res) {
    db.all(`UPDATE groups SET name_of_group ='${req.body.name_of_group}' where id = '${req.param('id')}'`, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('../../groups')
        }
    })
})

app.get('/groups/delete/:id', function (req, res) {
    db.all(`DELETE from groups where id = '${req.param('id')}'`, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('../../groups')
        }
    })
})
app.get('/groups/contacts/:id', function (req, res) {
    db.all(`SELECT name_of_group from groups g where g.id = '${req.param('id')}'`, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.render('groupContact', { dataRow: rows })
        }
    })
})


//CRUD PROFILE
app.get('/profiles', function (req, res) {
    db.all("SELECT profiles.id, profiles.username, profiles.password, profiles.idContact, contacts.name from profiles LEFT JOIN contacts on profiles.idContact = contacts.id", function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            db.all("SELECT * from contacts", function (err, rowscontact) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('profile', { dataRow: rows, dataRowContact: rowscontact, message: '' })
                }
            })
        }
    })
})

app.post('/profiles', function (req, res) {
    db.run(`INSERT into profiles(username, password, idContact) VALUES ('${req.body.username}', '${req.body.password}','${req.body.contactlist}')`, function (err) {
        if (err) {
            db.all("SELECT profiles.id, profiles.username, profiles.password, profiles.idContact, contacts.name from profiles LEFT JOIN contacts on profiles.idContact = contacts.id", function (err, rows) {
                if (err) {
                    console.log(err)
                } else {
                    db.all("SELECT * from contacts", function (err, rowscontact) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.render('profile', { dataRow: rows, dataRowContact: rowscontact, message: 'Cannot add multiple Contact ID' })
                        }
                    })
                }
            })
            console.log(err);
        } else {
            res.redirect('profiles')
        }
    })
})

app.get('/profiles/edit/:id', function (req, res) {
    db.all(`SELECT * from profiles where id = '${req.param('id')}'`, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            db.all("SELECT * from contacts", function (err, rowscontact) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('editProfile', { dataRow: rows, dataRowContact: rowscontact })
                }
            })
            // res.render('editProfile', { dataRow: rows })
        }
    })
})

app.post('/profiles/edit/:id', function (req, res) {
    db.run(`UPDATE profiles SET username ='${req.body.username}', password ='${req.body.password}', idContact ='${req.body.idContact}'  where id = '${req.param('id')}'`, function (err) {
        if (err) {
            db.all("SELECT profiles.id, profiles.username, profiles.password, profiles.idContact, contacts.name from profiles LEFT JOIN contacts on profiles.idContact = contacts.id", function (err, rows) {
                if (err) {
                    console.log(err)
                } else {
                    db.all("SELECT * from contacts", function (err, rowscontact) {
                        if (err) {
                            console.log(err);
                        } else {
                            res.render('editProfile', { dataRow: rows, dataRowContact: rowscontact, message: 'Cannot add multiple Contact ID' })
                        }
                    })
                }
            })
            console.log(err);
        }else {
            res.redirect('../../profiles')
        }
    })
})

app.get('/profiles/delete/:id', function (req, res) {
    db.run(`DELETE from profiles where id = '${req.param('id')}'`, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('../../profiles')
        }
    })
})

//CRUD ADDRESSES
app.get('/addresses', function (req, res) {
    db.all("SELECT a.id, a.street, a.city, a.zipcode, a.idContact, c.name from addresses a left join contacts c on a.idContact = c.id", function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            db.all("SELECT * from contacts", function (err, rowscontact) {
                if (err) {
                    console.log(err);
                } else {
                    res.render('address', { dataRow: rows, dataRowContact: rowscontact })
                }
            })
        }
    })
})

app.post('/addresses', function (req, res) {
    db.run(`INSERT into addresses(street, city, zipcode, idContact) VALUES ('${req.body.street}','${req.body.city}', '${req.body.zipcode}','${req.body.contactlist}' )`, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('addresses')
        }
    })
})

app.get('/addresses/edit/:id', function (req, res) {
    db.all(`SELECT * from addresses where id = '${req.param('id')}'`, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.render('editAddress', { dataRow: rows })
        }
    })
})

app.post('/addresses/edit/:id', function (req, res) {
    db.run(`UPDATE addresses SET street ='${req.body.street}', city ='${req.body.city}', zipcode ='${req.body.zipcode}' where id = '${req.param('id')}'`, function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('../../addresses')
        }
    })
})

app.get('/addresses/delete/:id', function (req, res) {
    db.run(`DELETE from addresses where id = '${req.param('id')}'`, function (err, rows) {
        if (err) {
            console.log(err)
        } else {
            res.redirect('../../addresses')
        }
    })
})


app.listen(3000);

// function cekData(req, res, errMessage){
//     let querySelect = `Select * from profiles where id = ${req.body.contactlist}`
//     db.all(querySelect, function(err){
//         if(!err){
//             console.log()
//         }
//     })
// }

// app.get('/',function())