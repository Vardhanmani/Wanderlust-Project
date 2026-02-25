const { PrismaClient } = require("../generated/prisma");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");


//signup
module.exports.signup = (req, res) => {
  res.render("users/signup.ejs");
};

//handle signup
module.exports.handlesignup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      req.flash("error", "Please provide username, email and password.");
      return res.render("users/signup.ejs");
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      req.flash("error", "Email already registered");
      return res.render("users/signup.ejs");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const registeredUser = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });

    // ✅ auto-login after signup
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Wanderlust!");
      res.redirect("/listing");
    });

  } catch (err) {
    console.error(err);
    req.flash("error", "Something went wrong during signup");
    res.render("users/signup.ejs");
  }
};

//login
module.exports.loginform = (req, res) => {
  res.render("users/login.ejs");
};

//handle login
module.exports.loginhandle = (req, res) => {
    req.flash("success", "Welcome back to Wanderlust");

    const redirectUrl = res.locals.returnTo || "/listing";
    delete req.session.returnTo; // ✅ clean session

    res.redirect(redirectUrl);
  };

  //logout
  module.exports.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You have been logged out!");
    res.redirect("/listing");
  });
};