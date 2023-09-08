const express = require('express');
const { Op } = require("sequelize");
const app = express();
const { Meals } = require('./models');
// const session = require('express-session');
const cookieParser = require('cookie-parser')

app.use(express.json());
app.use(cookieParser())
// app.use(session())

const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

app.get("/", (req,res) => {
  res.sendFile("index.html", { root: __dirname});
})
// Process the form data
app.post('/api', (req, res) => {
  console.log(req.body);
  res.json({
    message:"I received all the data"
});
})

app.get('/meals', (req, res) => {
  // SELECT * FROM "Meals";
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

    const { Protein, Vegetables, Carbs,userId } = req.body;
  
    Meals.create({
      Protein: Protein,
      Vegetables: Vegetables,
      Carbs: Carbs,
      userId: userId
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

app.get("/meals/search", (req, res) => {
  console.log(req.params);
  console.log(req.query);
  const { search } = req.query;
  console.log(search);

  Meals.findAll({
    attributes: ['id', 'Protein', 'Vegetables', 'Carbs'],
    where: {
      [Op.or]: [
        {
          Protein: {
            [Op.iLike]: "%" + search + "%"
          }
        },
        {
          Vegetables: {
            [Op.iLike]: "%" + search + "%"
          }
        }
      ]
    }
  }).then((meals) => {
    res.json(meals)
  })
})


app.listen(3000, () => {
    console.log("App started in port 3000")
  })




