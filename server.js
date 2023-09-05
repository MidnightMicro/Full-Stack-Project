const express = require('express');
// const Sequelize = require("sequelize");
const app = express();
const db = require('./models')


app.use(express.json());

app.get('/meals', (req, res) => {
    // SELECT * FROM "Users";
    Meals.findAll({ attributes: ['id', 'Protein', 'Vegetables', 'Carbs'] }).then((meals) => {
      console.log(meals);
  
      res.json(meals);
    })
  })

app.post('/users', (req, res) => {
    console.log(req.body);

    const { Protein, Vegetables, Carbs } = req.body;
  
    if (!email) {
      return res.json({ err: "please provide email" });
    }
  
    User.create({
      Protein: Protein,
      Vegetables: Vegetables,
      Carbs: Carbs,
    }).then((new_meal) => {
      res.json({ id: new_meal.id })
    }).catch((err) => {
      console.log(err)
      res.json({ err: 'there was an error' })
    })
  
  })
  
app.listen(3000, () => {
    console.log("App started in port 3000")
  })




