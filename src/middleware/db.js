const r = require("rethinkdb");
let db = {}
const base = 'test';
db.initTable = () => {
    console.log(`initialisation of database`);
    
    r.connect({host:"93.104.211.190",port: 32769}).then(function(conn) {
        r
            .db(base)
            .tableList()
            .run(conn).then(tables => {
                tableCreate(tables,"users",conn);
                tableCreate(tables,"edit",conn);
                tableCreate(tables,"projet",conn);
                tableCreate(tables,"chat",conn);
                tableCreate(tables,"associer",conn);
                tableCreate(tables,"lier",conn);
                tableCreate(tables,"model",conn);
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
