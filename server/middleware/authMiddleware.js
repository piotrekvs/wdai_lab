const jwt = require('jsonwebtoken');

exports.authMiddleware = (customer, manager, admin) => async (_req, res, next) => {
    let token = _req.headers.authorization;
    if (!token) {
        res.status(403).send('Forbidden!');
        return;
    }
    token = token.split('Bearer ')[1];
    if (!token) {
        res.status(403).send('Forbidden!');
        return;
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            res.status(403).send('Invalid token');
            return;
        }
        if (!user.loggedInAs) {
            res.status(403).send('Invalid token');
            return;
        }
        const truthTable = [
            (customer && user.loggedInAs === 'customer'),
            (manager && user.loggedInAs === 'manager'),
            (admin && user.loggedInAs === 'admin'),
        ];
        if (!truthTable.includes(true)) {
            res.status(403).send('Missing permissions. Forbidden');
            return;
        }
        _req.user = user;
        next();
    });
};