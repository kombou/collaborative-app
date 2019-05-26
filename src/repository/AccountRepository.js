const r = require("rethinkdb");

let accountRepository = {};
r.connect({ host: "localhost", port: 28015 }, (err, conn) => {
    accountRepository.matchUser = (username) => {
        return new Promise((resolve, reject) => {
            r
                .table("users")
                .filter(function(doc) {
                    return doc('username').match(username);
                })
                .run(conn)
                .then(function(cursor) {
                    return cursor.toArray()
                        .then(function(users) {
                            resolve(users);
                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };
    accountRepository.findById = (id) => {
        return new Promise((resolve, reject) => {
            r
                .table("users")
                .get(id)
                .run(conn, (err, user) => {
                    if (err) reject(err);
                    resolve(user);
                })
        });
    };

    accountRepository.findByEmail = (account) => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("users")
                .filter({ email: account.email })
                .run(conn)
                .then(function(cursor) {
                    return cursor.toArray()
                        .then(function(users) {
                            resolve(users[0]);
                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };

    accountRepository.findAll = () => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("users")
                .run(conn)
                .then(function(cursor) {
                    return cursor.toArray()
                        .then(function(users) {
                            resolve(users);
                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };


    accountRepository.save = (account) => {
        return new Promise((resolve, reject) => {
            r
                .table("users")

            .insert(account)
                .run(conn, (err, user) => {
                    if (err) reject(err);
                    resolve(user);
                })
        });
    };
});

module.exports = accountRepository;