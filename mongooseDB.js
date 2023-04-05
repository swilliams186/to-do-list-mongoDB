const mongoose = require("mongoose");
const logins = require("./logindata");

mongoose.connect(logins.uri)
const db = mongoose.connection;

//Schemas are the blueprint or datastructure of the data
const todoitemSchema = new mongoose.Schema({
  list: String,
  text: String
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number
});

const Person = mongoose.model("Person", personSchema);

people = []
const person1 = new Person({
  name: "Jembamin",
  age: 32
});
const person2 = new Person({
  name: "Benajecoveo",
  age: 33
});
const person3 = new Person({
  name: "Bendle",
  age: 36
});


people.push(person1);
people.push(person2);
people.push(person3);

//person.save();

//First param is the name of the collection - always singular (mongoose will turn Fruit into Fruits)
//This creates the collection even if you never call .save() on a model!
//Fruits model can basically be used like a collection
const TodoItem = mongoose.model("ToDo", todoitemSchema);
exports.ToDoItemModel = TodoItem;

const todo = new TodoItem({
  list: "Test",
  text: "Yep, gotta go faster!"
});

//This saves the todo item into the collection specified in the model, aslong as the item follows the schema
//todo.save();



db.on("error", console.error.bind(console, "connection error: "));  //Called if db connection errors

db.once("open", async function () {     //called if db.connection above promise resolves as open
  console.log("Connected successfully");
  todo.save(todo);

  Person.bulkSave(people);
  console.log(await TodoItem.find({}));
});
