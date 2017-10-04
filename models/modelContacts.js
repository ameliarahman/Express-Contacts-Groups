const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')
const body = require('body-parser')
class Contact {
    constructor(id, name, email, telp_number, company) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.telp_number = telp_number;
        this.company = company
    }

    static findAll() {
        return new Promise((resolve, reject) => {
            let qSelectContact = 'Select * from contacts'
            db.all(qSelectContact, function (err, rows) {
                if (err) {
                    console.log(err);
                } else {
                    let result = [];
                    rows.forEach(function (contact) {
                        result.push(new Contact(contact.id, contact.name, contact.email, contact.telp_number, contact.company));
                    });
                    resolve(result)
                }

            })
        })

    }

    static findById(id) {
        return new Promise((resolve, reject) => {
            let qSelectContact = `Select * from contacts where id = ${id}`

            db.get(qSelectContact, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }

            })
        })

    }
    static newData(data) {
        return new Promise((resolve, reject) => {
            let qEditContact = `INSERT into contacts(name, company, telp_number, email) VALUES ('${data.name}', '${data.company}','${data.telp}','${data.email}')`
            db.run(qEditContact, function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })

    }

    static findEdit(data) {
        return new Promise((resolve, reject) => {
            let qGetContact = `SELECT * from contacts where id = '${data}'`
            db.get(qGetContact, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows)
                }
            })
        })

    }

    static updateData(data, id) {
        return new Promise((resolve, reject) => {
            let qUpdateContact = `UPDATE contacts SET name ='${data.name}', company = '${data.company}', telp_number = '${data.telp}', email = '${data.email}' where id = '${id}'`
            db.run(qUpdateContact, function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })

    }
    static delete(data) {
        return new Promise((resolve, reject) => {
            let qDeleteContact = `DELETE from contacts where id = '${data}'`
            db.run(qDeleteContact, function (err, rows) {
                if (err) {
                    console.log(err)
                } else {
                    resolve(rows)
                }
            })
        })

    }
    static findAddress(cb, data) {
        let qContactAddress = `SELECT c.name, c.id, a.city, a.street, a.zipcode from contacts c left join addresses a  on c.id = a.idContact where c.id = '${data}'`
        db.all(qContactAddress, function (err, rows) {
            if (err) {
                console.log(err)
            } else {
                cb(rows, err)
            }
        })
    }

    static saveAddress(cb, data) {
        let qInsertAddress = `INSERT into addresses(street, city, zipcode, idContact) VALUES ('${data.street}','${data.city}', '${data.zipcode}','${data.id}')`
        db.run(qInsertAddress, function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                cb(rows, err)
            }
        })
    }
}

module.exports = Contact