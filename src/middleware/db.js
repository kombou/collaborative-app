const r = require("rethinkdb");
let db = {}
const base = 'test';
db.initTable = () => {
    r.connect({host:"localhost",port: 28015},(err,conn) => {
        r
            .db(base)
            .tableList()
            .run(conn).then(tables => {
                tableCreate(tables,"users",conn);
                tableCreate(tables,"edit",conn);
                tableCreate(tables,"projet",conn);
                tableCreate(tables,"chat",conn);
                tableCreate(tables,"associer",conn);
            });
    });
};

function tableCreate(tables,table, conn) {
    if (!(tables.indexOf(table) > -1)){
        r
            .db(base)
            .tableCreate(table)
            .run(conn);
    }
}

module.exports = db;
