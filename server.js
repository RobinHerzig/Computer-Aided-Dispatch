const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
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
    .catch(error => console.error(error))
})

// Load new call
app.post('/newCall', (req, res) => {
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
        console.log('New call saved')
        res.redirect('/cad')
    })
    .catch(error => console.error(error))
})

// Load previous calls
app.get('/viewCall', (req, res) => {
    db.collection('calls').find().toArray()
    .then(data => {
        res.render('cad.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

// Load new person
app.get('/newPerson', (req, res) => {
    db.collection('calls').find().toArray()
    .then(data => {
        res.render('cad.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

// Load new vehicle
app.get('/newVehicle', (req, res) => {
    db.collection('calls').find().toArray()
    .then(data => {
        res.render('cad.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

// Load MDT
app.get('/MDT', (req, res) => {
    db.collection('calls').find().toArray()
    .then(data => {
        res.render('cad.ejs', { info: data })
    })
    .catch(error => console.error(error))
})

// Load active call
app.get('/displayActiveCall', (req, res) => {
    db.collection('calls').find().toArray()
    .then(data => {
        res.json(data)
    })
    .catch(error => console.error(error))
})

// Save active call
app.put('/saveCall', (req, res) => {
    db.collection('calls').updateOne({_id: req.body.id},{ $set: {
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
        }
    })
    .then(data => {
        console.log('Call saved')
        res.json('data')
    })
    .catch(error => console.error(error))
})

// app.put('/addOneLike', (req, res) => {
//     db.collection('rappers').updateOne({stageName: req.body.stageNameS, birthName: req.body.birthNameS,likes: req.body.likesS},{
//         $set: {
//             likes:req.body.likesS + 1
//           }
//     },{
//         sort: {_id: -1},
//         upsert: true
//     })
//     .then(result => {
//         console.log('Added One Like')
//         res.json('Like Added')
//     })
//     .catch(error => console.error(error))
// })

// app.delete('/deleteRapper', (req, res) => {
//     db.collection('rappers').deleteOne({stageName: req.body.stageNameS})
//     .then(result => {
//         console.log('Rapper Deleted')
//         res.json('Rapper Deleted')
//     })
//     .catch(error => console.error(error))
// })

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})