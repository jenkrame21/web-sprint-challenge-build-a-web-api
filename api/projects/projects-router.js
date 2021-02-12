const express = require("express");

const Projects = require("./projects-model.js");
const mw = require("../middleware/middleware.js");

const router = express.Router();

// 1 - GET - /api/projects - Returns an array of projects (or an empty array) as the body of the response
router.get('/', (req, res, next) => {
    Projects.get()
        .then((projects) => {
            res.status(200).json(projects);
        })
        .catch((error) => {
            next(error);
        });
});

// 2 - GET - /api/projects/:id - Returns a project with the given `id` as the body of the response
router.get('/:id', mw.validateProjectId, (req, res) => {
    res.status(200).json(req.project);
});

// 3 - POST - /api/projects - Returns the newly created project as the body of the response
router.post('/', mw.validateProject, (req, res, next) => {
    Projects.insert(req.body)
        .then((project) => {
            res.status(201).json(project);
        })
        .catch((error) => {
            next(error);
        });
});

// 4 - PUT - /api/projects/:id - Returns the updated project as the body of the response
router.put('/:id', mw.validateProjectId, mw.validateProject, (req, res, next) => {
    Projects.update(req.params.id, req.body)
        .then((project) => {
            res.status(200).json(project);
        })
        .catch((error) => {
            next(error);
        })
});

// 5 - DELETE - /api/projects/:id - Returns no response body
router.delete('/:id', mw.validateProjectId, (req, res, next) => {
    Projects.remove(req.params.id)
        .then(() => {
            res.status(200).json({
                message: "Project has been removed"
            });
        })
        .catch((error) => {
            next(error);
        });
})

// 6 - GET - /api/projects/:id/actions Sends an array of actions (or an empty array) as the body of the response
router.get('/:id/actions', mw.validateProjectId, (req, res, next) => {
    const project_id = req.params.id;
    Projects.getProjectActions(project_id)
        .then((projectActions) => {
            res.status(200).json(projectActions);
        })
        .catch((error) => {
            next(error);
        });
});

// PROJECT Server Error Middleware
router.use((err, req, res) => {
    res.status(500).json({
        message: "Error retrieving project data",
        error: err.message
    })
});

module.exports = router;