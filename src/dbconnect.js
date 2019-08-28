import mongoose from 'mongoose';

export default () => {
  mongoose.connect('mongodb://localhost:27020/todo-application', {
    useNewUrlParser: true,
  });

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
