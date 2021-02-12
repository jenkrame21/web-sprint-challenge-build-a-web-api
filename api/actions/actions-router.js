const express = require('express');

const Actions = require('./actions-model');
const mw = require('../middleware/middleware.js');

const router = express.Router();

// 1 - GET - /api/actions - Returns an array of actions (or an empty array) as the body of the _response_
router.get('/', (req, res, next) => {
    Actions.get()
        .then((actions) => {
            // Working!
            res.status(200).json(actions);
        })
        .catch((error) => {
            next(error);
        })
});

// 2 - GET - /api/actions/:id - Returns an action with the given `id` as the body of the _response_
router.get('/:id', mw.validateActionId, (req, res, next) => {
    // Working!
    res.status(200).json(req.action);
});

// 3 - POST - /api/actions - Returns the newly created action as the body of the _response_

// 4 - PUT - /api/actions/:id - Returns the updated action as the body of the _response_

// 5 - DELETE - /api/actions/:id - Returns no _response_ body

// ACTION Server Error Middleware
router.use((err, req, res) => {
    res.status(500).json({
        message: "Error retrieving action data",
        error: err.message
    });
});

module.exports = router;