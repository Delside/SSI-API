var express = require('express');
var app = express();
app.get('/', function (req, res) {
  res.send('Hello World!');
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
    const MongoClient = require('mongodb').MongoClient;
    const uri = "mongodb+srv://admin:admin@cluster0.kgkmp.mongodb.net/<dbname>?retryWrites=true&w=majority";
    const client = new MongoClient(uri);
 
    try {
        // Connect to the MongoDB cluster
        await client.connect();
 
        // Make the appropriate DB calls
        await  listDatabases(client);

        await createListing(client,
            {
                _term: "PDK",
                _explication: "Pozdro Dla Kumatych",
                _definition: "Skrót, używany podczas używania tzw. inside joke, którego zrozumieją tylko osoby zaznajomione z tematem (kumate)",
                _author: "Szymon"
            }
        );  
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);

async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function createListing(client, newListing){
    const result = await client.db("SSI-DB").collection("SSI").insertOne(newListing);
    console.log(`New listing created with the following id: ${result.insertedId}`);

    
}