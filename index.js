//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/fruitsDB", {
  useNewUrlParser: true,
});
//app
const app = express();
//body parser
app.use(bodyParser.urlencoded({ extended: true }));
//
//schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please check your data entry, no name specified!"],
  },
  age: {
    type: Number
  },
});

//model
const person = mongoose.model("person", personSchema);

//create new fruit
const persons = new person({
  name: "Shashikant",
  age: 25,
});

const personone = new person({
  name: "chandan",
  age: 25,
});

const persontwo = new person({
  name: "raunk",
  age: 25,
});

person.insertMany([persons,personone, persontwo], function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully saved all the person to fruitsDB");
  }
});

person.find(function (err, persons) {
  if (err) {
    console.log(err);
  } else {
    persons.forEach(function (person) {
      console.log(person.name);
    });
    mongoose.connection.close();
  }

});

//save fruit
persons.save();

//update person
person.updateOne({ _id: "63baf3e7cdf22cecc2186832" }, { name: "Shashi",age:20 }, function (
  err
) {
  if (err) {
    console.log(err,"error in update");
  } else {
    console.log("Successfully updated the document.");
  }
});

person.deleteOne({ _id: "63baf3e7cdf22cecc2186832" }, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Successfully deleted the document.");
  }
  
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
