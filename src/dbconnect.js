import mongoose from 'mongoose';

export default () => {
  if (process.env.NODE_ENV === 'production') {
    mongoose.connect('mongodb://mongo:27017/todo-application', {
      useNewUrlParser: true,
    });
  } else {
    mongoose.connect('mongodb://localhost:27017/todo-application', {
      useNewUrlParser: true,
    });
  }

  const db = mongoose.connection;

  db.on('error', (err) => {
    /* eslint-disable */
    console.error('ERROR HERE');
    console.error(err);
    /* eslint-enable */
  });

  db.once('open', () => {
    console.log('We are Connected to the DB'); // eslint-disable-line
  });
};
