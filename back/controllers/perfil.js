const perfil = require('../dao/perfil')

function select(req, res) {
    perfil.select(req.body)
        .then((perfis) => {
            res.json(perfis);
        })
        .catch((e) => {
            console.log(e);
            return res.status(500).json({ message: 'Erro interno ao tentar buscar perfis!' });
        })
}

function selectId(req, res) {
    const { id } = req.params;
    if (!id || id <= 0) {
        return res.status(400).json({ message: 'Id do perfil é obrigatório, e deve ser maior que zero!' });
    }
    perfil.selectId(id)
        .then((resultado) => {
            if (!resultado) {
                return res.status(404).json({ message: 'Perfil não encontrado!' });
            } else {
                res.json(resultado);
            }
        })
        .catch((e) => {
            console.log(e);
            return res.status(500).json({ message: 'Erro interno ao buscar perfil!' });
        })
};

function insert(req, res) {
    if (!req.body.perfil) {
        return res.status(400).json({ message: 'O nome do perfil é obrigatório para criar um novo perfil!' });
    }
    perfil.insert(req.body)
    .then(() => {
        res.status(201).json({ message: 'Perfil criado!' });
    })
    .catch((e)=>{
        console.log(e);
        res.status(500).json({ message: 'Erro interno ao tentar criar perfil!' });
    })
};

function update(req, res) {
    const data = {...req.body, ...req.params};
    if (!data.id || data.id <= 0) {
        return res.status(400).json({ message: 'Id do perfil é obrigatório e deve se maior que zero!'});    
    }
    if (data.hasOwnProperty('perfil') && !data.perfil) {
        return res.status(400).json({ message: 'Nome do perfil não pode ser vazio!'});
    }
    perfil.update(data)
    .then((resultado)=>{
        if (!resultado) {
            return res.status(404).json({ message: 'Perfil não encontrado!', resultado });    
        } else {
            return res.status(202).json({ message: 'Perfil atualizado!', resultado });
        }
    })
    .catch((e)=>{
        console.log(e);
        res.status(500).json({ message: 'Erro interno ao tentar atualizar perfil!' });
    })
};

function excluir(req, res) {
    const data = req.params;
    if (!data.id || data.id <= 0) {
        return res.status(400).json({ message: 'Id do perfil é obrigatório e deve ser maior que zero para excluir perfil!'});    
    }
    perfil.excluir(data)
    .then((resultado)=>{
        res.status(201).json({ message: 'Perfil excluído!', resultado });
    })
    .catch((e)=>{
        console.log(e);
        res.status(500).json({ message: 'Erro interno ao tentar excluir perfil!' });
    })
};

module.exports = {
    select,
    selectId,
    insert,
    update,
    excluir
}