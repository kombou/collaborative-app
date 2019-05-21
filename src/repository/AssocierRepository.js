const r = require("rethinkdb");
const ProjetRepository = require('./ProjetRepository');
const AccountRepository = require('./AccountRepository');

let associerRepository = {};
r.connect({ host: "localhost", port: 28015 }, (err, conn) => {
    associerRepository.findAllUserProjet =   (id_user) => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("associer")
                .filter({ id_user: id_user })
                // .run(conn, (err, users) => {
                //  if (err) reject(err);
                //  console.log(users[0]);
                //  resolve(users[0]);
                // });
                .run(conn)
                .then(function(cursor) {
                    return cursor.toArray()
                        .then(function(associer) {
                          
                          

                            resolve(waitCheckAssociation(associer))

                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };
    associerRepository.findById = (id_projet, id_user) => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("associer")
                .filter({ id_projet: id_projet, id_user: id_user })
                // .run(conn, (err, users) => {
                //  if (err) reject(err);
                //  console.log(users[0]);
                //  resolve(users[0]);
                // });
                .run(conn)
                .then(function(cursor) {
                    return cursor.toArray()
                        .then(function(associer) {
                            resolve(associer[0]);
                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };

    associerRepository.findUsersOnProject = (id_projet) => {
        return new Promise((resolve, reject) => {
            r
                .db("test")
                .table("associer")
                .filter({ id_projet: id_projet })
                // .run(conn, (err, users) => {
                //  if (err) reject(err);
                //  console.log(users[0]);
                //  resolve(users[0]);
                // });
                .run(conn)
                .then(function(cursor) {
                    return cursor.toArray()
                        .then(function(associer) {
                            resolve(waitCheckUser(associer));
                        });
                })
                .catch(function(err) {
                    reject(err);
                });
        });
    };

    associerRepository.save = (associer) => {
        return new Promise((resolve, reject) => {
            r
                .table("associer")
                .insert(associer)
                .run(conn, (err, associer) => {
                    if (err) reject(err);
                    resolve(associer);
                })
        });
    };
});

async function waitCheckAssociation(associer){
    userProjet = [];

    for (let index = 0; index < associer.length; index++) {
        console.log(associer[index].id_projet);
        const element = await  checkProject(associer[index].id_projet);
         
        if(element!==undefined){
            userProjet.push(element);
        }
        
    }
    return userProjet ;

}
async function waitCheckUser(associer){
    users = [];

    for (let index = 0; index < associer.length; index++) {
       
        const element = await  checkUser(associer[index].id_user);
         
        if(element!==undefined){
            users.push(element);
        }
        
    }
    return users ;

}
function checkProject(id_projet){
    return new Promise (resolve => { ProjetRepository.findByIdProjet(id_projet).then((projet) => {
        resolve(projet);
    })});
}
function checkUser(id_user){
    return new Promise (resolve => { AccountRepository.findById(id_user).then((user) => {
        resolve(user);
    })});
}


module.exports = associerRepository;