const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const date = require(__dirname+"/date.js");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

var items = ["cheese", "Milk", "ham"];
var workItems = [];

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