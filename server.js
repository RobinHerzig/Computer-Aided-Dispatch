const express = require('express')
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
    .catch(err => console.err(err))
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
        return: req.body.return,

        contact: req.body.contact,
        page: req.body.page,
        notify: req.body.notify,
    })
    .then(data => {
        console.log('Created new call')
        res.json(data)
    })
    .catch(err => console.err(err))
})

// Load active call
app.get('/displayActiveCall', (req, res) => {
    db.collection('calls').find().toArray()
    .then(data => {
        res.json(data)
    })
    .catch(err => console.err(err))
})

// Save active call
app.put('/saveCall', (req, res) => {
    db.collection('calls').updateOne({ "_id": ObjectID(req.body.id)}, {$set: {
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
    .then(data => {
        console.log('Saved active call')
        res.json('Saved active call')
    })
    .catch(err => console.err(err))
})

// Delete active call

app.delete('/deleteCall', (req, res) => {
    db.collection('calls').deleteOne({ "_id": ObjectID(req.body.id)})
    .then(result => {
        console.log('Deleted active call')
        res.json('Deleted active call')
    })
    .catch(err => console.err(err))
})

// Port

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})