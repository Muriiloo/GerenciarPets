const express = require('express');
const router = express.Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'murilo' && password === '123456') {
        req.session.user = username;
        res.status(200).json({ message: 'Login realizado com sucesso' });
    } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
    }
});

router.post('/logout', (req, res) => {
    req.session.destroy();
    res.status(200).json({ message: 'Logout realizado com sucesso' });
});

module.exports = router;
