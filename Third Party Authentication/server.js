const { urlencoded } = require('express')
const express = require('express')

const app = express()
app.set = express.json()

app.listen('3000', () => {
    console.log('Server Started on http://localhost:3000');
})