const express=require('express');
const cors=require('cors');
const { MongoClient, ServerApiVersion, CURSOR_FLAGS } = require('mongodb');


const app=express();
require('dotenv').config();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.nuouh7o.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
const destinationCollection=client.db('application').collection('destination')

async function run (){
try{
app.get('/search', async(req, res)=>{
    const result=await destinationCollection.find().toArray();
    res.send(result)
})

app.get('/', async(req, res)=>{
    res.send('application is running')
})
app.listen(port, ()=>{
    console.log(`application is running on port ${port}`)
})
}
finally{}
}
run().catch(error => console.error(error))