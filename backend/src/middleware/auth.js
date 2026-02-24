const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Brak tokenu autoryzacyjnego!' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Nieprawidłowy token autoryzacyjny!' });
    }
}

const checkRole = (role) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(403).json({ error: 'Nieautoryzowany dostęp!' });
        }

        if (req.user.rola !== role) {
            return res.status(403).json({ error: 'Brak uprawnień!' });
        }

        next();
    };
};

module.exports = {
    auth,
    checkRole
};