const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')
const body = require('body-parser')
class Profile {
    constructor(id, username, password, idContact) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.idContact = idContact;
    }

    static findAll(cb) {
        db.all("SELECT * from profiles", function (err, rows) {
            if (err) {
                console.log(err)
            } else {
                let result = [];
                rows.forEach(function (profile) {
                    result.push(new Profile(profile.id, profile.username, profile.password, profile.idContact));
                });
                cb(rows, err)
            }
        })
    }

    static newData(cb, data) {
        db.run(`INSERT into profiles(username, password, idContact) VALUES ('${data.username}', '${data.password}','${data.contactlist}')`, function (err, rows) {
            if (err) {
                console.log(err)
            } else {
                cb(rows, err)
            }
        })
    }
    static findData(cb, data) {
        db.all(`SELECT * from profiles where id = '${data}'`, function (err, rows) {
            if (err) {
                console.log(err)
            } else {
                cb(rows,err)

            }
        })
    }

    static updateData(cb, data, id) {
        db.run(`UPDATE profiles SET username ='${data.username}', password ='${data.password}', idContact ='${data.idContact}'  where id = '${id}'`, function (err, rows) {
            if (err) {
                console.log(err)

            }else{
                cb(rows, err)
            }
        })
    }

    static deleteData(cb, data){
        db.run(`DELETE from profiles where id = '${data}'`, function (err, rows) {
            if (err) {
                console.log(err)
            } else {
                cb(rows, err)
                // res.redirect('../../profiles')
            }
        })
    }
}

module.exports = Profile