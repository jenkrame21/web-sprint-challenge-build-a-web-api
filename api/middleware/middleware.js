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
                messsage: `No action with ID: ${id}`
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

// Projects
// name	- string - required
// description - string - required
// completed - boolean - not required

module.exports = {
    logger,
    validateActionId
}