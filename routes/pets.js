const express = require('express');
const router = express.Router();

let pets = [];

router.post('/', (req, res) => {
    const { name, breed, age } = req.body;
    const novoPet = { id: Date.now(), name, breed, age };
    pets.push(novoPet);
    res.status(201).json(novoPet);
});

router.get('/', (req, res) => {
    res.status(200).json(pets);
});

module.exports = router;
