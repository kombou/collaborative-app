const r = require("rethinkdb");

let extractionController = {};

r.connect({host:"localhost",port: 28015},(err,conn) => {
    extractionController.getAll = () => {

        return new Promise((resolve,reject) => {
            r
                .table("edit")
                .orderBy({index:'id'})
                .run(conn, function(err, cursor) {
                    if (err) reject(err)
                    let docs = {};
                    cursor.each((err,doc) => {
                        if (err) reject(err);
                        docs[doc.id] = doc;
                    },() => {
                         console.log(docs);
                        resolve(docs);

                    });
                });
        });
    };

    extractionController.save = (msg) => {
        return new Promise((resolve,reject) => {
            r
                .table("edit")
                .insert({ id: msg.id, value: msg.value, user: msg.user, cursor: msg.cursor }, { conflict: "update" })
                .run(conn, function(err, res) {
                    if (err) reject(err);
                    resolve(res);
                });
        });
    };

    extractionController.edit = () => {
        return new Promise((resolve,reject) => {
            r
                .table("edit")
                .changes()
                .run(conn, function(err, cursor) {
                    cursor.each(function(err, row) {
                        if(err) reject(err);
                        resolve(row);
                    });
                });
        });
    };

    extractionController.getDoc = (req,res) => {
        return new Promise((resolve, reject) => {
            r
                .table("edit")
                .get(req.params.id)
                .run(conn , (err, result) => {
                    if(err) reject(err);
                    resolve(result);
                })
        });
    };
});

module.exports = extractionController;