const mongoose = require('mongoose');
const user = require('./models/user');
const { data: sampleUsers } = require('./data');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/instagram');
}

main()
  .then(() => {
    console.log('Database Connected');
  })
  .catch((err) => {
    console.log(err);
  });

user
  .insertMany(sampleUsers)
  .then(() => {
    console.log('Insert OK');
  })
  .catch((err) => {
    console.log(err);
  });
