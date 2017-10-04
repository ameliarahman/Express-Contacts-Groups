const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')
const body = require('body-parser')
const Contact = require('./modelContacts')

class Address {
    constructor(id, idContact, street, city, zipcode) {
        this.id = id;
        this.idContact = idContact;
        this.street = street;
        this.city = city;
        this.zipcode = zipcode;
    }
    static findAll() {
        return new Promise((resolve, reject) => {
            let result = [];
            db.all("SELECT * from addresses", function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    rows.forEach(function (address) {
                        result.push(new Address(address.id, address.idContact, address.street, address.city, address.zipcode));
                    });
                    resolve(result);
                }
            })
        })


    }
    static newData(data) {
        return new Promise((resolve, reject) => {
            db.run(`INSERT into addresses(street, city, zipcode) VALUES ('${data.street}','${data.city}', '${data.zipcode}' )`, function (err, rows) {
                if (err) {
                    console.log(err);
                } else {
                    resolve(rows)
                }
            })
        })

    }

    static findEdit(data) {
        return new Promise((resolve, reject) => {
            db.all(`SELECT * from addresses where id = '${data}'`, function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })

    }
    static updateData(data, id) {
        return new Promise((resolve, reject) => {
            db.run(`UPDATE addresses SET street ='${data.street}', city ='${data.city}', zipcode ='${data.zipcode}', idContact ='${data.contact}' where id = '${id}'`, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows)
                }
            })
        })


    }
    static deleteAddress(data) {
        return new Promise((resolve, reject) => {
            db.run(`DELETE from addresses where id = '${data}'`, function (err) {
                if (err) {
                    console.log(err)
                } else {
                   resolve();
                }
            })

        })

    }
    static getDataContact(dataAddress) {
        return new Promise((resolve, reject) => {
            dataAddress.forEach(function (address, index) {
                Contact.findById(address.idContact).then((result) => {
                    if (result != undefined) {
                        address.name = result.name;
                        if (index <= dataAddress.length - 1) {
                            resolve(dataAddress)
                        }
                    }
                })


            })

        })
    }

}

module.exports = Address