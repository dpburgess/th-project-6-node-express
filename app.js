const express = require("express");
const data = require("./data.json");
var path = require("path");

const app = express();
//app.use("/static", express.static("views"));
app.use("/static", express.static(path.join(__dirname, "public")));
app.set("views", "./views");
app.set("view engine", "pug");

app.get("/", (req, res) => {
  res.locals.projects = data.projects[req.params.projectId];
  body = data.projects;
  res.render("index", body);
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/project/:projectId", (req, res, next) => {
  //req.params.projectId;
  //if (req.params.projectId < 5) {
  res.locals.projects = data.projects[req.params.projectId];
  body = data.projects[req.params.projectId];
  res.render("project", body);
  //} else {
  //next(err);
  //console.log(req.params.projectId);
  //err.status = 404;
  //res.status(404);
  //res.render("error");
  //}
});
// dynamic route
// https://teamtreehouse.com/library/express-s-responserender-method

app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error route
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render("error");
});

app.listen(3000, () => {
  console.log("The application is running on port 3000!");
});
