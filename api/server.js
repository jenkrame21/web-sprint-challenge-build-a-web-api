const express = require('express');
const helmet = require('helmet');
const mw = require('./middleware/middleware.js');

const actionsRouter = require('./actions/actions-router.js');
const projectsRouter = require('./projects/projects-router.js');

const server = express();

server.use(helmet());
server.use(express.json());

// Global middlewares
server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.get('/', mw.logger, (req, res) => {
    res.send(console.log("Api lives here!"));
});

module.exports = server;
