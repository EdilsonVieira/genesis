// Middleware de autenticação
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {

    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, 'IYYIFGDJKFLDJFGLDFJDFHGIRRII', (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Falha na autenticação do token' });
        }
        req.userId = decoded.id;
        next();
    });
}

module.exports = {
    verifyToken
}