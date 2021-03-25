const r = require("rethinkdb");
const ProjetRepository = require('./ProjetRepository');
const modelRepository = require('./ModelRepository');
let lierRepository = {};
r.connect({host:"93.104.211.190",port: 32769}).then(function(conn) {
    lierRepository.findAllModelProjet = (id_projet) => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("lier")
                .filter({ id_projet: id_projet })
                .run(conn)
                .then(function(cursor) {
                    return cursor.toArray()
                        .then(function(lier) {
                            resolve(waitCheckLiaison(lier))
                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };
    lierRepository.findById = (id_projet, id_model) => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("lier")
                .filter({ id_projet: id_projet, id_model: id_model })
                .run(conn)
                .then(function(cursor) {
                    return cursor.toArray()
                        .then(function(lier) {
                            resolve(lier[0]);
                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };

    lierRepository.save = (lier) => {
        return new Promise((resolve, reject) => {
            r
                .table("lier")
                .insert(lier)
                .run(conn, (err, lier) => {
                    if (err) reject(err);
                    resolve(lier);
                })
        });
    };
});

async function waitCheckLiaison(lier) {
    modelProjet = [];
    for (let index = 0; index < lier.length; index++) {
        console.log(lier[index].id_model);
        const element = await checkModel(lier[index].id_model);
        if (element !== undefined) {
            modelProjet.push(element);
        }
    }
    return modelProjet;
}

function checkModel(id_model) {
    return new Promise(resolve => {
        modelRepository.findByIdModel(id_model).then((model) => {
            resolve(model);
        })
    });
}
module.exports = lierRepository;