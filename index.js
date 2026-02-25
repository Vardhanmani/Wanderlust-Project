if (process.env.NODE_ENV != "production") {
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

/* -------------------- ROUTES -------------------- */

const listingRouter = require("./routes/listings");
const reviewRouter = require("./routes/review");
const userRouter = require("./routes/user");

const expressError = require("./utils/expressError");

/* -------------------- VIEW ENGINE -------------------- */

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

/* -------------------- MIDDLEWARE -------------------- */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

/* -------------------- SESSION -------------------- */

app.use(
  session({
    secret: process.env.SESSION_SECRET || "devsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  })
);

/* -------------------- FLASH -------------------- */

app.use(flash());

/* -------------------- PASSPORT -------------------- */

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          return done(null, false, { message: "Invalid email" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
          return done(null, false, { message: "Invalid password" });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

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

/* -------------------- LOCALS -------------------- */

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

/* -------------------- ROUTES -------------------- */

app.use("/", userRouter);
app.use("/listing", listingRouter);
app.use("/listing/:id/reviews", reviewRouter);

/* -------------------- 404 HANDLER -------------------- */

app.use((req, res, next) => {
  next(new expressError(404, "Page Not Found"));
});

/* -------------------- ERROR HANDLER -------------------- */

app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

/* -------------------- SERVER -------------------- */

const PORT = process.env.PORT || 1001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

/* -------------------- CLEAN SHUTDOWN -------------------- */

process.on("beforeExit", async () => {
  await prisma.$disconnect();
});