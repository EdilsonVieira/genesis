const knex = require('knex');
const knexfile = require('../knexfile');
const db = knex(knexfile.development);
const dayjs = require('dayjs');
var fs = require('fs');

// Imagens do Sistema
const salvarArquivo = async (data,dir='\\routes\\public\\img\\hotel\\') => {
    // Decodificar o base64 em string
    let bufferObj = Buffer.from( data.dados , "base64");
    let decodedString = bufferObj.toString("utf8");
    //Transformar o base64 em Arquivo Fisico
    var strip = 'data:' + data.tipo + ';base64,'
    var base64Data = decodedString.replace(strip, "");
    var ext = data.tipo.replace('image/', "");
    var nomearquivo = `${data.nome}.${ext}`
    //console.log(data.nome)
    if (base64Data) {
        var pathRoot = require('path').resolve(__dirname,'..')
        var outputPathFile = pathRoot+`${dir}${nomearquivo}`
        fs.writeFile(outputPathFile, base64Data, 'base64', function(err) {
            if (err) {
                console.log(err);
            }
        });
    }
    return nomearquivo
}

const inserirImagem = async (data) => {
    return new Promise(async (resolve, reject) => {
        if (!data.hasOwnProperty('deleteold')) {
            data.deleteold = true
        }
        // A transação é necessária pois há mais de uma operação diferente
        await db.transaction(async trx => {
            // Inserir a nova imagem...
            const dadosimagem = {
                tipo: data.tipo,
                nome: data.nome,
                dados: data.dados,
                created_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
            }
            const idimagem = await trx('imagem').insert(dadosimagem, 'id');
            console.log(`idimagem: ${JSON.stringify(idimagem)}`)
            // Excluir a antiga se houver, a não ser se deleteold seja false...
            if (data.deleteold) {
                const selResult = await trx(data.tabela).select(data.fk).where({[data.chave]: data.valor})
                if (selResult.length > 0) {
                    var ht = selResult[0]
                    var idAExcluir
                    try {
                        idAExcluir = parseInt(ht[data.fk])
                    } catch {
                        idAExcluir = 0
                    }
                    if (idAExcluir > 0) {
                        var selectCountResult = await trx(data.tabela)
                            .count({count: data.chave}).where({[data.fk]: idAExcluir})
                        // Somente excluir se for a última referência naquele campo...
                        if(selectCountResult && selectCountResult.length > 0 && 
                            selectCountResult[0]['count'] == 1) {
                            // Nulo na referência...
                            await trx(data.tabela).update({[data.fk]: null})
                                .where({[data.chave]: data.valor})
                            // Exclui a chave referenciada...
                            await trx('imagem').where({id: idAExcluir})
                                .delete()
                        }
                    }
                }
            }
            // Atualizar a fk...
            const fk = {
                [data.fk]: idimagem[0][data.chave]
            }
            const key = {
                [data.chave]: data.valor
            }
            // console.log(JSON.stringify(fk))
            console.log(`data.tabela: ${data.tabela}`)
            console.log(`fk: ${JSON.stringify(fk)}`)
            await trx(data.tabela).where(key).update(fk);
            const result = {
                imagem: idimagem[0]
            }
            // salvar arquivo, quando for o caso
            if (data.salvararquivo) {
                await salvarArquivo(data)
            }
            resolve({result, message: 'Imagem salva com sucesso.'});
        })
        .catch(e => {
            console.log(JSON.stringify(e))
            e.code = 500;
            reject(e);
        })
    })
}

const atualizarImagem = async (data) => {
    return new Promise(async (resolve, reject) => {
        if (data.id) {
            await db.transaction(async trx => {
                var dadosimagem = {
                    tipo: data.tipo,
                    nome: data.nome,
                    dados: data.dados,
                    updated_at: dayjs().format('YYYY-MM-DD HH:mm:ss')
                }
                await trx('imagem').where({id: data.id}).update(dadosimagem);

                // salvar arquivo, quando for o caso
                if (data.salvararquivo) {
                    await salvarArquivo(data)
                }

                resolve({message: 'Imagem atualizada com sucesso.'});
            })
            .catch(e => {
                e.code = 500;
                reject(e);
            })
        } else {
            const e = {
                code: 400,
                message: 'O id da imagem é obrigatório para atualização.'
            }
            reject(e);            
        }
    })    
}

const selecionarImagem = (data) => {
    return new Promise(async (resolve, reject) => {
        if (!data.idioma) {
            data.idioma = 'pt-BR'
        }
        
        var sqlStmt = `select * from imagem where 1 = 1 `;

        if (data.hasOwnProperty('id')) {
            sqlStmt += ' and imagem.id = ' + data.id
        }

        if (data.hasOwnProperty('tipo')) {
            sqlStmt += ' and imagem.tipo = ' + data.tipo
        }

        if (data.hasOwnProperty('nome')) {
            if (!data.nome) {
                data.nome = "%%"
            }
            sqlStmt += ` and upper(imagem.nome) LIKE '%${data.nome.toUpperCase()}%' `
        }

        if (data.hasOwnProperty('orderby')) {
            if (data.orderby) {
                sqlStmt += ` order by imagem.${data.orderby}`
            } else {
                sqlStmt += ` order by imagem.id`
            }
        } else {
            sqlStmt += ` order by imagem.id`
        }

        aQuery = db.raw(sqlStmt);

        aQuery.then(resp => {
            let resultado = resp.rows;
            if (resultado.length === 1) resultado = resp.rows[0];
            resolve(resultado);
        })
        .catch(e => {
            e.code = 500;
            reject(e);
        })
    })
}

module.exports = {
    inserirImagem,
    atualizarImagem,
    selecionarImagem,
    salvarArquivo
}
