import { statusCodes, statusMessages } from './constants';

const log = string => {
  process.stdout.write(`${string}\n`);
};

const connectionMessage = port => {
  log(`Server started on port ${port}`);
};

const catchAllError = app =>
  app.use('*', (req, res) =>
    res.status(404).send({
      status: statusCodes.badRequest,
      message: statusMessages.routeNotFound(req),
    }));

export { log, connectionMessage, catchAllError };
