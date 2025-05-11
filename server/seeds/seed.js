require('dotenv').config();
const db = require('../config/connection');
const { User } = require('../models');
const cleanDB = require('./cleanDB');

// const seedData = require('./seed-data.json');
const seedData = require('./large-seed-data.json')

const getInterests = require('./interests');
const getHobbies = require('./hobbies');
const getLooking = require('./lookingFor');
const getAbout = require('./about');
const getGender = require('./gender')

const mappedData = seedData.map(({ gender, name, email, dob, picture }) => ({
  firstName: name.first,
  lastName: name.last,
  email: email,
  dob: dob.date,
  about: "I'm a very wonderful person!",
  password: "password123",
  gender: getGender(gender),
  about: getAbout(),
  hobbies: getHobbies(),
  interests: getInterests(),
  image: picture.large,
  lookingFor: getLooking(),
  // message: [{
  //   "text": "Hey Bob! How are you?",
  //   "userId": "6574589a07f2b1e63fa59444",
  //   "read": false
  // }]
}));

db.once('open', async () => {
  await cleanDB('User', 'users');


  // var obj = { data: mappedData };

  // var json = JSON.stringify(obj);

  // var fs = require('fs');
  // fs.writeFile('myjsonfile.json', json, 'utf-8', () => { });

  const usersData = await User.insertMany(mappedData);

  for (let i = 0; i < usersData.length; i++) {
    await User.findOneAndUpdate(
      { _id: usersData[i]._id.toString() },
      {
        $addToSet: {
          // interests: usersData[i].interests,
          // outbox: usersData[i].message
        },
        $set:
        {
          // image: usersData[i].image
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );
  }


  // console.log(usersData[0]._id.toString());

  console.log('Users seeded!');
  process.exit(0);
});
