const express = require("express");
const bodyParser = require("body-parser");
const { ToDoItemModel } = require("./mongooseDB");
const mongoose = require(__dirname+"/mongooseDB.js")

const app = express();
const date = require(__dirname+"/date.js");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const items = ["green", "eggs", "and", "ham"];

app.post("/", function(req, res){
    items.push(req.body.newToDo);
    res.redirect("/");

});

app.get("/", function(req, res){
    dayText =  date.getDate();

    res.render('list', {
        listTitle: dayText,
        items: items,
        postAction: "/"
        });


});

app.listen(3000, function(){
    console.log("Server started on port 3000");
});

app.get("/work", function(req,res){
    res.render("list", {listTitle: "Work List",
                        items: workItems,
                        postAction: "/work"})
});

app.post("/work", function(req,res){
   workItems.push(req.body.newToDo);
   res.redirect("/work"); 
});


app.get("/about", function (req, res) {
    res.render("about");
})

app.get("/:listId", async function (req, res) {
    listId = req.params.listId;
    listItems = await mongoose.getListItems(listId);

    res.render("list", {
        listTitle: listId,
        items: listItems,
        postAction : "/" + listId
    })
})

app.post("/:listId", async function (req, res) {
    listId = req.params.listId;

    toDoItem = new mongoose.ToDoItemModel({
        list: listId,
        text: req.body.newToDo
    })  //Not sure it's good practice to use the model outside the mongoose class?

    await mongoose.addItemToList(toDoItem);

    res.redirect("/" + listId)
})