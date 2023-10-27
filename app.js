const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const port = process.env.PORT || 3000; // Use port 3000 for development

// Connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/test", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Create a Review schema and model (using Mongoose)
const reviewSchema = new mongoose.Schema({
  text: String,
});
const Review = mongoose.model("Review", reviewSchema);

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static("public"));

app.get("/", (req, res) => {
  console.log("sending UI");
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.post("/reviews", async (req, res) => {
  console.log("here");
  // Create a new review and save it to the database
 const r =  await Review.create({ text: req.body.text });
//   res.redirect("/");
res.send(r)
});

app.get("/reviews", async (req, res) => {
    console.log("here");
   const r =  await Review.find();
  res.send(r)
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
