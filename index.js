const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
// middleware
app.use(cors())
app.use(express.json())

const uri = "mongodb+srv://nurulislamrimon:Nurul123@cluster0.n9ujq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();
        const userCollection = client.db('foodExpress').collection('user');
        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query)
            const users = await cursor.toArray();
            res.send(users)
        })

        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log(`New use ${JSON.stringify(newUser)}`);
            const result = await userCollection.insertOne(newUser);
            res.send(result)
        })

    } finally {

    }
}
run().catch(console.dir)


app.get('/', (req, res) => {
    res.send('Hello')
})

app.listen(port, () => {
    console.log(`port ${port} is responding`);
})

