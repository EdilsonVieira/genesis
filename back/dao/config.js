const knex = require('knex');
const knexfile = require('../knexfile');
const db = knex(knexfile.development);

async function buscarConfig(dados) {
    return new Promise(async (resolve, reject) => {
        var whereChave = ``;
        if (dados?.chave) {
            whereChave = `and s.chave = '${dados.chave}'`;
        }
        const sql = `
                select json_agg(t.param) as config
                from (
                    select json_build_object(s.chave,s.valor) as param from config s 
                    ${whereChave}
                ) as t 
            `
        await db.raw(sql)
            .then((res) => {
                var obj = {}
                if (res.rows.length > 0) {
                    var params = res.rows[0]['config']
                    for (var i = 0; i < params.length; i++) {
                        var thisObj = params[i]
                        obj = { ...obj, ...thisObj }
                    }
                }
                resolve(obj);
            })
            .catch((e) => {
                reject(e);
            })

    })
}

async function definirConfig(data) {
    return new Promise(async (resolve, reject) => {
        await db.transaction(async trx => {
            var keys = Object.keys(data)
            var ids = ''
            for (var i = 0; i < keys.length; i++) {
                var aKey = keys[i]
                ids = await trx('config')
                    .update({ valor: data[aKey], alterado_por: data.alterado_por })
                    .where({ chave: aKey });
                console.log(`${i}, ids: ${ids}`);
            }
            resolve({ ids, message: 'Configuração atualizada com sucesso.' });
        })
            .catch(e => {
                e.code = 500;
                reject(e);
            })

    })
}

module.exports = {
    buscarConfig,
    definirConfig
}
