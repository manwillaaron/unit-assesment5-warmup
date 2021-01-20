require('dotenv').config();
const massive = require('massive');
const express = require('express');
const session = require('express-session');
const ctrl = require('./controller')
const {SESSION_SECRET, CONNECTION_STRING, PORT} = process.env
const app = express()

app.use(express.json())

app.use(session({
    saveUninitialized: true,
    resave:false,
    secret: SESSION_SECRET,
    cookie:{maxAge: 1000 * 60 * 60 * 24 * 365}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db => {
    app.set('db',db) 
    console.log('db connected')
    app.listen(PORT, ()=>console.log(`listening on ${PORT}`))
})

app.post('/auth/login', ctrl.login)
app.post('/auth/register', ctrl.register)
app.get('/api/user', ctrl.getUserInfo)
app.delete('/auth/user', ctrl.logout)
