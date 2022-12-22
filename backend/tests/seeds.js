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
const generatedUsers = []
const generatedItems = []
const generatedComments = [];


const generateUsers = async (userNumber) => {

    for (let i = 0; i < userNumber; i++) {
        let currentUser = {
            username: faker.name.firstName(),
            email: faker.internet.email(),
            password: 'faker.random.word()'
        }
        
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

    for (let i = 0; i <= usersForItems; i++) {
        
        let currentItem = {
            title: faker.vehicle.vehicle(),
            description: faker.color.human(),
            image: faker.image.abstract(),
        }

        generatedItems.push(currentItem);
    }

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

const generateComments = async (itemComments) => { 
    let commentToAdd;
    let itemForComment;

    for (let i = 0; i < itemComments; i++) {
        let commentToAdd = {
            body: faker.word.adjective(),
        }
        
        generatedComments.push(commentToAdd);
    }

    for (const generatedComment of generatedComments) {

        for (let i = 0; i < generatedItems.length; i++) {
            let item = generatedItems[i].title;
            itemForComment = await Item.findOne({title: item});
            console.log(itemForComment);

            commentToAdd = new Comment(generatedComment);
            await commentToAdd.save();
            await itemForComment.comments.push(commentToAdd);
            await itemForComment.save();
        }

        for (let i = 0; i < generatedUsers; i++) {
            let user = generatedUsers[i].username;
            let userForComment = await User.find({username: user});

            commentToAdd.seller = userForComment;
            await commentToAdd.save();
        }

    }
        
}

const generateAll = async (total) => {
    await generateUsers(total);
    await generateItems(total);
    await generateComments(total);
}

const seedDB = async () => {
    await Item.deleteMany({});
    await User.deleteMany({});
    await Comment.deleteMany({});
    await generateAll(3);
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