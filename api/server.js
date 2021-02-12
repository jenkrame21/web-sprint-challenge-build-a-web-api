const express = require('express');
const helmet = require('helmet');
const mw = require('./middleware/middleware.js');

const actionsRouter = require('./actions/actions-router.js');
const projectsRouter = require('./projects/projects-router.js');

const server = express();

server.use(helmet());
server.use(express.json());

server.use('/api/actions', actionsRouter);
server.use('/api/projects', projectsRouter);

server.get('/', mw.logger, (req, res) => {
    res.send(`<h2>"API lives here!"</h2>`);
});

module.exports = server;
