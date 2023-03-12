const { MongoClient, ObjectId } = require("mongodb");
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

exports.getList = async function () {
    var todoItems;
    
        try {
            //This returns a cursor that must be turned into an array
            todoItems = await collection.find({}).toArray();

        } catch(e){
            console.log("Error finding list:\n"+e);
        }
    
    return todoItems;
}

exports.addItem = async function (item){
        try {           
            const result = await client.db("todolist").collection("work").insertOne({text: item});
            console.log(result);
        } catch(error) {
        console.log("Error adding item to collection");
        console.log(error);
    };
}

exports.removeItem = async function (idToRemove){
    console.log("removing item");
    try {     
        // const result = await collection.deleteOne({_id: idToRemove});
        const x = new ObjectId(idToRemove);
        const result = await client.db("todolist").collection("work").deleteOne({_id: x});

        console.log(result) ;
    } catch(error) {
    console.log("Error deleting item from collection");
    console.log(error);
    };
    
}
