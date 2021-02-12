const express = require("express");

const Projects = require("./projects-model.js");
const mw = require("../middleware/middleware.js");

const router = express.Router();

// 1 - GET - /api/projects - Returns an array of projects (or an empty array) as the body of the response
router.get('/', (req, res, next) => {
    Projects.get()
        .then((projects) => {
            // Working!
            res.status(200).json(projects);
        })
        .catch((error) => {
            next(error);
        });
});

// 2 - GET - /api/projects/:id - Returns a project with the given `id` as the body of the response
router.get('/:id', mw.validateProjectId, (req, res, next) => {
    res.status(200).json(req.project);
});

// 3 - POST - /api/projects - Returns the newly created project as the body of the response

// 4 - PUT - /api/projects/:id - Returns the updated project as the body of the response

// 5 - DELETE - /api/projects/:id - Returns no _response_ body

// PROJECT Server Error Middleware
router.use((err, req, res) => {
    res.status(500).json({
        message: "Error retrieving project data",
        error: err.message
    })
});

module.exports = router;