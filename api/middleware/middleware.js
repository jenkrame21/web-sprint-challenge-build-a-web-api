const Actions = require('../actions/actions-model.js');
const Projects = require('../projects/projects-model.js');

// --------- GLOBAL MIDDLEWARE --------- //
function logger(req, res, next) {
    console.log(req.description, req.completed);
    next();
}

// --------- ACTIONS MIDDLEWARES --------- //
// Validating Action with Action ID
const validateActionId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const action = await Actions.get(id);
        if (!action) {
            res.status(404).json({
                messsage: `Action ID: ${id} does not exist`
            });
        } else {
            req.action = action;
            next();
        }
    } catch(error) {
        res.status(500).json({
            message: `Server error: ${error}`
        });
    }
}

// Validate Action with required fields: project_id (must be id of existing project), description (128 chars limit), notes (No char limit)
const validateAction = (req, res, next) => {
    const { project_id, description, notes } = req.body;
    if (!project_id || !description || !notes) {
        res.status(400).json({
            message: "Required Fields: project_id, description, notes"
        });
    } else if (req.body.description.length > 128) {
        res.status(400).json({
            message: "Max character length in description is 128 characters"
        });
    } else {
        next();
    }
}


// --------- PROJECTS MIDDLEWARES --------- //
// Validating Project with Project ID
const validateProjectId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const project = await Projects.get(id)
        if (!project) {
            res.status(404).json({
                message: `Project ID: ${id} does not exist`
            })
        } else {
            req.project = project;
            next();
        }
    } catch(error) {
        res.status(500).json({
            message: `Server error: ${error}`
        });
    }
}

// Validating Project with required fields: name, description
const validateProject = (req, res, next) => {
    const { name, description } = req.body;
    if ( !name || !description ) {
        res.status(400).json({
            message: "Required fields: name, description"
        });
    } else {
        next();
    }
}

module.exports = {
    logger,
    validateActionId,
    validateAction,
    validateProjectId,
    validateProject
}