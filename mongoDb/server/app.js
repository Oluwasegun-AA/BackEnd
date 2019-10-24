import express from 'express';
import dotenv from 'dotenv';
import { Server } from 'http';
import socket from 'socket.io';

import { catchAllError, connectionMessage } from '../helpers';
import serverMiddleWares from '../middlewares/serverMiddlewares';

dotenv.config();
const app = express();
const { PORT } = process.env;
const http = Server(app);
const io = socket(http);

io.on('connection', socket => {
  process.stdout.write('A user connected');

  setTimeout(() => {
    socket.emit('connectedEvent', {
      data: 'Sent a message 4seconds after connection!',
    });
  }, 4000);

  socket.on('disconnect', () => {
    process.stdout.write('A user disconnected');
  });
});

serverMiddleWares(app);

catchAllError(app);

app.listen(PORT, connectionMessage(PORT));
