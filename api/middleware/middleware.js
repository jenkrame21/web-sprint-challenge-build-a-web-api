const Actions = require('../actions/actions-model.js');
// const Projects = require('../projects/projects-model.js');

// --------- GLOBAL MIDDLEWARE --------- //
function logger(req, res, next) {
    console.log(req.description, req.completed);
    next();
}

// --------- ACTIONS MIDDLEWARES --------- //
// project_id - Number - Required, must be the id of an existing project
// description - String - Up to 128 characters long, required
// notes - String - No size limit, required. Used to record additional notes or requirements to complete the action
// completed - Boolean - Used to indicate if the action has been completed, not required

// Validating Action with Action ID
const validateActionId = async (req, res, next) => {
    const { id } = req.params;
    try {
        const action = await Actions.get(id);
        if (!action) {
            // Working!
            res.status(400).json({
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
        // Working!
        res.status(400).json({
            message: "Required Fields: project_id, description, notes"
        });
    } else if (req.body.description.length > 128) {
        // Working!
        res.status(400).json({
            message: "Max character length in description is 128 characters"
        });
    } else {
        next();
    }
}


// --------- PROJECTS MIDDLEWARES --------- //
// name	- string - required
// description - string - required
// completed - boolean - not required

module.exports = {
    logger,
    validateActionId,
    validateAction
}