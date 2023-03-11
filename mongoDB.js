const { MongoClient } = require("mongodb");
const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);
let database = "";
let collection = "";
exports.connect = function () {

    async function run() {
        try {
            await client.connect(uri);
            database = client.db('todolist');
            collection = database.collection('work');

            console.log("MongoDB connected and db name todolist and collection name todo created...");
        } 
        catch(e){
            console.log("Error connecting\n"+e);
        }
    }
    run().catch(console.dir, function (error) {
        console.log("Error when connecting to DB and performing initial setup");
        console.log(error);

    });
}

exports.getList = async function (listName) {
    var todoItems;
    
        try {
            //This returns a cursor that must be turned into an array
            todoItems = await collection.find({}).toArray();
            //todoItems is defined correctly here

        } catch(e){
            console.log("Error finding list:\n"+e);
        }
    
    //todoItems is undefinded here ???
    return todoItems;
}

exports.addItem = function (listName, item){

    async function run() {
        try {
            
            coll = getCollection(listName);
            console.log("Connected to collection: " + listName);
            await coll.insertOne({text: item});
        } finally {
            await client.close();
            console.log("MongoDB connection closed");
        }
    }
    run().catch(console.dir, function (error) {
        console.log("Error adding item to collection");
        console.log(error);

    });
}

async function getCollection(listName){
    await client.connect();
    const database = client.db('todolist');
    const todoColl = database.collection(listName);
    return todoColl;
}