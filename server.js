const express = require("express");
const { Op } = require("sequelize");
const app = express();
const { Meals } = require("./models");
const userRoutes = require("./routes/userRoutes");
const mealRoutes = require("./routes/mealsRoutes");
const session = require("express-session");
const SequelizeStore = require("express-session-sequelize")(session.Store);
const { Users } = require("./models");

app.use(express.json());

// Configure express-session
app.use(
  session({
    secret: "superSecret",
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: Users.sequelize,
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // Session duration (e.g., 24 hours)
    },
  })
);
app.use(express.urlencoded({ extended: true })); // Add this line to parse form data
// Frontend Setup
app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static(__dirname + "/public"));

// Make first link here
app.get("/", (req, res) => {
  res.render("register", { error: null });
});
app.post("/register", userRoutes.register);

app.get("/login", (req, res) => {
  res.render("login", { error: null });
});
app.get("/profile", userRoutes.profile);

app.post("/login", userRoutes.login);

app.get("/logout", userRoutes.logout);

app.get("/deleteProfile", userRoutes.deleteProfile);

app.get("/meals", mealRoutes.getMeals);

app.put("/meals/:id", (req, res) => {
  const { Protein, Vegetables, Carbs } = req.body;
  const { id } = req.params;

  Meals.update(
    { Protein: Protein, Vegetables: Vegetables, Carbs: Carbs },
    {
      where: {
        id: id,
      },
    }
  )
    .then((result) => {
      console.log(result);

      res.json({});
    })
    .catch((err) => {
      console.log(err);

      res.json({ err: "there was an error in your request" });
    });
});

app.get("/editProfile", userRoutes.editProfile);
app.post("/editProfile", userRoutes.editPostProfile);

app.post("/meals", (req, res) => {
  console.log(req.body);

  const { Protein, Vegetables, Carbs, userId } = req.body;

  Meals.create({
    Protein: Protein,
    Vegetables: Vegetables,
    Carbs: Carbs,
    userId: userId,
  })
    .then((new_meals) => {
      res.json({ id: new_meals.id });
    })
    .catch((err) => {
      console.log(err);
      res.json({ err: "there was an error" });
    });
});

app.delete("/meals/:id", (req, res) => {
  Meals.destroy({
    where: {
      id: req.params.id,
    },
  }).then((results) => {
    console.log(results);
    res.json({});
  });
});

app.get("/meals/search", (req, res) => {
  console.log(req.params);
  console.log(req.query);
  const { search } = req.query;
  console.log(search);

  Meals.findAll({
    attributes: ["id", "Protein", "Vegetables", "Carbs"],
    where: {
      [Op.or]: [
        {
          Protein: {
            [Op.iLike]: "%" + search + "%",
          },
        },
        {
          Vegetables: {
            [Op.iLike]: "%" + search + "%",
          },
        },
      ],
    },
  }).then((meals) => {
    res.json(meals);
  });
});

app.listen(3001, () => {
  console.log("App started in port 3001");
});
