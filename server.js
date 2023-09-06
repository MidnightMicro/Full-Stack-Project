const express = require('express');
const Sequelize = require("sequelize");
const app = express();
const { Meals } = require('./models')


app.use(express.json());

app.get('/meals', (req, res) => {
  // SELECT * FROM "Users";
  Meals.findAll({
    attributes: ['id', 'Protein', 'Vegetables', 'Carbs']
  }).then((meals) => {
    console.log(meals);

    res.json(meals);
  })
})

app.put('/meals/:id', (req,res) => {
  const { Protein, Vegetables, Carbs } = req.body;
  const { id } = req.params;

  Meals.update({ Protein: Protein, Vegetables: Vegetables, Carbs: Carbs }, {
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


app.post('/meals', (req, res) => {
    console.log(req.body);

    const { Protein, Vegetables, Carbs } = req.body;
  
    Meals.create({
      Protein: Protein,
      Vegetables: Vegetables,
      Carbs: Carbs,
    }).then((new_meals) => {
      res.json({ id: new_meals.id })
    }).catch((err) => {
      console.log(err)
      res.json({ err: 'there was an error' })
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
app.listen(3000, () => {
    console.log("App started in port 3000")
  })




