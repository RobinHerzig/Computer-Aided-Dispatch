const express = require('express')
const { ObjectId } = require('mongodb')
const app = express()
const MongoClient = require('mongodb').MongoClient
// const ObjectID = require('mongodb').ObjectID
dateTime = require('node-datetime')
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
    const dt = dateTime.create()
    const date = dt.format('Y-m-d')
    const time = dt.format('H:M:S')

    db.collection('calls').insertOne({
        date: date,
        time: time,
        callNotesObject: {}
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
    const callInfoDataObject = {}
    const dt = dateTime.create()
    const date = dt.format('Y-m-d')
    const time = dt.format('H:M:S')
    let newNote = ''
    for (key in req.body) {
        if (key === 'newNote') {
            newNote = req.body[key]
            callInfoDataObject.callNotesObject = {[date + " " + time]: time + ": " + newNote} // Create embedded document for call notes
        }
        else {
            callInfoDataObject[key] = req.body[key] // Iterate through the request body, create an object out of key/value pairs
        }
    }
    db.collection('calls').updateOne({ "_id": ObjectId(req.body.id)}, {$set: callInfoDataObject})
    .then(data => {
        console.log(callInfoDataObject)
        console.log('Saved selected call')
        res.json('Saved selected call')
    })
    .catch(err => console.log(err))
})

// Delete selected call

app.delete('/deleteSelectedCall', (req, res) => {
    db.collection('calls').deleteOne({ "_id": ObjectId(req.body.id)})
    .then(data => {
        console.log('Deleted selected call')
        res.json('Deleted selected call')
    })
    .catch(err => console.log(err))
})

// Port

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})