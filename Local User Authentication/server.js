const { urlencoded } = require('express')
const express = require('express')
const session = require('express-session')

const { db, Users } = require('./db')

const app = express()
app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'wquidag219p-p1wqkjqkh'
}))

app.get('/signup',(req,res)=> {
    res.render('signup')
})

app.post('/signup', async (req,res) => {
    const user = await Users.create({
        username: req.body.username,
        email: req.body.email,      
        password: req.body.password  // NOTE: In Production leve we save hash of password
    })
    res.status(201).send(`User ${user.id} Created`)
})

app.get('/login', (req,res) => {
    res.render('login')
})

app.post('/login', async (req,res) => {
    
})
db.sync() 
    .then(() => {
        app.listen('2222',()=>{
            console.log('Server Started at http://localhost:2222');
        })
    }).catch((err) => {
        console.error(err)
    });
