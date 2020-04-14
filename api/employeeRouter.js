const express = require('express');

const db = require("../data/dbConfig.js");
const router = express.Router();

router.get('/', (req, res) => {
    db('employees')
    .then(response => res.status(200).json({ data: response }))
    .catch(error => res.status(500).json({ error: error.message }));
})

module.exports = router;