const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;



//new name: alumniUser
//new pass: YbZPUp1nHsUQp7rS

//use middleware
app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wzdwn29.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
        await client.connect();
        const studentCollection = client.db('alumniRegistration').collection('dataCollection');
    
       

        app.get('/students', async(req , res) => {
            const query = {};
            const cursor = studentCollection.find(query);
            const students = await cursor.toArray();
            res.send(students);
        });


        //post 

        app.post('/students' , async(req, res) =>{
            const newStudent = req.body;
            const result = await studentCollection.insertOne(newStudent);
            res.send(result);
        })

    }
    finally{

    }

}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('alumni Server Running');
});


app.listen(port, () =>{
    console.log(`Server is running on port ${port}`);
});