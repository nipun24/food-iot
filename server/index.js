const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

const app = express()
app.use(bodyParser.json())

const PORT = 3000

MongoClient.connect('mongodb://localhost:27017/products',{ useNewUrlParser: true }, function (err, client) {
  if (err) throw err
  db = client.db('products')
})

//returns current date
app.get('/', (req,res) => {
  const d = new Date()
  res.send(`${d.getDate()} ${d.getMonth()+1} ${d.getFullYear()}`)
})

//save expo notification token
app.post('/token', (req,res) => {
    console.log(req.body)
    res.send("success")
})

//send all the items
app.get('/list', (req,res) => {
  db.collection('food').find().toArray((err,results) => {
    res.status(200).send(results)
  })
})

//add items to database
app.post('/add',(req,res) => {
  db.collection('food').insertOne(req.body,(err,result) => {
    if (err) throw err
    res.status(200).send(true)
  })

})

app.listen(PORT, () => console.log(`app is listening on port ${PORT}!`))