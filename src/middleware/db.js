const r = require("rethinkdb");
module.exports = (req, res, next) => {
    r.connect({ host: "localhost", port: 28015 }, (err, conn) => {
        const db = 'test';

        r
            .db(db)
            .tableList()
            .run(conn, function(err, response) {

                new Promise((resolve, reject) => {
                    if (response.indexOf("users") > -1) {
                        console.log("Table users exist");
                        resolve(true);
                    }
                }).then(resul => {
                    if (!resul) {
                        console.log("create table users...")

                        r
                            .db(db)
                            .tableCreate("users")
                            .run(conn);
                    }
                });

                new Promise((resolve, reject) => {
                    if (response.indexOf("edit") > -1) {
                        console.log("Table edit exist");
                        resolve(true);
                    }
                }).then(resul => {
                    if (!resul) {
                        console.log("create table edit...")

                        r
                            .db(db)
                            .tableCreate("edit")
                            .run(conn);
                    }
                });

                /*console.log(response.indexOf("users"));
                if (response.indexOf("users") > -1) {
                    console.log("Table users exist")
                } else {
                    console.log("create table users...")

                    r
                        .db(db)
                        .tableCreate("users")
                        .run(conn);
                }
                if (response.indexOf("edit") > -1) {
                    console.log("Table edit exist")

                } else {
                    console.log("create table edit...")
                    r
                        .db(db)
                        .tableCreate("edit")
                        .run(conn);

                }
                if (response.indexOf("projet") > -1) {
                    console.log("Table project exist")

                } else {
                    console.log("create table project...")
                    r
                        .db(db)
                        .tableCreate("projet")
                        .run(conn);

                }
                if (response.indexOf("chat") > -1) {
                    console.log("Table chat exist")

                } else {
                    console.log("create table chat...")
                    r
                        .db(db)
                        .tableCreate("chat")
                        .run(conn);

                }
                if (response.indexOf("associer") > -1) {
                    console.log("Table associer exist")

                } else {
                    console.log("create table associer...")
                    r
                        .db(db)
                        .tableCreate("associer")
                        .run(conn);

                }*/
            });
    });
    next();
};