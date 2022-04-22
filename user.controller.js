const Users = require("./User");
const User = {
  list: (req, res) => {
    Users.find({}, (err, users) => {
      err ? res.status(500).send(err) : res.status(200).send(users);
    });
  },
  get: (req, res) => {
    Users.findById(req.params.id, (err, user) => {
      err ? res.status(500).send(err) : res.status(200).send(user);
    });
  },
  create: async (req, res) => {
    console.log(req.body);
    const user = new Users(req.body);
    const saveUser = await user.save();
    res.status(200).send(saveUser._id);
  },
  update: (req, res) => {
    const { id } = req.params;
    Users.findByIdAndUpdate(id, req.body, (err, user) => {
      err ? res.status(500).send(err) : res.status(200).send("user updated");
    });
  },
  remove: (req, res) => {
    const { id } = req.params;
    Users.findByIdAndRemove(id, (err, user) => {
      err ? res.status(500).send(err) : res.status(200).send("user removed");
    });
  },
};

module.exports = User;
