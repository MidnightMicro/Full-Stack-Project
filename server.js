const express = require('express');
// const Sequelize = require("sequelize");
const app = express();



const { User } = require('./models');

app.use(express.json());

app.get('/users', (req, res) => {
    // SELECT * FROM "Users";
    User.findAll({ attributes: ['id', 'firstName', 'lastName', 'email'] }).then((users) => {
      console.log(users);
  
      res.json(users);
    })
  })

app.post('/users', (req, res) => {
    console.log(req.body);

    const { firstName, lastName, email } = req.body;
  
    if (!email) {
      return res.json({ err: "please provide email" });
    }
  
    User.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
    }).then((new_user) => {
      res.json({ id: new_user.id })
    }).catch((err) => {
      console.log(err)
      res.json({ err: 'there was an error' })
    })
  
  })
  
app.listen(3000, () => {
    console.log("App started in port 3000")
  })




