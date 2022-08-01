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
    const existingUsers = await User.find({});
    console.log('existingUsers');
    console.log(existingUsers);

    for (const u of generatedUsers) {
        var user = new User();

        user.username = u.username;
        user.email = u.email;
        user.setPassword(u.password);

        let savedUser = await user.save();
        console.log('savedUser')
        console.log(savedUser);
        console.log(mongoose.connection.db)
        // let queryResult = await mongoose.connection.db.listCollections()
        // console.log(queryResult);
    }
    // const insertResult = await User.insertMany(generatedUsers);

    // await Item.deleteMany({});
    // await Item.insertMany(generatedItems);

    // console.log(deleteResult, insertResult);
}

console.log(process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI).then(() => {
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