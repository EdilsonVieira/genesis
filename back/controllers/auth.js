const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../dao/auth');

function login(req, res) {
    const { username, password } = req.body;
    //console.log(`req.body:${JSON.stringify(req.body)}`)
    if (!username) {
        return res.status(400).json({ message: 'Sem usuário!' });
    }
    if (!password) {
        return res.status(400).json({ message: 'Sem senha!' });
    }
    
    auth.login(req.body)
        .then((user) => {
            if (!user || !bcrypt.compareSync(password, user.password)) {
                return res.status(401).json({ message: 'Credenciais inválidas' });
            }
            const token = jwt.sign({ id: user.id }, 'IYYIFGDJKFLDJFGLDFJDFHGIRRII', { expiresIn: '1h' });
            const result = { token, user };
            //console.log(JSON.stringify(result,null,2));
            res.json(result);
        })
        .catch((e) => {
            console.log(e);
            res.status(500).json({ message: 'Erro no servidor ao logar!' })
        });
}

module.exports = {
    login
}