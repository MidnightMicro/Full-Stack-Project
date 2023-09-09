const { Users } = require("../models");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  // 1. Get the user info
  const { firstName, lastName, age, email, password } = req.body;

  try {
    // 2. Check if the user already exists
    const existingUser = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      // User already exists, render an error message
      return res.render("register", { error: "User already exists" });
    }

    // 3. Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Create a new user with hashed password
    const id = Math.floor(Math.random() * 1000) + 1;
    const newUser = await Users.create({
      id: id,
      firstName: firstName,
      lastName: lastName,
      age: age,
      email: email,
      password: hashedPassword, // Store the hashed password in the database
    });

    // User registration successful
//     res.render("login", { error: "User created successfully" }); // Redirect to login page
//   } catch (error) {
//     // Handle any errors that occur during registration
//     console.error(error);
//     res.render("register", { error: "Internal error, please try again" });
//   }
// };

const login = async (req, res) => {
  // 1. Get the user info from the request body
  const { email, password } = req.body;
  console.log(req.body);

  try {
    // 2. Find the user by email
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    if (!user) {
      // User with the provided email does not exist
      return res.render("login", { error: "Invalid email or password" });
    }

    // 3. Compare the provided password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // Passwords do not match
      return res.render("login", { error: "Invalid email or password" });
    }

    // Redirect to a dashboard or home page after successful login

    req.session.user = {
      id: user.id,
      email: user.email,
      // Add any other user data you want to store
    };
    res.render("meals")
  } catch (error) {
    // Handle any errors that occur during login
    console.error(error);
    res.render("login", { error: "Internal error, please try again" });
  }
};

const logout = (req, res) => {
  // Destroy the session
  req.session.destroy();

  // Redirect to login page after logout
  res.render("login", { error: "You have been logged out" });
};

const profile = async (req, res) => {
  try {
    const { id, email } = req.session.user;

    // protect the route
    if (!email) {
      return res.redirect("/login", { error: "Please login to view profile" });
    }

    // if email exists
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    // try {

    const profileData = user.dataValues;

    res.render("profile", { error: null, profileData: profileData });
  } catch (error) {
    // Handle any errors that occur during login
    console.error(error);
    res.render("login", { error: "Internal error, please try again" });
  }
};

const deleteProfile = async (req, res) => {
  try {
    const { id, email } = req.session.user;

    // protect the route
    if (!email) {
      return res.redirect("/login", { error: "Please login to view profile" });
    }

    // if email exists
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    // delete user
    await Users.destroy({
      where: {
        email: email,
      },
    });

    // try {

    const profileData = user.dataValues;

    res.render("login", { error: "User deleted successfully" });
  } catch (error) {
    // Handle any errors that occur during login
    console.error(error);
    res.render("profile", {
      error: "Internal error, please try again",
      profileData: profileData,
    });
  }
};

const editProfile = async (req, res) => {
  try {
    const { id, email } = req.session.user;

    // protect the route
    if (!email) {
      return res.redirect("/login", { error: "Please login to view profile" });
    }

    // if email exists
    const user = await Users.findOne({
      where: {
        email: email,
      },
    });

    const profileData = user.dataValues;

    res.render("editProfile", { error: null, profileData: profileData });
  } catch (error) {
    // Handle any errors that occur during login
    console.error(error);
    res.render("profile", { error: "Internal error, please try again" });
  }
};

const editPostProfile = async (req, res) => {
  try {
    const { id, email } = req.session.user;

    // protect the route
    if (!email) {
      return res.render("login", {
        error: "Please login to view profile",
      });
    }

    // if email exists

    // update user
    const user = await Users.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        age: req.body.age,
        email: req.body.email,
      },
      {
        where: {
          email: email,
        },
      }
    );

    const profileData = user.dataValues;

    res.render("login", { error: "User updated successfully" });
  } catch (error) {
    // Handle any errors that occur during login

    console.error(error);
    res.render("profile", {
      error: "Internal error, please try again",
      profileData: profileData,
    });
  }
};

module.exports = {
  register,
  login,
  profile,
  logout,
  deleteProfile,
  editProfile,
  editPostProfile,
};
