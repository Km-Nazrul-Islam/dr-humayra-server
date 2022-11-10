const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb'); 
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middle wares
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.MAHBUBA_USER}:${process.env.MAHBUBA_PASSWORD}@cluster0.p3lfnp2.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try {
        const servicesCollection = client.db('doctorMahbuba').collection('services');

        app.get('/services', async(req, res) => {
            const query = {}
            const cursor = servicesCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)
        });

        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const services = await servicesCollection.findOne(query);
            res.send(services);
        })
    }
    finally {

    }
}

run().catch(err => console.error(err))

app.get('/', (req, res) => {
    res.send('Dr Mahbuba Server Is Running')
})

app.listen(port, () => {
    console.log(`Dr. Mahbuba Server Steet Running On ${port} `);
})