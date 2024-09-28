const knex = require('knex');

const knexfile = require('../knexfile')

const db = knex(knexfile.development);

async function login(data) {
    return new Promise(async (resolve, reject) => {
        const { username } = data;
        db.select('users.*','perfil.perfil','perfil.menu','config.owner','config.chave','config.valor')
            .from('users')
            .leftJoin('perfil', 'perfil.id', 'users.perfil_id')
            .leftJoin('config', 'config.owner', 'users.id')
            .where({ username })
            .first()
            .then((user) => {
                resolve(user)
            })
            .catch((e) => {
                reject(e);
            })
    })
}

module.exports = {
    login
}