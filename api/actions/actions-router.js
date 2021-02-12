const express = require('express');

const Actions = require('./actions-model');
const mw = require('../middleware/middleware.js');

const router = express.Router();

// 1 - GET - /api/actions - Returns an array of actions (or an empty array) as the body of the response
router.get('/', (req, res, next) => {
    Actions.get()
        .then((actions) => {
            res.status(200).json(actions);
        })
        .catch((error) => {
            next(error);
        })
});

// 2 - GET - /api/actions/:id - Returns an action with the given `id` as the body of the response
router.get('/:id', mw.validateActionId, (req, res) => {
    res.status(200).json(req.action);
});

// 3 - POST - /api/actions - Returns the newly created action as the body of the response
router.post('/', mw.validateAction, (req, res, next) => {
    Actions.insert(req.body)
        .then((action) => {
            res.status(201).json(action);
        })
        .catch((error) => {
            next(error);
        })
});

// 4 - PUT - /api/actions/:id - Returns the updated action as the body of the response
router.put('/:id', mw.validateActionId, mw.validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then((action) => {
            res.status(200).json(action);
        })
        .catch((error) => {
            next(error);
        })
});

// 5 - DELETE - /api/actions/:id - Returns no response body
router.delete('/:id', mw.validateActionId, (req, res, next) => {
    const { id } = req.params;
    Actions.remove(id)
        .then(() => {
            res.status(200).json({ 
                message: "Action has been removed"
            });
        })
        .catch((error) => {
            next(error);
        })
});

// ACTION Server Error Middleware
router.use((err, req, res) => {
    res.status(500).json({
        message: "Error retrieving action data",
        error: err.message
    });
});

module.exports = router;