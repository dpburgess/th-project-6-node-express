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
  const projectId = req.params.projectId;
  const projects = data.projects;
  const project = projects.find(({ id }) => id === +projectId);
  if (project) {
    res.locals.projects = data.projects[req.params.projectId];
    body = data.projects[req.params.projectId];
    res.render("project", body);
  } else {
    res.sendStatus(404);
    console.log("The user went to a page that does not exist");
  }
});

app.use((req, res, next) => {
  console.log("The user went to a page that does not exist");
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
