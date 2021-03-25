const r = require("rethinkdb");

let modelRepository = {};
r.connect({host:"93.104.211.190",port: 32769}).then(function(conn) {
     //recherche en fonction de l'id
     modelRepository.findByIdModel = (id) => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("model")
                .get(id)
                .run(conn)
                .then(function(model) {
                    resolve(model);
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };
//find all model
    modelRepository.findAll = () => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("model")
                .run(conn)
                .then(function(cursor) {
                    return cursor.toArray()
                        .then(function(model) {
                            resolve(model);
                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };

//
    modelRepository.findByLanguageType = (language, type) => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("model")
                .filter({ language: language, type: type })
                .run(conn)
                .then(function(cursor) {
                    return cursor.toArray()
                        .then(function(model) {
                            resolve(model);
                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };
    //recherche pour les models de hmm
    modelRepository.findForHmmModel = (type, language, definition) => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("model")
                .filter({ language: language, type: type, definition: definition })
                .run(conn)
                .then(function(cursor) {
                    return cursor.toArray()
                        .then(function(model) {
                            resolve(model[0]);
                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };


    modelRepository.findByLanguageAndTypeDefinition = (type, language, definition) => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("model")
                .filter({ language: language, type: type, definition: definition })
                .run(conn)
                .then(function(cursor) {
                    return cursor.toArray()
                        .then(function(model) {
                            resolve(model[0]);
                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };
    //recherche model en fonction du language de programmation
    modelRepository.findByLanguage = (language) => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("model")
                .filter({ language: language })
                .run(conn)
                .then(function(cursor) {
                    return cursor.toArray()
                        .then(function(model) {
                            resolve(model);
                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };
    //recherche model en foction du type
    modelRepository.findByType = (type) => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("model")
                .filter({ type: type })
                .run(conn)
                .then(function(cursor) {
                    return cursor.toArray()
                        .then(function(model) {
                            resolve(model);
                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };
    //enregistrer un model
    modelRepository.save = (model) => {
        return new Promise((resolve, reject) => {
            r
                .table("model")
                .insert(model)
                .run(conn, (err, model) => {
                    if (err) reject(err);
                    resolve(model);
                })
        });
    };
    //suprimer un model en fonction de son ID
    modelRepository.deleteById = (id) => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("model")
                .get(id)
                .delete()
                .run(conn)
                .then(function(cursor) {
                    return cursor.toArray()
                        .then(function(model) {
                            console.log(model);
                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };
});
r.connect({host:"93.104.211.190",port: 32769}).then(function(conn) {});

module.exports = modelRepository