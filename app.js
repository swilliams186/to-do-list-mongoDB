const express = require("express");
const bodyParser = require("body-parser");
const db = require(__dirname + "/mongoDB.js")

const app = express();
const date = require(__dirname+"/date.js");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var items = ["cheese", "Milk", "ham"];
var workItems = [];

app.post("/", function(req, res){
    items.push(req.body.newToDo);
    db.addItem("work", {text: req.body.newToDo});
    res.redirect("/");

});

app.get("/", async function(req, res){
    dayText =  date.getDate();
    const todoList = await db.getList("work");
    console.log("aaaaaaaaa" + todoList);
    // todoList.forEach(function(item){
    //     console.log(item.text);
    // });

    res.render('list', {
        listTitle: dayText,
        items: todoList,
        postAction: "/"
        });


});

app.listen(3000, function(){
    console.log("Server started on port 3000");
    db.connect();
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