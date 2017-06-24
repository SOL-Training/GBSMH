const express = require('express');
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient

var db
MongoClient.connect('mongodb://BrettTom:Sonora6242017@cluster0-shard-00-00-tmowm.mongodb.net:27017,cluster0-shard-00-01-tmowm.mongodb.net:27017,cluster0-shard-00-02-tmowm.mongodb.net:27017/GBSMH?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, function() {
    console.log('listening on 3000')
  })
})

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
  var cursor = db.collection('quotes').find().toArray(function(err, results) {
  console.log(results)
  // send HTML file populated with quotes here
})
  console.log(cursor)
})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
