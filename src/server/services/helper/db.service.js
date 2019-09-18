import mongoose from 'mongoose';

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);

const {
  DB_HOST, DB_DATABASE, DB_USERNAME, DB_PASSWORD, DB_REPLICA_NAME,
} = process.env;

let uri = `mongodb://${DB_HOST}/${DB_DATABASE}`;

if (DB_REPLICA_NAME) {
  uri = `${uri}?replicaSet=${DB_REPLICA_NAME}`;
}
console.log(uri);
if (DB_PASSWORD) {
  mongoose.connect(uri, {
    auth: {
      user: DB_USERNAME || '',
      password: DB_PASSWORD || '',
    },
  }); // mongodb://username:password@host:port/database
} else {
  mongoose.connect(uri, {});
}


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'database connection error:'));
db.once('open', () => {
  console.log('database connect successfully');
});
export default mongoose;
