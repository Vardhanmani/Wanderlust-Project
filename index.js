if(process.env.NODE_ENV != "production"){
  require("dotenv").config();
}


const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("./generated/prisma");

const prisma = new PrismaClient();

// ROUTES
const listingRouter = require("./routes/listings");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const expressError = require("./utils/expressError");

// VIEW ENGINE
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// BODY PARSERS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// SESSION
app.use(
  session({
    secret: "mysupersecretcode",
    resave: false,
    saveUninitialized: false, 
    cookie: {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  })
);

// FLASH
app.use(flash());

// PASSPORT INIT
app.use(passport.initialize());
app.use(passport.session());

//  PASSPORT LOCAL STRATEGY (ONLY ONCE
passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        console.log(" STRATEGY CALLED");
        console.log("EMAIL:", email);
        console.log("PASSWORD:", password);

        const user = await prisma.user.findUnique({
          where: { email },
        });

        console.log("USER FROM DB:", user);

        if (!user) {
          console.log(" USER NOT FOUND");
          return done(null, false, { message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("PASSWORD MATCH:", isMatch);

        if (!isMatch) {
          console.log(" PASSWORD WRONG");
          return done(null, false, { message: "Invalid password" });
        }

        console.log(" AUTH SUCCESS");
        return done(null, user);
      } catch (err) {
        console.log(" STRATEGY ERROR:", err);
        return done(err);
      }
    }
  )
);


// SERIALIZE
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// DESERIALIZE
passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// LOCALS
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// ROUTES
app.use("/", userRouter);
app.use("/listing/:id/reviews", reviewRouter);
app.use("/listing", listingRouter);

// 404
app.use((req, res, next) => {
  next(new expressError(404, "Page Not Found"));
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

// SERVER
app.listen(1001, () => {
  console.log("server running on port 1001");
});
