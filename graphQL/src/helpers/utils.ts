import { statusCodes, statusMessages } from './status';

const log = (string: any) => {
  process.stdout.write(`${string}\n`);
};

const connectionMessage = (port: number) => {
  log(`Server started on port ${port}`);
};

const catchAllError = (app: any) =>
  app.use('*', (req: any, res: any) =>
    res.status(404).send({
      status: statusCodes.badRequest,
      message: statusMessages.routeNotFound(req),
    })
  );

export { log, connectionMessage, catchAllError };
