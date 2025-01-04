const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const { auth } = require("express-oauth2-jwt-bearer");

const dioceseRouter = require("./routes/diocese");
const parishRouter = require("./routes/parish");
const contributionRouter = require("./routes/contribution");
const budgetRouter = require("./routes/budget");
const activityLogRouter = require("./routes/activity-logs");
const userRouter = require("./routes/users");
const roleRouter = require("./routes/roles");
// const reportsRouter = require("./routes/reports");
const authRouter = require("./routes/auth");

const port = process.env.PORT || 5000;
const appOrigin = process.env.APP_ORIGIN || `http://localhost:5173`;

const jwtCheck = auth({
  audience: process.env.AUTH0_AUDIENCE,
  issuerBaseURL: `https://${process.env.AUTH0_DOMAIN}/`,
  tokenSigningAlg: "RS256",
});

// use body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://makeni-diocese-dashboard.onrender.com/",
      "https://backend-zlx3.onrender.com",
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  }),
);

// enforce on all endpoints
// app.use(jwtCheck);

app.use("/api/dioceses", dioceseRouter);
app.use("/api/parish", parishRouter);
app.use("/api/contributions", contributionRouter);
app.use("/api/budget-distributions", budgetRouter);
// app.use("/api/reports", reportsRouter);
app.use("/api/activity-logs", activityLogRouter);

app.use("/api/users", userRouter);
app.use("/api/roles", roleRouter);

app.use("/api/auth", authRouter);

app.get("/api/authorized", function (req, res) {
  try {
    res.send("Secured Resource");
  } catch (err) {
    res.status(401).json(err);
  }
});

app.listen(port, () => console.log("Running on port ", port));
