const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const calculate = require('./calculate.js')
const notification = require('./push.js')

const app = express()
app.use(bodyParser.json())

const PORT = 3000

MongoClient.connect('mongodb://localhost:27017/products',{ useNewUrlParser: true }, function (err, client) {
  if (err) throw err
  db = client.db('products')
})

//returns current date
app.get('/', (req,res) => {
  db.collection('food').find({"barcode":req.body.barcode}).toArray((err,results) => {
    calculate.calculate(results)
  })
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

app.post('/getName', (req,res) => {
  console.log(req.body)
  db.collection('food').find({"barcode": req.body.barcode}).toArray((err,results) => {
    if(results.length === 0)
      res.status(404).send(false)
    else
      res.status(200).send({"name": results[0].name})
  })
})

//add items to database
app.post('/add',(req,res) => {
  db.collection('food').find({"barcode": req.body.barcode}).toArray((err,results) => {
    if(results.length === 0){
      db.collection('food').insertOne({
        "name": req.body.name,
        "barcode": req.body.barcode,
        "mfd": [req.body.mfd.slice(0,10)],
        "exp": req.body.exp,
        "timeToExp": [req.body.timeToExp]
      },(err,result) => {
        if (err) throw err
        res.status(200).send(true)
      })
    }
    else{
      db.collection('food').updateOne({"barcode":`${req.body.barcode}`},{$push:{"mfd":req.body.mfd.slice(0,10)}})
      res.status(200).send(true)
    }
  })
})

app.listen(PORT, () => console.log(`app is listening on port ${PORT}!`))