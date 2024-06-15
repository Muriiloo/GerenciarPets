const express = require('express');
const router = express.Router();

let adocoes = [];

router.post('/', (req, res) => {
    const { interestId, petId } = req.body;
    const novaAdocao = { id: Date.now(), interestId, petId, date: new Date() };
    adocoes.push(novaAdocao);
    res.status(201).json(novaAdocao);
});

router.get('/', (req, res) => {
    res.status(200).json(adocoes);
});

module.exports = router;
