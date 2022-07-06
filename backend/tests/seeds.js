// dependencies
const mongoose = require('mongoose');

require('../models/User');
const User = mongoose.model('User');

// const User = require('../models/User');
// const Comment = require('../models/Comment');
// const Item = require('../models/Item');

mongoose.connect(process.env.MONGODB_URI);


const seedUsers = [
    {
        username: 'JordanChude',
        email: 'test@testemail.com',
        password: 'thisisatestpassword'
    }
]

const seedDB = async () => {
    // await User.deleteMany({});
    await User.insertMany(seedUsers);
}


seedDB().then(() => {
    mongoose.connection.close();
})