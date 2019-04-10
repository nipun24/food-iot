const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const calculate = require('./calculate.js')
const notification = require('./notification.js')

const app = express()
app.use(bodyParser.json())

const PORT = 3000
//24 hours in milliseconds
const DAY_MS = 86400000
// const DAY_MS = 1000
var token = null

MongoClient.connect('mongodb://localhost:27017/products',{ useNewUrlParser: true }, function (err, client) {
  if (err) throw err
  db = client.db('products')
  //check daily which food item has expired
  setInterval(() => {
    db.collection('food').find().toArray((err,results) => {
      const res = calculate.calculate(results)
      if(res!==null){
        for(i=0; i < res[0].length; i++){
          db.collection('food').deleteOne({$and: [{"uid": res[0][i]}, {"mfd": res[1][i]}]}, (err,result) => {
            if (err)
              throw err       
          })
        }
      }
    })
  },60000)
})



app.get('/',(req,res) => {
  notification.sendNotification("hello","test")
  res.status(200).send(true)
})

// test/debug route
app.post('/test', (req,res) => {
  res.status(200).send(true)
})

//login route
app.post('/login',(req,res) => {
  const user = {}
  const {userName, pwd, token} = req.body
  db.collection('users').find({$and:[{"userName": userName},{"pwd": pwd}]}).toArray((err, result) => {
    if(err)
      res.status(404).send(false)
    else if(result.length !== 0)
      res.status(200).send(true)
    else {
      Object.assign(user, {userName}, {pwd}, {token})
      db.collection('users').insertOne(user, (err,result) => {
        if (err){
          res.status(400).send(false)
        }
        else 
          res.status(200).send(true)
      })
    }
  })
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


//delete items from database
app.post('/delete', (req,res) => {
  db.collection('food').deleteOne({$and: [{"uid": req.body.item.uid}, {"mfd": req.body.item.mfd}]}, (err,result) => {
    if (err) {
      res.status(400).send(false)
    }
    else if (result.deletedCount === 0) {
      res.status(200).send(false)
    }
    else {
      res.status(200).send(true)
    }
  })
})

//add items to database
app.post('/add',(req,res) => {
  const { mfd } = req.body.item
  const timeToExp = mfd.slice(0,4)*365 + mfd.slice(5,7)*30 + mfd.slice(8,10)*1 
  Object.assign(req.body.item, {timeToExp})
  db.collection('food').insertOne(req.body.item, (err,result) => {
    if (err) {
      res.send(400).send(false)
    }
    else {
      res.status(200).send(true)
    }
  })
})

app.listen(PORT, () => console.log(`app is listening on port ${PORT}!`))