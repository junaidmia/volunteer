
const express = require('express')
const app = express()
const cors = require('cors');
require('dotenv').config()
console.log(process.env.DB_PASS)
const port = process.env.PORT || 5055

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!')
})


const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zz3lt.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('connection error' , err)
  const eventCollection = client.db("volunteer").collection("events");
 
  app.post('/addEvent', (req, res) => {
      const newEvent = req.body;
      console.log('adding new event:',newEvent)
      eventCollection.insertOne(newEvent)
      // .then(result =>{
      //   console.log('inserted count', result.insertedCount)
      //   res.send(result.insertedCount > 0) 
      // })
  })

  // client.close();
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})