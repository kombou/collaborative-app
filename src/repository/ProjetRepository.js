const r = require("rethinkdb");

let projetRepository = {};
r.connect({ host: "localhost", port: 28015 }, (err, conn) => {
    projetRepository.findByIdProjet = (id_projet) => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("projet")
                .get(id_projet)
                .run(conn)
                .then(function(project) {
                    console.log("jjjj");
                    resolve(project);
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };
    projetRepository.findByNameProjet = (desc_projet) => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("projet")
                .filter({ desc_projet: desc_projet })
                // .run(conn, (err, users) => {
                //  if (err) reject(err);
                //  console.log(users[0]);
                //  resolve(users[0]);
                // });
                .run(conn)
                .then(function(cursor) {
                    return cursor.toArray()
                        .then(function(projet) {
                            resolve(projet[0]);
                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };

    projetRepository.save = (projet) => {
        return new Promise((resolve, reject) => {
            r
                .table("projet")
                .insert(projet)
                .run(conn, (err, projet) => {
                    if (err) reject(err);
                    resolve(projet);
                })
        });
    };
});

module.exports = projetRepository;