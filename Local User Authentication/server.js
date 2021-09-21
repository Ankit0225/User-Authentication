const { urlencoded } = require('express')
const express = require('express')
const session = require('express-session')
const multer = require('multer')

const { db, Users } = require('./db')

const app = express()
const upload = multer({ dest: 'uploads/' })


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

app.post('/signup', upload.single('avatar'), async (req,res) => {
    console.log('req.body', req.body);
    console.log('req.file', req.file);
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
    const user = await Users.findOne({where: { username: req.body.username }})
   if(!user){
    return res.status(404).render('login', { some_error: 'No Such Username Exist' })  
   }


   if( user.password !== req.body.password){
    return res.status(401).render('login', { some_error: 'Incorrect Password' })  
   }
   req.session.userId = user.id
   res.redirect('/profile')



})

app.get('/profile', async (req,res) => {
    
    if(!req.session.userId){
        res.redirect('/login')
    }
    const user = await Users.findByPk(req.session.userId)
    
    res.render('show_profile',{ user })

})


app.get('/logout', (req,res) => {
    req.session.userId = null
    res.redirect('/login')
})

db.sync() 
    .then(() => {
        app.listen('2222',()=>{
            console.log('Server Started at http://localhost:2222');
        })
    }).catch((err) => {
        console.error(err)
    });
