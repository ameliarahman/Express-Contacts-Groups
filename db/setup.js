var sqlite3 = require('sqlite3').verbose()
var db = new sqlite3.Database('data.db')

function createTable() {
    db.serialize(function () {
        let query = 'CREATE TABLE IF NOT EXISTS contacts(' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'name text,' +
            'company text,' +
            'telp_number text,' +
            'email text)'
        let querygroup = 'CREATE TABLE IF NOT EXISTS groups(' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'name_of_group text)'
        let queryprofile = 'CREATE TABLE IF NOT EXISTS profiles(' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'username text,' +
            'password text)'
        let queryaddress = 'CREATE TABLE IF NOT EXISTS addresses(' +
            'id INTEGER PRIMARY KEY AUTOINCREMENT,' +
            'street text,' +
            'city text,' +
            'zipcode integer)'
        
        db.run(query, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Table contacts created');
            }
        })

        //
        db.run(querygroup, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Table groups created');
            }
        })
        db.run(queryprofile, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Table profiles created');
            }
        })
        db.run(queryaddress, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Table address created');
            }
        })

    })

    // db.close()
}

function alterTableProfiles(){
    let queryalterprofile = 'ALTER TABLE profiles ADD idContact INTEGER REFERENCES contacts (id)'

    db.run(queryalterprofile, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Table profiles altered');
        }
    })
}

function createUnique(){
    let querycreateunique = 'create unique index unique_column on profiles(idContact)'
    
        db.run(querycreateunique, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('Table profiles altered');
            }
        })
}

function alterTableAddress(){
    let queryalteraddress = 'ALTER TABLE addresses ADD idContact INTEGER REFERENCES contacts (id)'

    db.run(queryalteraddress, function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Table addresses altered');
        }
    })
}

function createContactGroup(){
    let querynewtable = 'create TABLE IF NOT EXISTS contacts_groups(id integer primary key autoincrement, idContact integer, idGroup integer, foreign key(idContact) references contacs(id), foreign key(idGroup) references groups(id))'
    
        db.run(querynewtable, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('New table created');
            }
        })
}


// createTable();
// alterTableProfiles();
// createUnique();
// alterTableAddress()
createContactGroup()