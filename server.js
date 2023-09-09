const express = require('express');
const { Op } = require("sequelize");
const app = express();
const bcrypt = require("bcrypt");
const path = require ('path');
const { Users } = require('./models');
const { Meals } = require('./models');
const session = require('express-session');
const cookieParser = require('cookie-parser')

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cookieParser())
// app.use(session())

const bodyParser = require('body-parser');
const saltRounds = 10;


// Middleware
app.use(bodyParser.json());



app.get('/users' , async (req,res) =>{
    // SELECT * FROM "Users";
    Users.findAll({
    }).then((users) => {
      console.log(users);
      res.json(users);
    })
  })
 async function hashPassword(plaintextPassword) {
  const hash = await bcrypt.hash(plaintextPassword, 10);
 }
  // Store hash in the database

app.post('/users', async (req,res) => {
  console.log(req.body);

  const { firstName, lastName, plaintextPassword} = req.body;
  bcrypt.hash(plaintextPassword, saltRounds, function(err, hash) {


  Users.create({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashPassword,
  }).then((new_user) => {
    res.json({new_user})
  }).catch((err) => {
    console.log(err)
    res.json({ err: 'there was an error' })
  })
});
});


app.delete('/users/:id', (req, res) => {
  Users.destroy({
    where: {
      id: req.params.id
    }
  }).then((results) => {
    console.log(results)
    res.json({})
  })
})



  // const newUser = {
  //   firstName: req.body.firstName,
  //   lastName: req.body.lastName,
  //   age: req.body.age,
  //   email: req.body.email,
  //   password: req.body.password, 
  //   }
  //   User.create(newUser);
  //   res.json(user)
  // });



// add  body to favorites

app.post('/meals', (req, res) => {
  const { Protein } = req.body;
  Meals.create({ Protein: Protein}).then((newMeal) => {
    res.json(newMeal)
  })
});

app.get('/meals', (req, res) => {
  // SELECT * FROM "Meals";
  Meals.findAll({
    attributes: ['id', 'Protein']
  }).then((meals) => {
    console.log(meals);

    res.json(meals);
  })
})

app.put('/meals/:id', (req,res) => {
  const { Protein} = req.body;
  const { id } = req.params;

  Meals.update({ Protein: Protein,}, {
    where: {
      id: id
    }
  }).then((result) => {
    console.log(result);

    res.json({})
  }).catch(err => {
    console.log(err)

    res.json({ err: "there was an error in your request" });
  })
})



app.delete('/meals/:id', (req, res) => {
    Meals.destroy({
      where: {
        id: req.params.id
      }
    }).then((results) => {
      console.log(results)
      res.json({})
    })
  })

app.get("/meals/search", (req, res) => {
  console.log(req.params);
  console.log(req.query);
  const { search } = req.query;
  console.log(search);

  Meals.findAll({
    attributes: ['id', 'Protein'],
    where: {
      [Op.or]: [
        {
          Protein: {
            [Op.iLike]: "%" + search + "%"
          }
        },
      ]
    }
  }).then((meals) => {
    res.json(meals)
  })
})


app.listen(3000, () => {
    console.log("App started in port 3000")
  })