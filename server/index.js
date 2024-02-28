import { setupServer } from './app.js';

setupServer();

process.on('uncaughtException', error => {
  global.console.error('ERR_UNCAUGHT_EXCEPTION', error);
});

process.on('unhandledRejection', error => {
  global.console.error('ERR_UNHANDLED_REJECTION', error);
});
