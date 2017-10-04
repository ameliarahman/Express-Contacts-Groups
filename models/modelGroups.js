const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db/data.db')
const body = require('body-parser')

class Group {
    constructor(id, name_of_group) {
        this.id = id;
        this.name_of_group = name_of_group
    }

    static findAll() {
        return new Promise((resolve, reject) => {
            let result = [];
            db.all("SELECT * from groups", function (err, rows) {
                if (err) {
                    console.log(err)
                } else {
                    rows.forEach(function (group) {
                        result.push(new Group(group.id, group.name_of_group));
                    });
                    resolve(result)
                }
            })
        })


    }
    static newData(data) {
        return new Promise((resolve, reject) => {
            db.run(`INSERT into groups (name_of_group) VALUES ('${data.name_of_group}')`, function (err) {
                if (err) {
                    console.log(err);
                } else {
                   resolve()
                }
            })
        })

    }

    static findEdit(data) {
        return new Promise((resolve, reject)=>{
            db.all(`SELECT * from groups where id = '${data}'`, function (err, rows) {
            if (err) {
                console.log(err)
            } else {
               resolve(rows);
            }
        })
        })
        
    }

    static updateData(data, id) {
        return new Promise((resolve, reject)=>{
            db.run(`UPDATE groups SET name_of_group ='${data.name_of_group}' where id = '${id}'`, function (err, rows) {
                if (err) {
                   reject(err)
                } else {
                    resolve(rows);
                }
            })
        })
       

    }
    static deleteGroup(data) {
        return new Promise((resolve, reject)=>{
            db.run(`DELETE from groups where id = '${data}'`, function (err, rows) {
                if (err) {
                    reject(err)
                } else {
                   resolve(rows);
                }
            })
        })
       

    }

}

module.exports = Group