const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const calculate = require('./calculate.js')
const notification = require('./notification.js')

const app = express()
app.use(bodyParser.json())

const PORT = 3000
const DAY_MS = 86400000

MongoClient.connect('mongodb://localhost:27017/products',{ useNewUrlParser: true }, function (err, client) {
  if (err) throw err
  db = client.db('products')
})

//check daily which food item has expired
setInterval(() => {
  db.collection('food').find().toArray((err,results) => {
    calculate.calculate(results)
  })
},DAY_MS)

//returns current date
app.get('/', (req,res) => {
  // setInterval(() => {
    db.collection('food').find().toArray((err,results) => {
      const timeToExp = calculate.calculate(results)
      console.log(timeToExp, "main")
    })
  // }, 2000)
  res.status(200).send(true)
})

//save expo notification token
app.post('/token', (req,res) => {
  console.log(req.body)
  res.send("success")
})

//send all the items
app.get('/list', (req,res) => {
  db.collection('food').find().toArray((err,results) => {
    if(results.length === 0)
      res.status(404).send(false)
    else
      res.status(200).send(results)
  })
})

app.post('/delete', (req,res) => {
  db.collection('food').deleteOne({$and: [{"uid": req.body.item.uid}, {"mfd": req.body.item.mfd}]}, (err,result) => {
    if (err) {
      console.log(err)
      res.status(400).send(false)
    }
    else if (result.deletedCount === 0) {
      res.status(200).send(false)
    }
    else {
      res.send(200).send(true)
    }
  })
})

//add items to database
app.post('/add',(req,res) => {
  db.collection('food').insertOne(req.body.item, (err,result) => {
    if (err) {
      res.send(400).send(false)
    }
    else{
      res.status(200).send(true)
    }
  })
})

app.listen(PORT, () => console.log(`app is listening on port ${PORT}!`))