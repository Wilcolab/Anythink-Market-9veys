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

let generatedUsers = [];
let generatedItems = [];


for (let i = 1; i <= 100; i++) {
    let user = {
        username: faker.name.firstName(),
        email: faker.internet.email(),
        password: faker.random.word()
    }

    generatedUsers.push(user);
}

for (let i = 1; i <= 100; i++) {
    let item = {
        title: faker.lorem.word(),
        image: faker.image.imageUrl()
    }

    generatedItems.push(item);
}

const seedDB = async () => {
    await User.deleteMany({});
    await User.insertMany(generatedUsers);

    await Item.deleteMany({});
    await Item.insertMany(generatedItems);
}


seedDB().then(() => {
    mongoose.connection.close();
})