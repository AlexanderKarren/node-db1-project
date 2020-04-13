const express = require('express')

const db = require("../data/dbConfig.js");

const router = express.Router();

router.get('/', (req, res) => {
    db('accounts').then(response => res.status(200).json({ data: response }))
    .catch(error => res.status(500).json({ error: error.message }));
})

router.get('/:id', validateAccountId, (req, res) => {
    db('accounts').where('id', req.params.id).then(response => res.status(200).json({ data: response }))
    .catch(error => res.status(500).json({ error: error.message }));
})

router.post('/', (req, res) => {
    db('accounts').insert(req.body).then(response => {
        db('accounts').where('id', response[0]).then(response => res.status(201).json({ data: response }))
        .catch(error => res.status(500).json({ error: error.message }));
    })
    .catch(error => res.status(500).json({ error: error.message }));
})

router.put('/:id', validateAccountId, (req, res) => {
    db('accounts').where('id', req.params.id).update(req.body).then(response => {
        db('accounts').where('id', req.params.id).then(response => res.status(201).json({ data: response }))
        .catch(error => res.status(500).json({ error: error.message }));
    })
    .catch(error => res.status(500).json({ error: error.message }));
})

router.delete('/:id', validateAccountId, (req, res) => {
    db('accounts').where('id', req.params.id).then(findRes => {
        db('accounts').where('id', req.params.id).del().then(delRes => res.status(200).json({ data: findRes[0] }))
        .catch(error => res.status(500).json({ error: error.message }));
    })
    .catch(error => res.status(500).json({ error: error.message }));
})

function validateAccountId(req, res, next) {
    db('accounts').where('id', req.params.id).then(response => {
        if (response.length > 0) next();
        else res.status(404).json({ message: `Could not find account with id ${req.params.id}`})
    })
}

module.exports = router;