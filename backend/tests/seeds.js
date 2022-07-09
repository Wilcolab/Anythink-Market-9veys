// dependencies
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

require('../models/User');
const User = mongoose.model('User');

require('../models/Item');
const Item = mongoose.model('Item');

require('../models/Comment');
const Comment = mongoose.model('Comment');

mongoose.connect(process.env.MONGODB_URI);

// let seededUsers = (100) => [
//     {
//         username: faker.name.firstName(),
//         email: faker.internet.email(),
//         password: faker.random.word()
//     }
// ]

let generatedUsers = [];


for (let i = 0; i <= 100; i++) {
    let user = {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.random.word()
    }

    generatedUsers.push(user);
}

const seedDB = async () => {
    await User.deleteMany({});
    await User.insertMany(generatedUsers);
}


seedDB().then(() => {
    mongoose.connection.close();
})