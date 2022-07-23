const express = require('express');
const { ObjectId } = require('mongodb');
const app = express()
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID;
const PORT = 8000
require('dotenv').config()

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'CAD'

MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })
    
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Load homepage

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/views/index.html')
})

// Load CAD

app.get('/cad',(req, res)=>{
    db.collection('calls').find().toArray()
    .then(data => {
        res.render('cad.ejs', { info: data })
    })
    .catch(err => console.log(err))
})

// Create new call

app.post('/createCall', (req, res) => {
    db.collection('calls').insertOne({
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        type: req.body.type,

        first: req.body.first,
        last: req.body.last,
        phone: req.body.phone,

        notes: req.body.notes,

        apparatus: req.body.apparatus,
        tone: req.body.tone,
        enroute: req.body.enroute,
        arrival: req.body.arrival,
        departure: req.body.departure,
        quarters: req.body.quarters,

        contact: req.body.contact,
        page: req.body.page,
        notify: req.body.notify,
    })
    .then(data => {
        console.log('Created new call')
        res.json(data)
    })
    .catch(err => console.log(err))
})

// Display selected call

app.get('/displaySelectedCall', (req, res) => {
    db.collection('calls').find().toArray()
    .then(data => {
        console.log('Displayed selected call')
        res.json(data)
    })
    .catch(err => console.log(err))
})

// Save selected call

app.put('/saveSelectedCall', (req, res) => {
    // const callInfoDataObject = {}
    // for (key in req.body) {
    //     callInfoDataObject[key] = req.body[key]
    // }
    // console.log(callInfoDataObject)
    db.collection('calls').updateOne({ "_id": ObjectId(req.body.id)}, {$set: {
        // callInfoDataObject
        date: req.body.date,
        time: req.body.time,
        location: req.body.location,
        type: req.body.type,
        first: req.body.first,
        last: req.body.last,
        phone: req.body.phone,
        notes: req.body.notes,
        apparatus: req.body.apparatus,
        tone: req.body.tone,
        enroute: req.body.enroute,
        arrival: req.body.arrival,
        departure: req.body.departure,
        quarters: req.body.quarters,
        contact: req.body.contact,
        page: req.body.page,
        notify: req.body.notify,
    
    }
    })
    // .then(console.log(req))
    .then(data => {
        console.log('Saved selected call')
        res.json('Saved selected call')
    })
    .catch(err => console.log(err))
})

// Delete selected call

app.delete('/deleteSelectedCall', (req, res) => {
    db.collection('calls').deleteOne({ "_id": ObjectID(req.body.id)})
    .then(result => {
        console.log('Deleted selected call')
        res.json('Deleted selected call')
    })
    .catch(err => console.log(err))
})

// Port

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})