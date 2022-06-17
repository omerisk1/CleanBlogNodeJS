const express = require("express");
const ejs = require("ejs");
const app = express();
const mongoose = require("mongoose");
const Photo = require("./models/Photo");

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://localhost/cleanblog-test-db", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get("/", async (req, res) => {
  const photos = await Photo.find({});
  res.render("add", { photos });
});

app.get("/", (req, res) => {
  res.render("add");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.post("/photos", async (req, res) => {
  await Photo.create(req.body);
  res.redirect("/");
});

const port = 5000;
app.listen(port, () => {
  console.log(`${port} dinleniyor.`);
});
