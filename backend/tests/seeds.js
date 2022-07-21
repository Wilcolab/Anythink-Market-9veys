// dependencies
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

require('../models/User');
const User = mongoose.model('User');

require('../models/Item');
const Item = mongoose.model('Item');

require('../models/Comment');
const Comment = mongoose.model('Comment');

let generatedUsers = [{
    username: 'jordanchude',
    email: 'test@test.com',
    password: 'testpassword'
}];

// let generatedItems = [];


// for (let i = 1; i <= 100; i++) {
//     let user = {
//         username: faker.name.firstName(),
//         email: faker.internet.email(),
//         password: faker.random.word()
//     }

//     generatedUsers.push(user);
// }

// for (let i = 1; i <= 100; i++) {
//     let item = {
//         title: faker.lorem.word(),
//         image: faker.image.imageUrl()
//     }

//     generatedItems.push(item);
// }

const seedDB = async () => {
    const deleteResult = await User.deleteMany({});

    for (let i = 0; i < generatedUsers.length; i++) {
        var user = new User();

        user.username = generatedUsers[i].username;
        user.email = generatedUsers[i].email;
        user.setPassword(generatedUsers[i].password);

        let savedUser = await user.save();
        console.log(savedUser);
        console.log(mongoose.connection.db)
        let queryResult = await mongoose.connection.db.listCollections()
        console.log(queryResult);
    }
    // const insertResult = await User.insertMany(generatedUsers);

    // await Item.deleteMany({});
    // await Item.insertMany(generatedItems);

    // console.log(deleteResult, insertResult);
}

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true, useUnifiedTopology: true
}).then(() => {
    seedDB().then(() => {
        mongoose.connection.close();
    }).then(() => {
        console.log("Mongo connection closed!")
    })
    console.log('Mongo connection open!')
}).catch((err) => {
    console.log(err);
})