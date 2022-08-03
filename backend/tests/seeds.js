// dependencies
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

require('../models/User');
const User = mongoose.model('User');

require('../models/Item');
const Item = mongoose.model('Item');

require('../models/Comment');
const Comment = mongoose.model('Comment');

const generateUsers = async (userNumber) => {
    let generatedUsers = []

    for (let i = 0; i <= userNumber; i++) {
        let currentUser = {
            username: faker.name.firstName(),
            email: faker.internet.email(),
            password: faker.random.word()
        }
        console.log(currentUser);
        generatedUsers.push(currentUser);
    }

    for (const generatedUser of generatedUsers) {
        var userToSave = new User();

        userToSave.username = generatedUser.username;
        userToSave.email = generatedUser.email;
        userToSave.setPassword(generatedUser.password);

        await userToSave.save();
    }
}

const seedDB = async () => {
    // seed users;
    await User.deleteMany({});
    await generateUsers(100);
}

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log(mongoose.Collection.dbName);
    mongoose.set("debug", true);
    seedDB().then(() => {
        mongoose.connection.close();
    }).then(() => {
        console.log("Mongo connection closed!")
    })
    console.log('Mongo connection open!')
}).catch((err) => {
    console.log(err);
})