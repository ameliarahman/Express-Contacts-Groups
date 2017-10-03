const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')
const body = require('body-parser')
class Address {
    constructor(id, idContact, street, city, zipcode) {
        this.id = id;
        this.idContact = idContact;
        this.street = street;
        this.city = city;
        this.zipcode = zipcode;
    }

    static findAll(cb) {
        db.all("SELECT * from addresses", function (err, rows) {
            if (err) {
                console.log(err)
            } else {

                let result = [];
                rows.forEach(function (address) {
                    result.push(new Address(address.id, address.idContact, address.street, address.city, address.zipcode));
                });
                cb(result, err)

            }
        })

    }
    static newData(cb, data) {
        db.run(`INSERT into addresses(street, city, zipcode) VALUES ('${data.street}','${data.city}', '${data.zipcode}' )`, function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                cb(rows, err)
            }
        })
    }

    static findEdit(cb, data) {
        db.all(`SELECT * from addresses where id = '${data}'`, function (err, rows) {
            if (err) {
                console.log(err)
            } else {
                cb(rows, err)
            }
        })
    }

    static updateData(cb, data, id) {
        db.run(`UPDATE addresses SET street ='${data.street}', city ='${data.city}', zipcode ='${data.zipcode}' where id = '${id}'`, function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                cb(rows, err)
            }
        })

    }
    static deleteAddress(cb, data) {
        db.run(`DELETE from addresses where id = '${data}'`, function (err, rows) {
            if (err) {
                console.log(err)
            } else {
                cb(rows, err);
            }
        })

    }
    
}

module.exports = Address