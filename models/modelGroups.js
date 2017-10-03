const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')
const body = require('body-parser')

class Group {
    constructor(id, name_of_group) {
        this.id = id;
        this.name_of_group = name_of_group
    }

    static findAll(cb) {
        db.all("SELECT * from groups", function (err, rows) {
            if (err) {
                console.log(err)
            } else {

                let result = [];
                rows.forEach(function (group) {
                    result.push(new Group(group.id, group.name_of_group));
                });
                cb(result, err)

            }
        })

    }
    static newData(cb, data) {
        db.run(`INSERT into groups (name_of_group) VALUES ('${data.name_of_group}')`, function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                cb(rows, err)
            }
        })
    }

    static findEdit(cb, data) {
        db.all(`SELECT * from groups where id = '${data}'`, function (err, rows) {
            if (err) {
                console.log(err)
            } else {
                cb(rows, err)
            }
        })
    }

    static updateData(cb, data, id) {
        db.run(`UPDATE groups SET name_of_group ='${data.name_of_group}' where id = '${id}'`, function (err, rows) {
            if (err) {
                console.log(err);
            } else {
                cb(rows, err)
            }
        })

    }
    static deleteGroup(cb, data) {
        db.run(`DELETE from groups where id = '${data}'`, function (err, rows) {
            if (err) {
                console.log(err)
            } else {
                cb(rows, err);
            }
        })

    }

}

module.exports = Group