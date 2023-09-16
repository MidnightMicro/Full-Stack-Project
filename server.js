const express = require('express');
const { Op } = require("sequelize");
const app = express();
const bcrypt = require("bcrypt");
const saltRounds = 10;
const path = require ('path');
const { Users, Meals, sequelize } = require('./models');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const SessionStore = require('express-session-sequelize')(session.Store);

const myStore = new SessionStore({
  db : sequelize,
})

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cookieParser())
// app.use(session()) //and also middleware

app.use(session({
  secret: 'tacocat',
  resave: false,
  saveUninitialized: true,
  store: myStore,
  cookie: {
    maxAge: 60000,
    sameSite: 'strict',
  }
}));

//Creating new user
app.post('/register', (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  if (!email || !password) {
    return res.json({ err: "please provide email and password" }),
    window.open("register.html", '_blank')
}

  let hashedPassword = bcrypt.hashSync(password, saltRounds);

  Users.create({ 
    firstName, 
    lastName, 
    email, 
    password: hashedPassword 
  }).then(new_user => {
    req.session.user = new_user;
    res.json(new_user)
    console.log(new_user)
  })
  console.log("User Created")
})

//login
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  Users.findOne({
    where: {
      email: email
    }

  }).then((user) => {
    if (!user) {
      return res.json({ err: "no user found" });
    }

    let comparison = bcrypt.compareSync(password, user.password);
    if (comparison == true) {
      res.json({ success: true })

    } else {
      res.json({ success: false })
    }
  })
});

//Delete User
app.delete('/users/:id', (req, res) => {
  Users.destroy({
    where: {
      id: req.params.id
    }
  }).then((results) => {
    console.log(results)
    res.json({})
  })
});



// // Middleware
// app.use(bodyParser.json()); // This allows for data to be placed onto the body (req.body inside of routes)

app.put('/user', (req, res) => {
  if (!req.session.user) {
    return res.json({ success: false, err: 'please login' })
  }

  const { firstName, lastName, email, password} = req.body;

  const updateFields = {};

  if (firstName) {
    updateFields.firstName = firstName;
  }

  if (lastName) {
    updateFields.lastName = lastName;
  }

  if (password) {
    updateFields.password = bcrypt.hashSync(password, saltRounds);
  }

  if (email) {
    updateFields.email = email;
  }

  if (Object.keys(updateFields).length === 0) {
    return res.json({ success: false, err: 'no fields to update' });
  }

  Users.update(updateFields, {
    where: {
      id: req.session.user.id
    }
  }).then((result) => {
    console.log(result)
    res.json({ success: true })
  })
})


//   // const newUser = {
//   //   firstName: req.body.firstName,
//   //   lastName: req.body.lastName,
//   //   age: req.body.age,
//   //   email: req.body.email,
//   //   password: req.body.password, 
//   //   }
//   //   User.create(newUser);
//   //   res.json(user)
//   // });



// // add  body to favorites

// app.post('/meals', (req, res) => {
//   const { Protein } = req.body;
//   Meals.create({ Protein: Protein}).then((newMeal) => {
//     res.json(newMeal)
//   })
// });

app.get('/users', (req, res) => {
  // SELECT * FROM "Meals";
  Users.findAll({
    attributes: ['firstName', 'id']
  }).then((Users) => {
    console.log(Users);
    res.json(Users);
  })
})

// app.put('/meals/:id', (req,res) => {
//   const { Protein} = req.body;
//   const { id } = req.params;

//   Meals.update({ Protein: Protein,}, {
//     where: {
//       id: id
//     }
//   }).then((result) => {
//     console.log(result);

//     res.json({})
//   }).catch(err => {
//     console.log(err)

//     res.json({ err: "there was an error in your request" });
//   })
// })



// app.delete('/meals/:id', (req, res) => {
//     Meals.destroy({
//       where: {
//         id: req.params.id
//       }
//     }).then((results) => {
//       console.log(results)
//       res.json({})
//     })
//   })

// app.get("/meals/search", (req, res) => {
//   console.log(req.params);
//   console.log(req.query);
//   const { search } = req.query;
//   console.log(search);

//   Meals.findAll({
//     attributes: ['id', 'Protein'],
//     where: {
//       [Op.or]: [
//         {
//           Protein: {
//             [Op.iLike]: "%" + search + "%"
//           }
//         },
//       ]
//     }
//   }).then((meals) => {
//     res.json(meals)
//   })
// })


app.listen(3000, () => {
    console.log("App started in port 3000")
  })