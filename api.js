const express = require("express");
const mongoose = require("mongoose");
const user = require("./user.controller");
const app = express();
const port = 3000;

app.use(express.json());
mongoose.connect('mongodb+srv://space:O6GXmPqy24x9qHPq@cluster0.5pte8.mongodb.net/myApp?retryWrites=true&w=majority')

app.get("/users", user.list)
app.get("/users/:id", user.get)
app.post("/users", user.create)
app.put("/users/:id", user.update)
app.patch("/users/:id", user.update)
app.delete("/users/:id", user.remove)

app.use(express.static("app"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.get("*", (req, res) => {
  res.status(404).send("Not Found");
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
