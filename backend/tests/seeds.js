// dependencies
const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker');

require('../models/User');
const User = mongoose.model('User');

require('../models/Item');
const Item = mongoose.model('Item');

require('../models/Comment');
const Comment = mongoose.model('Comment');

// Users, items, and comments
let generatedUsers = []
let generatedItems = []

const generateUsers = async (userNumber) => {

    for (let i = 1; i < userNumber; i++) {
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

const generateItems = async (usersForItems) => {

    for (let i = 1; i <= usersForItems; i++) {
        
        let currentItem = {
            title: faker.vehicle.vehicle(),
            description: faker.color.human(),
            image: faker.image.abstract(),
        }

        console.log(currentItem);
        generatedItems.push(currentItem);
    }

    console.log(generatedItems);

    for (const generatedItem of generatedItems) {
        var itemToSave = new Item(generatedItem);

        for (let i = 0; i < generatedUsers.length; i++) {
            let user = generatedUsers[i].username
            let username = await User.findOne({username: user})
            itemToSave.seller = username;
        }
        
        await itemToSave.save();
    }
}

const generateAll = async (total) => {
    await generateUsers(total);
    await generateItems(total);
    // await generateComments(total);
}

const seedDB = async () => {
    await Item.deleteMany({});
    await User.deleteMany({});
    await generateAll(3)
}

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log(`MongoDB Database: ${mongoose.Collection.dbName}`);
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

// async function createDependentItems() {
//     // Create the first item
//     const item1 = await Item.create({
//       name: 'Item 1',
//     });
  
//     // Create the second item, which depends on the first item
//     const item2 = await Item.create({
//       name: 'Item 2',
//       dependency: item1._id,
//     });
//   }