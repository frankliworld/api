const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://space:O6GXmPqy24x9qHPq@cluster0.5pte8.mongodb.net/myApp?retryWrites=true&w=majority')

const User = mongoose.model('User', {
  name: String,
  age: Number
});

const createUser = async(name, age) => {
  const user = new User({ name, age });
  const saveUser = await user.save();
  console.log(saveUser);
}
// createUser('Frank', 26);

const searchUsers = async() => {
  const users = await User.find();
  console.log(users);
}
// searchUsers();

const searchUser = async(name) => {
  const user = await User.findOne({ name });
  console.log(user);
}
// searchUser('Frank');

const updateUser = async(name, age) => {
  const user = await User.findOneAndUpdate({ name }, { age });
  console.log(user);
}
// updateUser('Frank', 24);

const removeUser = async(name) => {
  const user = await User.findOneAndDelete({ name });
  console.log(user);
}
// removeUser('Frank');