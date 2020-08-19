const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<DB_USERNAME>',
  process.env.DB_USERNAME
)
  .replace('<DB_PASSWORD>', process.env.DB_PASSWORD)
  .replace('<DB_CLOUD>', process.env.DB_CLOUD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB Successfully connected!'));

const port = process.env.PORT || 3030;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION! 🤯 Shutting down..');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT REJECTION! 🤯 Shutting down..');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
