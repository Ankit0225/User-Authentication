const { urlencoded } = require('express')
const express = require('express')
const { db } = require('./db')

const app = express()
app.set = express.json()

app.use(express.urlencoded({extended: true}))
db.sync()
.then(()=> {

    app.listen('3000', () => {
        console.log('Server Started on http://localhost:3000');
    })
})

.catch((err)=> {
    console.log(err);
})