const user = require('../dao/user')

function select(req, res) {
    user.select(req.body)
    .then((resultado) => {
        res.json(resultado);
    })
    .catch((e)=>{
        console.log(e);
        return res.status(500).json({ message: 'Erro interno ao buscar usuários!' });
    })
}

function selectId(req, res) {
    const { id } = req.params;
    if (!id || id <= 0) {
        return res.status(400).json({ message: 'Id do usuário é obrigatório, e deve ser maior que zero!' });
    }
    user.selectId(id)
    .then((resultado) => {
        if (!resultado) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        } else {
            res.json(resultado);
        }
    })
    .catch((e)=>{
        console.log(e);
        return res.status(500).json({ message: 'Erro interno ao buscar usuários!' });
    })
};

function insert(req, res) {
    if (!req.body.username) {
        return res.status(400).json({ message: 'Nome do usuário é obrigatório!' });
    }
    user.insert(req.body)
    .then(() => {
        res.status(201).json({ message: 'Usuário criado!' });
    })
    .catch((e)=>{
        console.log(e);
        res.status(500).json({ message: 'Erro interno ao tentar criar usuário!' });
    })
};

function update(req, res) {
    const data = {...req.body, ...req.params};
    if (!data.id || data.id <= 0) {
        return res.status(400).json({ message: 'Id do usuário é obrigatório e deve se maior que zero!'});    
    }
    user.update(data)
    .then((resultado)=>{
        if (!resultado) {
            return res.status(404).json({ message: 'Usuário não encontrado!', resultado });    
        } else {
            return res.status(202).json({ message: 'Usuário atualizado!', resultado });
        }
    })
    .catch((e)=>{
        console.log(e);
        res.status(500).json({ message: 'Erro interno ao tentar atualizar usuário!' });
    })
};

function excluir(req, res) {
    const data = req.params;
    if (!data.id || data.id <= 0) {
        return res.status(400).json({ message: 'Id do usuário é obrigatório para excluir usuário!'});    
    }
    user.excluir(data)
    .then((resultado)=>{
        res.status(201).json({ message: 'Usuário excluído!', resultado });
    })
    .catch((e)=>{
        console.log(e);
        res.status(500).json({ message: 'Erro interno ao tentar excluir usuário!' });
    })
};

module.exports = {
    select,
    selectId,
    insert,
    update,
    excluir
}