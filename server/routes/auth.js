const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const jwt = require('jsonwebtoken')
const dbo = require('../db/conn');

router.post('/restaurant_wdai/auth/signin', async (_req, res) => {
    const dbConnect = dbo.getDb();
    let user = await dbConnect.collection('users').findOne({ email: _req.body.email});
    console.log(user);
    if (!user) {
        user = {};
        user._id = '';
        user.email = '';
        user.name = '';
        user.password = '';
        user.salt = '';
        user.loggedInAs = '';
        user.isBanned = true;
    }

    const { _id, password, salt, loggedInAs, name, isBanned } = user;
    const pepper = process.env.PEPPER;
    const hashedPassword = crypto.pbkdf2Sync(`${pepper}${_req.body.password}`, salt, 30000, 64, 'sha256').toString('base64');

    if (hashedPassword === password) {
        const token = jwt.sign(
            {
                _id,
                name,
                loggedInAs,
                isBanned,
            },
            process.env.JWT_SECRET,
        );
        res.json({ token });
    } else {
        res.status(404).send('Invalid credentials');
    }
});

// 
// Creating account
router.post('/restaurant_wdai/auth/signup', async (_req, res) => {
    const dbConnect = dbo.getDb();
    const { email, password, name } = _req.body;
    
    const salt = crypto.randomBytes(32).toString('base64');
    const pepper = process.env.PEPPER;
    const hashedPassword = crypto.pbkdf2Sync(`${pepper}${password}`, salt, 30000, 64, 'sha256').toString('base64');
    
    const user = {
        email,
        name,
        password: hashedPassword,
        salt,
        loggedInAs: 'customer',
        isBanned: false,
    };
    
    try {
        const createdUser = await dbConnect.collection('users').insertOne(user);
        const { _id, loggedInAs, isBanned } = createdUser.ops[0];
        console.log(createdUser)
        const accessToken = jwt.sign(
            {
                _id,
                name,
                loggedInAs,
                isBanned,
            },
            process.env.JWT_SECRET,
            );
            console.log('Account created')
            res.json({ token: accessToken });
        } catch (e) {
        res.status(400).json({ errors: e });
    }
});

module.exports = router;
