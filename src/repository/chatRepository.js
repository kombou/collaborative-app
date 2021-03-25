const r = require("rethinkdb");

let chatRepository = {};
r.connect({host:"93.104.211.190",port: 32769}).then(function(conn) {
    chatRepository.findByIdProjet = (id_projet) => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("chat")
                .filter({ id_project: id_projet })
                .run(conn)
                .then(function(cursor) {
                    return cursor.toArray()
                        .then(function(chat) {
                            resolve(chat);
                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };

    chatRepository.findAll = () => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("chat")
                .run(conn)
                .then(function(cursor) {
                    return cursor.toArray()
                        .then(function(chat) {
                            resolve(chat);
                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };

    chatRepository.save = (message) => {
        return new Promise((resolve, reject) => {
            r
                .table("chat")
                .insert(message)
                .run(conn, (err, chat) => {
                    if (err) reject(err);
                    resolve(message);
                })
        });
    };
});

module.exports = chatRepository;