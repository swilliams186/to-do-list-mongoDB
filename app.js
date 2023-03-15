const express = require("express");
const bodyParser = require("body-parser");
const db = require(__dirname + "/mongoDB.js")

const app = express();
const date = require(__dirname+"/date.js");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

const defaultItems = [{text: "Welcome to the todo-list!"},
                      {text: "Type in the box, then click the + button"},
                      {text: "Your custom list will be saved!"}]

app.post("/", function(req, res){
    db.addItem("work", req.body.newToDo);
    res.redirect("/");

});

app.get("/", async function(req, res){
    dayText =  date.getDate();
    const todoList = await db.getList("work");

    res.render('list', {
        listTitle: dayText,
        listName: "work",
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


app.get("/:customListName", async function (req,res) {
    const customListName = req.params.customListName;
    const list = await db.getList(customListName)
    if(list.length == 0){
        await db.addMultipleItems(customListName, defaultItems);
        res.redirect("/"+customListName)
    }else{
        res.render('list', {
            listTitle: customListName,
            listName: customListName,
            items: list,
            postAction: "/"+customListName
        });   
    }  
})

app.post("/:customListName", async function (req,res) {
    const customListName = req.params.customListName;
    db.addItem(customListName, req.body.newToDo);
    res.redirect("/" + customListName);
})

app.post("/work", function(req,res){
   res.redirect("/work"); 
});

app.post("/delete/:customListName", function(req,res){
    const customListName = req.params.customListName;
    const deletedId = req.body.checkbox;
    console.log("listname: " + customListName + " id: " +deletedId);
    db.removeItem(customListName, deletedId);
    res.redirect("/"+customListName); 

 });


app.get("/about", function (req, res) {
    res.render("about");
});


//new collection lists
//{name: , items:[text:" "]}