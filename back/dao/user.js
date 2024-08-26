const knex = require('knex');
const knexfile = require('../knexfile');
const bcrypt = require('bcryptjs');
const db = knex(knexfile.development);

async function select() {
    return new Promise(async (resolve, reject) => {
        await db('users').select('id', 'username', 'perfil_id').orderBy('id')
            .then((resultado) => {
                resolve(resultado)
            })
            .catch((e) => {
                reject(e);
            });
    })
}

async function selectId(id) {
    return new Promise(async (resolve, reject) => {
        await db('users').select('id', 'username', 'perfil_id').where({ id }).first()
            .then((resultado) => {
                resolve(resultado)
            })
            .catch((e) => {
                reject(e);
            });
    })
}

async function insert(data) {
    return new Promise(async (resolve, reject) => {
        const { username, password, perfil_id } = data;
        const hashedPassword = bcrypt.hashSync(password, 8);
        await db('users').insert({ username, password: hashedPassword, perfil_id: perfil_id })
            .then((res) => {
                resolve(res);
            })
            .catch((e) => {
                console.log(e);
                reject(e);
            })
        
    })
}

async function update(data) {
    return new Promise(async (resolve, reject) => {

        const { id, username, password, perfil_id } = data;
        const hashedPassword = password ? bcrypt.hashSync(password, 8) : null;

        let objUpd = { username };
        if (hashedPassword) {
            objUpd.password = hashedPassword;
        }
        if (perfil_id) {
            objUpd.perfil_id = perfil_id;
        }
        await db('users').where({ id }).update(objUpd)
            .then((res) => {
                resolve(res);
            })
            .catch((e) => {
                reject(e);
            })
    })
}

async function excluir(data) {
    return new Promise(async (resolve, reject) => {
        db('users').where({id: data.id}).del()
        .then((res)=>{
            resolve(res);
        })
        .catch((e)=>{
            reject(e);
        })
    })
}

module.exports = {
    select,
    selectId,
    insert,
    update,
    excluir
}