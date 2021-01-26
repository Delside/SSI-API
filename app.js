const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
//CONNECTING TO DATABASE
mongoose.connect('mongodb+srv://admin:admin@cluster0.kgkmp.mongodb.net/SSI-DB?retryWrites=true&w=majority', 
{ useNewUrlParser: true, useUnifiedTopology: true} 
).catch(err => console.log(err));

var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', "localhost:4200");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
};

app.use(allowCrossDomain);

//LOGGER
app.use(morgan('combined'))
//PARSING DATA
app.use(bodyParser.json());

const definitionsRoutes =  require('./routes/definitions');

app.use('/definitions', definitionsRoutes);

app.use((req, res, next) =>{
    const error = new Error('Nie znaleziono strony');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500).json({
        blad: 
        {wiadomosc: error.message}

    });
});

module.exports = app;



/* var express = require('express');
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
} */