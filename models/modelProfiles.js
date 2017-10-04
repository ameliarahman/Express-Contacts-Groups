const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')
const body = require('body-parser')
const Contact = require('./modelContacts')

class Profile {
    constructor(id, username, password, idContact) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.idContact = idContact;
    }

    static findAll() {
        return new Promise((resolve, reject) => {
            let result = [];
            db.all("SELECT * from profiles", function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    rows.forEach(function (profile) {
                        result.push(new Profile(profile.id, profile.username, profile.password, profile.idContact));
                    })
                }
                resolve(result);

            })
        })


    }

    static newData(data) {
        return new Promise((resolve, reject) => {
            db.run(`INSERT into profiles(username, password, idContact) VALUES ('${data.username}', '${data.password}','${data.contact}')`, function (err, rows) {
                if (err) {
                    resolve('')
                } else {
                    resolve(rows)
                }
            })
        })

    }

    static findData(data) {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * from profiles where id = '${data}'`, function (err, rows) {
                if (err) {
                    resolve('');
                } else {
                    resolve(rows)
                }
            })
        })

    }

    static updateData(data, id) {
        return new Promise((resolve, reject) => {
            db.run(`UPDATE profiles SET username ='${data.username}', password ='${data.password}', idContact ='${data.contact}'  where id = '${id}'`, function (err, rows) {
                if (err) {
                    resolve('')

                } else {
                    resolve(rows)
                }
            })
        })

    }

    static deleteData(data) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE from profiles where id = '${data}'`, function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                   resolve(rows)
                }
            })
        })

    }

    static getDataContact(dataProfile) {
        return new Promise((resolve, reject) => {
            dataProfile.forEach(function (profile, index) {
                Contact.findById(profile.idContact).then((result) => {
                    profile.name = result.name;
                    if (index <= dataProfile.length - 1) {
                        resolve(dataProfile)
                       
                    }
                })
            })

        })
    }
}

module.exports = Profile