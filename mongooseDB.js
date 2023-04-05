const mongoose = require("mongoose");
const logins = require("./logindata");

mongoose.connect(logins.uri)
const db = mongoose.connection;

//Schemas are the blueprint or datastructure of the data
const todoitemSchema = new mongoose.Schema({
  list: String, //The extension that was requested eg /kittens
  text: String  //The text 
});

//First param is the name of the collection - always singular (mongoose will turn Fruit into Fruits)
//This creates the collection even if you never call .save() on a model!
//Fruits model can basically be used like a collection
const TodoItem = mongoose.model("ToDo", todoitemSchema);
exports.ToDoItemModel = TodoItem;


//This saves the todo item into the collection specified in the model, aslong as the item follows the schema
//todo.save();

db.on("error", console.error.bind(console, "connection error: "));  //Called if db connection errors

db.once("open", async function () {     //called if db.connection above promise resolves as open
  console.log("Connected successfully");
});


exports.getListItems = async function(listId){
  console.log("ListID: " + listId);
  results = await TodoItem.find({list: listId});
  return results;
}

exports.addItemToList = async function(toDoItem){
  await toDoItem.save();
}

exports.removeItemFromList = async function(itemId){
  await TodoItem.deleteOne({_id: itemId});
}