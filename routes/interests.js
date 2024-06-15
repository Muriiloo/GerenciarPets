const express = require('express');
const router = express.Router();

let interesses = [];

router.post('/', (req, res) => {
    const { name, email, phone } = req.body;
    const novoInteresse = { id: Date.now(), name, email, phone };
    interesses.push(novoInteresse);
    res.status(201).json(novoInteresse);
});

router.get('/', (req, res) => {
    res.status(200).json(interesses);
});

module.exports = router;
